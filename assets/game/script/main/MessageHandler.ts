import { CheatUI } from "@/base/components/cheat/CheatUI";
import { BaseDataManager } from "@/base/script/main/BaseDataManager";
import { BaseEvent } from "@/base/script/main/BaseEvent";
import { DelayTask } from "@/base/script/tasks/DelayTask";
import { TaskManager } from "@/base/script/tasks/TaskManager";
import { ModuleID } from "@/base/script/types/BaseType";
import { XUtils } from "@/base/script/utils/XUtils";
import { SlotMachine2 } from "../../components/slotMachine2/base/slotMachine2/SlotMachine2";
import { SymbolData2 } from "../../components/slotMachine2/SymbolData2";
import { GameConst, SlotMachineID, SymbolID } from "../constant/GameConst";
import { AutoSpinDelayTask } from "../task/AutoSpinDelayTask";
import { BackBSSettleTask } from "../task/BackBSSettleTask";
import { DropTask } from "../task/DropTask";
import { EndGameTask } from "../task/EndGameTask";
import { ExplodeTask } from "../task/ExplodeTask";
import { FSOpeningTask } from "../task/FSOpeningTask";
import { FSSettleTask } from "../task/FSSettleTask";
import { FSUpdateRemainTimesTask } from "../task/FSUpdateRemainTimesTask";
import { IdleTask } from "../task/IdleTask";
import { RetriggerTask } from "../task/RetriggerTask";
import { ScatterWinTask } from "../task/ScatterWinTask";
import { ShowWinTask } from "../task/ShowWinTask";
import { SpinTask } from "../task/SpinTask";
import { StopTask } from "../task/StopTask";
import { TransTask } from "../task/TransTask";
import { GameData } from "./GameData";
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
     * 
     */
    public initialize(): void {
        BaseEvent.onResultRecall.on(this.onResultRecallMessage, this);
    }

    /**
     * 
     * @param message 
     */
    private onResultRecallMessage(message: s5g.game.proto.ResultRecall): void {

        //有debug功能才使用
        if (CheatUI.activate) {
            let msgStr = JSON.stringify(message);
            console.log(msgStr);
        }
        this.parseBSResult(message.result, message.cur_module_total_times - message.cur_module_play_times);
    }


    /**
     * 要求Spin結果成功開始排腳本
     * @param slotResult 
     * @param fsRemainTimes 
     */
    public parseBSResult(slotResult: s5g.game.proto.ISlotResult, fsRemainTimes: number = -1): void {

        let gameData = BaseDataManager.getInstance().getData<GameData>();
        BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SPINSTOPING);

        //過程計算加總用(右下角win用)
        let sumWin: number = BaseDataManager.getInstance().isBS() ? 0 : BaseDataManager.getInstance().winTotal;
        if (BaseDataManager.getInstance().isBS() === true) {
            BaseDataManager.getInstance().winTotal = 0;
        }

        //中獎位置
        let winPos: number[];
        let winSymbolID: number[];
        //此盤面中獎金額
        let planeWin: number;
        //此盤面尚未乘上倍率金額
        let planeOriginalWin: number;

        //把第一盤和N盤結果合併, 取用資料時再決定轉型成SlotResult或SubResult
        let allResult = slotResult.sub_result ? [slotResult, ...slotResult.sub_result] : [slotResult];

        //獲得額外局數
        let getExtraTimes = (slotResult.win_bonus_group && slotResult.win_bonus_group.length > 0) ? slotResult.win_bonus_group[0].times : 0;

        //盤面資料
        let preSymbolPattern: number[];
        let newSymbolPattern: number[];
        let numScatterInPattern: number = 0;
        let goldenPattern: number[];

        //盤面起始倍數
        let curMultiplierIdx: number = BaseDataManager.getInstance().getData<GameData>().getInitMultiplierIdx();

        allResult.forEach((temp, msgResultIndex) => {
            let isSubResult = (temp as s5g.game.proto.SlotResult.SubResult).sub_game_id !== undefined;
            let subResult = temp as s5g.game.proto.SlotResult.SubResult;

            //第幾個subResult(allResult[0]是SlotResult)
            let subIdx = msgResultIndex - 1;
            preSymbolPattern = newSymbolPattern || [];
            newSymbolPattern = isSubResult ? slotResult.total_star_times[subIdx].times : slotResult.full_symbol_pattern;
            numScatterInPattern = newSymbolPattern.filter((symbolID) => symbolID === SymbolID.Scatter).length;
            goldenPattern = slotResult.deadshot_wilds.golden_pattern[msgResultIndex].is_golden;


            //為了乘倍,移到這提早運算
            winPos = [];
            winSymbolID = [];
            let winLineGroupList = isSubResult ? subResult.win_line_group : slotResult.win_line_group;
            let normalWinLineList = winLineGroupList.filter((winLineGroup) => winLineGroup.symbol_id !== SymbolID.Scatter);
            let scatterWinLine = winLineGroupList.filter((winLineGroup) => winLineGroup.symbol_id === SymbolID.Scatter);
            if (normalWinLineList && normalWinLineList.length > 0) {
                planeWin = 0;
                planeOriginalWin = 0;
                normalWinLineList.forEach((winLineGroup) => {
                    winPos = winPos.concat(winLineGroup.pos);
                    winSymbolID.push(winLineGroup.symbol_id);
                    planeOriginalWin += winLineGroup.credit;
                    planeWin += winLineGroup.credit_long;
                })
            }
            winPos = XUtils.uniq(winPos);//只取前六個位置
            let errorWinPos = winPos.filter((pos, idx, arr) => pos % 10 >= 6);//只取前六個位置
            if (errorWinPos.length > 0) {
                throw new Error("winPos異常!!");
            }


            //首次停輪
            if (isSubResult === false) {

                if (BaseDataManager.getInstance().isBS() === false) {
                    let fsTask = new FSUpdateRemainTimesTask();
                    fsTask.fsRemainTimes = --gameData.fsRemainTimes;
                    TaskManager.getInstance().addTask(fsTask);
                }

                //因為要處理輪帶金框, 只有第一轉設定, 否則slotParser內的資料會被子盤面覆蓋
                gameData.slotParser.setStripTable(BaseDataManager.getInstance().getStripTable()._strips, slotResult.rng, newSymbolPattern, goldenPattern);
                gameData.slotParser.buyFS = BaseDataManager.getInstance().buyFs;
                SlotMachine2.changeStrip.emit(SlotMachineID.BS, gameData.slotParser);

                let stop = new StopTask();
                stop.rngList = slotResult.rng;
                //第一盤就中FS, 如果還有得分的話要在掉落後的盤面處理
                stop.isScatterWin = numScatterInPattern >= GameConst.BONUS_WIN_COUNT && msgResultIndex == allResult.length - 1;
                stop.isLastPlane = msgResultIndex == allResult.length - 1;
                // stop.symbolPattern = temp.full_symbol_pattern;
                TaskManager.getInstance().addTask(stop);
            }
            else {
                //掉落
                let drop: DropTask = new DropTask();
                drop.preSymbolPattern = preSymbolPattern;
                drop.newSymbolPattern = newSymbolPattern;//下一盤的結果
                drop.goldenPattern = goldenPattern;
                drop.isScatterWin = numScatterInPattern >= GameConst.BONUS_WIN_COUNT && msgResultIndex == allResult.length - 1;
                drop.isLastPlane = msgResultIndex == allResult.length - 1;
                TaskManager.getInstance().addTask(drop);
                // TaskManager.getInstance().addTask(new DelayTask(0.5));
            }

            TaskManager.getInstance().addTask(new DelayTask(numScatterInPattern > 0 ? 0.5 : 0.2));

            // 有贏分資料才演示後續
            if (winPos && winPos.length > 0) {

                //中獎線
                let winTask = new ShowWinTask();
                winTask.curMultiplier = GameConst.multiplierList[curMultiplierIdx];
                winTask.originalWin = planeOriginalWin;
                winTask.winPos = winPos;
                winTask.winSymbolID = winSymbolID;
                winTask.sumWin = sumWin + planeOriginalWin;//還不能真的加入
                winTask.playerCent = BaseDataManager.getInstance().playerCent + planeOriginalWin * BaseDataManager.getInstance().bet.getCurRate();//還不能真的加入
                TaskManager.getInstance().addTask(winTask);

                //檢查消去位置是否有金框, 遇到金框要轉換WILD
                let changeMap: SymbolData2[][] = null;
                winPos.forEach((pos) => {
                    let winGrid = XUtils.posToGrid(pos);
                    let isGolden = !!goldenPattern[winGrid.row * gameData.REEL_COL + winGrid.col];
                    if (isGolden) {
                        if (!changeMap) {
                            changeMap = [];
                        }
                        if (!changeMap[winGrid.col]) {
                            changeMap[winGrid.col] = [];
                        }
                        let data = new SymbolData2();
                        data.symbolID = SymbolID.Wild;
                        data.isChange = true;
                        changeMap[winGrid.col][winGrid.row] = data;
                    }
                }, this);

                sumWin += planeWin;
                BaseDataManager.getInstance().winTotal += planeWin;
                BaseDataManager.getInstance().playerCent += planeWin * BaseDataManager.getInstance().bet.getCurRate();

                //爆炸
                let preMultiplierIdx = curMultiplierIdx;
                curMultiplierIdx = Math.min(curMultiplierIdx + 1, GameConst.multiplierList.length - 1);
                let explode = new ExplodeTask();
                explode.winPos = winPos;
                explode.hitMultiplier = GameConst.multiplierList[preMultiplierIdx];
                explode.newMultiplier = GameConst.multiplierList[curMultiplierIdx];
                explode.changeMap = changeMap;
                explode.win = planeWin;
                explode.sumWin = sumWin;
                explode.playerCent = BaseDataManager.getInstance().playerCent;
                TaskManager.getInstance().addTask(explode);
            }

        }, this);

        //一轉結束
        let end = new EndGameTask();
        let spinWin = XUtils.convertToLong(slotResult.credit);
        end.win = spinWin;
        end.playerCent = BaseDataManager.getInstance().playerCent;
        TaskManager.getInstance().addTask(end);

        gameData.fsWin += spinWin;

        //BS:檢查是否要進FS
        if (BaseDataManager.getInstance().curModuleID === ModuleID.BS) {
            //進入FS
            if (BaseDataManager.getInstance().nextModuleID !== ModuleID.BS) {

                gameData.bsLastMap.length = 0;
                for (let col: number = 0; col < gameData.REEL_COL; ++col) {
                    gameData.bsLastMap[col] = [];
                    for (let row: number = 0; row < gameData.REEL_ROW; ++row) {
                        let data = new SymbolData2();
                        let symbolID = newSymbolPattern[row * gameData.REEL_COL + col];
                        data.symbolID = symbolID;
                        data.isBadge = goldenPattern[row * gameData.REEL_COL + col] > 0;
                        gameData.bsLastMap[col].push(data);
                    }
                }

                let scatterWin = new ScatterWinTask();
                scatterWin.symbolPattern = newSymbolPattern;
                TaskManager.getInstance().addTask(scatterWin);

                gameData.resetFS();

                gameData.fsRemainTimes = (slotResult.win_bonus_group && slotResult.win_bonus_group.length > 0) ? slotResult.win_bonus_group[0].times : 0;

                let trans = new TransTask();
                trans.to = BaseDataManager.getInstance().nextModuleID;
                trans.times = gameData.fsRemainTimes;
                TaskManager.getInstance().addTask(trans);

                //FS開場
                let fsOpen = new FSOpeningTask();
                TaskManager.getInstance().addTask(fsOpen);

                BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_WAIT_START);
                BaseDataManager.getInstance().buyFs = false;
                let task = new SpinTask();
                TaskManager.getInstance().addTask(task);
            }
            //相同模式
            else {
                TaskManager.getInstance().addTask(new AutoSpinDelayTask());
                TaskManager.getInstance().addTask(new IdleTask());
            }
        }
        //FS
        else {

            //FS獲得局數
            if (getExtraTimes > 0) {
                let task = new RetriggerTask();
                task.from = gameData.fsRemainTimes;
                task.to = gameData.fsRemainTimes + getExtraTimes;
                gameData.fsRemainTimes += getExtraTimes;
                TaskManager.getInstance().addTask(task);
            }

            //返回BS
            if (BaseDataManager.getInstance().nextModuleID === ModuleID.BS) {
                let settle = new FSSettleTask();
                settle.win = gameData.fsWin;
                TaskManager.getInstance().addTask(settle);

                let backBSSettle = new BackBSSettleTask();
                backBSSettle.sumWin = BaseDataManager.getInstance().winTotal;
                backBSSettle.playerCent = BaseDataManager.getInstance().playerCent;
                TaskManager.getInstance().addTask(backBSSettle);

                TaskManager.getInstance().addTask(new IdleTask());
            }
            //繼續FS下一轉
            else {
                let task = new SpinTask();
                TaskManager.getInstance().addTask(task);
            }
        }
    }
}