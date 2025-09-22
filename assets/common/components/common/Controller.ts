import { _decorator, Animation, Button, Component, EventKeyboard, KeyCode, Node, screen, tween, UITransform, Vec3 } from 'cc';

import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { AudioMode, SpinMode, TurboMode } from '@base/script/types/BaseType';
import { addBtnClickEvent } from '@base/script/utils/XUtils';

import { AudioManager } from '@common/script/manager/AudioManager';

const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {
    @property({ type: Node, tooltip: 'bet資訊' })
    private betInfo: Node = null;

    @property({ type: Node, tooltip: 'SPIN按鈕' })
    private spinBtn: Node = null;

    @property({ type: Node, tooltip: '重複下注按鈕' })
    private repeatAutoBtn: Node = null;

    @property({ type: Node, tooltip: '自動按鈕' })
    private autoBtn: Node = null;

    @property({ type: Node, tooltip: '加速按鈕' })
    private turboBtn: Node = null;

    @property({ type: Node, tooltip: '選項按鈕' })
    private optionBtn: Node = null;

    @property({ type: Node, tooltip: '全螢幕按鈕' })
    private screenBtn: Node = null;

    @property({ type: Node, tooltip: '聲音按鈕' })
    private audioBtn: Node = null;

    @property({ type: Node, tooltip: '下注紀錄按鈕' })
    private recordBtn: Node = null;

    @property({ type: Node, tooltip: '收藏按鈕' })
    private favoritesBtn: Node = null;

    @property({ type: Node, tooltip: '資訊說明按鈕' })
    private informationBtn: Node = null;

    @property({ type: Node, tooltip: '返回按鈕' })
    private backBtn: Node = null;

    private superSpin: Node = null;//超級SPIN節點
    private content: Node = null;//超級SPIN內容
    private preMessage: Node = null;//超級SPIN預先訊息
    private BsBg: Node = null;//超級SPIN BS背景
    private FsBg: Node = null;//超級SPIN FS背景

    private porControllerBtns: Node = null;//直式控制器
    private porOptionMenuBtns: Node = null;//直式選單
    private landOptionMenuBtns: Node = null;//橫式選單

    private isOpenOption: boolean = false;//是否開啟選單
    private isFullScreen: boolean = false;//是否全螢幕
    private audioMode: number = AudioMode.AudioOn;//音效模式
    // private turboMode: TurboMode = TurboMode.Normal;//加速模式

    /**
     * 初始化
     */
    onLoad() {
        this.superSpin = this.node.getChildByName('SuperSpin');
        this.content = this.superSpin.getChildByName('Content');
        this.preMessage = this.superSpin.getChildByName('PreMessage');
        this.BsBg = this.superSpin.getChildByName('BsBg');
        this.FsBg = this.superSpin.getChildByName('FsBg');

        this.porControllerBtns = this.node.getChildByPath('Por_ControllerBtns');
        this.porOptionMenuBtns = this.node.getChildByPath('Por_OptionMenuBtns');
        this.landOptionMenuBtns = this.node.getChildByPath('Land_OptionMenuBtns');
        this.setupBtnEvent();
    }

    /**
     * 設定按鈕Click事件
     */
    private setupBtnEvent() {
        const scriptName = 'ControllerUI';
        addBtnClickEvent(this.spinBtn, scriptName, this.spinBtn.getComponent(Button), this.onSpin);
        addBtnClickEvent(this.repeatAutoBtn, scriptName, this.repeatAutoBtn.getComponent(Button), this.onRepeatAuto);
        addBtnClickEvent(this.autoBtn, scriptName, this.autoBtn.getComponent(Button), this.onAuto);
        addBtnClickEvent(this.turboBtn, scriptName, this.turboBtn.getComponent(Button), this.onTurbo);
        addBtnClickEvent(this.optionBtn, scriptName, this.optionBtn.getComponent(Button), this.onOption);
        addBtnClickEvent(this.screenBtn, scriptName, this.screenBtn.getComponent(Button), this.onScreen);
        addBtnClickEvent(this.audioBtn, scriptName, this.audioBtn.getComponent(Button), this.onAudio);
        addBtnClickEvent(this.recordBtn, scriptName, this.recordBtn.getComponent(Button), this.onRecord);
        addBtnClickEvent(this.favoritesBtn, scriptName, this.favoritesBtn.getComponent(Button), this.onFavorites);
        addBtnClickEvent(this.informationBtn, scriptName, this.informationBtn.getComponent(Button), this.onInformation);

        addBtnClickEvent(this.backBtn, scriptName, this.backBtn.getComponent(Button), this.onOption);
    }

    /**
     * 按鍵設定
     * @todo 空白鍵進行 Spin
     */
    protected onKeySpaceDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                // AutoSpin.StopAutoSpin();
                this.onSpin();
                return;
            case KeyCode.ENTER:
            case KeyCode.NUM_ENTER:
                // this.clickRepeatAuto();
                return;
        }
    }

    // /**
    //  * 禁用全螢幕
    //  * @returns {boolean} 是否禁用全螢幕
    //  */
    // private iphoneDisableFullScreen() : boolean {
    //     if ( sys.isMobile === false ) return false;
    //     if ( sys.os !== 'iOS' )       return false;

    //     const fullScreen = this.props['fullScreen'];
    //     fullScreen['fullscreen_p'][DATA_TYPE.NODE].active        = false;
    //     fullScreen['fullscreen_exit_p'][DATA_TYPE.NODE].active   = false;
    //     fullScreen['fullscreen_l'][DATA_TYPE.NODE].active        = false;
    //     fullScreen['fullscreen_exit_l'][DATA_TYPE.NODE].active   = false;
    //     fullScreen['fullscreen_p'][DATA_TYPE.NODE].parent.active = false;
    //     fullScreen['fullscreen_l'][DATA_TYPE.NODE].parent.active = false;

    //     this.props['soundMode_p']['content'][DATA_TYPE.NODE].setPosition(150, 10, 0);
    //     this.props['buttons']['Record'][DATA_TYPE.NODE].setPosition(0, 10, 0);
    //     this.props['buttons']['InGameMenu'][DATA_TYPE.NODE].setPosition(-150, 10, 0);
    //     this.props['buttons']['InGameMenuLandscape'][DATA_TYPE.NODE].setPosition(0, 90, 0);

    //     return true;
    // }

    /**
     * 顯示/關閉超級 SPIN 模式
     * @param active {boolean} 顯示/關閉
     */
    private onSuperSpinMode(active: boolean) {
        this.superSpin.active = active;
        this.content.active = !active;
        this.preMessage.active = active;
        const isBS = BaseDataManager.getInstance().isBS();
        this.BsBg.active = isBS;
        this.FsBg.active = !isBS;
        // const copy = instantiate(this.props['superSpin']['win'].node);
        // ObjectPool.registerNode('winLabelClone', copy);
    }

    /**
     * 顯示超級SPIN畫面
     */
    private showSuperSpinContent() {
        this.content.active = this.preMessage.active;
        this.preMessage.active = !this.preMessage.active;
    }


    //============================= 按鈕事件 =============================

    /**
     * 執行Spin
     */
    private onSpin() {
        if (!BaseDataManager.getInstance().isBS()) return;
        const spinImage = this.spinBtn.getChildByName('Image');
        tween(spinImage).to(0.1, { scale: new Vec3(0.6, 0.6, 1) }).to(0.15, { scale: Vec3.ONE }, { easing: 'backOut' }).start();

        if (this.superSpin.active) {
            BaseEvent.clickSpin.emit(SpinMode.Super);
            this.showSuperSpinContent();
        } else {
            BaseEvent.clickSpin.emit(SpinMode.Normal);
        }
    }

    /**
     * 執行重複下注
     */
    private onRepeatAuto() {
        // BaseEvent.clickRepeatAuto.emit(true);
    }

    /**
     * 執行自動下注
     */
    private onAuto() {
        //出現AutoSpinUI，使用xevent
        // BaseEvent.clickAuto.emit(true);
    }

    /**
     * 切換加速模式
     */
    private onTurbo() {
        let turboMode = BaseDataManager.getInstance().curTurboMode;
        turboMode = (turboMode + 1) % 4;
        BaseDataManager.getInstance().curTurboMode = turboMode;
        const normalNode = this.turboBtn.getChildByName('Normal');
        const speedNode = this.turboBtn.getChildByName('Speed');
        const turboNode = this.turboBtn.getChildByName('Turbo');
        const superNode = this.turboBtn.getChildByName('Super');

        // 先隱藏所有狀態圖示
        normalNode.active = false;
        speedNode.active = false;
        turboNode.active = false;
        superNode.active = false;

        //判斷超級SPIN開關
        this.onSuperSpinMode(turboMode === TurboMode.Super);

        // 根據當前狀態顯示對應圖示
        switch (turboMode) {
            case TurboMode.Normal:
                normalNode.active = true;
                BaseDataManager.getInstance().setTurboMode(TurboMode.Normal);
                break;
            case TurboMode.Speed:
                speedNode.active = true;
                BaseDataManager.getInstance().setTurboMode(TurboMode.Speed);
                break;
            case TurboMode.Turbo:
                turboNode.active = true;
                BaseDataManager.getInstance().setTurboMode(TurboMode.Turbo);
                break;
            case TurboMode.Super:
                superNode.active = true;
                BaseDataManager.getInstance().setTurboMode(TurboMode.Super);
                break;
        }
    }

    /**
     * 開啟/關閉選單
     */
    private onOption() {
        this.isOpenOption = !this.isOpenOption;
        if (this.isOpenOption) {
            this.porControllerBtns.getComponent(Animation).play('optionMenuHide');
            this.porOptionMenuBtns.getComponent(Animation).play('optionMenuShow');
            this.landOptionMenuBtns.getComponent(Animation).play('optionMenuShow');
        } else {
            this.porControllerBtns.getComponent(Animation).play('optionMenuShow');
            this.porOptionMenuBtns.getComponent(Animation).play('optionMenuHide');
            this.landOptionMenuBtns.getComponent(Animation).play('optionMenuHide');
        }
    }

    /**
     * 切換全螢幕
     */
    private onScreen() {
        this.isFullScreen = !this.isFullScreen;
        const fullScreenOn = this.screenBtn.getChildByName('FullScreenOn');
        const fullScreenOff = this.screenBtn.getChildByName('FullScreenOff');

        fullScreenOn.active = !this.isFullScreen;
        fullScreenOff.active = this.isFullScreen;

        if (this.isFullScreen) {
            screen.requestFullScreen();//請求全螢幕
        } else {
            screen.exitFullScreen();//退出全螢幕
        }
    }

    /**
     * 切換音效狀態
     */
    private onAudio() {
        this.audioMode = (this.audioMode + 1) % 3;
        const audioOnNode = this.audioBtn.getChildByName('AudioOn');
        const musicOffNode = this.audioBtn.getChildByName('MusicOff');
        const audioOffNode = this.audioBtn.getChildByName('AudioOff');

        // 先隱藏所有狀態圖示
        audioOnNode.active = false;
        musicOffNode.active = false;
        audioOffNode.active = false;

        // 根據當前狀態顯示對應圖示
        switch (this.audioMode) {
            case AudioMode.AudioOn:
                audioOnNode.active = true;
                AudioManager.getInstance().setMute(false);
                break;
            case AudioMode.MusicOff:
                musicOffNode.active = true;
                AudioManager.getInstance().stopMusic('bgm');
                break;
            case AudioMode.AudioOff:
                audioOffNode.active = true;
                AudioManager.getInstance().setMute(true);
                break;
        }
    }

    /**
     * 開啟下注紀錄
     */
    private onRecord() {
        const betrecordurl = BaseDataManager.getInstance().getFullBetrecordurl();
        window.open(betrecordurl, '_blank');
    }

    /**
     * 開啟我的最愛視窗
     */
    private onFavorites() {
        // 開啟我的最愛視窗
    }

    /**
     * 開啟遊戲說明
     */
    private onInformation() {
        // 發送xevent 開啟遊戲說明
        // if (this.machine.isBusy === true) return;
        // this.clickOptionBack();
        // Utils.GoogleTag('ClickInformation', { 'event_category': 'Information', 'event_label': 'ClickInformation' });
        // GameInformationUI.OpenUI();
    }
}