import { _decorator, Component, sp, tween, Tween, UIOpacity } from 'cc';

import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseAnimationName } from '@base/script/types/BaseType';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

const { ccclass } = _decorator;

/**
 * 公版五連線UI
 */
@ccclass('FiveOfKindUI')
export class FiveOfKindUI extends Component {

    /**顯示 */
    public static show: XEvent1<() => void> = new XEvent1();
    public static hide: XEvent = new XEvent();

    private spine: sp.Skeleton;

    onLoad() {
        this.spine = this.node.getChildByName('5kind').getComponent(sp.Skeleton);

        FiveOfKindUI.show.on((onComplete) => {

            AudioManager.getInstance().play(AudioKey.FiveLine);
            this.node.active = true;
            this.node.getComponent(UIOpacity).opacity = 255;
            XUtils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'begin', false);

            tween(this.node)
                .delay(1.4)
                .call(() => {
                    XUtils.playAnimation(this.node, BaseAnimationName.fadeOutOpacity, 0.1);
                })
                .delay(0.1)
                .call(() => {
                    this.node.active = false;
                    onComplete();
                })
                .start();
        }, this);

        FiveOfKindUI.hide.on(() => {
            Tween.stopAllByTarget(this.node);
            AudioManager.getInstance().stop(AudioKey.FiveLine);
            this.node.active = false;
        }, this);

        this.node.active = false;
    }

    update(_deltaTime: number) {

    }
}

