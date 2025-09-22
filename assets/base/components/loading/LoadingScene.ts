import { _decorator, Component, director, EventKeyboard, game, input, Input, instantiate, KeyCode, Label, Mask, Node, Prefab, ResolutionPolicy, screen, Sprite, SpriteFrame, sys, UITransform, view, View } from 'cc';

import { BaseGameLoading } from '@base/components/loading/BaseGameLoading';
import { Notice } from '@base/components/notice/Notice';
import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseLang, BaseLangBundleDir, OrientationtMode } from '@base/script/types/BaseType';
import { APIManager } from '@base/script/utils/APIManager';
import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';
import { TimeoutManager } from '@base/script/utils/TimeoutManager';
import { logger } from '@base/script/utils/XUtils';
import { ScreenAdapter } from '@common/script/utils/ScreenAdapter';

const { ccclass, property } = _decorator;
@ccclass('LoadingScene')
export class LoadingScene extends Component {

    @property({ type: Prefab, tooltip: '底圖Prefab' })
    public gameLoadingPrefab: Prefab = null;

    private gameLoading: BaseGameLoading;

    @property({ tooltip: '是否使用共用壓黑' })
    public useBlack: boolean = false;

    @property({ tooltip: '是否要等待初始化封包才能進入遊戲' })
    public waitForInitMessage: boolean = true;

    private loadMaskDown: Node = null;
    private loadMaskUp: Node = null;
    private loadNum: Node = null;
    private loadText: Node = null;

    /**第一層讀取(%數) */
    private Loader: Node = null;

    /**開始遊戲按鈕(就算沒讀取完成也允許點擊) */
    private BtnMaskWake: boolean = false;

    /**版本號 */
    private GameVersion: Node = null;

    /**第二層讀取(模糊遊戲畫面) */
    private FakeLoad: Node = null;

    private _fakeupdate = 1;
    private _fakedelaytime = 8;

    /**底圖 */
    private widthBg: Node;

    /**遊戲資源是否讀取完成 */
    private isInitResourceComplete: boolean = false;
    /**初始化封包是否完成 */
    private isInitMessageComplete: boolean = false;

    /**loading是否已關閉 */
    private isHideLoading: boolean = false;

    private demoLabel: Label;

