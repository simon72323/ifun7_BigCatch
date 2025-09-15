
import { _decorator, Animation, Button, CCBoolean, Component, Node, screen } from 'cc';
import { EDITOR } from 'cc/env';

import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { OrientationID } from '@base/script/types/BaseType';
import { addBtnClickEvent } from '@base/script/utils/XUtils';


/**
 * 切換直橫式的UI節點
 */
enum ChangeUIs {
    BetInfo = 'betInfo',
    SpinBtn = 'spinBtn',
    RepeatAutoBtn = 'repeatAutoBtn',
    AutoBtn = 'autoBtn',
    SpeedBtn = 'speedBtn',
    OptionBtn = 'optionBtn',
    ScreenBtn = 'screenBtn',
    AudioBtn = 'audioBtn',
    RecordBtn = 'recordBtn',
    FavoritesBtn = 'favoritesBtn',
    InformationBtn = 'informationBtn',
    SuperSpinUI = 'superSpinUI',
}

/**
 * 音效狀態枚舉
 */
enum AudioState {
    /** 開啟音效 */
    AudioOn = 0,
    /** 關閉背景音 */
    MusicOff = 1,
    /** 關閉所有聲音 */
    AudioOff = 2
}

const { ccclass, property } = _decorator;

@ccclass('ControllerUI')
export class ControllerUI extends Component {

    //======================== 直橫式切換控制 ========================
    private _isLandscape: boolean = false;
    @property({ type: CCBoolean, tooltip: '是否切換為橫式' })
    get isLandscape(): boolean {
        return this._isLandscape;
    }

    set isLandscape(value: boolean) {
        if (this._isLandscape !== value) {
            this._isLandscape = value;
            console.log('isLandscape changed to:', this._isLandscape);
            // 在編輯器模式下觸發方向切換
            if (EDITOR) {
                this.onChangeOrientation(value ? OrientationID.Landscape : OrientationID.Portrait);
            }
        }
    }

    @property({ type: [Node], tooltip: '直式位置節點' })
    private portraitPos: Node[] = [];

    @property({ type: [Node], tooltip: '橫式位置節點' })
    private landscapePos: Node[] = [];
    //======================== 直橫式切換控制 ========================

    //======================== 主要按鈕節點 ========================

    @property({ type: Node, tooltip: 'bet資訊' })
    private betInfo: Node = null;

    @property({ type: Node, tooltip: 'SPIN按鈕' })
    private spinBtn: Node = null;

    @property({ type: Node, tooltip: '重複下注按鈕' })
    private repeatAutoBtn: Node = null;

    @property({ type: Node, tooltip: '自動按鈕' })
    private autoBtn: Node = null;

    @property({ type: Node, tooltip: '速度按鈕' })
    private speedBtn: Node = null;

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

    @property({ type: Node, tooltip: '超級SPIN介面' })
    private superSpinUI: Node = null;

    @property({ type: Node, tooltip: '資訊說明按鈕' })
    private backBtn: Node = null;

    private proControllerBtns: Node = null;//直式控制器
    private proOptionMenuBtns: Node = null;//直式選單
    private landOptionMenuBtns: Node = null;//橫式選單

    private isOpenOption: boolean = false;//是否開啟選單
    private isFullScreen: boolean = false;//是否全螢幕
    private audioState: number = AudioState.AudioOn;//音效狀態

    onLoad() {
        BaseEvent.changeOrientation.on(this.onChangeOrientation, this);
        this.proControllerBtns = this.node.getChildByPath('Protrait/ControllerBtns');
        this.proOptionMenuBtns = this.node.getChildByPath('Protrait/OptionMenuBtns');
        this.landOptionMenuBtns = this.node.getChildByPath('Landscape/OptionMenuBtns');
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
        addBtnClickEvent(this.speedBtn, scriptName, this.speedBtn.getComponent(Button), this.onSpeed);
        addBtnClickEvent(this.optionBtn, scriptName, this.optionBtn.getComponent(Button), this.onOption);
        addBtnClickEvent(this.screenBtn, scriptName, this.screenBtn.getComponent(Button), this.onScreen);
        addBtnClickEvent(this.audioBtn, scriptName, this.audioBtn.getComponent(Button), this.onAudio);
        addBtnClickEvent(this.recordBtn, scriptName, this.recordBtn.getComponent(Button), this.onRecord);
        addBtnClickEvent(this.favoritesBtn, scriptName, this.favoritesBtn.getComponent(Button), this.onFavorites);
        addBtnClickEvent(this.informationBtn, scriptName, this.informationBtn.getComponent(Button), this.onInformation);

        addBtnClickEvent(this.backBtn, scriptName, this.backBtn.getComponent(Button), this.onOption);
    }

    /**
     * 切換直橫式
     * @param orientation 
     */
    private onChangeOrientation(orientation: OrientationID) {
        //配置切換直橫式的UI節點
        const changeUIs = Object.values(ChangeUIs).map(key =>
            this[key as keyof this] as Node
        );

        //節點搬移
        changeUIs.forEach((ui, index) => {
            ui.parent = orientation === OrientationID.Portrait ? this.portraitPos[index] : this.landscapePos[index];
        });
    }

    private onSpin() {
        BaseEvent.clickSpin.emit(true);
    }

    private onRepeatAuto() {
        // BaseEvent.clickRepeatAuto.emit(true);
    }

    private onAuto() {
        // BaseEvent.clickAuto.emit(true);
    }

    private onSpeed() {
        // BaseEvent.clickSpeed.emit(true);
    }

    /**
     * 開啟/關閉選單
     */
    private onOption() {
        this.isOpenOption = !this.isOpenOption;
        if (this.isOpenOption) {
            this.proControllerBtns.getComponent(Animation).play('optionMenuHide');
            this.proOptionMenuBtns.getComponent(Animation).play('optionMenuShow');
            this.landOptionMenuBtns.getComponent(Animation).play('optionMenuShow');
        } else {
            this.proControllerBtns.getComponent(Animation).play('optionMenuShow');
            this.proOptionMenuBtns.getComponent(Animation).play('optionMenuHide');
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
        this.audioState = (this.audioState + 1) % 3;
        const audioOn = this.audioBtn.getChildByName('AudioOn');
        const musicOff = this.audioBtn.getChildByName('MusicOff');
        const audioOff = this.audioBtn.getChildByName('AudioOff');

        // 先隱藏所有狀態圖示
        audioOn.active = false;
        musicOff.active = false;
        audioOff.active = false;

        // 根據當前狀態顯示對應圖示
        switch (this.audioState) {
            case AudioState.AudioOn:
                audioOn.active = true;
                AudioManager.getInstance().setMute(false);
                break;
            case AudioState.MusicOff:
                musicOff.active = true;
                AudioManager.getInstance().stop('bgm');
                break;
            case AudioState.AudioOff:
                audioOff.active = true;
                AudioManager.getInstance().setMute(true);
                break;
        }
    }

    private onRecord() {
        // BaseEvent.clickRecord.emit(true);
    }

    private onFavorites() {
        // BaseEvent.clickFavorites.emit(true);
    }

    private onInformation() {
        // BaseEvent.clickInformation.emit(true);
    }

}


