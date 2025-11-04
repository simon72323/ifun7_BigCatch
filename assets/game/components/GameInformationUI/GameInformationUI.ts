import { _decorator, Button, Component, Node, Vec3 } from 'cc';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent } from '@common/script/event/XEvent';
import { Utils } from '@common/script/utils/Utils';


const { ccclass, property } = _decorator;

@ccclass('GameInformationUI')
export class GameInformationUI extends Component {
    public static show: XEvent = new XEvent();

    private backMask: Node = null;
    private closeBtn: Node = null;
    private content: Node = null;

    onLoad() {
        BaseEvent.showGameInformation.on(this.show, this);
        this.setupNode();
        this.node.active = false;
    }

    /**
     * 設定節點
     */
    private setupNode() {
        this.backMask = this.node.getChildByName('BackMask');
        this.closeBtn = this.node.getChildByPath('ScrollView/CloseBtn');
        this.content = this.node.getChildByPath('ScrollView/view/content');
    }

    /**
     * 顯示
     */
    private show() {
        DataManager.getInstance().lockKeyboard = true;//鎖定鍵盤功能
        Utils.fadeIn(this.node, 0.15, 0, 255);
        Utils.tweenScaleTo(this.node, 0.15, 0.8, 1);
        this.content.setPosition(new Vec3(0, 0, 0));
        this.node.active = true;
        this.backMask.once(Button.EventType.CLICK, this.hide, this);
        this.closeBtn.once(Button.EventType.CLICK, this.hide, this);
    }

    /**
     * 隱藏
     */
    private hide() {
        DataManager.getInstance().lockKeyboard = false;//解除鎖定鍵盤功能
        Utils.tweenScaleTo(this.node, 0.1, 1, 0.9);
        Utils.fadeOut(this.node, 0.1, 255, 0, () => {
            this.node.active = false;
        });
        this.backMask.off(Button.EventType.CLICK, this.hide, this);
        this.closeBtn.off(Button.EventType.CLICK, this.hide, this);
    }

    onDestroy() {
        BaseEvent.showGameInformation.off(this);
    }
}