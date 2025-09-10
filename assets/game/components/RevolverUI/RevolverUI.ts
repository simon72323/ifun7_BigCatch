import { _decorator, Component, sp } from 'cc';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { ModuleID } from '@/base/script/types/BaseType';
import { XEvent1, XEvent2 } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { GameAudioKey } from '../../script/constant/GameConst';
const { ccclass, property } = _decorator;

/**
 * BS左上倍數UI
 */
@ccclass('RevolverUI')
export class RevolverUI extends Component {

    /**設定倍數 */
    public static setMultiplier: XEvent1<number> = new XEvent1();

    /**重置 */
    public static reset: XEvent2<ModuleID, number> = new XEvent2();

    /**FS開場 */
    public static fsOpening: XEvent2<number, () => void> = new XEvent2();

    private spine: sp.Skeleton;

    /**目前倍數 */
    private curMultiplier: number = 1;

    onLoad() {
        this.spine = this.node.getChildByName("revolver").getComponent(sp.Skeleton);

        this.spine.setAnimation(0, RevolverAni.loop_xN.replace("#", this.curMultiplier.toString()), true);

        //倍數演示
        RevolverUI.setMultiplier.on((multiplier) => {

            this.scheduleOnce(() => {
                // AudioManager.getInstance().play(GameAudioKey.wheel);
            }, 0.5);
            this.scheduleOnce(() => {
                AudioManager.getInstance().play(GameAudioKey.reloading);
            }, 0.9);


            XUtils.ClearSpine(this.spine);
            this.spine.addAnimation(0, RevolverAni.hit_xN.replace("#", this.curMultiplier.toString()), false);
            this.spine.addAnimation(0, RevolverAni.to_xN.replace("#", multiplier.toString()), false);
            this.spine.addAnimation(0, RevolverAni.loop_xN.replace("#", multiplier.toString()), true);
            this.curMultiplier = multiplier;
        }, this);

        //重置演示
        RevolverUI.reset.on((moduleID: ModuleID, multiplier) => {

            if (this.curMultiplier === multiplier) {
                return;
            }
            // AudioManager.getInstance().play(GameAudioKey.wheel);


            XUtils.ClearSpine(this.spine);
            let backAni = moduleID === ModuleID.BS ? RevolverAni.ng_back_xN : RevolverAni.fg_back_xN;
            this.spine.addAnimation(0, backAni.replace("#", this.curMultiplier.toString()), false);
            this.spine.addAnimation(0, RevolverAni.loop_xN.replace("#", multiplier.toString()), true);
            this.curMultiplier = multiplier;
        }, this);

        //FS開場
        RevolverUI.fsOpening.on((multiplier, onComplete) => {
            this.curMultiplier = multiplier;
            XUtils.ClearSpine(this.spine);
            this.spine.setCompleteListener(() => {
                this.spine.setCompleteListener(null);
                //清除會瞬間閃一下異常畫面, 暫時不清除
                // XUtils.ClearSpine(this.spine);
                this.spine.addAnimation(0, RevolverAni.loop_xN.replace("#", this.curMultiplier.toString()), true);

                onComplete();
            })
            this.spine.setAnimation(0, RevolverAni.into_fg, false);

            //3發子彈
            for (let i: number = 0; i < 3; ++i) {
                this.scheduleOnce(() => {
                    AudioManager.getInstance().playOneShot(GameAudioKey.lineShot);
                }, i * 0.5);
            }

        }, this);
    }

    update(deltaTime: number) {

    }
}

enum RevolverAni {
    fg_back_xN = "fg_back_x#",
    hit_xN = "hit_x#",
    ng_back_xN = "ng_back_x#",
    to_xN = "to_x#",
    loop_xN = "x#",
    fg_back_x_none = "fg_back_x_none",
    ng_back_x_none = "ng_back_x_none",
    into_fg = "into_fg",
}
