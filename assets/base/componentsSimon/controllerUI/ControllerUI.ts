
import { _decorator, Animation, Button, Component, EventKeyboard, KeyCode, Node, screen } from 'cc';

import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { AudioMode, ModuleID, TurboMode } from '@base/script/types/BaseType';
import { addBtnClickEvent } from '@base/script/utils/XUtils';


const { ccclass, property } = _decorator;

@ccclass('ControllerUI')
export class ControllerUI extends Component {
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

    private porControllerBtns: Node = null;//直式控制器
    private porOptionMenuBtns: Node = null;//直式選單
    private landOptionMenuBtns: Node = null;//橫式選單

    private isOpenOption: boolean = false;//是否開啟選單
    private isFullScreen: boolean = false;//是否全螢幕
    private audioMode: number = AudioMode.AudioOn;//音效模式
    private turboMode: number = TurboMode.Normal;//加速模式

    /**
     * 初始化
     */
    onLoad() {
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


    //============================= 按鈕事件 =============================

    private onSpin() {
        BaseEvent.clickSpin.emit(true);
    }

    private onRepeatAuto() {
        // BaseEvent.clickRepeatAuto.emit(true);
    }

    private onAuto() {
        //出現AutoSpinUI，使用xevent
        // BaseEvent.clickAuto.emit(true);
    }

    /**
     * 切換加速模式
     */
    private onTurbo() {
        this.turboMode = (this.turboMode + 1) % 4;
        const normalNode = this.turboBtn.getChildByName('Normal');
        const speedNode = this.turboBtn.getChildByName('Speed');
        const turboNode = this.turboBtn.getChildByName('Turbo');
        const superNode = this.turboBtn.getChildByName('Super');

        // 先隱藏所有狀態圖示
        normalNode.active = false;
        speedNode.active = false;
        turboNode.active = false;
        superNode.active = false;

        //發送判斷超級SPIN事件
        BaseEvent.clickTurbo.emit(this.turboMode === TurboMode.Super);

        // 根據當前狀態顯示對應圖示
        switch (this.turboMode) {
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
                AudioManager.getInstance().stop('bgm');
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


