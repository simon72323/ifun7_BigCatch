import { _decorator, Animation, Button, Component, EventTouch, KeyCode, Label, Node, screen, Tween, tween, Vec3 } from 'cc';

import { Notice } from '@common/components/notice/Notice';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent, XEvent1, XEvent2 } from '@common/script/event/XEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { AudioMode, ModuleID, TurboMode } from '@common/script/types/BaseType';
import { addBtnClickEvent, Utils } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;

@ccclass('SettingsController')
export class SettingsController extends Component {
    private static _instance: SettingsController = null;

    public static getInstance(): SettingsController {
        return SettingsController._instance;
    }

    /**刷新獲得 */
    public static refreshWin: XEvent2<number, number> = new XEvent2();
    /**刷新額度 */
    public static refreshCredit: XEvent1<number> = new XEvent1();
    /**刷新額度 */
    public static refreshBet: XEvent1<number> = new XEvent1();
    /**設定是否可用 */
    public static setEnabled: XEvent1<boolean> = new XEvent1();
    /**更新自動Spin次數 */
    public static updateAutoSpinCount: XEvent = new XEvent();
    /**更新免費Spin次數 */
    public static updateFreeSpinCount: XEvent1<number> = new XEvent1();
    /**改變下注 */
    public static changeBetValue: XEvent1<number> = new XEvent1();
    /**處理點擊Spin按鈕 */
    public static clickSpin: XEvent1<boolean> = new XEvent1();

    /**執行自動遊戲 */
    public static runAutoSpin: XEvent = new XEvent();

    @property({ type: Node, tooltip: 'bet資訊' })
    private betInfo: Node = null;

    @property({ type: Node, tooltip: 'SPIN節點' })
    private spinNode: Node = null;


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

    private porControllerBtns: Node = null;//直式控制器
    private porOptionMenu: Node = null;//直式選單
    private landOptionMenu: Node = null;//橫式選單

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

    /**當前設置頁面 0=spin頁面 1=menu頁面*/
    private curSettingPage: number = 0;
    private totalBet: number = 0;//總下注


    /**
     * 遊戲初始化設定
     */
    protected onLoad() {
        SettingsController._instance = this;
        this.setNode();//設定節點
        this.setupBtnEvent();//設定按鈕Click事件
        this.setEventListen();//設定事件監聽
    }

    /**
     * 設定節點
     */
    private setNode() {
        this.porControllerBtns = this.node.getChildByName('Por_ControllerBtns');
        this.porOptionMenu = this.node.getChildByName('Por_OptionMenu');
        this.landOptionMenu = this.node.getChildByName('Land_OptionMenu');

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
        const scriptName = 'SettingsController';
        addBtnClickEvent(this.node, scriptName, this.spinBtn.getComponent(Button), this.onClickSpin);
        addBtnClickEvent(this.node, scriptName, this.stopSpinBtn.getComponent(Button), this.onClickStopSpin);
        addBtnClickEvent(this.node, scriptName, this.autoBtn.getComponent(Button), this.onClickAuto);
        addBtnClickEvent(this.node, scriptName, this.turboBtn.getComponent(Button), this.onClickTurbo);
        addBtnClickEvent(this.node, scriptName, this.optionBtn.getComponent(Button), this.onClickOption);
        addBtnClickEvent(this.node, scriptName, this.screenBtn.getComponent(Button), this.onClickScreen);
        addBtnClickEvent(this.node, scriptName, this.audioBtn.getComponent(Button), this.onClickAudio);
        addBtnClickEvent(this.node, scriptName, this.recordBtn.getComponent(Button), this.onClickRecord);
        addBtnClickEvent(this.node, scriptName, this.favoritesBtn.getComponent(Button), this.onClickFavorites);
        addBtnClickEvent(this.node, scriptName, this.informationBtn.getComponent(Button), this.onClickInformation);

        addBtnClickEvent(this.node, scriptName, this.backBtn.getComponent(Button), this.onClickOption);
        addBtnClickEvent(this.node, scriptName, this.stopAutoSpinBtn.getComponent(Button), this.onStopAutoSpin);
        addBtnClickEvent(this.node, scriptName, this.addBetBtn.getComponent(Button), this.changeBet, '1');
        addBtnClickEvent(this.node, scriptName, this.minusBetBtn.getComponent(Button), this.changeBet, '-1');
    }

