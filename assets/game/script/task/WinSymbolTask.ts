import { Node, Tween, tween, Vec3 } from 'cc';

import { BigWinUI } from '@game/components/BigWinUI/BigWinUI';
import { CharacterUI } from '@game/components/CharacterUI/CharacterUI';
import { FreeGameUI } from '@game/components/FreeGameUI/FreeGameUI';
import { ReelBlackUI } from '@game/components/ReelBlackUI/ReelBlackUI';
import { Symbol } from '@game/components/slotMachine/Symbol';
import { WinScoreUI } from '@game/components/WinScoreUI/WinScoreUI';

import { AudioKey } from '@game/script/data/AudioKey';
import { FISH_ODDS } from '@game/script/data/GameConst';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { IWinFishData, IWinLineData } from '@common/components/slotMachine/SlotType';

import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { BigWinType } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';


/**
 * 顯示贏分
 */
export class WinSymbolTask extends GameTask {
    protected name: string = 'WinSymbolTask';
    /**中線資料 */
    public winLineData: IWinLineData[];
    /**漁夫與魚的表演資料 */
    public winFishData: IWinFishData;
    /**賠付金額 */
    public payCreditTotal: number;
    /**免費遊戲總贏分 */
    public curFsTotalWin: number;
    /**是否子遊戲資料(免費遊戲) */
    public isSubGame: boolean = false;

    private moveTime: number = 0.4;//移動時間
    private moveIntervalTime: number = 0.3;//移動間隔時間

    private loopData: {} = {};

    async execute(): Promise<void> {
        //處理魚與漁夫表演
        if (this.winFishData) {
            await this.showWinFish();
        }

        //如果沒有贏分，則直接結束
        if (this.payCreditTotal <= 0) {
            this.complete();
            return;
        }

        CharacterUI.win.emit();//表演角色贏分動態
        AudioManager.getInstance().playSound(AudioKey.win);//播放獲得分數音效

        //處裡中獎線
        if (this.winLineData.length > 0) {
            ReelBlackUI.show.emit(); //壓黑
            const allWinPos = Utils.uniq(this.winLineData.flatMap((data) => data.winPos)); //全部中獎位置(不重複)
            this.showWinLine(allWinPos);//表演全部中線

            //監聽停止中獎線輪播(StopTask會觸發此事件)
            BaseEvent.stopLineLoop.once(() => {
                CharacterUI.idle.emit();//表演角色idle動態
                WinScoreUI.hideWin.emit();//立即隱藏贏得分數
                Tween.stopAllByTarget(this.loopData);
            }, this);

        } else {
            WinScoreUI.showWin.emit(this.payCreditTotal);
        }

        if (this.isSubGame) {
            const finalFsTotalWin = this.curFsTotalWin + this.payCreditTotal;
            SettingsController.refreshWin.emit(this.curFsTotalWin, finalFsTotalWin);//更新公版分數
        } else {
            SettingsController.refreshWin.emit(0, this.payCreditTotal);//更新公版分數
            //非子遊戲資料才更新玩家餘額
            const finalCredit = DataManager.getInstance().userCredit + this.payCreditTotal;
            SettingsController.refreshCredit.emit(finalCredit);
            DataManager.getInstance().userCredit = finalCredit;
        }

        await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime);

        //判斷bigWin額外演示
        if (DataManager.getInstance().getBigWinTypeByValue(this.payCreditTotal) !== BigWinType.non) {
            await this.waitForBigWinComplete();
        }

        // await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime);
        this.complete();
    }

    /**等待BigWin完成 */
    private waitForBigWinComplete(): Promise<void> {
        return new Promise<void>((resolve) => {
            BigWinUI.complete.once(() => {
                resolve();
            }, this);
            BigWinUI.show.emit(this.payCreditTotal);
        });
    }

    /**
     * 漁夫與魚的表演
     */
    private async showWinFish(): Promise<void> {
        const { allWildPos } = this.winFishData;

        //==========表演間隔時間模式
        // const wildWaitTime: number = 0.4;//漁夫表演等待時間
        // let promiseList: Promise<void>[] = [];
        // for (let i = 0; i < allWildPos.length; i++) {
        //     promiseList.push(this.wildScoreMove(i));
        //     await Utils.delay(wildWaitTime);//漁夫表演間隔時間
        // }
        // await Promise.all(promiseList);

        //=======漁夫個別表演模式
        for (let i = 0; i < allWildPos.length; i++) {
            await this.wildScoreMove(i);
        }
    }

    /**
     * wild分數移動與變化
     * @param wildIndex wild索引
     */
    private async wildScoreMove(wildIndex: number): Promise<void> {
        return new Promise(async (resolve) => {
            let promiseList: Promise<void>[] = [];
            let wildScore = 0;//紀錄wild分數變化
            const { allWildPos, allFishPos, fishSymbolIDs, totalWildCount } = this.winFishData;
            const wildSymbolNode = SlotMachine.getSymbolList()[allWildPos[wildIndex]];
            const wildPos: Vec3 = SlotMachine.getSymbolPosList()[allWildPos[wildIndex]];
            const wildSymbol = wildSymbolNode.getComponent('Symbol') as Symbol;
            wildSymbol.symbolWin();
            for (let i = 0; i < allFishPos.length; i++) {
                const betCredit = DataManager.getInstance().bet.getBetTotal();
                const fishScore = FISH_ODDS[fishSymbolIDs[i]] * betCredit;
                const fishPos: Vec3 = SlotMachine.getSymbolPosList()[allFishPos[i]];
                wildScore += fishScore;
                promiseList.push(this.moveScore(fishScore, fishPos, wildPos, wildSymbol, wildScore));
                await Utils.delay(this.moveIntervalTime);
            }
            await Promise.all(promiseList);
            if (wildScore > 0) {
                await wildSymbol.wildScoreFinish(wildScore);
                await Utils.delay(0.4);
            }
            const progressID = totalWildCount - allWildPos.length + wildIndex;
            if (progressID >= 8) {
                resolve();
            } else {
                //表演特效開啟fs進度
                FreeGameUI.addProgress.emit(progressID, wildPos, () => {
                    resolve();
                });
            }
        });
    }

    /**
     * 移動分數
     * @param fishScore 魚分數
     * @param fishPos 魚位置
     * @param wildPos wild位置
     * @param wildSymbol wild節點
     * @param wildScore wild分數
     */
    private async moveScore(fishScore: number, fishPos: Vec3, wildPos: Vec3, wildSymbol: Symbol, wildScore: number): Promise<void> {
        FreeGameUI.showMoveScore.emit(fishScore, fishPos, wildPos, this.moveTime);
        await Utils.delay(this.moveTime);
        wildSymbol.showWildScore(wildScore);
    }

    /**
     * 顯示全部中線(輪播)
     * @param allWinPos 
     */
    private showWinLine(allWinPos: number[]): void {
        Tween.stopAllByTarget(this.loopData);

        let winPosResult: number[][] = [allWinPos, ...this.winLineData.map((data) => data.winPos)];
        let chainTween = tween();
        for (let i = 0; i < winPosResult.length; i++) {
            chainTween = chainTween
                .call(() => {
                    SlotMachine.showSymbolWin.emit(winPosResult[i]);
                    if (i === 0) {
                        WinScoreUI.showWin.emit(this.payCreditTotal);
                    }
                })
                .delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime);
        }
        tween(this.loopData)
            .repeatForever(chainTween)
            .start();
    }

    /**完成 */
    async complete(): Promise<void> {
        //如果沒有中獎線，則等待一下時間
        if (this.winLineData.length === 0) {
            await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].waitNextSpinTime);
        }
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}