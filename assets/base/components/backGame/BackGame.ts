import { _decorator, Button, Component } from 'cc';

import { XEvent } from '@common/script/event/XEvent';

const { ccclass } = _decorator;
/**
 * 返回遊戲提示窗
 */
@ccclass('BackGame')
export class BackGame extends Component {

    public static show: XEvent = new XEvent();
    public static hide: XEvent = new XEvent();

    onLoad() {
        this.node.getChildByPath('Button').on(Button.EventType.CLICK, () => {
            this.node.active = false;
        }, this);

        BackGame.show.on(() => {
            this.node.active = true;
        }, this);
        BackGame.hide.on(() => {
            this.node.active = false;
        }, this);

        this.node.active = false;
    }
}

