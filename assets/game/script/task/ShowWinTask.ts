import { SettingsPage1 } from "@/base/components/settingsPage/SettingsPage1";
import { AudioManager } from "@/base/script/audio/AudioManager";
import { BaseDataManager } from "@/base/script/main/BaseDataManager";
import { XUtils } from "@/base/script/utils/XUtils";
import { BaseEvent } from "../../../base/script/main/BaseEvent";
import { GameTask } from "../../../base/script/tasks/GameTask";
import { SpinButtonState } from "../../../base/script/types/BaseType";
import { BannerUI } from "../../components/BannerUI/BannerUI";
import { SlotMachine2 } from "../../components/slotMachine2/base/slotMachine2/SlotMachine2";
import { UIBlack } from "../../components/UIBlack";
import { BlackKey, GameAudioKey, SlotMachineID, SymbolID } from "../constant/GameConst";
import { GameData } from "../main/GameData";

/**
 * 顯示贏分
 */
export class ShowWinTask extends GameTask {

    protected name: string = "ShowWinTask";


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

        //手槍
        if (this.winSymbolID.indexOf(SymbolID.H1) !== -1) {
            XUtils.scheduleOnce(() => {
                AudioManager.getInstance().play(GameAudioKey.symbolGun);
            }, 0.3, this);
        }
        //炸彈
        else if (this.winSymbolID.indexOf(SymbolID.H2) !== -1) {
            AudioManager.getInstance().play(GameAudioKey.fuse);
        }
        //帽子
        else if (this.winSymbolID.indexOf(SymbolID.H4) !== -1) {
            AudioManager.getInstance().play(GameAudioKey.symbolHat);
        }
        //字母
        else if (this.winSymbolID.indexOf(SymbolID.L1) !== -1 ||
            this.winSymbolID.indexOf(SymbolID.L2) !== -1 ||
            this.winSymbolID.indexOf(SymbolID.L3) !== -1 ||
            this.winSymbolID.indexOf(SymbolID.L4) !== -1) {
            AudioManager.getInstance().play(GameAudioKey.Letter);
        }

        SlotMachine2.showWin.emit(SlotMachineID.BS, this.winPos);

        // UIController
        SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);


        //壓黑
        UIBlack.show.emit(BlackKey.UIBlack);

        //橫幅贏分
        let rateOriginWin = this.originalWin * BaseDataManager.getInstance().bet.getCurRate();
        if (this.curMultiplier > 1) {
            BannerUI.showOriginWin.emit(rateOriginWin);
        }
        else {
            BannerUI.showWin.emit(rateOriginWin, this.curMultiplier);

            //同參考:一倍時才顯示WIN及刷新贏分
            let rateSumWin = this.sumWin * BaseDataManager.getInstance().bet.getCurRate();
            BaseEvent.refreshWin.emit(rateSumWin);
            BaseEvent.refreshCredit.emit(this.playerCent);
        }

        XUtils.scheduleOnce(() => {
            this.finish();
        }, BaseDataManager.getInstance().getData<GameData>().getTurboSetting().showWinDuration, this);
    }

    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}