    /**
     * 設定事件監聽
     */
    private setEventListen() {
        BaseEvent.resetSpin.on(this.onResetSpin, this);
        BaseEvent.changeScene.on(this.sceneChange, this);
        BaseEvent.setTurboBtnState.on(this.setTurboBtnState, this);//設定快速模式按鈕狀態
        BaseEvent.runAutoSpin.on(this.runAutoSpin, this);//執行自動遊戲
        BaseEvent.stopAutoSpin.on(this.onStopAutoSpin, this);//停止自動遊戲

        SettingsController.refreshCredit.on(this.refreshCredit, this);//監聽刷新餘額事件
        SettingsController.refreshBet.on(this.refreshBet, this);//監聽刷新下注事件
        SettingsController.refreshWin.on(this.refreshWin, this);//監聽刷新獲得事件
        SettingsController.setEnabled.on(this.setBtnInteractable, this);//監聽設定是否可用事件
        SettingsController.updateAutoSpinCount.on(this.updateAutoSpinCount, this);
        SettingsController.updateFreeSpinCount.on(this.updateFreeSpinCount, this);
        SettingsController.changeBetValue.on(this.changeBetValue, this);
        SettingsController.clickSpin.on(this.handleClickSpin, this);//點擊Spin按鈕
    }

    /**
     * 清除事件監聽
     */
    protected onDestroy() {
        BaseEvent.resetSpin.off(this);
        SettingsController.refreshCredit.off(this);
        SettingsController.refreshBet.off(this);
        SettingsController.refreshWin.off(this);
        SettingsController.setEnabled.off(this);
        SettingsController.updateAutoSpinCount.off(this);
        SettingsController.updateFreeSpinCount.off(this);
    }

    /**
     * 開始遊戲初始化
     */
    public initialize() {
        BaseEvent.keyDown.on((keyCode: KeyCode) => {
            if (keyCode == KeyCode.SPACE || keyCode == KeyCode.ENTER) {
                this.handleClickSpin();
            }
        }, this);
    }

    /**
     * 禁用全螢幕
     * @returns {boolean} 是否禁用全螢幕
     */
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
     * 啟用/禁用所有控制類按鈕
     * @param enabled {boolean} 啟用/禁用
     */
    private setBtnInteractable(enabled: boolean) {
        //TODO:免費遊戲鈕也要同步控制
        this.spinBtn.getComponent(Button).interactable = enabled;
        this.autoBtn.getComponent(Button).interactable = enabled;
        this.turboBtn.getComponent(Button).interactable = enabled;
        this.optionBtn.getComponent(Button).interactable = enabled;
        this.informationBtn.getComponent(Button).interactable = enabled;

        //true時要判斷更新+-按鈕是否可用，false時直接禁用
        if (enabled) {
            this.updateBetBtnInteractable();
        } else {
            this.addBetBtn.getComponent(Button).interactable = false;
            this.minusBetBtn.getComponent(Button).interactable = false;
        }
    }

    /**
     * 更新下注+-按鈕是否可用
     */
    private updateBetBtnInteractable() {
        this.addBetBtn.getComponent(Button).interactable = DataManager.getInstance().bet.getPlusEnabled();
        this.minusBetBtn.getComponent(Button).interactable = DataManager.getInstance().bet.getLessEnabled();
    }

