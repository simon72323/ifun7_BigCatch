import { _decorator, Animation, Button, Component, EventTouch, instantiate, Label, Node, ScrollView } from 'cc';

import { DataManager } from '@common/script/data/DataManager';
import { XEvent } from '@common/script/event/XEvent';
import { TurboMode } from '@common/script/types/BaseType';
import { addBtnClickEvent, Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;

@ccclass('AutoSpin')
export class AutoSpin extends Component {
    public static open: XEvent = new XEvent();

    private backMask: Node = null;//背景遮罩
    private autoContent: Node = null;//內容

    private startBtn: Node = null;//開始按鈕
    private closeBtn: Node = null;//關閉按鈕
    private stopUntilFeatureBtn: Node = null;//停止直到功能按鈕
    private fastSpinBtn: Node = null;//快速轉按鈕
    private turboSpinBtn: Node = null;//加速轉按鈕
    private autoTimesBtn: Node = null;//轉次數按鈕

    //===========================選單===========================
    public dropDownItem: Node = null;//選單項目
    public scrollView: ScrollView;//選單項目ScrollView
    public displayItemLabel: Label;//選單項目Label
    public maskBtn: Node;//遮罩返回按鈕
    private pickIdx: number = 0;//選擇的項目
    private autoStringList: string[] = ['10', '25', '50', '75', '100', '250', '500', '750', '1000', 'UNLIMITED'];
    //===========================選單===========================

    onLoad() {
        this.backMask = this.node.getChildByName('BackMask');
        this.autoContent = this.node.getChildByName('Content');

        this.startBtn = this.node.getChildByPath('Content/StartBtn');
        this.closeBtn = this.node.getChildByPath('Content/CloseBtn');
        this.stopUntilFeatureBtn = this.node.getChildByPath('Content/Settings/StopUntilFeatureBtn');
        this.fastSpinBtn = this.node.getChildByPath('Content/Settings/FastSpinBtn');
        this.turboSpinBtn = this.node.getChildByPath('Content/Settings/TurboSpinBtn');
        this.autoTimesBtn = this.node.getChildByPath('Content/Settings/AutoTimesBtn');

        //===========================選單===========================
        this.dropDownItem = this.node.getChildByPath('Content/SpinTimes/DropDown/DropDownItem');
        this.scrollView = this.node.getChildByName('Content/SpinTimes/DropDown/ScrollView').getComponent(ScrollView);
        this.displayItemLabel = this.node.getChildByPath('Content/SpinTimes/DropDown/DisplayItem/Label').getComponent(Label);
        this.maskBtn = this.node.getChildByPath('Content/SpinTimes/DropDown/ScrollView/MaskBtn');
        this.scrollView.node.active = false;
        this.maskBtn.active = false;
        this.createItem();//建立選單項目
        //===========================選單===========================

        this.setupEvent();
        AutoSpin.open.on(this.onOpen, this);
    }

    /**
     * 設定事件監聽
     */
    private setupEvent() {
        const scriptName = 'ControllerUI';
        addBtnClickEvent(this.node, scriptName, this.startBtn.getComponent(Button), this.onClickStart);
        addBtnClickEvent(this.node, scriptName, this.closeBtn.getComponent(Button), this.onClose);
        addBtnClickEvent(this.node, scriptName, this.backMask.getComponent(Button), this.onClose);

        addBtnClickEvent(this.node, scriptName, this.stopUntilFeatureBtn.getComponent(Button), this.onClickStopUntilFeature);
        addBtnClickEvent(this.node, scriptName, this.fastSpinBtn.getComponent(Button), this.onClickFastSpin);
        addBtnClickEvent(this.node, scriptName, this.turboSpinBtn.getComponent(Button), this.onClickTurboSpin);
        addBtnClickEvent(this.node, scriptName, this.autoTimesBtn.getComponent(Button), this.onClickAutoTimes);

        addBtnClickEvent(this.node, scriptName, this.maskBtn.getComponent(Button), this.onCloseDrop);
    }

    /**
     * 開啟自動選單
     */
    private onOpen() {
        this.autoContent.active = true;
        this.updateSpeedSwitch();
        this.updateStopUntilFeature();
        this.updateAutoTimes();

        this.displayItemLabel.node.on(Node.EventType.TOUCH_END, this.onClickDrop, this);
        Utils.AddHandHoverEvent(this.displayItemLabel.node);
        this.displayItemLabel.string = this.autoStringList[this.pickIdx];//設置預設選擇的項目
    }

    /**
     * 關閉自動選單
     */
    private onClose() {
        this.autoContent.active = false;
        this.onCloseDrop();
        this.displayItemLabel.node.off(Node.EventType.TOUCH_END, this.onClickDrop, this);
    }

    /**
     * 按下執行按鈕
     */
    private onClickStart() {
        this.onClose();
        console.log('執行自動遊戲');
    }

    /**
     * 按下快速轉按鈕
     */
    private onClickFastSpin() {
        const dataManager = DataManager.getInstance();
        dataManager.curTurboMode = dataManager.curTurboMode !== TurboMode.Fast
            ? TurboMode.Fast
            : TurboMode.Normal;
        this.updateSpeedSwitch();
    }

    /**
     * 按下加速轉按鈕
     */
    private onClickTurboSpin() {
        const dataManager = DataManager.getInstance();
        dataManager.curTurboMode = dataManager.curTurboMode !== TurboMode.Turbo
            ? TurboMode.Turbo
            : TurboMode.Normal;
        this.updateSpeedSwitch();
    }

    /**
     * 按下停止直到功能按鈕
     */
    private onClickStopUntilFeature() {
        const dataManager = DataManager.getInstance();
        dataManager.isStopUntilFeature = !dataManager.isStopUntilFeature;
        this.updateStopUntilFeature();
    }

    /**
     * 按下轉次數按鈕
     */
    private onClickAutoTimes() {
        const dataManager = DataManager.getInstance();
        dataManager.isAutoTimes = !dataManager.isAutoTimes;
        this.updateAutoTimes();
    }

    /**
     * 更新速度開關
     */
    private updateSpeedSwitch() {
        const turboMode = DataManager.getInstance().curTurboMode;
        switch (turboMode) {
            case TurboMode.Normal:
                this.fastSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                this.turboSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                break;
            case TurboMode.Fast:
                this.fastSpinBtn.getComponent(Animation).play(SwitchBtnAnim.On);
                this.turboSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                break;
            case TurboMode.Turbo:
                this.turboSpinBtn.getComponent(Animation).play(SwitchBtnAnim.On);
                this.fastSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                break;
        }
    }

    /**
     * 更新直到獎勵遊戲
     */
    private updateStopUntilFeature() {
        const dataManager = DataManager.getInstance();
        const animtion = dataManager.isStopUntilFeature ? SwitchBtnAnim.Off : SwitchBtnAnim.On;
        this.stopUntilFeatureBtn.getComponent(Animation).play(animtion);
    }

    /**
     * 更新自動旋轉次數
     */
    private updateAutoTimes() {
        const dataManager = DataManager.getInstance();
        const animtion = dataManager.isAutoTimes ? SwitchBtnAnim.Off : SwitchBtnAnim.On;
        this.autoTimesBtn.getComponent(Animation).play(animtion);
    }

    //===========================選單===========================
    /**
     * 建立選單項目
     */
    protected createItem() {
        if (this.autoStringList == null) return;
        for (let i in this.autoStringList) {
            let item = instantiate(this.dropDownItem);
            this.scrollView.content.addChild(item);
            item.getChildByName('Label').getComponent(Label).string = this.autoStringList[i];
            Utils.AddHandHoverEvent(item);
            item.setPosition(0, 0, 0);
            item.active = true;

            //啟用監聽
            addBtnClickEvent(this.node, 'DropDown', item.getComponent(Button), this.pickDropItem, i);
        }
    }

    /**
     * 點擊選單事件
     */
    private onClickDrop() {
        this.openDrop(!this.scrollView.node.active);
    }

    /**
     * 點擊關閉選單事件
     */
    public onCloseDrop() {
        this.openDrop(false);
    }

    /**
     * 打開/關閉下拉選單
     * @param active 
     */
    private openDrop(active: boolean) {
        this.scrollView.node.active = active;
        this.maskBtn.active = active;
    }

    /**
     * 選擇選單項目
     * @param event 
     * @param autoString 
     */
    private pickDropItem(event: EventTouch, idx: number) {
        this.pickIdx = idx;//更新選擇的項目
        this.displayItemLabel.string = this.autoStringList[idx];
        if (event != null) this.openDrop(false);
        //如果轉次數未開啟，則開啟
        if (!DataManager.getInstance().isAutoTimes) {
            DataManager.getInstance().isAutoTimes = true;
            this.updateAutoTimes();
        }
    }
    //===========================選單===========================

    onDestroy() {
        AutoSpin.open.off(this);
    }
}

/**
 * 速度開關動畫
 */
enum SwitchBtnAnim {
    Off = 'switchButtonOff',
    On = 'switchButtonOn',
}