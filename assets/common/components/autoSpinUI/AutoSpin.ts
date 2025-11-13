import { _decorator, Button, Color, Component, EventTouch, instantiate, Label, Node, ScrollView, Sprite, tween, Vec3 } from 'cc';

import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { TurboMode } from 'db://assets/common/script/types/BaseType';
import { addBtnClickEvent, Utils } from 'db://assets/common/script/utils/Utils';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { AudioKey } from 'db://assets/game/script/data/AudioKey';

const { ccclass, property } = _decorator;

@ccclass('AutoSpin')
export class AutoSpin extends Component {
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
        this.setupNode();
        this.setupEvent();
        this.node.active = false;
    }

    /**
     * 設定節點
     */
    private setupNode() {
        this.autoContent = this.node.getChildByName('Content');
        this.backMask = this.node.getChildByPath('BackMask');

        this.startBtn = this.node.getChildByPath('Content/StartBtn');
        this.closeBtn = this.node.getChildByPath('Content/CloseBtn');
        this.stopUntilFeatureBtn = this.node.getChildByPath('Content/Settings/StopUntilFeatureBtn');
        this.fastSpinBtn = this.node.getChildByPath('Content/Settings/FastSpinBtn');
        this.turboSpinBtn = this.node.getChildByPath('Content/Settings/TurboSpinBtn');
        this.autoTimesBtn = this.node.getChildByPath('Content/SpinTimes/AutoTimesBtn');

        //===========================選單===========================
        this.dropDownItem = this.node.getChildByPath('Content/SpinTimes/DropDown/DropDownItem');
        this.scrollView = this.node.getChildByPath('Content/SpinTimes/DropDown/ScrollView').getComponent(ScrollView);
        this.displayItemLabel = this.node.getChildByPath('Content/SpinTimes/DropDown/DisplayItem/Label').getComponent(Label);
        this.maskBtn = this.node.getChildByPath('Content/SpinTimes/DropDown/ScrollView/MaskBtn');
        this.scrollView.node.active = false;
        this.maskBtn.active = false;
        this.createItem();//建立選單項目
        //===========================選單===========================
    }

    /**
     * 設定事件監聽
     */
    private setupEvent() {
        BaseEvent.showAutoSpin.on(this.onShow, this);
        this.maskBtn.on(Button.EventType.CLICK, this.onCloseDrop, this);
        this.displayItemLabel.node.on(Node.EventType.TOUCH_END, this.onClickDrop, this);

        this.startBtn.on(Button.EventType.CLICK, this.onClickStart, this);
        this.closeBtn.on(Button.EventType.CLICK, this.onClose, this);
        this.stopUntilFeatureBtn.on(Button.EventType.CLICK, this.onClickStopUntilFeature, this);
        this.fastSpinBtn.on(Button.EventType.CLICK, this.onClickFastSpin, this);
        this.turboSpinBtn.on(Button.EventType.CLICK, this.onClickTurboSpin, this);
        this.autoTimesBtn.on(Button.EventType.CLICK, this.onClickAutoTimes, this);
        this.backMask.on(Button.EventType.CLICK, this.onClose, this);
    }

    /**
     * 開啟自動選單
     */
    private onShow() {
        DataManager.getInstance().lockKeyboard = true;//鎖定鍵盤功能
        Utils.fadeIn(this.node, 0.15, 0, 255);
        Utils.tweenScaleTo(this.node, 0.15, 0.8, 1);
        this.node.active = true;

        this.updateSpeedSwitch();
        this.updateStopUntilFeature();
        this.updateAutoTimes();

        Utils.AddHandHoverEvent(this.displayItemLabel.node);
        this.displayItemLabel.string = this.autoStringList[this.pickIdx];//設置預設選擇的項目
    }

    /**
     * 關閉自動選單
     */
    private onClose() {
        AudioManager.getInstance().playSound(AudioKey.btnClick);
        DataManager.getInstance().lockKeyboard = false;//解除鎖定鍵盤功能
        Utils.tweenScaleTo(this.node, 0.1, 1, 0.9);
        Utils.fadeOut(this.node, 0.1, 255, 0, () => {
            this.node.active = false;
        });
        this.onCloseDrop();
    }

    /**
     * 按下執行按鈕
     */
    private onClickStart() {
        AudioManager.getInstance().playSound(AudioKey.btnClick);
        this.onClose();
        if (DataManager.getInstance().isAutoTimes) {
            /** 設置自動旋轉次數 */
            const autoCount = this.displayItemLabel.string === 'UNLIMITED' ? -1 : parseInt(this.displayItemLabel.string);
            DataManager.getInstance().autoSpinCount = autoCount;
            DataManager.getInstance().isAutoMode = true;
            BaseEvent.runAutoSpin.emit();
        }
    }

    /**
     * 按下快速轉按鈕
     */
    private onClickFastSpin() {
        AudioManager.getInstance().playSound(AudioKey.btnClick);
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
        AudioManager.getInstance().playSound(AudioKey.btnClick);
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
        AudioManager.getInstance().playSound(AudioKey.btnClick);
        const dataManager = DataManager.getInstance();
        dataManager.isStopUntilFeature = !dataManager.isStopUntilFeature;
        this.updateStopUntilFeature();
    }

    /**
     * 按下轉次數按鈕
     */
    private onClickAutoTimes() {
        AudioManager.getInstance().playSound(AudioKey.btnClick);
        const dataManager = DataManager.getInstance();
        dataManager.isAutoTimes = !dataManager.isAutoTimes;
        this.updateAutoTimes();
    }

    /**
     * 更新速度開關
     */
    private updateSpeedSwitch() {
        const turboMode = DataManager.getInstance().curTurboMode;
        BaseEvent.setTurboBtnState.emit(turboMode);
        switch (turboMode) {
            case TurboMode.Normal:
                // console.log('TurboMode.Normal');
                this.tweenOff(this.fastSpinBtn);
                this.tweenOff(this.turboSpinBtn);
                break;
            case TurboMode.Fast:
                // console.log('TurboMode.Fast');
                this.tweenOn(this.fastSpinBtn);
                this.tweenOff(this.turboSpinBtn);
                break;
            case TurboMode.Turbo:
                // console.log('TurboMode.Turbo');
                this.tweenOn(this.turboSpinBtn);
                this.tweenOff(this.fastSpinBtn);
                break;
        }
    }

    /**
     * 開關動畫on
     * @param node 
     */
    private tweenOn(node: Node) {
        const time = 0.15;
        const easing = 'backOut';
        tween(node.getChildByName('Point')).to(time, { position: new Vec3(15, 0, 0) }, { easing }).start();
        tween(node.getChildByName('Point').getComponent(Sprite)).to(time, { color: new Color(200, 200, 200, 255) }, { easing }).start();
        tween(node.getChildByName('Bg').getComponent(Sprite)).to(time, { color: new Color(220, 140, 80, 255) }, { easing }).start();
    }

    /**
     * 關閉動畫off
     * @param node 
     */
    private tweenOff(node: Node) {
        const time = 0.15;
        const easing = 'backOut';
        tween(node.getChildByName('Point')).to(time, { position: new Vec3(-15, 0, 0) }, { easing }).start();
        tween(node.getChildByName('Point').getComponent(Sprite)).to(time, { color: new Color(140, 140, 140, 255) }, { easing }).start();
        tween(node.getChildByName('Bg').getComponent(Sprite)).to(time, { color: new Color(72, 72, 72, 255) }, { easing }).start();
    }


    /**
     * 更新直到獎勵遊戲
     */
    private updateStopUntilFeature() {
        DataManager.getInstance().isStopUntilFeature
            ? this.tweenOn(this.stopUntilFeatureBtn)
            : this.tweenOff(this.stopUntilFeatureBtn);
    }

    /**
     * 更新自動旋轉次數
     */
    private updateAutoTimes() {
        DataManager.getInstance().isAutoTimes
            ? this.tweenOn(this.autoTimesBtn)
            : this.tweenOff(this.autoTimesBtn);
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
            addBtnClickEvent(this.node, 'AutoSpin', item.getComponent(Button), 'pickDropItem', i);
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
        AudioManager.getInstance().playSound(AudioKey.btnClick);
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
        this.maskBtn.off(Button.EventType.CLICK, this.onCloseDrop, this);
        this.displayItemLabel.node.off(Node.EventType.TOUCH_END, this.onClickDrop, this);
    }
}