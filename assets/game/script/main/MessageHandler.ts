import { CheatUI } from '@base/components/cheat/CheatUI';
// import { DelayTask } from '@base/script/tasks/DelayTask';
// import { TaskManager } from '@base/script/tasks/TaskManager';
// import { ModuleID } from '@base/script/types/BaseType';
// import { XUtils } from '@base/script/utils/XUtils';

import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { SymbolData2 } from '@game/components/slotMachine2/SymbolData2';
// import { GameConst, SlotMachineID, SymbolID } from '@game/script/constant/GameConst';

// import { GameData } from '@game/script/main/GameData';
import { GameConst, SymbolID } from '@game/script/data/GameConst';
import { IWinLineData, IWinScatterData } from '@game/script/data/GameType';
import { AutoSpinDelayTask } from '@game/script/task/AutoSpinDelayTask';
import { BackBSSettleTask } from '@game/script/task/BackBSSettleTask';
import { DropTask } from '@game/script/task/DropTask';
import { EndGameTask } from '@game/script/task/EndGameTask';
import { ExplodeTask } from '@game/script/task/ExplodeTask';
import { FSOpeningTask } from '@game/script/task/FSOpeningTask';
import { FSSettleTask } from '@game/script/task/FSSettleTask';
import { FSUpdateRemainTimesTask } from '@game/script/task/FSUpdateRemainTimesTask';
import { IdleTask } from '@game/script/task/IdleTask';
import { RetriggerTask } from '@game/script/task/RetriggerTask';
import { ScatterWinTask } from '@game/script/task/ScatterWinTask';
import { ShowWinTask } from '@game/script/task/ShowWinTask';
import { SpinTask } from '@game/script/task/SpinTask';
import { StopTask } from '@game/script/task/StopTask';
import { TransTask } from '@game/script/task/TransTask';

