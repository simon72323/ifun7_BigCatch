import { Tween, tween } from 'cc';

import { BigWinUI } from '@game/components/BigWinUI/BigWinUI';
import { ReelBlackUI } from '@game/components/ReelBlackUI/ReelBlackUI';
import { WinScoreUI } from '@game/components/WinScoreUI/WinScoreUI';


import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotReelMachine } from '@common/components/slotMachine/SlotReelMachine';
import { IWinLineData } from '@common/components/slotMachine/SlotType';

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
    // /**是否中sub game(否的話中線會輪播) */
    // public hasSubGame: boolean;
    /**賠付金額 */
    public payCreditTotal: number;
    /**玩家剩餘金額 */
    // public userCredit: number;

    /**是否子遊戲資料(免費遊戲) */
    public isSubGame: boolean = false;

    /**是否輪播中線 */
    // private isLoopWin: boolean = false;

    private loopData: {} = {};

    async execute(): Promise<void> {
        // this.isLoopWin = true;
        ReelBlackUI.show.emit(); //壓黑

        const allWinPos = Utils.uniq(this.winLineData.flatMap((data) => data.winPos)); //全部中獎位置(不重複)
        await this.showWinAll(allWinPos);//表演全部中線

        const dataManager = DataManager.getInstance();
        SettingsController.refreshWin.emit(this.payCreditTotal);//更新公版分數

        //非子遊戲資料才更新玩家餘額
        if (!this.isSubGame) {
            const finalCredit = dataManager.userCredit + this.payCreditTotal;
            SettingsController.refreshCredit.emit(finalCredit);
            dataManager.userCredit = finalCredit;
        }


        //判斷bigWin額外演示
        if (dataManager.getBigWinTypeByValue(this.payCreditTotal) !== BigWinType.non) {
            console.log('waitForBigWinComplete');
            await this.waitForBigWinComplete();
        }
        await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime);

        //監聽停止中獎線輪播(StopTask會觸發此事件)
        BaseEvent.stopLineLoop.once(() => {
            Tween.stopAllByTarget(this.loopData);
        }, this);

        this.finish();
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
     * 顯示總勝利與得分
     * @param allWinPos 
     */
    private async showWinAll(allWinPos: number[]): Promise<void> {
        return new Promise<void>(async (resolve) => {
            console.log('中獎位置', allWinPos);
            SlotReelMachine.showSymbolWin.emit(allWinPos); //傳送中線資料
            WinScoreUI.showWin.emit(this.payCreditTotal);
            await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime);
            resolve();

            // 輪播中線
            let winPosResult: number[][] = [allWinPos, ...this.winLineData.map((data) => data.winPos)];
            let chainTween = tween();
            for (let i = 0; i < winPosResult.length; i++) {
                chainTween = chainTween
                    .call(() => {
                        SlotReelMachine.showSymbolWin.emit(winPosResult[i]);
                    })
                    .delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime);
            }
            tween(this.loopData)
                .repeatForever(chainTween)
                .start();
        });
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}