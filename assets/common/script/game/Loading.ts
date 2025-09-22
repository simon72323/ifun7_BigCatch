import { _decorator, Component, director, Label, ProgressBar, ResolutionPolicy, sp, view } from 'cc';

import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { OrientationtMode } from '@base/script/types/BaseType';

import { BaseConfig } from '@common/script/data/BaseConfig';
import { NetworkManager } from '@common/script/network/NetworkManager';
import { i18n } from '@common/script/utils/i18n';
import { UrlParameters } from '@common/script/utils/UrlParameters';
import { Utils } from '@common/script/utils/Utils';

const { ccclass, property, disallowMultiple } = _decorator;

@ccclass('Loading')
@disallowMultiple(true)
export class Loading extends Component {
    @property({ tooltip: '遊戲場景名稱' })
    public GameScene: string = 'Game';

    /** 載入進度條 */
    public progressBar: ProgressBar = null;

    /** 載入進度標籤 */
    public progressLabel: Label = null;

    /** 載入Logo動態Spine */
    public logoSpine: sp.Skeleton = null;

    // private loadingTime = 0;

    protected onLoad() {
        // E2ETest.E2EStartLoading();
        // 監聽畫面大小變化
        view.on('resize', this.handleResize.bind(this));
        console.log('aaaaaaaaaaaaaaahandleResize');

        this.initUI();
        // this.getCurrencyJson();//獲取幣別資料
        // i18n.init(UrlParameters.lang);//初始化語言



        // GoogleAnalytics.instance.initialize();
    }

    /**
     * 初始化UI屬性
     */
    private initUI() {
        this.progressBar = this.node.getChildByPath('ProgressBar').getComponent(ProgressBar);
        this.progressLabel = this.node.getChildByPath('ProgressBar/Value').getComponent(Label);
        this.logoSpine = this.node.getChildByPath('Logo').getComponent(sp.Skeleton);
        this.logoSpine.addAnimation(0, 'in', false);
        this.logoSpine.addAnimation(0, 'loop', true);
    }

    /**
     * 銷毀
     */
    onDestroy() {
        view.off('resize', this.handleResize.bind(this));// 清理監聽器
    }

    /** 處理畫面大小變化 */
    private handleResize() {
        console.log('aaaaaaaaaaaaaaahandleResize');
        const screenSize = view.getVisibleSize();
        const aspectRatio = screenSize.width / screenSize.height;

        if (aspectRatio > 1) {
            view.setDesignResolutionSize(1280, 720, ResolutionPolicy.FIXED_HEIGHT);
            BaseDataManager.getInstance().curOrientation = OrientationtMode.Landscape;
            BaseEvent.changeOrientation.emit(OrientationtMode.Landscape);
        } else {
            view.setDesignResolutionSize(720, 1280, ResolutionPolicy.FIXED_WIDTH);
            BaseDataManager.getInstance().curOrientation = OrientationtMode.Portrait;
            BaseEvent.changeOrientation.emit(OrientationtMode.Portrait);
        }
    }

    /**
     * 開始載入
     */
    // public async start() {
    //     // Utils.GoogleTag('EnterGame', { 'currency': UrlParameters.currency, 'language': UrlParameters.lang });
    //     await NetworkManager.getInstance().getUserData();
    //     await NetworkManager.getInstance().getGameData();
    //     this.loadGameScene();
    // }

    /**
     * 載入遊戲場景
     */
    public async loadGameScene() {
        let currentRate: number = 0;
        director.preloadScene(this.GameScene, (completedCount, totalCount, item) => {
            let rate = completedCount / totalCount;
            let progress = Math.floor(rate * 100);
            if (rate > currentRate) currentRate = rate;

            this.progressBar.progress = currentRate;
            this.progressLabel.string = progress + '%';
        }, () => {
            director.loadScene(this.GameScene, (err, scene) => {
                console.log('loadScene 完成!');
                // this._loadingDone = true;
                // let loadingTime = Math.floor((Date.now() - this.loadingTime) / 1000 + 4);
                // Utils.GoogleTag('LoadingEnd', { 'time': loadingTime });
            });
        });
    }

    /**
     * 取得網路 Json 資料(Currency)獲取幣別資料
     */
    public async getCurrencyJson() {
        let currencyJson = null;
        try {
            console.log('準備取得網路 Json 資料');
            currencyJson = await fetch('/webAssets/game/common.json').then(res => res.json());
            console.log('取得網路 Json 資料成功: /webAssets/game/common.json');
        } catch (error) {
            console.log('無法取得網路 Json 資料，使用本地貨幣資料');
            currencyJson = await Utils.loadCurrency();
        }

        const urlCurrency = UrlParameters.currency;
        BaseConfig.CurrencySymbol = currencyJson.CurrencySymbol[urlCurrency];
        BaseConfig.DecimalPlaces = currencyJson.DecimalPlaces[urlCurrency];
    }
}