import { DataManager } from '@common/script/data/DataManager';
import { gameInformation } from '@common/script/data/GameInformation';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { IGameResult, ISpinData } from '@common/script/network/NetworkApi';
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
        // BaseEvent.onSpinResult.on(this.parseBSResult, this);
    }

    /**
     * 接收Spin結果並開始排腳本
     * @param slotResult 結果
     * @param fsRemainTimes 免費旋轉次數
     */
    // private parseBSResult(slotResult: ISpinData): void {
    //     let gameData = gameInformation.gameData;
    //     // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SPINSTOPING);

    //     //過程計算加總用(右下角win用)
    //     let sumWin: number = DataManager.getInstance().isBS() ? 0 : DataManager.getInstance().winTotal;
    //     if (DataManager.getInstance().isBS()) {
    //         DataManager.getInstance().winTotal = 0;
    //     }

    //     // let allWinPos: number[];//此盤面全部中獎位置
    //     // let planeWin: number;//此盤面中獎金額總和
    //     let winLineData: IWinLineData[] = [];//此盤面細部中獎資料
    //     let winScatterData: IWinScatterData = { symbolID: 0, winPos: [], payCredit: 0, amount: 0 };//scatter中獎資料
    //     // let preSymbolPattern: number[];//上一盤面符號
    //     let newSymbolPattern: number[];//新盤面符號

    //     //把第一盤和N盤結果合併, 取用資料時再決定轉型成SlotResult或SubResult
    //     let allResult: IGameResult[] = slotResult.get_sub_game ? [slotResult.main_game, ...slotResult.sub_game.game_result] : [slotResult.main_game];

    //     //獲得額外局數
    //     // let getExtraTimes = (slotResult.win_bonus_group && slotResult.win_bonus_group.length > 0) ? slotResult.win_bonus_group[0].times : 0;
    //     // let curMultiplierIdx: number = DataManager.getInstance().getData<GameData>().getInitMultiplierIdx();//盤面起始倍數

    //     allResult.forEach((data, resultIndex) => {
    //         let subIdx = resultIndex - 1;//第幾個subResult(allResult[0]是SlotResult)
    //         // preSymbolPattern = newSymbolPattern || [];
    //         newSymbolPattern = data.game_result[subIdx].flat();//新盤面符號(二維陣列改一維陣列)

    //         //轉換中獎線資料
    //         data.pay_line.forEach((payLine) => {
    //             const data = Utils.getLinePathPosition(payLine.pay_line, payLine.amount, newSymbolPattern, GameConst.payLineData);
    //             winLineData.push({ lineID: payLine.pay_line, winPos: data.winPos, symbolIDs: data.symbolIDs, payCredit: payLine.pay_credit });
    //         });

    //         //轉換scatter資料
    //         if (data.scatter_info) {
    //             // let scatterPos = data.scatter_info.position.flat();//二維陣列改一維陣列
    //             let scatterPos = data.scatter_info.position;
    //             scatterPos.forEach((pos, i) => {
    //                 winScatterData.winPos.push(pos[0] * GameConst.REEL_ROW + pos[1]);
    //             });
    //             winScatterData.symbolID = data.scatter_info.id[0];
    //             winScatterData.amount = data.scatter_info.amount;
    //             winScatterData.payCredit = data.scatter_info.pay_credit;
    //         }


    //         // allWinPos = Utils.uniq(allWinPos);//去重複值


    //         //首次停輪
    //         if (resultIndex === 0) {
    //             //如果是免費遊戲
    //             if (DataManager.getInstance().moduleID === ModuleID.FG) {
    //                 // let fsTask = new FSUpdateRemainTimesTask();
    //                 // fsTask.fsRemainTimes = --gameData.fsRemainTimes;
    //                 // TaskManager.getInstance().addTask(fsTask);
    //             }

    //             //因為要處理輪帶金框, 只有第一轉設定, 否則slotParser內的資料會被子盤面覆蓋
    //             // gameData.slotParser.setStripTable(DataManager.getInstance().getStripTable()._strips, slotResult.rng, newSymbolPattern, goldenPattern);
    //             // gameData.slotParser.buyFS = DataManager.getInstance().buyFs;
    //             // SlotMachine2.changeStrip.emit(SlotMachineID.BS, gameData.slotParser);

    //             let stop = new StopTask();
    //             // stop.rngList = slotResult.rng;
    //             //第一盤就中FS, 如果還有得分的話要在掉落後的盤面處理
    //             stop.isScatterWin = numScatterInPattern >= GameConst.BONUS_WIN_COUNT && msgResultIndex == allResult.length - 1;
    //             stop.isLastPlane = msgResultIndex == allResult.length - 1;
    //             // stop.symbolPattern = temp.full_symbol_pattern;
    //             TaskManager.getInstance().addTask(stop);
    //         }
    //         else {
    //             //掉落
    //             let drop: DropTask = new DropTask();
    //             drop.preSymbolPattern = preSymbolPattern;
    //             drop.newSymbolPattern = newSymbolPattern;//下一盤的結果
    //             drop.goldenPattern = goldenPattern;
    //             drop.isScatterWin = numScatterInPattern >= GameConst.BONUS_WIN_COUNT && msgResultIndex == allResult.length - 1;
    //             drop.isLastPlane = msgResultIndex == allResult.length - 1;
    //             TaskManager.getInstance().addTask(drop);
    //             // TaskManager.getInstance().addTask(new DelayTask(0.5));
    //         }

    //         TaskManager.getInstance().addTask(new DelayTask(numScatterInPattern > 0 ? 0.5 : 0.2));

    //         // 有贏分資料才演示後續
    //         if (winPos && winPos.length > 0) {

    //             //中獎線
    //             let winTask = new ShowWinTask();
    //             winTask.curMultiplier = GameConst.multiplierList[curMultiplierIdx];
    //             winTask.originalWin = planeOriginalWin;
    //             winTask.winPos = winPos;
    //             winTask.winSymbolID = winSymbolID;
    //             winTask.sumWin = sumWin + planeOriginalWin;//還不能真的加入
    //             winTask.playerCent = DataManager.getInstance().playerCent + planeOriginalWin * DataManager.getInstance().bet.getCurRate();//還不能真的加入
    //             TaskManager.getInstance().addTask(winTask);

    //             //檢查消去位置是否有金框, 遇到金框要轉換WILD
    //             let changeMap: SymbolData2[][] = null;
    //             winPos.forEach((pos) => {
    //                 let winGrid = XUtils.posToGrid(pos);
    //                 let isGolden = !!goldenPattern[winGrid.row * gameData.REEL_COL + winGrid.col];
    //                 if (isGolden) {
    //                     if (!changeMap) {
    //                         changeMap = [];
    //                     }
    //                     if (!changeMap[winGrid.col]) {
    //                         changeMap[winGrid.col] = [];
    //                     }
    //                     let data = new SymbolData2();
    //                     data.symbolID = SymbolID.Wild;
    //                     data.isChange = true;
    //                     changeMap[winGrid.col][winGrid.row] = data;
    //                 }
    //             }, this);

    //             sumWin += planeWin;
    //             DataManager.getInstance().winTotal += planeWin;
    //             DataManager.getInstance().playerCent += planeWin * DataManager.getInstance().bet.getCurRate();

    //             //爆炸
    //             let preMultiplierIdx = curMultiplierIdx;
    //             curMultiplierIdx = Math.min(curMultiplierIdx + 1, GameConst.multiplierList.length - 1);
    //             let explode = new ExplodeTask();
    //             explode.winPos = winPos;
    //             explode.hitMultiplier = GameConst.multiplierList[preMultiplierIdx];
    //             explode.newMultiplier = GameConst.multiplierList[curMultiplierIdx];
    //             explode.changeMap = changeMap;
    //             explode.win = planeWin;
    //             explode.sumWin = sumWin;
    //             explode.playerCent = DataManager.getInstance().playerCent;
    //             TaskManager.getInstance().addTask(explode);
    //         }

    //     }, this);

    //     //一轉結束
    //     let end = new EndGameTask();
    //     let spinWin = XUtils.convertToLong(slotResult.credit);
    //     end.win = spinWin;
    //     end.playerCent = DataManager.getInstance().playerCent;
    //     TaskManager.getInstance().addTask(end);

    //     gameData.fsWin += spinWin;

    //     //BS:檢查是否要進FS
    //     if (DataManager.getInstance().curModuleID === ModuleID.BS) {
    //         //進入FS
    //         if (DataManager.getInstance().nextModuleID !== ModuleID.BS) {

    //             gameData.bsLastMap.length = 0;
    //             for (let col: number = 0; col < gameData.REEL_COL; ++col) {
    //                 gameData.bsLastMap[col] = [];
    //                 for (let row: number = 0; row < gameData.REEL_ROW; ++row) {
    //                     let data = new SymbolData2();
    //                     let symbolID = newSymbolPattern[row * gameData.REEL_COL + col];
    //                     data.symbolID = symbolID;
    //                     data.isBadge = goldenPattern[row * gameData.REEL_COL + col] > 0;
    //                     gameData.bsLastMap[col].push(data);
    //                 }
    //             }

    //             let scatterWin = new ScatterWinTask();
    //             scatterWin.symbolPattern = newSymbolPattern;
    //             TaskManager.getInstance().addTask(scatterWin);

    //             gameData.resetFS();

    //             gameData.fsRemainTimes = (slotResult.win_bonus_group && slotResult.win_bonus_group.length > 0) ? slotResult.win_bonus_group[0].times : 0;

    //             let trans = new TransTask();
    //             trans.to = DataManager.getInstance().nextModuleID;
    //             trans.times = gameData.fsRemainTimes;
    //             TaskManager.getInstance().addTask(trans);

    //             //FS開場
    //             let fsOpen = new FSOpeningTask();
    //             TaskManager.getInstance().addTask(fsOpen);

    //             DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_WAIT_START);
    //             DataManager.getInstance().buyFs = false;
    //             let task = new SpinTask();
    //             TaskManager.getInstance().addTask(task);
    //         }
    //         //相同模式
    //         else {
    //             TaskManager.getInstance().addTask(new AutoSpinDelayTask());
    //             TaskManager.getInstance().addTask(new IdleTask());
    //         }
    //     }
    //     //FS
    //     else {

    //         //FS獲得局數
    //         if (getExtraTimes > 0) {
    //             let task = new RetriggerTask();
    //             task.from = gameData.fsRemainTimes;
    //             task.to = gameData.fsRemainTimes + getExtraTimes;
    //             gameData.fsRemainTimes += getExtraTimes;
    //             TaskManager.getInstance().addTask(task);
    //         }

    //         //返回BS
    //         if (DataManager.getInstance().nextModuleID === ModuleID.BS) {
    //             let settle = new FSSettleTask();
    //             settle.win = gameData.fsWin;
    //             TaskManager.getInstance().addTask(settle);

    //             let backBSSettle = new BackBSSettleTask();
    //             backBSSettle.sumWin = DataManager.getInstance().winTotal;
    //             backBSSettle.playerCent = DataManager.getInstance().playerCent;
    //             TaskManager.getInstance().addTask(backBSSettle);

    //             TaskManager.getInstance().addTask(new IdleTask());
    //         }
    //         //繼續FS下一轉
    //         else {
    //             TaskManager.getInstance().addTask(new SpinTask());
    //         }
    //     }
    // }
}