    private sceneChange(moduleID: ModuleID) {
        if (moduleID === ModuleID.BS) {
            if (DataManager.getInstance().isAutoMode) {
                //自動轉模式，則顯示停止按鈕
                this.spinBtn.active = false;
                this.stopSpinBtn.active = true;
                this.stopAutoSpinBtn.active = true;
                this.freeSpin.active = false;
            } else {
                this.onResetSpin();
            }
        } else {
            this.spinBtn.active = false;
            this.stopSpinBtn.active = false;
            this.stopAutoSpinBtn.active = false;
            this.freeSpin.active = true;
            // this.updateFreeSpinCount();
        }
    }

    //===============================spinNode相關操作=================================
    /**
     * 按下Spin按鈕事件(按鈕會有event事件，所以需要分開處理，不然handleClickSpin會傳入true)
     */
    private async onClickSpin() {
        this.handleClickSpin();
    }

    /**
     * 處理點擊Spin按鈕
     * @param isBuyFs 是否購買免費遊戲
     */
    private handleClickSpin(isBuyFs: boolean = false) {
        this.clickAnim(this.spinBtn);
        this.rotateAnim(this.spinBtn);
        this.setBtnInteractable(false);//禁用控制器按鈕
        //切換成停止按鈕
        Utils.fadeOut(this.spinBtn, 0.1, 255, 0, () => {
            this.spinBtn.active = false;
            this.stopSpinBtn.active = true;
            this.stopSpinBtn.getComponent(Button).interactable = true;
            this.stopSpinBtn.getComponent(Animation).play('stopSpinShow');
        });

        BaseEvent.clickSpin.emit(isBuyFs);
        console.log('發送Spin請求');
    }


