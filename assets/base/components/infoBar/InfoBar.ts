import { _decorator, Button, Color, Component, Label, Node, Rect, Sprite, tween, Tween, Vec3 } from 'cc';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { XEvent, XEvent1 } from '@/base/script/utils/XEvent';
import { AudioKey } from '../../script/audio/AudioKey';
import { AudioManager } from '../../script/audio/AudioManager';
import { BaseConst } from '../../script/constant/BaseConst';
import { BaseDataManager } from '../../script/main/BaseDataManager';
import { BundleLoader } from '../../script/main/BundleLoader';
import { XUtils } from '../../script/utils/XUtils';
import { TextAdjust } from '../TextAdjust';
const { ccclass, property } = _decorator;

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

    private container: Node;
    onLoad() {
        //移到上方
        InfoBar.moveToTop.on(() => {
            this.container.setPosition(0, -414);
            InfoBar.setEnabled.emit(true);

        }, this);
        //移到下方(禁止按鈕點擊)
        InfoBar.moveToDown.on(() => {
            this.container.setPosition(0, -608);
            InfoBar.setEnabled.emit(false);
        }, this);

        this.container = this.node.getChildByPath("Container");
        this.Credit = this.container.getChildByPath("Credit");
        this.CreditCCy = this.container.getChildByPath("CreditCurrency");

        this.Bet = this.container.getChildByPath("BtnBet");
        this.Win = this.container.getChildByPath("WinBtn");

        //刷新餘額
        BaseEvent.refreshCredit.on((value: number) => {
            this.Credit.getComponent(Label).string = XUtils.NumberToCentString(value);
        }, this);

        //刷新下注
        BaseEvent.refreshBet.on((value: number) => {
            const betNode = this.Bet.getChildByName("Bet");
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
        }, this);

        //刷新獲得
        BaseEvent.refreshWin.on((value: number) => {
            this.Win.getChildByName("Win").getComponent(Label).string = XUtils.NumberToCentString(value);
        }, this);

        //設定是否可用
        InfoBar.setEnabled.on((enabled) => {
            if (enabled) {

                this.Credit.getComponent(Label).color = this.enableColor;
                this.CreditCCy.getComponent(Sprite).color = this.enableColor;

                this.Bet.getChildByName("Bet").getComponent(Label).color = this.enableColor;
                this.Win.getChildByName("Win").getComponent(Label).color = this.enableColor;

                this.Bet.getChildByName("BetCurrency").getComponent(Sprite).color = this.enableColor;
                this.Win.getChildByName("WinCurrency").getComponent(Sprite).color = this.enableColor;


                this.Bet.getComponent(Button).node.on("touch-start", this.onTouchBet, this);
                this.Bet.getComponent(Button).node.on("touch-end", this.onTouchBet, this);
                this.Bet.getComponent(Button).node.on("touch-cancel", this.onTouchBet, this);

                this.Win.getComponent(Button).node.on("touch-start", this.onTouchWin, this);
                this.Win.getComponent(Button).node.on("touch-end", this.onTouchWin, this);
                this.Win.getComponent(Button).node.on("touch-cancel", this.onTouchWin, this);

            }
            else {

                this.Credit.getComponent(Label).color = Color.WHITE;
                this.CreditCCy.getComponent(Sprite).color = Color.WHITE;

                this.Bet.getChildByName("Bet").getComponent(Label).color = Color.WHITE;
                this.Win.getChildByName("Win").getComponent(Label).color = Color.WHITE;

                this.Bet.getChildByName("BetCurrency").getComponent(Sprite).color = Color.WHITE;
                this.Win.getChildByName("WinCurrency").getComponent(Sprite).color = Color.WHITE;

                this.Bet.getComponent(Button).node.off("touch-start", this.onTouchBet, this);
                this.Bet.getComponent(Button).node.off("touch-end", this.onTouchBet, this);
                this.Bet.getComponent(Button).node.off("touch-cancel", this.onTouchBet, this);

                this.Win.getComponent(Button).node.off("touch-start", this.onTouchWin, this);
                this.Win.getComponent(Button).node.off("touch-end", this.onTouchWin, this);
                this.Win.getComponent(Button).node.off("touch-cancel", this.onTouchWin, this);
            }

            this.Bet.getComponent(Button).interactable = enabled;
            this.Win.getComponent(Button).interactable = enabled;

        }, this);

        this.Win.on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            InfoBar.clickWin.emit();
        }, this);
        this.Bet.on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            InfoBar.clickBet.emit();
        }, this);

        //刷新幣別
        BundleLoader.onLoaded(BaseConst.BUNDLE_BASE_CURRENCY, "", (assets) => {
            let currency = BaseDataManager.getInstance().urlParam.currency;
            let Img = assets[currency];
            if (Img) {
                let Img = assets[currency];
                //TODO:未開放屬性,先這樣處理避免紅字, 可考慮用Img.width?
                let rect: Rect = Img['_rect'];
                this.Credit.getComponent(TextAdjust).setContentWidth(rect.width);
                this.Credit.setPosition((-210 + rect.width / 2), -1);
                this.CreditCCy.getComponent(Sprite).spriteFrame = Img;
                this.Bet.getChildByName("Bet").getComponent(TextAdjust).setContentWidth(rect.width);
                this.Bet.getChildByName("Bet").setPosition((33 + rect.width / 2), -1);
                this.Win.getChildByName("Win").getComponent(TextAdjust).setContentWidth(rect.width);
                this.Win.getChildByName("Win").setPosition((31 + rect.width / 2), -1);

                this.Bet.getChildByName("BetCurrency").getComponent(Sprite).spriteFrame = Img;
                this.Win.getChildByName("WinCurrency").getComponent(Sprite).spriteFrame = Img;
            }
            else {
                this.CreditCCy.active = false;
                this.Bet.getChildByName("BetCurrency").active = false;
                this.Win.getChildByName("WinCurrency").active = false;
            }
        });

        InfoBar.setBlackBg.on((enabled) => {
            this.node.getChildByPath("Container/BlackBg").active = enabled;
        }, this);
    }

    start() {

    }

    update(deltaTime: number) {

    }

    // INFO
    private onTouchBet(event) {
        if (event.type == "touch-start") {
            this.Bet.getChildByName("BetBg_On").active = false;
            this.Bet.getChildByName("BetBg_Off").active = true;
        }
        else {
            this.Bet.getChildByName("BetBg_On").active = true;
            this.Bet.getChildByName("BetBg_Off").active = false;
        }
    }

    private onTouchWin(event) {
        if (event.type == "touch-start") {
            this.Win.getChildByName("WinBg_On").active = false;
            this.Win.getChildByName("WinBg_Off").active = true;
        }
        else {
            this.Win.getChildByName("WinBg_On").active = true;
            this.Win.getChildByName("WinBg_Off").active = false;
        }
    }
}

