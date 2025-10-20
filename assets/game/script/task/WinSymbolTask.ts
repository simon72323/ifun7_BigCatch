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
import { Utils } from '@common/script/utils/Utils';

/**
 * 顯示贏分
 */
export class WinSymbolTask extends GameTask {
    protected name: string = 'WinSymbolTask';
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
        ReelBlackUI.show.emit(); //壓黑

        //更新公版分數
        SettingsController.refreshWin.emit(this.payCreditTotal);
        SettingsController.refreshCredit.emit(this.userCredit);
        const allWinPos = Utils.uniq(this.winLineData.flatMap((data) => data.winPos)); //全部中獎位置(不重複)
        await this.showWinAll(allWinPos);
        this.finish();

        // 如果有sub game則跳過輪播
        // if (this.hasSubGame) {
        //     ReelBlackUI.hide.emit();
        //     return;
        // }

        BaseEvent.clickSpin.once(() => {
            this.isLoopWin = false;//spin時會取消輪播
        }, this);

        // 輪播中線
        while (this.isLoopWin) {
            for (let i = 0; i < this.winLineData.length; i++) {
                if (!this.isLoopWin) break; // 檢查是否被停止
                SlotReelMachine.showSymbolWin.emit(this.winLineData[i].winPos); // 顯示單線中獎
                await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime); // 等待輪播間隔
            }
            // 輪播完一輪後，再次顯示全部位置
            if (this.isLoopWin) {
                await this.showWinAll(allWinPos);
            }
        }
    }

    /**
     * 顯示總勝利與得分
     * @param allWinPos 
     */
    private async showWinAll(allWinPos: number[]): Promise<void> {
        SlotReelMachine.showSymbolWin.emit(allWinPos); //傳送中線資料
        WinScoreUI.showWin.emit(this.payCreditTotal);
        await Utils.delay(BaseConst.SLOT_TIME[DataManager.getInstance().curTurboMode].showWinTime); // 等待輪播間隔
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}