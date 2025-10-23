import { GameConst } from '@game/script/data/GameConst';
import { AutoSpinDelayTask } from '@game/script/task/AutoSpinDelayTask';
import { BackBSSettleTask } from '@game/script/task/BackBSSettleTask';
import { BonusTask } from '@game/script/task/BonusTask';
import { BootCatchTask } from '@game/script/task/BootCatchTask';
import { EndGameTask } from '@game/script/task/EndGameTask';
import { FSOpeningTask } from '@game/script/task/FSOpeningTask';
import { FSSettleTask } from '@game/script/task/FSSettleTask';
import { IdleTask } from '@game/script/task/IdleTask';
import { SpinTask } from '@game/script/task/SpinTask';
import { StopTask } from '@game/script/task/StopTask';
import { TransTask } from '@game/script/task/TransTask';
import { UpdateFreeTimesTask } from '@game/script/task/UpdateFreeTimesTask';
import { WinScatterTask } from '@game/script/task/WinScatterTask';
import { WinSymbolTask } from '@game/script/task/WinSymbolTask';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { IWinLineData } from '@common/components/slotMachine/SlotType';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { IGameResult, ISpinData } from '@common/script/network/NetworkApi';
import { TaskManager } from '@common/script/tasks/TaskManager';
import { Utils } from '@common/script/utils/Utils';


/**
 * 消息處理
 */
export class MessageHandler {
    private static instance: MessageHandler;

    public static getInstance(): MessageHandler {
        if (!MessageHandler.instance) {
            MessageHandler.instance = new MessageHandler();
        }
        return MessageHandler.instance;
    }

    private fgBonus1: boolean = false;//是否啟用額外免費遊戲1
    private fgBonus2: boolean = false;//是否啟用額外免費遊戲2
    private wildMultiplier: number = 1;//wild倍率

    /**
     * 初始化
     */
    public initialize(): void {
        //監聽Spin結果
        BaseEvent.onSpinResult.on(this.parseBSResult, this);
    }

    /**
     * 接收Spin結果並開始排腳本
     * @param slotResult 結果
     */
    private parseBSResult(slotResult: ISpinData): void {
        console.log('接收Spin結果', slotResult);

        //更新玩家餘額
        const dataManager = DataManager.getInstance();
        const resultUserCredit = slotResult.user_credit;
        SettingsController.refreshCredit.emit(resultUserCredit);
        dataManager.userCredit = resultUserCredit;

        //執行主遊戲結果
        const mainGame = slotResult.main_game;
        this.handleGameResult(mainGame, false);
        console.log('執行主遊戲結果完成');

        //如果有子遊戲，則執行子遊戲(免費遊戲)結果
        if (slotResult.get_sub_game) {
            this.fgBonus1 = false;//重置bonus狀態
            this.fgBonus2 = false;//重置bonus狀態
            this.wildMultiplier = 1;//重置wild倍率

            //獲得免費遊戲次數
            dataManager.freeSpinTimes = GameConst.SCATTER_TIMES[slotResult.main_game.scatter_info.amount];

            //執行子遊戲(免費遊戲)結果
            slotResult.sub_game.game_result.forEach((subGame, index) => {
                this.handleGameResult(subGame, true);
                //如果剩餘免費遊戲次數為0，則判斷是否表演retrigger
                if (DataManager.getInstance().freeSpinTimes === 0) {
                    this.handleRetrigger(subGame);
                }
                dataManager.freeSpinTimes--;  // 免費遊戲次數-1
                TaskManager.getInstance().addTask(new UpdateFreeTimesTask());
            });

            //FG結算
            const settleTask = new FSSettleTask();
            settleTask.win = slotResult.sub_game.pay_credit_total;//FG中獎總金額
            TaskManager.getInstance().addTask(settleTask);

            //返回BS
            const backBSSettleTask = new BackBSSettleTask();
            TaskManager.getInstance().addTask(backBSSettleTask);
        }
        console.log('回到待機');
        TaskManager.getInstance().addTask(new AutoSpinDelayTask());
        TaskManager.getInstance().addTask(new IdleTask());
    }

    /**
    * 處理遊戲結果
    * @param gameResult 盤面結果
    * @param isSubGame 是否子遊戲(免費遊戲)
    */
    private handleGameResult(gameResult: IGameResult, isSubGame: boolean = false): void {
        console.log('執行盤面停止', gameResult);
        //執行盤面停止
        const stopTask = new StopTask();
        stopTask.resultPattern = gameResult.game_result;
        TaskManager.getInstance().addTask(stopTask);
        console.log('執行盤面停止完成');

        //是否額外加次數(釣起靴子)
        if (gameResult.extra?.no_m_add_spin) {
            const bootCatchTask = new BootCatchTask();
            bootCatchTask.addTimes = 1;
            TaskManager.getInstance().addTask(bootCatchTask);
            DataManager.getInstance().freeSpinTimes += 1;
            TaskManager.getInstance().addTask(new UpdateFreeTimesTask());
        }

        if (gameResult.pay_credit_total > 0) {
            //表演中獎線
            if (gameResult.pay_line.length > 0) {
                let winLineData: IWinLineData[] = [];//此盤面細部中獎資料
                //轉換中獎線資料
                gameResult.pay_line.forEach((payLine) => {
                    const data = Utils.getLinePathPosition(payLine.pay_line, payLine.amount, gameResult.game_result, GameConst.payLineData);
                    winLineData.push({
                        payLineID: payLine.pay_line,
                        winPos: data.winPos,
                        winSymbolIDs: data.winSymbolIDs,
                        payCredit: payLine.pay_credit
                    });
                });
                console.log('winLineData', winLineData);
                //表演中獎線
                const winTask = new WinSymbolTask();
                winTask.winLineData = winLineData;
                winTask.isSubGame = isSubGame;
                winTask.payCreditTotal = gameResult.pay_credit_total;
                TaskManager.getInstance().addTask(winTask);
            }
        }
    }

    /**
     * 處理額外免費遊戲retrigger
     * @param subGame 免費遊戲結果
     */
    private handleRetrigger(subGame: IGameResult): void {
        //如果wild次數大於等於4，且未啟用第一個bouns，則表演額外加10次，倍率變2倍
        if (subGame.extra.total_wild_count >= 4 && this.fgBonus1 === false) {
            const bonusTask = new BonusTask();
            bonusTask.addTimes = 10;
            TaskManager.getInstance().addTask(bonusTask);
            this.fgBonus1 = true;//已啟用第一個bouns
            this.wildMultiplier = 2;//wild倍率變2倍
            DataManager.getInstance().freeSpinTimes += 10;
        } else if (subGame.extra.total_wild_count >= 8 && this.fgBonus2 === false) {
            const bonusTask = new BonusTask();
            bonusTask.addTimes = 10;
            TaskManager.getInstance().addTask(bonusTask);
            this.fgBonus2 = true;//已啟用第二個bouns
            this.wildMultiplier = 4;//wild倍率變4倍
            DataManager.getInstance().freeSpinTimes += 10;
        }
    }
}