    /**
     * 按下按鈕動畫
     */
    private clickAnim(node: Node) {
        tween(node).to(0.1, { scale: new Vec3(0.7, 0.7, 0.7) }).to(0.15, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();
    }

    /**
     * 旋轉按鈕動畫
     * @param node 節點
     */
    private rotateAnim(node: Node) {
        tween(node).by(0.2, { angle: -180 }, { easing: 'linear' })
            .call(() => {
                node.angle = 0;
            })
            .start();
    }

    /**
     * 執行回歸重置Spin按鈕
     */
    private onResetSpin() {
        if (this.spinBtn.active) return;
        Utils.fadeOut(this.stopSpinBtn, 0.1, 255, 0, () => {
            this.stopSpinBtn.active = false;
            this.freeSpin.active = false;
            this.stopAutoSpinBtn.active = false;
            this.spinBtn.active = true;
            this.spinBtn.getComponent(Animation).play('spinBtnShow');
            this.setBtnInteractable(true);//啟用控制器按鈕
        });
    }

    /**
     * 按下停止spin按鈕事件
     */
    private onClickStopSpin() {
        this.clickAnim(this.stopSpinBtn);
        this.stopSpinBtn.getComponent(Button).interactable = false;
        BaseEvent.clickStop.emit();
        // SlotMachine.slotSkip.
    }

    /**
     * 停止自動Spin
     */
    private onStopAutoSpin() {
        this.stopAutoSpinBtn.active = false;
        DataManager.getInstance().isAutoMode = false;
        DataManager.getInstance().autoSpinCount = 0;
        this.stopSpinBtn.getComponent(Button).interactable = false;
        // this.stopSpinBtn.active = false;
        // if (this.spinBtn.active) return;
        // Utils.fadeOut(this.stopSpinBtn, 0.1, 255, 0, () => {
        //     this.stopSpinBtn.active = false;
        //     this.freeSpin.active = false;
        //     this.stopAutoSpinBtn.active = false;
        //     this.spinBtn.active = true;
        //     this.spinBtn.getComponent(Animation).play('spinBtnShow');
        //     this.setBtnInteractable(true);//啟用控制器按鈕
        // });
        // this.onResetSpin();
    }

    /**
     * 執行自動遊戲
     */
    private runAutoSpin() {
        if (DataManager.getInstance().autoSpinCount === 0) {
            this.onStopAutoSpin();
            return;
        }
        this.stopAutoSpinBtn.active = true;
        if (DataManager.getInstance().autoSpinCount > 0) {
            DataManager.getInstance().autoSpinCount--;//自動遊戲次數減1
        }
        this.updateAutoSpinCount();
        this.handleClickSpin();
    }

    /**
     * 更新自動Spin次數
     */
    private updateAutoSpinCount() {
        const stopAutoLabel = this.stopAutoSpinBtn.getChildByName('Label').getComponent(Label);
        //數字跳動
        this.tweenScale(stopAutoLabel.node);
        if (DataManager.getInstance().autoSpinCount < 0)
            stopAutoLabel.string = '∞';
        else
            stopAutoLabel.string = DataManager.getInstance().autoSpinCount.toString();
    }

    /**
     * 更新自動Spin次數
     */
    private updateFreeSpinCount(times: number) {
        const freeSpinLabel = this.freeSpin.getChildByName('Label').getComponent(Label);
        //數字跳動
        this.tweenScale(freeSpinLabel.node);
        freeSpinLabel.string = times.toString();
    }

    /**
     * 數字跳動動畫
     * @param node 節點
     */
    private tweenScale(node: Node) {
        tween(node).to(0.1, { scale: new Vec3(1.5, 1.5, 1) }).to(0.2, { scale: new Vec3(1, 1, 1) }).start();
    }

    //===============================spinNode相關操作=================================

    /**
     * 點擊自動下注按鈕
     */
    private onClickAuto() {
        console.log('onClickAuto');
        BaseEvent.showAutoSpin.emit();
    }

    /**
     * 改變下注+-
     * @param event 事件
     * @param eventData 事件數據
     */
    private changeBet(event: EventTouch, eventData: string) {
        console.log('changeBet', eventData);
        const changeValue = parseInt(eventData);
        this.changeBetValue(changeValue);
    }

    /**
     * 改變下注值
     * @param changeValue 改變值(1為增加，-1為減少)
     * @param callback 回調函數
     */
    private changeBetValue(changeValue: number) {
        //下注數值更新(添加幣別符號與格式化)
        DataManager.getInstance().bet.getChangeBetValue(changeValue);
        const betTotal = DataManager.getInstance().bet.getBetTotal();
        this.refreshBet(betTotal);
        // this.totalBetValue.string = Utils.numberFormatCurrency(betValue);
        this.updateBetBtnInteractable();

        //更新購買功能是否可用
        const buyFeatureTotal = DataManager.getInstance().bet.getBuyFeatureTotal();
        BaseEvent.buyFeatureEnabled.emit(buyFeatureTotal !== -1);//-1代表不可購買
    }

    /**
     * 切換加速模式
     */
    private onClickTurbo() {
        let tempTurboMode = DataManager.getInstance().curTurboMode;
        tempTurboMode = (tempTurboMode + 1) % 3;
        DataManager.getInstance().curTurboMode = tempTurboMode;
        this.setTurboBtnState(tempTurboMode);
    }

    /**
     * 設定快速模式按鈕狀態
     * @param turboMode 快速模式
     */
    private setTurboBtnState(turboMode: TurboMode) {
        const normalNode = this.turboBtn.getChildByName('Normal');
        const speedNode = this.turboBtn.getChildByName('Speed');
        const turboNode = this.turboBtn.getChildByName('Turbo');
        normalNode.active = turboMode === TurboMode.Normal;
        speedNode.active = turboMode === TurboMode.Fast;
        turboNode.active = turboMode === TurboMode.Turbo;
    }

    /**
     * 開啟/關閉選單
     */
    private onClickOption() {
        this.isOpenOption = !this.isOpenOption;
        if (this.isOpenOption) {
            this.porControllerBtns.getComponent(Animation).play('optionMenuHide');
            this.porOptionMenu.getComponent(Animation).play('optionMenuShow');
            this.landOptionMenu.getComponent(Animation).play('optionMenuShow');
        } else {
            this.porControllerBtns.getComponent(Animation).play('optionMenuShow');
            this.porOptionMenu.getComponent(Animation).play('optionMenuHide');
            this.landOptionMenu.getComponent(Animation).play('optionMenuHide');
        }
    }

    /**
     * 切換全螢幕
     */
    private onClickScreen() {
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
    private onClickAudio() {
        this.audioMode = (this.audioMode + 1) % 3;
        const audioOnNode = this.audioBtn.getChildByName('AudioOn');
        const musicOffNode = this.audioBtn.getChildByName('MusicOff');
        const audioOffNode = this.audioBtn.getChildByName('AudioOff');

        // 先隱藏所有狀態圖示
        audioOnNode.active = this.audioMode === AudioMode.AudioOn;
        musicOffNode.active = this.audioMode === AudioMode.MusicOff;
        audioOffNode.active = this.audioMode === AudioMode.AudioOff;

        // 根據當前狀態顯示對應圖示
        const audio = AudioManager.getInstance();
        switch (this.audioMode) {
            case AudioMode.AudioOn:
                audio.setSoundMute(false);//音效開
                audio.setMusicMute(false);//音樂開
                break;
            case AudioMode.MusicOff:
                audio.setMusicMute(true);//音樂關
                audio.setSoundMute(false);//音效開
                break;
            case AudioMode.AudioOff:
                audio.setSoundMute(true);//音效關
                audio.setMusicMute(true);//音樂關
                break;
        }
    }

    /**
     * 開啟下注紀錄
     */
    private onClickRecord() {
        const betrecordurl = DataManager.getInstance().getFullBetrecordurl();
        window.open(betrecordurl, '_blank');
    }

    /**
     * 開啟我的最愛視窗
     */
    private onClickFavorites() {
        // 開啟我的最愛視窗
    }

    /**
     * 開啟遊戲說明
     */
    private onClickInformation() {
        BaseEvent.showGameInformation.emit();
        // GameHelpWebView.show.emit();
        // 發送xevent 開啟遊戲說明
        // if (this.machine.isBusy === true) return;
        // this.clickOptionBack();
        // Utils.GoogleTag('ClickInformation', { 'event_category': 'Information', 'event_label': 'ClickInformation' });
        // GameInformationUI.OpenUI();
    }


    //============================= 刷新BetInfo資訊 =============================
    /**刷新可用餘額 */
    private refreshCredit(value: number): void {
        const userCredit = DataManager.getInstance().userCredit;
        if (userCredit === value) {
            this.balanceValue.string = Utils.numberFormatCurrency(value);
            return;
        }
        Utils.runNumberCurrency(0.3, this.balanceValue, { curValue: userCredit, finalValue: value });
    }

    /**刷新下注 */
    private refreshBet(newBet: number): void {
        Tween.stopAllByTarget(this.totalBetValue.node);
        let oldBet = this.totalBet;
        //資料有異動才跳動
        if (newBet !== oldBet) {
            tween(this.totalBetValue.node)
                .to(0.1, { scale: new Vec3(1.2, 1.2, 1) })
                .to(0.1, { scale: new Vec3(1, 1, 1) })
                .start();
        }
        this.totalBet = newBet;
        this.totalBetValue.string = Utils.numberFormatCurrency(newBet);
    }

    /**刷新獲得 */
    private refreshWin(startValue: number, endValue: number): void {
        if (endValue <= 0) {
            this.totalWinValue.string = '';
            return;
        }
        Utils.runNumberCurrency(0.3, this.totalWinValue, { curValue: startValue, finalValue: endValue });
    }


    /**
     * 獲取Spin按鈕位置
     * @returns Spin按鈕位置
     */
    public getSpinPos(): Vec3 {
        const parent2Pos = this.spinNode.parent.parent.position;
        const parentPos = this.spinNode.parent.position;
        return parent2Pos.clone().add(parentPos);
    }
    //============================= 刷新BetInfo資訊 =============================
}