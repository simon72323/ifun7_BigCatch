import { _decorator, Button, Color, Component, EventTouch, Label, Node, Rect, Sprite, tween, Tween, Vec3 } from 'cc';



import { TextAdjust } from '@base/components/TextAdjust';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { BaseConst } from '@common/script/data/BaseConst';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';

import { XEvent, XEvent1 } from '@common/script/event/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { DataManager } from '@common/script/data/DataManager';

const { ccclass } = _decorator;

/**
 * 餘額、下注、獲得資料列
 */
@ccclass('InfoBar')
export class InfoBar extends Component {

    /**移到上方 */
    public static moveToTop: XEvent = new XEvent();
    /**移到下方 */
    public static moveToDown: XEvent = new XEvent();

    public static clickBet: XEvent = new XEvent();
    public static clickWin: XEvent = new XEvent();

    public static setEnabled: XEvent1<boolean> = new XEvent1();

    /**是否顯示背景 */
    public static setBlackBg: XEvent1<boolean> = new XEvent1();

    /**餘額 */
    private Credit: Node = null;
    private CreditCCy: Node = null;
    /**下注 */
    private Bet: Node = null;
    /**獲得 */
    private Win: Node = null;

    /**啟用顏色 */
    private enableColor: Color = new Color(176, 224, 230, 255);

    /**容器 */
    private container: Node;

    onLoad() {
        this.container = this.node.getChildByPath('Container');
        this.Credit = this.container.getChildByPath('Credit');
        this.CreditCCy = this.container.getChildByPath('CreditCurrency');
        this.Bet = this.container.getChildByPath('BtnBet');
        this.Win = this.container.getChildByPath('WinBtn');

        BaseEvent.refreshCredit.on(this.refreshCredit, this);//監聽刷新餘額事件
        BaseEvent.refreshBet.on(this.refreshBet, this);//監聽刷新下注事件
        BaseEvent.refreshWin.on(this.refreshWin, this);//監聽刷新獲得事件

        InfoBar.moveToTop.on(this.moveToTop, this);//監聽移到上方事件
        InfoBar.moveToDown.on(this.moveToDown, this);//監聽移到下方事件(禁止按鈕點擊)
        InfoBar.setEnabled.on(this.setEnabled, this);//監聽設定是否可用事件
        InfoBar.setBlackBg.on(this.setBlackBg, this);//監聽設定是否顯示背景事件

        this.Win.on(Button.EventType.CLICK, this.onWinClick, this);//監聽贏分按鈕點擊事件
        this.Bet.on(Button.EventType.CLICK, this.onBetClick, this);//監聽下注按鈕點擊事件

        // this.loadCurrencyAssets();//刷新幣別資源
    }

    /**移到上方 */
    private moveToTop(): void {
        this.container.setPosition(0, -414);
        InfoBar.setEnabled.emit(true);
    }

    /**移到下方 */
    private moveToDown(): void {
        this.container.setPosition(0, -608);
        InfoBar.setEnabled.emit(false);
    }

    /**刷新餘額 */
    private refreshCredit(value: number): void {
        this.Credit.getComponent(Label).string = XUtils.NumberToCentString(value);
    }

    /**刷新下注 */
    private refreshBet(value: number): void {
        const betNode = this.Bet.getChildByName('Bet');
        Tween.stopAllByTarget(betNode);
        let newBet = XUtils.NumberToCentString(value);
        let oldBet = betNode.getComponent(Label).string;
        //資料有異動才跳動
        if (newBet != oldBet) {
            tween(betNode)
                .to(0.15, { scale: new Vec3(1.2, 1.2, 1) })
                .to(0.15, { scale: new Vec3(1, 1, 1) })
                .start();
        }
        betNode.getComponent(Label).string = newBet;
    }

    private refreshWin(value: number): void {
        this.Win.getChildByName('Win').getComponent(Label).string = XUtils.NumberToCentString(value);
    }

