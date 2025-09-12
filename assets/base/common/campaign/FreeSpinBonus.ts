import { _decorator, Button, Component, Node, UITransform, WebView } from 'cc';
import { AudioKey } from '@/base/script/audio/AudioKey';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { APIManager } from '@/base/script/utils/APIManager';
import { XEvent, XEvent2 } from '@/base/script/utils/XEvent';
import { WebViewEnum } from '../../script/constant/BaseConst';
import { WindowEventManager } from '../../script/utils/WindowEventManager';
import { Notice } from '../notice/Notice';
const { ccclass, property } = _decorator;

/**
 * 免費旋轉次數活動
 */
@ccclass('FreeSpinBonus')
export class FreeSpinBonus extends Component {
    /**顯示提醒訊息(campaignID) */
    public static showReminder: XEvent2<string, number> = new XEvent2();
    /**顯示活動資訊 */
    public static showInfo: XEvent = new XEvent();
    /**更新活動資訊 */
    public static update: XEvent2<string, number> = new XEvent2();
    /**關閉活動資訊 */
    public static hide: XEvent = new XEvent();

    /**點擊開始遊戲 */
    public static clickPlayNow: XEvent = new XEvent();
    /**點擊關閉 */
    public static clickClose: XEvent = new XEvent();

    /** webView實體 */
    private webView: WebView;

    /** 載入WebView讀取畫面 */
    private loading: Node = null;

    /**活動ID */
    private campaignID: string;
    private eventType: number;

    /**關閉按鈕 */
    private closeBtnNode: Node;

    private iframe;
    /**壓黑 */
    private black: Node;


