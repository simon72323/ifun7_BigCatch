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

import { IWinLineData } from '@common/components/slotMachine/SlotType';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { IGameResult, ISpinData } from '@common/script/network/NetworkApi';
import { DelayTask } from '@common/script/tasks/DelayTask';
import { TaskManager } from '@common/script/tasks/TaskManager';
import { ModuleID } from '@common/script/types/BaseType';
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
        // let gameData = DataManager.getInstance().gameData;

        let fgRemainTimes: number = 0;//剩餘免費遊戲次數
        let wildMultiplier: number = 1;//wild倍率
        let fgBonus1: boolean = false;//是否啟用額外免費遊戲1
        let fgBonus2: boolean = false;//是否啟用額外免費遊戲2
        const fgTotalWin: number = slotResult.sub_game.pay_credit_total;//FG中獎總金額

        //把第一盤和N盤結果合併, 取用資料時再決定轉型成SlotResult或SubResult
        let allResult: IGameResult[] = slotResult.get_sub_game ? [slotResult.main_game, ...slotResult.sub_game.game_result] : [slotResult.main_game];

        allResult.forEach((data, resultIndex) => {
            // let subIdx = resultIndex - 1;//第幾個subResult(allResult[0]是SlotResult)
            const resultPattern: number[][] = data.game_result;//此回合盤面符號(二維陣列)
            console.log('收到盤面結果', resultPattern);

            //執行盤面停止
            const stopTask = new StopTask();
            stopTask.resultPattern = resultPattern;
            TaskManager.getInstance().addTask(stopTask);

            //執行等待scatter表演
            // TaskManager.getInstance().addTask(new DelayTask(data.scatter_info.amount > 0 ? 0.5 : 0.2));
            // 有贏分才表演中獎流程
            if (data.pay_credit_total > 9999999999) {
                if (resultIndex > 0) {
                    //處理wild撈魚得分並增加wild次數
                }

                //表演中獎線
                if (data.pay_line.length > 0) {
                    let winLineData: IWinLineData[] = [];//此盤面細部中獎資料
                    //轉換中獎線資料
                    data.pay_line.forEach((payLine) => {
                        const data = Utils.getLinePathPosition(payLine.pay_line, payLine.amount, resultPattern, GameConst.payLineData);
                        winLineData.push({ lineID: payLine.pay_line, winPos: data.winPos, winSymbolIDs: data.winSymbolIDs, payCredit: payLine.pay_credit });
                    });
                    //中獎線
                    const winTask = new WinSymbolTask();
                    winTask.hasSubGame = slotResult.get_sub_game;
                    winTask.winLineData = winLineData;
                    // winTask.winScatterData = winScatterData;
                    winTask.payCreditTotal = data.pay_credit_total;
                    winTask.userCredit = slotResult.user_credit;
                    TaskManager.getInstance().addTask(winTask);
                }
            }
            //一轉結束
            const endTask = new EndGameTask();
            endTask.payCreditTotal = data.pay_credit_total;
            // endTask.userCredit = slotResult.user_credit;
            TaskManager.getInstance().addTask(endTask);

            //第0局要檢查是否要進入FS
            if (resultIndex === 0 && slotResult.get_sub_game) {
                let scatterWinPos: number[] = [];
                data.scatter_info.position.forEach((pos, i) => {
                    scatterWinPos.push(pos[0] * GameConst.REEL_ROW + pos[1]);
                });

                //執行scatter表演
                const scatterWinTask = new WinScatterTask();
                scatterWinTask.winPos = scatterWinPos;
                scatterWinTask.payCredit = data.scatter_info.pay_credit;
                // scatterWin.winScatterData = winScatterData;
                TaskManager.getInstance().addTask(scatterWinTask);

                //轉場到FG
                const scatterTimes = GameConst.SCATTER_TIMES[data.scatter_info.amount];
                const transTask = new TransTask();
                transTask.toModuleID = ModuleID.FG;
                transTask.times = scatterTimes;
                TaskManager.getInstance().addTask(transTask);
                fgRemainTimes += scatterTimes;//增加初始免費遊戲次數

                //FS開場
                const fsOpenTask = new FSOpeningTask();
                TaskManager.getInstance().addTask(fsOpenTask);

                DataManager.getInstance().isBuyFs = false;

                //繼續FG下一轉
                const spinTask = new SpinTask();
                TaskManager.getInstance().addTask(spinTask);
            }
            //FG結果
            else {
                //是否額外加次數(釣起靴子)
                if (data.extra.no_m_add_spin) {
                    const bootCatchTask = new BootCatchTask();
                    bootCatchTask.addTimes = 1;
                    TaskManager.getInstance().addTask(bootCatchTask);
                    fgRemainTimes += 1;
                    this.updateFreeTimesTask(fgRemainTimes);
                }
                //如果wild次數大於等於4，且次數等於0，則表演額外加10次，倍率變2倍
                if (fgRemainTimes === 0) {
                    if (data.extra.total_wild_count >= 4 && fgBonus1 === false) {
                        const bonusTask = new BonusTask();
                        bonusTask.addTimes = 10;
                        TaskManager.getInstance().addTask(bonusTask);
                        fgBonus1 = true;
                        fgRemainTimes += 10;
                        wildMultiplier = 2;//wild倍率變2倍
                        this.updateFreeTimesTask(fgRemainTimes);
                    } else if (data.extra.total_wild_count >= 8 && fgBonus2 === false) {
                        const bonusTask = new BonusTask();
                        bonusTask.addTimes = 10;
                        TaskManager.getInstance().addTask(bonusTask);
                        fgBonus2 = true;
                        fgRemainTimes += 10;
                        wildMultiplier = 4;//wild倍率變4倍
                        this.updateFreeTimesTask(fgRemainTimes);
                    }
                }

                if (fgRemainTimes > 0) {
                    fgRemainTimes--;  // 免費遊戲次數-1
                    this.updateFreeTimesTask(fgRemainTimes);
                    //繼續FG下一轉
                    TaskManager.getInstance().addTask(new SpinTask());
                } else {
                    //FG結算
                    const settleTask = new FSSettleTask();
                    settleTask.win = fgTotalWin;
                    TaskManager.getInstance().addTask(settleTask);

                    //返回BS
                    const backBSSettleTask = new BackBSSettleTask();
                    TaskManager.getInstance().addTask(backBSSettleTask);
                }
            }
        }, this);
        TaskManager.getInstance().addTask(new AutoSpinDelayTask());
        TaskManager.getInstance().addTask(new IdleTask());
    }

    /**
     * 更新免費遊戲次數任務
     * @param times 次數
     */
    private updateFreeTimesTask(times: number): void {
        const updateFreeTimesTask = new UpdateFreeTimesTask();
        updateFreeTimesTask.times = times;
        TaskManager.getInstance().addTask(updateFreeTimesTask);
    }
}