
import { _decorator, Animation, Button, CCBoolean, Component, Node, screen } from 'cc';
import { EDITOR } from 'cc/env';

import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { AudioMode, OrientationID, TurboMode } from '@base/script/types/BaseType';
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

    @property({ type: Node, tooltip: '超級SPIN介面' })
    private superSpinUI: Node = null;

    @property({ type: Node, tooltip: '資訊說明按鈕' })
    private backBtn: Node = null;

    private proControllerBtns: Node = null;//直式控制器
    private proOptionMenuBtns: Node = null;//直式選單
    private landOptionMenuBtns: Node = null;//橫式選單

    private isOpenOption: boolean = false;//是否開啟選單
    private isFullScreen: boolean = false;//是否全螢幕
    private audioMode: number = AudioMode.AudioOn;//音效模式
    private turboMode: number = TurboMode.Normal;//加速模式

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


    /**
     * 按鍵設定
     * @todo 空白鍵進行 Spin
     */
    // protected onKeySpaceDown(event: EventKeyboard) { 
    //     switch ( event.keyCode ) {
    //         case KeyCode.SPACE:
    //             AutoSpin.StopAutoSpin();
    //             this.clickSpin();
    //             return;
    //         case KeyCode.ENTER:
    //         case KeyCode.NUM_ENTER:
    //             this.clickRepeatAuto();
    //             return;
    //     }
    // }

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
     * 啟用/禁用超級 SPIN 模式
     * @param active {boolean} 啟用/禁用
     */
    // public activeSuperSpinMode(active) {
    //     if ( active === true ) {
    //         this.properties['speedMode'][Machine.SPIN_MODE.NORMAL]['next'] = Machine.SPIN_MODE.QUICK;
    //         this.properties['speedMode'][Machine.SPIN_MODE.QUICK]['next']  = Machine.SPIN_MODE.TURBO;
    //         this.properties['speedMode'][Machine.SPIN_MODE.TURBO]['next'] = Machine.SPIN_MODE.SUPER;
    //         this.properties['speedMode'][Machine.SPIN_MODE.SUPER]['next'] = Machine.SPIN_MODE.NORMAL;
    //     } else {
    //         this.properties['speedMode'][Machine.SPIN_MODE.NORMAL]['next'] = Machine.SPIN_MODE.QUICK;
    //         this.properties['speedMode'][Machine.SPIN_MODE.QUICK]['next']  = Machine.SPIN_MODE.TURBO;
    //         this.properties['speedMode'][Machine.SPIN_MODE.TURBO]['next'] = Machine.SPIN_MODE.NORMAL;
    //     }

    //     this.props['superSpin']['winParticle'] = {
    //         'idx' : 0,
    //         'particles': [
    //             this.props['superSpin']['winParticle1'][DATA_TYPE.COMPONENT],
    //             this.props['superSpin']['winParticle2'][DATA_TYPE.COMPONENT],
    //             this.props['superSpin']['winParticle3'][DATA_TYPE.COMPONENT],
    //             this.props['superSpin']['winParticle4'][DATA_TYPE.COMPONENT],
    //             this.props['superSpin']['winParticle5'][DATA_TYPE.COMPONENT],
    //         ]
    //     };
    //     const copy = instantiate(this.props['superSpin']['win'].node);
    //     ObjectPool.registerNode('winLabelClone', copy);
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
        const normalNode = this.audioBtn.getChildByName('Normal');
        const speedNode = this.audioBtn.getChildByName('Speed');
        const turboNode = this.audioBtn.getChildByName('Turbo');
        const superNode = this.audioBtn.getChildByName('Super');

        // 先隱藏所有狀態圖示
        normalNode.active = false;
        speedNode.active = false;
        turboNode.active = false;
        superNode.active = false;

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
                //觸發點擊超級SPIN事件
                BaseEvent.clickSuperSpin.emit(true);
                break;
        }
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


