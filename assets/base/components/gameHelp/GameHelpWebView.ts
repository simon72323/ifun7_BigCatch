import { _decorator, Button, Component, Label, Node, sys, WebView } from 'cc';


import { SettingsPage2 } from '@base/components/settingsPage/SettingsPage2';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { WebViewEnum } from '@common/script/data/BaseConst';
import { APIManager } from '@base/script/utils/APIManager';
import { WindowEventManager } from '@base/script/utils/WindowEventManager';
import { XEvent } from '@common/script/event/XEvent';

import { Notice } from '@common/components/notice/Notice';
import { DataManager } from '@common/script/data/DataManager';


const { ccclass } = _decorator;

@ccclass('GameHelpWebView')
export class GameHelpWebView extends Component {

    public static show: XEvent = new XEvent();

    private webViewNode: Node = null;
    private webview: WebView;

    private loading: Node = null;

    private iframe;

    onLoad() {

        let version = this.node.getChildByName('Version');
        version.getComponent(Label).string = APIManager.getInstance().getVersion();
        version.active = sys.isMobile;

        let btn = this.node.getChildByPath('Button');

        this.loading = this.node.getChildByName('S5GLoading');

        //點擊關閉
        btn.on(Button.EventType.CLICK, () => {

            AudioManager.getInstance().play(AudioKey.BtnClick);
            DataManager.getInstance().isMenuOn = false;
            SettingsPage2.show.emit();

            this.node.active = false;
            this.webview.url = '';
        }, this);

        GameHelpWebView.show.on(this.onShow, this);

        //webview異常要特別關閉
        Notice.showError.once(() => {
            this.node.active = false;
        }, this);

        this.webViewNode = this.node.getChildByPath('WebView');
        // this.webViewNode.setPosition(-1999, -1999);

        // this.webViewNode.getComponent(UITransform).setContentSize(0, 0);

        // 監聽從 webview 發來的訊息
        this.webview = this.webViewNode.getComponent(WebView);
        //下一幀執行
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0);

        //來自vue要求
        this.iframe = document.getElementsByTagName('iframe')[WebViewEnum.GameHelp];

        WindowEventManager.getInstance().registerEventHandler('GET_INFO_VALUE', (webviewData) => {
            this.loading.active = false;

            let response = {
                type: 'RESPONSE_DATA',
                messageId: webviewData.messageId,
                timestamp: new Date().getTime()
                // payload: DataManager.getInstance().getData().getGameHelpPayload()
            };

            this.iframe.parentNode['style'].zIndex = WebViewEnum.GameHelp;
            this.iframe['contentWindow'].postMessage(`${JSON.stringify(response)}`, '*');
        });
    }

    /**
     * 開啟GameHelp
     */
    public onShow(): void {
        this.node.active = true;
        this.loading.active = true;

        let useLogo: boolean = APIManager.getInstance().getLoadingLogoEnabled();
        this.node.getChildByPath('S5GLoading/TxtLoading').active = !useLogo;
        this.node.getChildByPath('S5GLoading/LogoLoading').active = useLogo;

        //讀取完成
        this.webViewNode.once(WebView.EventType.LOADED, () => {

            this.webViewNode.setPosition(0, 95);

            // this.injectCommunicationHandlers();

        }, this);

        this.webview.url = APIManager.getInstance().getGameHelpUrl();

    }


}

