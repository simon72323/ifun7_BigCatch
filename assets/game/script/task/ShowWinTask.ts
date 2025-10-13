
// import { BannerUI } from '@game/components/BannerUI/BannerUI';

import { UIBlack } from '@game/components/UIBlack';
import { BlackKey, GameAudioKey, GameConst, SlotMachineID, SymbolID } from '@game/script/data/GameConst';
import { IWinLineData } from '@game/script/data/GameType';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { delay, Utils } from '@common/script/utils/Utils';

/**
 * 顯示贏分
 */
export class ShowWinTask extends GameTask {
    protected name: string = 'ShowWinTask';
    /**中線資料 */
    public winLineData: IWinLineData[];
    /**是否中sub game(否的話中線會輪播) */
    public hasSubGame: boolean;
    /**賠付金額 */
    public payCreditTotal: number;
    /**玩家剩餘金額 */
    public userCredit: number;

    /**是否輪播中線 */
    private isLoopWin: boolean = false;

    async execute(): Promise<void> {
        this.isLoopWin = true;
        UIBlack.show.emit(BlackKey.UIBlack); //壓黑

        const allWinPos = Utils.uniq(this.winLineData.flatMap((data) => data.winPos)); //全部中獎位置(不重複)
        SlotMachine.showSymbolWin.emit(allWinPos); //顯示全部中獎位置

        // const allWinlineID = this.winLineData.flatMap((data) => data.lineID); //全部中線ID
        // BannerUI.showWin.emit(this.payCreditTotal, 1); //顯示總贏分

        //更新公版分數
        SettingsController.refreshWin.emit(this.payCreditTotal);
        SettingsController.refreshCredit.emit(this.userCredit);

        await delay(GameConst.SLOT_TIME.showWinDuration);
        this.finish();

        if (this.hasSubGame) return; // 如果沒有sub game則跳過輪播

        BaseEvent.clickSpin.once(() => {
            this.isLoopWin = false;
        }, this);

        // 輪播中線
        while (this.isLoopWin) {
            for (let i = 0; i < this.winLineData.length; i++) {
                if (!this.isLoopWin) break; // 檢查是否被停止
                SlotMachine.showSymbolWin.emit(this.winLineData[i].winPos); // 顯示當前中獎symbol
                await delay(GameConst.SLOT_TIME.showWinDuration); // 等待輪播間隔
            }
            // 輪播完一輪後，再次顯示全部位置
            if (this.isLoopWin) {
                SlotMachine.showSymbolWin.emit(allWinPos); // 顯示全部中獎symbol
                await delay(GameConst.SLOT_TIME.showWinDuration); // 等待輪播間隔
            }
        }
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}