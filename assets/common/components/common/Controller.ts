import { _decorator, Animation, Button, Component, EventKeyboard, EventTouch, KeyCode, Label, Node, screen, tween, UIOpacity } from 'cc';

import { BaseEvent } from '@base/script/main/BaseEvent';
import { AudioMode, GameState, ModuleID, TurboMode } from '@base/script/types/BaseType';
import { addBtnClickEvent, XUtils } from '@base/script/utils/XUtils';

import { GameConfig } from '@common/script/data/BaseConfig';
import { DataManager } from '@common/script/data/DataManager';
import { NetworkData } from '@common/script/data/NetworkData';
import { AudioManager } from '@common/script/manager/AudioManager';
import { ISpinData } from '@common/script/network/NetworkApi';
import { NetworkManager } from '@common/script/network/NetworkManager';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {
    @property({ type: Node, tooltip: 'bet資訊' })
    private betInfo: Node = null;

    @property({ type: Node, tooltip: 'SPIN節點' })
    private spinNode: Node = null;

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

    @property({ type: Node, tooltip: '增加下注按鈕' })
    private addBetBtn: Node = null;

    @property({ type: Node, tooltip: '減少下注按鈕' })
    private minusBetBtn: Node = null;

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

    private spinBtn: Node = null;//Spin主要按鈕
    private stopSpinBtn: Node = null;//Spin停止按鈕
    private freeSpin: Node = null;//Spin免費節點
    private stopAutoSpinBtn: Node = null;//自動停止按鈕

    private balanceValue: Label = null;//剩餘額度
    private totalWinValue: Label = null;//總贏得
    private totalBetValue: Label = null;//總下注


    /**
     * 初始化
     */
    onLoad() {
        this.setNode();
        this.setupBtnEvent();
        this.setEventListen();
    }

    /**
     * 設定節點
     */
    private setNode() {
        this.superSpin = this.node.getChildByName('SuperSpin');
        this.content = this.superSpin.getChildByName('Content');
        this.preMessage = this.superSpin.getChildByName('PreMessage');
        this.BsBg = this.superSpin.getChildByName('BsBg');
        this.FsBg = this.superSpin.getChildByName('FsBg');

        this.porControllerBtns = this.node.getChildByPath('Por_ControllerBtns');
        this.porOptionMenuBtns = this.node.getChildByPath('Por_OptionMenuBtns');
        this.landOptionMenuBtns = this.node.getChildByPath('Land_OptionMenuBtns');

        this.balanceValue = this.betInfo.getChildByPath('Balance/Value').getComponent(Label);
        this.totalWinValue = this.betInfo.getChildByPath('TotalWin/Value').getComponent(Label);
        this.totalBetValue = this.betInfo.getChildByPath('TotalBet/Value').getComponent(Label);

        this.spinBtn = this.spinNode.getChildByName('SpinBtn');
        this.stopSpinBtn = this.spinNode.getChildByName('StopSpinBtn');
        this.freeSpin = this.spinNode.getChildByName('FreeSpin');
        this.stopAutoSpinBtn = this.spinNode.getChildByName('StopAutoSpinBtn');
    }

    /**
     * 設定按鈕Click事件
     */
    private setupBtnEvent() {
        const scriptName = 'ControllerUI';
        addBtnClickEvent(this.spinBtn, scriptName, this.spinBtn.getComponent(Button), this.onSpin);
        addBtnClickEvent(this.stopSpinBtn, scriptName, this.stopSpinBtn.getComponent(Button), this.onStopSpin);
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
        addBtnClickEvent(this.stopAutoSpinBtn, scriptName, this.stopAutoSpinBtn.getComponent(Button), this.onStopAutoSpin);
        addBtnClickEvent(this.addBetBtn, scriptName, this.addBetBtn.getComponent(Button), this.changeBet, '1');
        addBtnClickEvent(this.minusBetBtn, scriptName, this.minusBetBtn.getComponent(Button), this.changeBet, '-1');
    }

    /**
     * 設定事件監聽
     */
    private setEventListen() {
        BaseEvent.resetSpin.on(this.onResetSpin, this);
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
     * 啟用/禁用控制器按鈕
     * @param enabled {boolean} 啟用/禁用
     */
    private setControlBtnInteractable(enabled: boolean) {
        this.spinBtn.getComponent(Button).interactable = enabled;
        this.repeatAutoBtn.getComponent(Button).interactable = enabled;
        this.autoBtn.getComponent(Button).interactable = enabled;
        this.turboBtn.getComponent(Button).interactable = enabled;
        this.optionBtn.getComponent(Button).interactable = enabled;

        this.addBetBtn.getComponent(Button).interactable = enabled;
        this.minusBetBtn.getComponent(Button).interactable = enabled;
        // this.screenBtn.getComponent(Button).interactable = bool;
        // this.audioBtn.getComponent(Button).interactable = bool;
    }

    /**
     * 顯示/關閉超級 SPIN 模式
     * @param show {boolean} 顯示/關閉
     */
    private showSuperSpin(show: boolean) {
        this.superSpin.active = show;
        this.content.active = !show;
        this.preMessage.active = show;
        const isBS = DataManager.getInstance().isBS();
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
     * @param buyFreeBet 購買免費遊戲下注
     */
    private async onSpin(buyFreeBet: number = 0) {
        if (!DataManager.getInstance().isBS()) return;
        this.setControlBtnInteractable(false);//禁用控制器按鈕
        this.spinDownAnim();

        //切換Spin按鈕狀態為Loop
        // DataManager.getInstance().curSpinBtnState = SpinBtnState.Loop;

        //判斷此次spin是否為購買免費遊戲
        if (buyFreeBet > 0) {
            await NetworkManager.getInstance().sendBuyFreeSpin(buyFreeBet);
        } else {
            await NetworkManager.getInstance().sendSpin();
        }
        //要等待server回傳下注正確後才能執行後續操作
        DataManager.getInstance().gameState = GameState.Running;

        const isSuperMode = DataManager.getInstance().isSuperMode;
        if (isSuperMode) this.showSuperSpinContent();
        BaseEvent.clickSpin.emit(isSuperMode);
    }

    /**
     * 執行SpinDown動畫
     */
    private spinDownAnim() {
        const animation = this.spinBtn.getComponent(Animation);
        animation.once(Animation.EventType.FINISHED, () => {
            this.spinBtn.active = false;
            this.stopSpinBtn.getComponent(UIOpacity).opacity = 255;
            this.stopSpinBtn.active = true;
            this.stopSpinBtn.getComponent(Animation).play('stopSpinBtnShow');
        });
        animation.play('spinBtnDown');
    }

    /**
     * 執行ResetSpin動畫
     */
    private onResetSpin() {
        const animation = this.stopSpinBtn.getComponent(Animation);
        animation.once(Animation.EventType.FINISHED, () => {
            this.stopSpinBtn.active = false;
            this.spinBtn.active = true;
            this.spinBtn.getComponent(Animation).play('spinBtnShow');
            this.setControlBtnInteractable(true);//啟用控制器按鈕
        });
        animation.play('stopSpinBtnDown');
    }

    /**
     * 停止spin
     */
    private onStopSpin() {
        // this.stopSpinBtn.getComponent(Button).interactable = false;//禁用停止按鈕

        //要判斷是否轉動中，觸發立即停止
        if (DataManager.getInstance().gameState === GameState.Running) {
            BaseEvent.clickStop.emit();
        }
    }

    /**
     * 停止自動Spin
     */
    private onStopAutoSpin() {
        this.stopAutoSpinBtn.active = false;
        // this.freeSpin.active = false;
        // this.spinBtn.active = true;
    }



    /**
     * 改變下注
     * @param event 事件
     * @param eventData 事件數據
     */
    private changeBet(event: EventTouch, eventData: string) {
        const changeValue = parseInt(eventData);
        //改變下注
        const betValue = DataManager.getInstance().getChangeBetValue(changeValue);
        // 添加币别符号并格式化数字
        this.totalBetValue.string = GameConfig.CurrencySymbol + Utils.numberFormat(betValue);
    }

    // private onMinusBet() {
    //     // DataManager.getInstance().minusBet();
    // }

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
        let tempTurboMode = DataManager.getInstance().turboMode;
        tempTurboMode = (tempTurboMode + 1) % 4;
        DataManager.getInstance().turboMode = tempTurboMode;
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
        this.showSuperSpin(tempTurboMode === TurboMode.Super);

        // 根據當前狀態顯示對應圖示
        switch (tempTurboMode) {
            case TurboMode.Normal:
                normalNode.active = true;
                DataManager.getInstance().setTurboMode(TurboMode.Normal);
                break;
            case TurboMode.Speed:
                speedNode.active = true;
                DataManager.getInstance().setTurboMode(TurboMode.Speed);
                break;
            case TurboMode.Turbo:
                turboNode.active = true;
                DataManager.getInstance().setTurboMode(TurboMode.Turbo);
                break;
            case TurboMode.Super:
                superNode.active = true;
                DataManager.getInstance().setTurboMode(TurboMode.Super);
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
        const betrecordurl = DataManager.getInstance().getFullBetrecordurl();
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