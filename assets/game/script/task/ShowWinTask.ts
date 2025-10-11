// import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { BannerUI } from '@game/components/BannerUI/BannerUI';


import { UIBlack } from '@game/components/UIBlack';
import { BlackKey, GameAudioKey, GameConst, SlotMachineID, SymbolID } from '@game/script/data/GameConst';


import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
// import { SpinButtonState } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';



// import { GameData } from '@game/script/data/GameData';

/**
 * 顯示贏分
 */
export class ShowWinTask extends GameTask {

    protected name: string = 'ShowWinTask';


    /**中獎位置 */
    public winPos: number[];
    /**中獎圖示 */
    public winSymbolID: number[];

    /**獲得金額(尚未乘上倍率xRate) */
    public originalWin: number;

    /**目前累計獲得金額(尚未xRate) */
    public sumWin: number;

    /** */
    public playerCent: number;

    /**原倍數 */
    public curMultiplier: number;

    execute(): void {

        SlotMachine.showWin.emit(this.winPos);

        // UIController
        // SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);


        //壓黑
        UIBlack.show.emit(BlackKey.UIBlack);

        //橫幅贏分
        let rateOriginWin = this.originalWin * DataManager.getInstance().bet.getLineTotal();
        if (this.curMultiplier > 1) {
            BannerUI.showOriginWin.emit(rateOriginWin);
        }
        else {
            BannerUI.showWin.emit(rateOriginWin, this.curMultiplier);

            //同參考:一倍時才顯示WIN及刷新贏分
            let rateSumWin = this.sumWin * DataManager.getInstance().bet.getLineTotal();
            SettingsController.refreshWin.emit(rateSumWin);
            SettingsController.refreshCredit.emit(this.playerCent);
        }

        Utils.scheduleOnce(() => {
            this.finish();
        }, GameConst.SLOT_TIME.normal.showWinDuration, this);
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}