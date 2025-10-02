import { _decorator, Animation, Button, Component, EventKeyboard, EventTouch, KeyCode, Label, Node, tween, Vec3 } from 'cc';

import { Notice } from '@common/components/notice/Notice';

import { BaseConfig } from '@common/script/data/BaseConfig';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent1 } from '@common/script/event/XEvent';
import { NetworkManager } from '@common/script/network/NetworkManager';
import { GameState, TurboMode } from '@common/script/types/BaseType';
import { Utils, addBtnClickEvent } from '@common/script/utils/Utils';

const { ccclass, property } = _decorator;

@ccclass('OldController')
export class OldController extends Component {
    public static changeBet: XEvent1<number> = new XEvent1();

    @property({ type: Node, tooltip: 'bet資訊' })
    private betInfo: Node = null;

    @property({ type: Node, tooltip: '自動按鈕' })
    private autoBtn: Node = null;

    @property({ type: Node, tooltip: '加速按鈕' })
    private turboBtn: Node = null;

    @property({ type: Node, tooltip: 'SPIN節點' })
    private spinBtns: Node = null;

    @property({ type: Node, tooltip: '選項按鈕' })
    private optionBtn: Node = null;

    @property({ type: Node, tooltip: '自動下注彈窗' })
    private autoSpinAlert: Node = null;

    @property({ type: Node, tooltip: '設置頁面彈窗' })
    private settingAlert: Node = null;

    private spinBtn: Node = null;//Spin主要按鈕
    private stopSpinBtn: Node = null;//Spin停止按鈕
    private freeSpin: Node = null;//Spin免費節點
    private stopAutoSpinBtn: Node = null;//自動停止按鈕
    private betPlusBtn: Node = null;//增加下注按鈕
    private betMinusBtn: Node = null;//減少下注按鈕
    private betInfoAlert: Node = null;//直式_資訊欄位

    private balanceValue: Label = null;//剩餘額度
    private totalWinValue: Label = null;//總贏得
    private totalBetValue: Label = null;//總下注

    private isOpenOption: boolean = false;//是否開啟設置選單
    private isOpenAutoSpin: boolean = false;//是否開啟自動下注彈窗

    /**
     * 遊戲初始化設定
     */
    onLoad() {
        this.setNode();//設定節點
        this.setupEventListen();//設定監聽事件
    }

    /**
     * 設定節點
     */
    private setNode() {
        //spin相關按鈕
        this.spinBtn = this.spinBtns.getChildByPath('SpinNode/SpinBtn');
        this.stopSpinBtn = this.spinBtns.getChildByPath('SpinNode/StopSpinBtn');
        this.stopAutoSpinBtn = this.spinBtns.getChildByPath('SpinNode/StopAutoSpinBtn');
        this.freeSpin = this.spinBtns.getChildByPath('SpinNode/FreeSpin');
        this.betPlusBtn = this.spinBtns.getChildByPath('BetPlus');
        this.betMinusBtn = this.spinBtns.getChildByPath('BetMinus');

        //betInfo資訊
        this.balanceValue = this.betInfo.getChildByPath('Balance/Value').getComponent(Label);
        this.totalWinValue = this.betInfo.getChildByPath('TotalWin/Value').getComponent(Label);
        this.totalBetValue = this.betInfo.getChildByPath('TotalBet/Value').getComponent(Label);

        //直式_資訊欄位
        this.betInfoAlert = this.node.getChildByPath('Portrait/BetInfoAlert/BetInfo2');
    }

    /**
     * 設定監聽事件
     */
    private setupEventListen() {
        const scriptName = 'ControllerUI';
        addBtnClickEvent(this.node, scriptName, this.spinBtn.getComponent(Button), this.onSpin);
        addBtnClickEvent(this.node, scriptName, this.stopSpinBtn.getComponent(Button), this.onStopSpin);
        addBtnClickEvent(this.node, scriptName, this.autoBtn.getComponent(Button), this.onAuto);
        addBtnClickEvent(this.node, scriptName, this.turboBtn.getComponent(Button), this.onTurbo);
        addBtnClickEvent(this.node, scriptName, this.optionBtn.getComponent(Button), this.onOption);

        addBtnClickEvent(this.node, scriptName, this.stopAutoSpinBtn.getComponent(Button), this.onStopAutoSpin);
        addBtnClickEvent(this.node, scriptName, this.betPlusBtn.getComponent(Button), this.changeBetClick, '1');
        addBtnClickEvent(this.node, scriptName, this.betMinusBtn.getComponent(Button), this.changeBetClick, '-1');

        OldController.changeBet.on(this.onChangeBet, this);
        BaseEvent.resetSpin.on(this.onResetSpin, this);
    }

