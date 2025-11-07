import { _decorator, Button, Component, Label, Node, Vec3 } from 'cc';

import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { XEvent } from 'db://assets/common/script/event/XEvent';
import { Utils } from 'db://assets/common/script/utils/Utils';
import { SlotData } from '../../script/data/SlotData';


const { ccclass, property } = _decorator;

@ccclass('GameInformationUI')
export class GameInformationUI extends Component {
    public static show: XEvent = new XEvent();

    private backMask: Node = null;
    private closeBtn: Node = null;
    private content: Node = null;

    @property([Node])
    private symbolOdds: Node[] = [];
    @property(Label)
    private verLabel: Label = null;

    onLoad() {
        BaseEvent.showGameInformation.on(this.show, this);
        this.setupNode();
        this.node.active = false;
        this.verLabel.string = 'Ver:0.9.1';
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
        this.updateSymbolOdds();//更新符號賠率
        DataManager.getInstance().lockKeyboard = true;//鎖定鍵盤功能
        Utils.fadeIn(this.node, 0.15, 0, 255);
        Utils.tweenScaleTo(this.node, 0.15, 0.8, 1);
        this.content.setPosition(new Vec3(0, 0, 0));
        this.node.active = true;
        this.backMask.once(Button.EventType.CLICK, this.hide, this);
        this.closeBtn.once(Button.EventType.CLICK, this.hide, this);
    }

    /**
     * 更新符號賠率
     */
    private updateSymbolOdds() {
        for (let i = 0; i < this.symbolOdds.length; i++) {
            const symbolID = parseInt(this.symbolOdds[i].name.split('_')[1]);
            let payData = SlotData.getPayBySymbolID(symbolID);
            let string = '';
            payData.forEach((data: { count: number, cent: string }) => {
                string += data.count + ' '+ data.cent + '\n';
            });
            this.symbolOdds[i].getChildByPath('Score').getComponent(Label).string = string;
        }
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