import { AudioManager } from "db://assets/base/script/audio/AudioManager";
import { BaseDataManager } from "db://assets/base/script/main/BaseDataManager";
import { BaseEvent } from "db://assets/base/script/main/BaseEvent";
import { XUtils } from "db://assets/base/script/utils/XUtils";
import { GameTask } from "../../../base/script/tasks/GameTask";
import { BannerUI } from "../../components/BannerUI/BannerUI";
import { MultiplierUI } from "../../components/MultiplierUI/MultiplierUI";
import { RevolverUI } from "../../components/RevolverUI/RevolverUI";
import { BaseSymbolData2 } from "../../components/slotMachine2/base/slotMachine2/BaseSymbolData2";
import { SlotMachine2 } from "../../components/slotMachine2/base/slotMachine2/SlotMachine2";
import { Stage } from "../../components/stage/Stage";
import { UIBlack } from "../../components/UIBlack";
import { BlackKey, GameAudioKey, SlotMachineID } from "../constant/GameConst";
import { GameData } from "../main/GameData";

/**
 * 爆炸
 */
export class ExplodeTask extends GameTask {

    protected name: string = "ExplodeTask";

    /**消去位置 */
    public winPos: number[];

    /**轉換WILD資料 */
    public changeMap: BaseSymbolData2[][];

    /**獲得金額(尚未xRate) */
    public win: number;

    /**原倍數 */
    public hitMultiplier: number;

    /**新倍數 */
    public newMultiplier: number;

    /**目前累計獲得金額(尚未xRate) */
    public sumWin: number;

    /** */
    public playerCent: number;

    execute(): void {

        SlotMachine2.explode.emit(SlotMachineID.BS, this.winPos);

        AudioManager.getInstance().play(GameAudioKey.line);

        //0.6秒後畫面震動
        XUtils.scheduleOnce(() => {
            //有需要轉換WILD
            if (this.changeMap) {
                SlotMachine2.change.emit(SlotMachineID.BS, this.changeMap);
            }
            Stage.shake.emit();

            RevolverUI.setMultiplier.emit(this.newMultiplier);
            UIBlack.fadeOut.emit(BlackKey.UIBlack);

            AudioManager.getInstance().play(GameAudioKey.lineShot);

            //震動後0.2秒演示乘倍
            XUtils.scheduleOnce(() => {
                //1倍不演
                if (this.hitMultiplier > 1) {
                    MultiplierUI.show.emit(this.hitMultiplier, () => {
                        this.onMultiplierComplete(0.2);
                    });
                }
                else {
                    this.onMultiplierComplete(0);
                }
            }, 0.2, this);

        }, BaseDataManager.getInstance().getData<GameData>().getTurboSetting().explodeTime, this);

        // //1.2秒後演示乘倍
        // XUtils.scheduleOnce(() => {
        //     //1倍不演
        //     if (this.hitMultiplier > 1) {
        //         MultiplierUI.show.emit(this.hitMultiplier, () => {
        //             this.onMultiplierComplete(0.2);
        //         });
        //     }
        //     else {
        //         this.onMultiplierComplete(0);
        //     }
        // }, 0.6, this);
    }

    private onMultiplierComplete(delay: number): void {

        let rateSumWin = this.sumWin * BaseDataManager.getInstance().bet.getCurRate();
        BaseEvent.refreshWin.emit(rateSumWin);
        BaseEvent.refreshCredit.emit(this.playerCent);

        if (this.hitMultiplier > 1) {
            let rateMultiplierWin = this.win * BaseDataManager.getInstance().bet.getCurRate();
            BannerUI.showWin.emit(rateMultiplierWin, this.hitMultiplier);
        }

        XUtils.scheduleOnce(() => {
            this.finish();
        }, delay, this);
    }

    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}