    /**
     * 
     */
    async onLoad() {

        // 尝试使当前屏幕进入全屏模式，很多浏览器不允许程序触发这样的行为，必须在一个用户交互回调中才会生效。 如果进入全屏失败，会在下一次用户发生交互时，再次尝试进入全屏。
        // if (sys.isMobile == true && sys.os != sys.OS.IOS && screen.fullScreen() == false) {
        //     screen.autoFullScreen(null, null);
        // }

        //在一開始就帶入(用localhost判斷是否要用api)
        BaseDataManager.getInstance().init(window['gameConfig']);

        //將此節點加入常駐節點
        director.addPersistRootNode(this.node);


        this.GameVersion = this.node.getChildByPath('Version');

        this.Loader = this.node.getChildByPath('Loader');
        this.loadMaskDown = this.node.getChildByPath('Loader/StartBefore/LoadingBar/MaskDown');
        this.loadMaskUp = this.node.getChildByPath('Loader/StartBefore/LoadingBar/MaskUp');

        let gameLoadingNode = instantiate(this.gameLoadingPrefab);
        this.node.getChildByPath('Loader/LoadBg').addChild(gameLoadingNode);
        this.gameLoading = gameLoadingNode.getComponent(BaseGameLoading);

        BaseEvent.clickStart.on(this.onClickStartGame, this);

        this.loadNum = this.node.getChildByPath('Loader/StartBefore/BarNum');
        this.loadNum.getComponent(Label).string = '1%';

        this.loadText = this.node.getChildByPath('Loader/StartBefore/LoadingText');

        //logo先關, 等確定能開再開啟
        this.node.getChildByPath('FakeLoad/S5GLoading').active = false;
        this.node.getChildByPath('Loader/AdBg').active = false;
        this.node.getChildByPath('Loader/StartBefore').active = false;

        this.demoLabel = this.node.getChildByName('DemoLabel').getComponent(Label);
        this.demoLabel.node.active = false;

        //共用壓黑設定
        this.node.getChildByPath('WidthBg/blackLayer').active = this.useBlack;

        //監聽強制關閉loading
        // BaseEvent.hideLoading.on(() => {
        //     this.isInitMessageComplete = true;
        //     //如果是狀態回復要強制關閉loading, 直接設定對應flag
        //     this.tryHideLoading(BaseDataManager.getInstance().recoverData !== null);
        // }, this);

        //監聽遊戲資源讀取完成通知
        BaseEvent.initResourceComplete.on(() => {
            this.isInitResourceComplete = true;
            this.openStartBtn();
            this.tryHideLoading();
        }, this);

        //跳錯時顯示底圖, 遮蔽遊戲畫面
        Notice.showError.on(() => {
            this.widthBg.active = true;
        }, this);

        input.on(Input.EventType.KEY_DOWN, (event: EventKeyboard) => {
            if (sys.isMobile == true && sys.os != sys.OS.IOS) {
                switch (event.keyCode) {
                    case KeyCode.MOBILE_BACK:
                        screen.exitFullScreen();
                        break;
                }
            }
        }, this);


        //逾時跳錯
        TimeoutManager.getInstance().register(BaseConst.TIMEOUT_LOADING.key, BaseConst.TIMEOUT_LOADING.seconds, () => {
            ErrorManager.getInstance().showError(ErrorCode.Timeout);
        });

        logger('[LoadingScene] bundle 讀取完成!');

        BundleLoader.onLoaded(BaseConst.BUNDLE_BASE_CURRENCY, `${BaseDataManager.getInstance().urlParam.lang}/${BaseLangBundleDir.loading}`, (langRes: any) => {
            let bannerIdx = Math.floor(Math.random() * 5);
            this.node.getChildByPath('Loader/StartBefore/Banner').getComponent(Sprite).spriteFrame = langRes[`loading_banner_0${bannerIdx}`];

            this.node.getChildByPath('Loader/StartBefore/LoadingText').getComponent(Sprite).spriteFrame = langRes['loading_text'];
            this.node.getChildByPath('Loader/StartBefore/LoadingText').getComponent(UITransform).setAnchorPoint(1, 0.5);
            this.node.getChildByPath('Loader/StartBefore/LoadingText').setPosition(10, -433);
        });

        //await等待資源讀取完成再跑後續流程 ==================================================
        const baseLoadingLoader = new BundleLoader();
        baseLoadingLoader.add(BaseConst.BUNDLE_BASE_CURRENCY, `${BaseDataManager.getInstance().urlParam.lang}/${BaseLangBundleDir.loading}`, SpriteFrame);
        await baseLoadingLoader.load(true);

        const gameLoadingLoader = new BundleLoader();
        gameLoadingLoader.add(BaseConst.BUNDLE_LANGUAGE, BaseDataManager.getInstance().urlParam.lang + '/' + BaseConst.DIR_LOADING, SpriteFrame);
        await gameLoadingLoader.load(true);

        //不走API版本
        if (BaseDataManager.getInstance().useAPI === false) {
            this.loadGame();
            return;
        }
        //API版本
        else {
            (function () {
                var param = {};
                window.location.search.replace(/([^?=&]+)(=([^&]*))?/g, (a, b, e, d) => {
                    param[b] = d;//存到map
                    return a;// Return the original string
                });
                (function (a) {
                    var b = document.createElement('script');
                    b.src = a;
                    b.async = !0;
                    document.getElementsByTagName('head')[0].appendChild(b);
                }
                )(function () {
                    var a = Object.hasOwn(param, 'origin') ? decodeURIComponent(param['origin']) : '';
                    return '' == a ? location.protocol + '//' + location.hostname : a;
                }() + '/Scripts/api-bootstrap.min.js');
            }
            )();
            //不斷嘗試, 直到window.hostInitialize被掛上
            this.tryLoadAPI();
        }
    }

    /**
     * 嘗試載入API
     */
    private tryLoadAPI() {
        if (APIManager.getInstance().isReady() === true) {
            APIManager.getInstance().setup();
            this.GameVersion.getComponent(Label).string = APIManager.getInstance().getVersion();
            this.loadGame();
        }
        else {
            setTimeout(() => {
                this.tryLoadAPI();
            }, 100);
        }
    }

    /**
     * 載入遊戲
     */
    loadGame() {
        //是否使用logo
        let useLogo: boolean = APIManager.getInstance().getLoadingLogoEnabled();
        this.node.getChildByPath('FakeLoad/S5GLoading').active = true;
        this.node.getChildByPath('Loader/AdBg').active = true;
        this.node.getChildByPath('Loader/StartBefore').active = true;

        this.node.getChildByPath('FakeLoad/S5GLoading/TxtLoading').active = !useLogo;
        this.node.getChildByPath('FakeLoad/S5GLoading/LogoLoading').active = useLogo;
        this.node.getChildByPath('Loader/AdBg/TxtBg').active = !useLogo;
        this.node.getChildByPath('Loader/AdBg/LogoBg').active = useLogo;

        let lang = BaseDataManager.getInstance().urlParam.lang;
        this.node.getChildByPath('Loader/AdBg/LogoBg/Bg').active = lang !== BaseLang.tch;
        this.node.getChildByPath('Loader/AdBg/LogoBg/BgTw').active = lang === BaseLang.tch;

        this.node.getChildByPath('Loader/StartBefore/LoadingBar').setPosition(-360, useLogo ? 0 : -50);
        this.node.getChildByPath('GameHistory/S5GLoading/TxtLoading').active = !useLogo;
        this.node.getChildByPath('GameHistory/S5GLoading/LogoLoading').active = useLogo;

        //是否DEMO
        this.demoLabel.node.active = BaseDataManager.getInstance().isDemoMode();
        this.demoLabel.string = BaseDataManager.getInstance().getLangSetting().demoStr;
        this.schedule(this.updateFakeLoad);

        this.loadGameScene();
    }