    /**
     * 按鍵設定
     * @todo 空白鍵進行 Spin
     */
    protected onKeySpaceDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                this.onStopAutoSpin();
                // AutoSpin.StopAutoSpin();
                this.onSpin();
                return;
            case KeyCode.ENTER:
            case KeyCode.NUM_ENTER:
                // this.clickRepeatAuto();
                return;
        }
    }

    /**
     * 啟用/禁用所有控制類按鈕
     * @param enabled {boolean} 啟用/禁用
     */
    private setControlBtnInteractable(enabled: boolean) {
        this.spinBtn.getComponent(Button).interactable = enabled;
        this.autoBtn.getComponent(Button).interactable = enabled;
        this.turboBtn.getComponent(Button).interactable = enabled;
        this.optionBtn.getComponent(Button).interactable = enabled;

        this.betPlusBtn.getComponent(Button).interactable = enabled;
        this.betMinusBtn.getComponent(Button).interactable = enabled;
    }
    //============================= 按鈕事件 =============================

    /**
     * 執行Spin
     * @param buyFreeBet 購買免費遊戲下注
     */
    private async onSpin(buyFreeBet: number = 0) {
        this.clickAnim(this.spinBtn);
        this.rotateAnim(this.spinBtn);
        //如果不在BS模式下，則不執行Spin功能
        if (!DataManager.getInstance().isBS()) return;
        // if (DataManager.getInstance().superMode) return;
        if (DataManager.getInstance().gameState !== GameState.Ready) return;
        //TODO:關閉遊戲符號資訊
        //TODO:關閉自動SPIN功能

        //TODO:判斷餘額是否足夠，不足要顯示錯誤訊息
        if (!DataManager.getInstance().checkCredit()) {
            Notice.showNoBalance.emit();//顯示餘額不足提示
            return;
        }

        this.setControlBtnInteractable(false);//禁用控制器按鈕
        //判斷此次spin是否為購買免費遊戲(等待server回傳)
        if (buyFreeBet > 0) {
            await NetworkManager.getInstance().sendBuyFreeSpin(buyFreeBet);
        } else {
            await NetworkManager.getInstance().sendSpin();
        }

        //設定遊戲狀態為Running
        DataManager.getInstance().gameState = GameState.Running;
        this.spinBtn.active = false;//隱藏Spin按鈕
        this.stopSpinBtn.active = true;//顯示StopSpin按鈕

        //發送點擊spin事件(確認執行)
        BaseEvent.clickSpin.emit();
    }

    /**
     * click按鈕動畫
     */
    private clickAnim(node: Node) {
        tween(node).to(0.1, { scale: new Vec3(0.7, 0.7, 0.7) }).to(0.15, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();
    }

    /**
     * 旋轉按鈕動畫
     * @param node 節點
     */
    private rotateAnim(node: Node) {
        tween(node).by(1, { angle: 360 }, { easing: 'linear' }).start();
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
        DataManager.getInstance().isAutoMode = false;
        DataManager.getInstance().autoSpinCount = 0;
    }

    /**
     * 改變下注按下事件
     * @param event 事件
     * @param eventData 事件數據
     */
    private changeBetClick(event: EventTouch, eventData: string) {
        const changeValue = parseInt(eventData);
        OldController.changeBet.emit(changeValue);
    }

    /**
     * 改變下注
     * @param changeValue 改變值（正數為增加，負數為減少）
     */
    private onChangeBet(changeValue: number) {
        //下注數值更新(添加幣別符號與格式化)
        const betValue = DataManager.getInstance().getChangeBetValue(changeValue);
        this.totalBetValue.string = BaseConfig.CurrencySymbol + Utils.numberFormat(betValue);
    }

    /**
     * 點擊自動下注按鈕
     */
    private onAuto() {
        this.isOpenAutoSpin = !this.isOpenAutoSpin;
        this.autoSpinAlert.active = this.isOpenAutoSpin;
    }

    /**
     * 切換加速模式
     */
    private onTurbo() {
        let tempTurboMode = DataManager.getInstance().turboMode;
        tempTurboMode = (tempTurboMode + 1) % 3;
        DataManager.getInstance().turboMode = tempTurboMode;
        const normalNode = this.turboBtn.getChildByName('Normal');
        const speedNode = this.turboBtn.getChildByName('Speed');
        const turboNode = this.turboBtn.getChildByName('Turbo');
        normalNode.active = tempTurboMode === TurboMode.Normal;
        speedNode.active = tempTurboMode === TurboMode.Fast;
        turboNode.active = tempTurboMode === TurboMode.Turbo;
    }

    /**
     * 開啟/關閉選單
     */
    private onOption() {
        this.isOpenOption = !this.isOpenOption;
        this.betInfoAlert.active = this.isOpenOption;
        this.settingAlert.active = this.isOpenOption;
    }
}