import { _decorator, Button, Color, Component, Node, WebView } from 'cc';
import { AudioKey } from '../../script/audio/AudioKey';
import { AudioManager } from '../../script/audio/AudioManager';
import { WebViewEnum } from '../../script/constant/BaseConst';
import { XEvent, XEvent1 } from '../../script/utils/XEvent';
const { ccclass, property } = _decorator;

/**
 * 歷史紀錄
 */
@ccclass('GameHistory')
export class GameHistory extends Component {

    /**顯示歷史紀錄 */
    public static show: XEvent1<string> = new XEvent1();
    public static onHide: XEvent = new XEvent();

    /**webView實體 */
    private webView: Node;

    onLoad() {
        this.webView = this.node.getChildByName("WebView");
        this.webView.getComponent(WebView).color = new Color(0, 0, 0, 0);
        this.webView.setPosition(-1999, -1999);

        GameHistory.show.on((url: string) => {
            this.node.active = true;
            this.webView.getComponent(WebView).url = url;
            this.webView.setPosition(-1999, -1999);
            //讀取完成
            this.webView.once(WebView.EventType.LOADED, () => {
                this.webView.setPosition(0, 68);
            }, this);
        }, this);

        this.node.getChildByName("Back").on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            this.node.active = false;
            this.webView.getComponent(WebView).url = "";
            GameHistory.onHide.emit();
        }, this);

        document.getElementsByTagName("iframe")[WebViewEnum.GameHistory].parentNode['style'].zIndex = WebViewEnum.GameHistory;
    }

    start() {
        // webView關係, 不能在onLoad關閉, 否則會卡一塊白色
        this.node.active = false;
    }

    update(deltaTime: number) {

    }
}