    /**設定是否可用 */
    private setEnabled(enabled: boolean): void {
        if (enabled) {

            this.Credit.getComponent(Label).color = this.enableColor;
            this.CreditCCy.getComponent(Sprite).color = this.enableColor;

            this.Bet.getChildByName('Bet').getComponent(Label).color = this.enableColor;
            this.Win.getChildByName('Win').getComponent(Label).color = this.enableColor;

            this.Bet.getChildByName('BetCurrency').getComponent(Sprite).color = this.enableColor;
            this.Win.getChildByName('WinCurrency').getComponent(Sprite).color = this.enableColor;


            this.Bet.getComponent(Button).node.on('touch-start', this.onTouchBet, this);
            this.Bet.getComponent(Button).node.on('touch-end', this.onTouchBet, this);
            this.Bet.getComponent(Button).node.on('touch-cancel', this.onTouchBet, this);

            this.Win.getComponent(Button).node.on('touch-start', this.onTouchWin, this);
            this.Win.getComponent(Button).node.on('touch-end', this.onTouchWin, this);
            this.Win.getComponent(Button).node.on('touch-cancel', this.onTouchWin, this);

        }
        else {

            this.Credit.getComponent(Label).color = Color.WHITE;
            this.CreditCCy.getComponent(Sprite).color = Color.WHITE;

            this.Bet.getChildByName('Bet').getComponent(Label).color = Color.WHITE;
            this.Win.getChildByName('Win').getComponent(Label).color = Color.WHITE;

            this.Bet.getChildByName('BetCurrency').getComponent(Sprite).color = Color.WHITE;
            this.Win.getChildByName('WinCurrency').getComponent(Sprite).color = Color.WHITE;

            this.Bet.getComponent(Button).node.off('touch-start', this.onTouchBet, this);
            this.Bet.getComponent(Button).node.off('touch-end', this.onTouchBet, this);
            this.Bet.getComponent(Button).node.off('touch-cancel', this.onTouchBet, this);

            this.Win.getComponent(Button).node.off('touch-start', this.onTouchWin, this);
            this.Win.getComponent(Button).node.off('touch-end', this.onTouchWin, this);
            this.Win.getComponent(Button).node.off('touch-cancel', this.onTouchWin, this);
        }

        this.Bet.getComponent(Button).interactable = enabled;
        this.Win.getComponent(Button).interactable = enabled;
    }

    /**設定是否顯示背景 */
    private setBlackBg(enabled: boolean): void {
        this.node.getChildByPath('Container/BlackBg').active = enabled;
    }

    /**贏分按鈕點擊 */
    private onWinClick(): void {
        AudioManager.getInstance().play(AudioKey.BtnClick);
        InfoBar.clickWin.emit();
    }

    /**下注按鈕點擊 */
    private onBetClick(): void {
        AudioManager.getInstance().play(AudioKey.BtnClick);
        InfoBar.clickBet.emit();
    }

    /**刷新幣別資源 */
    // private loadCurrencyAssets(): void {
    //     BundleLoader.onLoaded(BaseConst.CURRENCY, '', (assets) => {
    //         let currency = DataManager.getInstance().urlParam.currency;
    //         let Img = assets[currency];
    //         if (Img) {
    //             let Img = assets[currency];
    //             //TODO:未開放屬性,先這樣處理避免紅字, 可考慮用Img.width?
    //             let rect: Rect = Img['_rect'];
    //             this.Credit.getComponent(TextAdjust).setContentWidth(rect.width);
    //             this.Credit.setPosition((-210 + rect.width / 2), -1);
    //             this.CreditCCy.getComponent(Sprite).spriteFrame = Img;
    //             this.Bet.getChildByName('Bet').getComponent(TextAdjust).setContentWidth(rect.width);
    //             this.Bet.getChildByName('Bet').setPosition((33 + rect.width / 2), -1);
    //             this.Win.getChildByName('Win').getComponent(TextAdjust).setContentWidth(rect.width);
    //             this.Win.getChildByName('Win').setPosition((31 + rect.width / 2), -1);

    //             this.Bet.getChildByName('BetCurrency').getComponent(Sprite).spriteFrame = Img;
    //             this.Win.getChildByName('WinCurrency').getComponent(Sprite).spriteFrame = Img;
    //         }
    //         else {
    //             this.CreditCCy.active = false;
    //             this.Bet.getChildByName('BetCurrency').active = false;
    //             this.Win.getChildByName('WinCurrency').active = false;
    //         }
    //     });
    // }

    /**下注按鈕觸發 */
    private onTouchBet(event: EventTouch) {
        if (event.type == 'touch-start') {
            this.Bet.getChildByName('BetBg_On').active = false;
            this.Bet.getChildByName('BetBg_Off').active = true;
        }
        else {
            this.Bet.getChildByName('BetBg_On').active = true;
            this.Bet.getChildByName('BetBg_Off').active = false;
        }
    }

    /**贏分按鈕觸發 */
    private onTouchWin(event: EventTouch) {
        if (event.type == 'touch-start') {
            this.Win.getChildByName('WinBg_On').active = false;
            this.Win.getChildByName('WinBg_Off').active = true;
        }
        else {
            this.Win.getChildByName('WinBg_On').active = true;
            this.Win.getChildByName('WinBg_Off').active = false;
        }
    }
}