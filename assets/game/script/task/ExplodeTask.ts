import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { XUtils } from '@base/script/utils/XUtils';

import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { BSRoleUI } from '@game/components/characterUI/BSRoleUI';
import { FSRoleUI } from '@game/components/characterUI/FSRoleUI';
import { MultiplierUI } from '@game/components/MultiplierUI/MultiplierUI';
import { RevolverUI } from '@game/components/RevolverUI/RevolverUI';
import { BaseSymbolData2 } from '@game/components/slotMachine2/base/slotMachine2/BaseSymbolData2';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { GameStage } from '@game/components/stage/GameStage';
import { UIBlack } from '@game/components/UIBlack';
import { BlackKey, GameAudioKey, SlotMachineID } from '@game/script/constant/GameConst';
import { GameData } from '@game/script/main/GameData';

/**
 * 爆炸
 */
export class ExplodeTask extends GameTask {

    protected name: string = 'ExplodeTask';

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

    /**執行 */
    public execute(): void {

        SlotMachine2.explode.emit(SlotMachineID.BS, this.winPos);

        AudioManager.getInstance().play(GameAudioKey.line);

        //0.6秒後畫面震動
        XUtils.scheduleOnce(() => {
            //有需要轉換WILD
            if (this.changeMap) {
                SlotMachine2.change.emit(SlotMachineID.BS, this.changeMap);
            }
            GameStage.shake.emit();

            RevolverUI.setMultiplier.emit(this.newMultiplier);
            UIBlack.fadeOut.emit(BlackKey.UIBlack);

            if (BaseDataManager.getInstance().isBS() === true) {
                BSRoleUI.begin.emit(this.newMultiplier);
            }
            else {
                FSRoleUI.shoot.emit(this.hitMultiplier);//FS是用hit倍數演示
            }

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
        // throw new Error('Method not implemented.');
    }
}