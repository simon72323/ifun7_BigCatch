import { _decorator, Component } from 'cc';

import { XEvent } from '@common/script/event/XEvent';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;
@ccclass('ReelBlackUI')
export class ReelBlackUI extends Component {
    public static show: XEvent = new XEvent();
    public static hide: XEvent = new XEvent();

    onLoad() {
        ReelBlackUI.show.on(this.show, this);
        ReelBlackUI.hide.on(this.hide, this);
        this.node.active = false;
    }

    private show(): void {
        this.node.active = true;
        Utils.fadeIn(this.node, 0.2);
    }

    private hide(): void {
        Utils.fadeOut(this.node, 0.2, () => {
            this.node.active = false;
        });
    }

    onDestroy() {
        ReelBlackUI.show.off(this);
        ReelBlackUI.hide.off(this);
    }
}