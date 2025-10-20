import { _decorator, Component, tween, Vec3 } from 'cc';

import { XEvent } from '@common/script/event/XEvent';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;
@ccclass('FreeGameUI')
export class FreeGameUI extends Component {
    public static show: XEvent = new XEvent();
    public static hide: XEvent = new XEvent();

    onLoad() {
        FreeGameUI.show.on(this.show, this);
        FreeGameUI.hide.on(this.hide, this);
        this.node.active = false;
    }

    private show(): void {
        this.node.active = true;
        this.node.scale = new Vec3(0.6, 0.6, 1);
        tween(this.node)
            .to(0.2, { scale: new Vec3(1.02, 1.02, 1) }, { easing: 'sineOut' })
            .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'sineIn' })
            .start();
        Utils.fadeIn(this.node, 0.2);
    }

    private hide(): void {
        Utils.fadeOut(this.node, 0.2, () => {
            this.node.active = false;
        });
    }

    onDestroy() {
        FreeGameUI.show.off(this);
        FreeGameUI.hide.off(this);
    }
}