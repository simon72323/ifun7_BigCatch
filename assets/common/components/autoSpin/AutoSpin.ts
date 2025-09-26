import { _decorator, Animation, Button, Component, Node } from 'cc';

import { TurboMode } from '@base/script/types/BaseType';
import { XEvent } from '@base/script/utils/XEvent';
import { addBtnClickEvent } from '@base/script/utils/XUtils';

import { DataManager } from '@common/script/data/DataManager';


const { ccclass, property } = _decorator;

@ccclass('AutoSpin')
export class AutoSpin extends Component {
    public static open: XEvent = new XEvent();
    public static close: XEvent = new XEvent();
    // public static setup: XEvent1<number[]> = new XEvent1();
    // public static choose: XEvent1<number> = new XEvent1();

    // private autoSpin: Node = null;//自動轉節點
    private backMask: Node = null;//背景遮罩
    private content: Node = null;//內容

    private startBtn: Node = null;//開始按鈕
    private closeBtn: Node = null;//關閉按鈕
    private stopUntilFeatureBtn: Node = null;//停止直到功能按鈕
    private quickSpinBtn: Node = null;//快速轉按鈕
    private turboSpinBtn: Node = null;//加速轉按鈕
    // private spinTimesBtn: Node = null;//轉次數按鈕

    private spinTimesBool: boolean = false;//轉次數按鈕是否被按下

    onLoad() {
        AutoSpin.open.on(this.onOpen, this);
        AutoSpin.close.on(this.onClose, this);

        this.backMask = this.node.getChildByName('BackMask');
        this.content = this.node.getChildByName('Content');

        this.startBtn = this.content.getChildByName('StartBtn');
        this.closeBtn = this.content.getChildByName('CloseBtn');
        this.stopUntilFeatureBtn = this.content.getChildByPath('Settings/StopUntilFeatureBtn');
        this.quickSpinBtn = this.content.getChildByPath('Settings/QuickSpinBtn');
        this.turboSpinBtn = this.content.getChildByPath('Settings/TurboSpinBtn');
        // this.spinTimesBtn = this.content.getChildByPath('SpinTimes/SpinTimesBtn');

        this.setupBtnEvent();
    }

    /**
     * 設定按鈕Click事件
     */
    private setupBtnEvent() {
        const scriptName = 'ControllerUI';
        addBtnClickEvent(this.startBtn, scriptName, this.startBtn.getComponent(Button), this.onStart);
        addBtnClickEvent(this.closeBtn, scriptName, this.closeBtn.getComponent(Button), this.onClose);
        addBtnClickEvent(this.stopUntilFeatureBtn, scriptName, this.stopUntilFeatureBtn.getComponent(Button), this.onStopUntilFeature);
        addBtnClickEvent(this.quickSpinBtn, scriptName, this.quickSpinBtn.getComponent(Button), this.onQuickSpin);
        addBtnClickEvent(this.turboSpinBtn, scriptName, this.turboSpinBtn.getComponent(Button), this.onTurboSpin);
        // addBtnClickEvent(this.spinTimesBtn, scriptName, this.spinTimesBtn.getComponent(Button), this.onSpinTimes);
        // addBtnClickEvent(this.dropDownBtn, scriptName, this.dropDownBtn.getComponent(Button), this.onDropDown);
    }

    /**
     * 啟用/禁用自動轉模式
     * @param active {boolean} 啟用/禁用
     */
    // private onAutoSpinMode(active: boolean) {
    //     this.autoSpin.active = active;
    // }

    private onOpen() {
        this.content.active = true;
        this.backMask.active = true;
        this.updateSpeedSwitch();
    }

    private onClose() {
        this.content.active = false;
        this.backMask.active = false;
    }

    private onStart() {
        console.log('onStart');
    }

    /**
     * 更新速度開關
     */
    private updateSpeedSwitch() {
        const turboMode = DataManager.getInstance().turboMode;
        switch (turboMode) {
            case TurboMode.Normal:
                this.quickSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                this.turboSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                break;
            case TurboMode.Quick:
                this.quickSpinBtn.getComponent(Animation).play(SwitchBtnAnim.On);
                this.turboSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                break;
            case TurboMode.Turbo:
                this.turboSpinBtn.getComponent(Animation).play(SwitchBtnAnim.On);
                this.quickSpinBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
                break;
        }
    }

    /**
     * 按下快速轉按鈕
     */
    private onQuickSpin() {
        DataManager.getInstance().turboMode = DataManager.getInstance().turboMode !== TurboMode.Quick
            ? TurboMode.Quick
            : TurboMode.Normal;
        this.updateSpeedSwitch();
    }

    /**
     * 按下加速轉按鈕
     */
    private onTurboSpin() {
        DataManager.getInstance().turboMode = DataManager.getInstance().turboMode !== TurboMode.Turbo
            ? TurboMode.Turbo
            : TurboMode.Normal;
        this.updateSpeedSwitch();
    }

    /**
     * 按下停止直到功能按鈕
     */
    private onStopUntilFeature() {
        if (!DataManager.getInstance().stopUntilFeature) {
            this.stopUntilFeatureBtn.getComponent(Animation).play(SwitchBtnAnim.On);
            DataManager.getInstance().stopUntilFeature = true;
        } else {
            this.stopUntilFeatureBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
            DataManager.getInstance().stopUntilFeature = false;
        }
    }

    /**
     * 按下轉次數按鈕
     */
    private onSpinTimes() {
        // if (!this.spinTimesBool) {
        //     this.spinTimesBtn.getComponent(Animation).play(SwitchBtnAnim.On);
        //     this.spinTimesBool = true;
        // } else {
        //     this.spinTimesBtn.getComponent(Animation).play(SwitchBtnAnim.Off);
        //     this.spinTimesBool = false;
        // }
    }

    // private onDropDown() {
    //     console.log('onDropDown');
    // }

}

/**
 * 速度開關動畫
 */
enum SwitchBtnAnim {
    Off = 'switchButtonOff',
    On = 'switchButtonOn',
}