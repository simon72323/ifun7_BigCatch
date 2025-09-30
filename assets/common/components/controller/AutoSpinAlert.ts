import { _decorator, Button, Component, EventTouch, Label, Node, Toggle } from 'cc';

import { Controller } from '@common/components/controller/Controller';
import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { XEvent } from '@common/script/event/XEvent';
import { addBtnClickEvent, addToggleClickEvent, Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;

@ccclass('AutoSpinAlert')
export class AutoSpinAlert extends Component {
    // public static open: XEvent = new XEvent();
    public static close: XEvent = new XEvent();

    private closeBtn: Node = null;//關閉按鈕
    private betPlusBtn: Node = null;//增加下注按鈕
    private betMinusBtn: Node = null;//減少下注按鈕
    private betLabel: Label = null;//下注額度
    private autoToggleList: Node = null;//自動選項列表
    private untilFeatureToggle: Toggle = null;
    private okBtn: Node = null;//確認按鈕

    onLoad() {
        // AutoSpin.open.on(this.onOpen, this);
        AutoSpinAlert.close.on(this.onClose, this);
        this.setupNode();
        this.setupBtnEvent();
    }

    /**
     * 設定節點
     */
    private setupNode() {
        this.closeBtn = this.node.getChildByPath('Title/CloseBtn');
        this.betPlusBtn = this.node.getChildByPath('Bet/BetPlus');
        this.betMinusBtn = this.node.getChildByPath('Bet/BetMinus');
        this.betLabel = this.node.getChildByPath('Bet/BetInfo/Label').getComponent(Label);
        this.autoToggleList = this.node.getChildByPath('AutoSet/AutoToggleList');
        this.untilFeatureToggle = this.node.getChildByPath('UntilFeature/UntilFeatureToggle').getComponent(Toggle);
        this.okBtn = this.node.getChildByPath('OkBtn');
    }

    /**
     * 設定按鈕Click事件
     */
    private setupBtnEvent() {
        const scriptName = 'ControllerUI';
        addBtnClickEvent(this.node, scriptName, this.okBtn.getComponent(Button), this.onStartAutoSpin);
        addBtnClickEvent(this.node, scriptName, this.closeBtn.getComponent(Button), this.onClose);
        addBtnClickEvent(this.node, scriptName, this.betPlusBtn.getComponent(Button), this.changeBetClick, '1');
        addBtnClickEvent(this.node, scriptName, this.betMinusBtn.getComponent(Button), this.changeBetClick, '-1');

        addToggleClickEvent(this.node, scriptName, this.untilFeatureToggle.getComponent(Toggle), this.onUntilFeature);
        for (let i = 0; i < this.autoToggleList.children.length; i++) {
            addToggleClickEvent(this.node, scriptName, this.autoToggleList.children[i].getComponent(Toggle), this.onAutoSpin, i.toString());
        }
    }

    /**
     * 改變下注按下事件
     * @param event 事件
     * @param eventData 事件數據
     */
    private changeBetClick(event: EventTouch, eventData: string) {
        const changeValue = parseInt(eventData);
        Controller.changeBet.emit(changeValue);
    }

    protected onEnable() {
        this.init();
    }

    private onClose() {
        this.node.active = false;
    }

    /**
     * 初始化
     */
    private init() {
        //更新下注額度
        this.betLabel.string = Utils.numberFormat(DataManager.getInstance().betValue);

        //更新停止直到功能開關
        this.onUntilFeature();

        //更新自動旋轉次數索引
        const autoIndex = DataManager.getInstance().autoIndex;
        this.autoToggleList.children[autoIndex].getComponent(Toggle).isChecked = true;
    }

    /**
     *更新停止直到功能開關
     */
    private onUntilFeature() {
        DataManager.getInstance().isStopUntilFeature = this.untilFeatureToggle.isChecked;
    }

    /**
     * 更新自動旋轉次數索引
     * @param event 事件
     * @param eventData 事件數據
     */
    private onAutoSpin(event: EventTouch, eventData: string) {
        const index = parseInt(eventData);
        DataManager.getInstance().autoIndex = index;//更新自動旋轉次數索引
    }

    /**
     * 按下開始自動旋轉按鈕
     */
    private onStartAutoSpin() {
        this.onClose();
        //開啟自動旋轉模式
        DataManager.getInstance().isAutoMode = true;
        //更新自動旋轉次數
        DataManager.getInstance().autoSpinCount = BaseConst.AUTO_OPTIONS[DataManager.getInstance().autoIndex];
    }
}