    /**
     * 讀取遊戲場景
     */
    private loadGameScene(): void {
        //預載scene資源
        director.preloadScene('main', this.onPreloadProgress.bind(this), () => {
            logger('[LoadingScene] preloadScene 完成!');
        });

        //轉換scene
        director.loadScene('main', () => {
            logger('[LoadingScene] loadScene 完成!');
        });
    }


    /**
     * 
     * @param now 
     * @param total 
     */
    private onPreloadProgress(now, total) {
        let pre = now / total;
        if (pre >= 0.99) {
            pre = 0.99;
            this.loadNum.getComponent(Label).string = Math.floor(pre * 100) + '%';
            this.loadMaskDown.setPosition(-360 + 720 * pre, -540);
            this.loadMaskDown.getChildByName('loading').setPosition(720 - 720 * pre, 540);
            this.loadMaskUp.setPosition(-360 + 720 * pre, -540);
            this.loadMaskUp.getChildByName('loading').setPosition(720 - 720 * pre, 540);
        }
    }

    /**
     * 假讀取進度
     * @param deltaTime 
     */
    private updateFakeLoad(deltaTime) {
        this._fakeupdate += deltaTime * (100 / this._fakedelaytime);
        if (this._fakeupdate > 100) {
            this._fakeupdate = 100;
            //跑到100%強制開啟按鈕
            this.openStartBtn();
        }
        this.loadNum.getComponent(Label).string = Math.floor(this._fakeupdate) + '%';
        this.loadMaskDown.setPosition(-360 + 7.2 * this._fakeupdate, -540);
        this.loadMaskDown.getChildByName('loading').setPosition(720 - 7.2 * this._fakeupdate, 540);
        if (this._fakeupdate < 90) {
            this.loadMaskUp.setPosition(-360 + 7.2 * (this._fakeupdate + 10), -540);
            this.loadMaskUp.getChildByName('loading').setPosition(720 - 7.2 * (this._fakeupdate + 10), 540);
        }
        else {
            this.loadMaskUp.getComponent(Mask).enabled = false;
        }
    }

    /**
     * 開啟按鈕
     */
    private openStartBtn(): void {

        //只開一次
        if (this.BtnMaskWake) {
            return;
        }

        this.unschedule(this.updateFakeLoad);

        //關閉讀取%
        this.loadNum.active = false;
        this.loadText.active = false;

        this.loadMaskDown.getComponent(Mask).enabled = false;
        this.loadMaskUp.getComponent(Mask).enabled = false;

        //通知開始遊戲
        BaseEvent.showStartBtn.emit();

        this.gameLoading.showButton();

        this.BtnMaskWake = true;
    }

    /**
     * 點擊開始遊戲(若資源尚未讀取完成只能先開第一層讀取畫面)
     */
    private onClickStartGame() {
        //關閉第一層讀取畫面
        this.Loader.active = false;

        if (this.waitForInitMessage === false) {
            this.tryHideLoading(true);
        }
        else {
            this.tryHideLoading();
        }
    }

    /**
     * 嘗試關閉第二層讀取畫面(資源完成 & 封包完成)
     * 狀態回復要強制關閉loading
     */
    private tryHideLoading(forceHide: boolean = false): void {

        //資源和封包都好了就要移除Timeout
        if (this.isInitResourceComplete && this.isInitMessageComplete) {
            TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_LOADING.key);
        }

        //非強制關閉裁判斷其他flag
        if (forceHide === false) {
            //第一層都沒關, 就不處理, 等玩家自行關閉
            if (this.Loader.active) {
                return;
            }

            //資源尚未下載完畢
            if (this.isInitResourceComplete === false) {
                return;
            }

            //初始化封包尚未完成
            if (this.isInitMessageComplete === false) {
                return;
            }
        }


        //避免2次關閉
        if (this.isHideLoading) {
            return;
        }
        this.isHideLoading = true;

        this.widthBg.active = false;

        this.Loader.active = false;

        this.FakeLoad.active = false;

        BaseEvent.clickStart.off(this);

        //進入遊戲隱藏版本號
        this.GameVersion.active = sys.isMobile === false;

        //task會在首次update執行, 太早發出會導致task收不到, 目前先延遲一幀啟動
        this.scheduleOnce(() => {
            BaseEvent.startGame.emit();
        }, 0);
    }
}