    /**
     * 
     */
    onLoad() {
        //決定用哪種S5GLoading
        this.loading = this.node.getChildByName("S5GLoading");

        this.black = this.node.getChildByPath("SpriteSplash");
        //點擊Info關閉按鈕
        this.closeBtnNode = this.node.getChildByPath("Button");
        this.closeBtnNode.on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            FreeSpinBonus.clickClose.emit();
        }, this)

        FreeSpinBonus.showReminder.on(this.onShowReminder, this);
        FreeSpinBonus.showInfo.on(this.onShowInfo, this);
        FreeSpinBonus.update.on(this.onUpdatePromo, this);

        this.iframe = document.getElementsByTagName("iframe")[WebViewEnum.Promo];
        // 監聽從 webview 發來的訊息
        this.webView = this.node.getChildByPath("WebView").getComponent(WebView);
        this.webView.node.once(WebView.EventType.LOADED, () => {
            this.iframe.parentNode['style'].zIndex = WebViewEnum.Promo;
        }, this);

        FreeSpinBonus.hide.on(this.onHide, this);

        //來自vue要求
        WindowEventManager.getInstance().registerEventHandler(Web2Game.GET_PROMO_VALUE, this.onGetPromoValue.bind(this));
        WindowEventManager.getInstance().registerEventHandler(Web2Game.CONTINUE_GAME, this.onContinueGame.bind(this));
        WindowEventManager.getInstance().registerEventHandler(Web2Game.PROMO_FREE_SPIN, this.onPromoFreeSpin.bind(this));
        WindowEventManager.getInstance().registerEventHandler(Web2Game.GET_PROMO_INFO_VALUE, this.onGetPromoInfoValue.bind(this));

        //webview異常要特別關閉
        Notice.showError.once(() => {
            this.node.active = false;
        }, this);

        //下一幀執行
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0);
    }

    /**
     * 取得活動相關數值
     * @param webViewData 
     */
    private onGetPromoValue(webViewData): void {
        this.loading.active = false;
        this.black.active = false;
        this.responsePayload(webViewData.messageId, {
            campaign_id: this.campaignID,
            operator_id: BaseDataManager.getInstance().operatorID,
            member_id: BaseDataManager.getInstance().memberID,
            game_id: BaseDataManager.getInstance().gameID,
            campaign_event_type: this.eventType != -1 ? this.eventType : null
        });
    }

    /**
     * webView 向遊戲告知繼續進行遊戲 (關閉活動 webView)
     */
    private onContinueGame(): void {
        FreeSpinBonus.clickClose.emit();
    }

    /**
     * webView 向遊戲告知執行活動的免費旋轉 (關閉活動 webView，觸發免費旋轉)
     */
    private onPromoFreeSpin(): void {
        FreeSpinBonus.clickPlayNow.emit();
    }

    /**
     * webView 向遊戲取回資料時，傳的資料
     */
    private onGetPromoInfoValue(webViewData): void {
        this.responsePayload(webViewData.messageId, {
            operator_id: BaseDataManager.getInstance().operatorID,
            member_id: BaseDataManager.getInstance().memberID,
            game_id: BaseDataManager.getInstance().gameID,
        });
    }

    private responsePayload(messageId: string, payload: any): void {
        let response = {
            type: Game2Web.RESPONSE_DATA,
            messageId: messageId,
            timestamp: new Date().getTime(),
            payload: payload
        };
        this.iframe['contentWindow'].postMessage(`${JSON.stringify(response)}`, '*');
    }

    /**
     * 開啟
     */
    private onShowReminder(campaignID: string, eventType: number): void {

        //onLoad時psapi可能還沒好, 先等開啟時再判斷logo
        let useLogo: boolean = APIManager.getInstance().getLoadingLogoEnabled();
        this.loading.getChildByPath('TxtLoading').active = !useLogo;
        this.loading.getChildByPath('LogoLoading').active = useLogo;

        this.campaignID = campaignID;
        this.eventType = eventType != -1 ? eventType : -1;

        this.webView.node.getComponent(UITransform).setContentSize(720, 1280);
        this.webView.node.setPosition(0, 0);

        this.onShowUrl(APIManager.getInstance().getPromoReminderUrl());

        console.log("開啟活動reminder:" + campaignID);
        this.closeBtnNode.active = false;
        this.black.active = true;
    }

    /**
     * 開啟
     */
    private onShowInfo(): void {

        //onLoad時psapi可能還沒好, 先等開啟時再判斷logo
        let useLogo: boolean = APIManager.getInstance().getLoadingLogoEnabled();
        this.loading.getChildByPath('TxtLoading').active = !useLogo;
        this.loading.getChildByPath('LogoLoading').active = useLogo;

        let webViewHeight = 1090;
        this.webView.node.getComponent(UITransform).setContentSize(720, webViewHeight);
        this.webView.node.setPosition(0, (1280 - webViewHeight) * .5);

        this.onShowUrl(APIManager.getInstance().getPromoInfoUrl());

        this.closeBtnNode.active = true;

        this.black.active = true;
    }

    /**
     * 當下為開啟狀態, 直接刷新資訊
     */
    private onUpdatePromo(campaignID: string, eventType: number): void {
        let post = {
            type: Game2Web.UPDATE_PROMO,
            timestamp: new Date().getTime(),
            payload: {
                campaign_id: campaignID,
                campaign_event_type: eventType != -1 ? eventType : null
            }
        };
        document.getElementsByTagName("iframe")[WebViewEnum.Promo]['contentWindow'].postMessage(`${JSON.stringify(post)}`, '*');

    }

    private onShowUrl(url: string): void {
        this.node.active = true;
        this.loading.active = true;

        this.webView.url = url;
    }

    /**
     * 關閉
     */
    private onHide(): void {
        BaseDataManager.getInstance().isMenuOn = false;
        this.node.active = false;
        this.webView.url = "";
    }
}

enum Web2Game {
    /**取得活動相關數值 */
    GET_PROMO_VALUE = 'GET_PROMO_VALUE',
    /**webView 向遊戲告知繼續進行遊戲 (關閉活動 webView) */
    CONTINUE_GAME = 'CONTINUE_GAME',
    /**webView 向遊戲告知執行活動的免費旋轉 (關閉活動 webView，觸發免費旋轉) */
    PROMO_FREE_SPIN = 'PROMO_FREE_SPIN',
    /**webView 向遊戲取回資料時，傳的資料 */
    GET_PROMO_INFO_VALUE = 'GET_PROMO_INFO_VALUE',
}

enum Game2Web {
    /**遊戲回傳資料給 webView 時，傳的資料 */
    RESPONSE_DATA = 'RESPONSE_DATA',
    /**遊戲向 webView 告知有活動更新 (當資訊頁 webView 為開啟狀態，且有活動更新時觸發) */
    UPDATE_PROMO = 'UPDATE_PROMO',
}