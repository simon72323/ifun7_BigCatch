import { _decorator, Component, UIOpacity } from 'cc';

import { XEvent1 } from '@common/script/event/XEvent';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;
@ccclass('UIBlack')
export class UIBlack extends Component {

    public static fadeIn: XEvent1<string> = new XEvent1();
    public static fadeOut: XEvent1<string> = new XEvent1();

    public static show: XEvent1<string> = new XEvent1();
    public static hide: XEvent1<string> = new XEvent1();


    onLoad() {
        this.node.getComponent(UIOpacity).opacity = 0;
        this.node.active = false;
        UIBlack.fadeIn.on((name) => {
            if (name != this.node.name) {
                return;
            }
            this.node.active = true;
            Utils.fadeIn(this.node, 0.3);
        }, this);

        UIBlack.fadeOut.on((name) => {
            if (name != this.node.name) {
                return;
            }

            Utils.fadeOut(this.node, 0.3, () => {
                this.node.active = false;
            });
        }, this);

        UIBlack.show.on((name) => {
            if (name != this.node.name) {
                return;
            }
            this.node.getComponent(UIOpacity).opacity = 255;
            this.node.active = true;

        }, this);

        UIBlack.hide.on((name) => {
            if (name != this.node.name) {
                return;
            }
            this.node.getComponent(UIOpacity).opacity = 0;
            this.node.active = false;


        }, this);
    }

    onDestroy() {
        // 清理所有 XEvent 監聽器
        UIBlack.fadeIn.off(this);
        UIBlack.fadeOut.off(this);
        UIBlack.show.off(this);
        UIBlack.hide.off(this);
    }
}