import { _decorator, Component, director, Label, Node, ProgressBar, sp } from 'cc';

import { Notice } from '@common/components/notice/Notice';

import { BaseConfig } from '@common/script/data/BaseConfig';
import { DataManager } from '@common/script/data/DataManager';
import { NetworkManager } from '@common/script/network/NetworkManager';
import { i18n } from '@common/script/utils/i18n';
import { ScreenAdapter } from '@common/script/utils/ScreenAdapter';
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


    protected onLoad() {
        // E2ETest.E2EStartLoading();
        ScreenAdapter.setupResize();//初始化屏幕適配
        this.initUI();
        DataManager.getInstance().urlParam.initUrlParameters();//初始化URL參數
        i18n.init(DataManager.getInstance().urlParam.lang);//初始化語言

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
        // this.blackLayer = this.node.getChildByName('Black');
    }


    /**
     * 開始載入
     */
    public async start() {
        // Utils.GoogleTag('EnterGame', { 'currency': urlParameters.currency, 'language': urlParameters.lang });

        console.log('獲取資料');
        // this.getRenewToken()
        //     .then(this.sendUserData)
        //     .then(this.sendGameData)
        //     // .then(() => {
        //     //     this.loadGameScene();
        //     //     console.log('Loading Done');
        //     // })
        //     .catch(function (e) {
        //         //要出現405錯誤
        //         Notice.showError.emit(405);
        //         console.error(e);
        //         console.error('fail to load data from server');
        //     });

        this.sendUserData()
            .then(this.sendGameData)
            .then(this.getCurrencyJson)
            .then(() => {
                this.loadGameScene();
                console.log('Loading Done');
            })
            .catch((e: any) => {
                //要出現405錯誤
                Notice.showError.emit(405);
                console.error(e);
                console.error('fail to load data from server');
            });
    }

    /**
     * 發送用戶資料
     */
    private async sendUserData() {
        await NetworkManager.getInstance().sendUserData();
    }

    /**
     * 發送遊戲資料
     */
    private async sendGameData() {
        await NetworkManager.getInstance().sendGameData();
    }

    /**
     * 取得新的 token
     */
    private async getRenewToken() {
        let paramToken = DataManager.getInstance().urlParam.token;  // 從 URL 獲取的原始 token
        let token = sessionStorage.getItem(paramToken); // 檢查 sessionStorage 中是否有緩存的 token

        // 如果 sessionStorage 中有有效的 token，直接使用
        if (token != null && token.length > 0) {
            DataManager.getInstance().urlParam.token = token;
            return token;
        }

        // 如果沒有緩存的 token，才向伺服器請求新的 token
        const newToken = await NetworkManager.getInstance().sendRenewToken();
        DataManager.getInstance().urlParam.token = newToken; // 只更新 token
        return newToken;
    }

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
            // 動態構建 URL，根據當前 domain 變動
            const protocol = window.location.protocol;
            let hostname = window.location.hostname;

            // 如果是 localhost，使用測試環境的 domain
            if (hostname === 'localhost' || hostname === '127.0.0.1') {
                hostname = 'gc.ifun7.vip';
            }

            const configUrl = `${protocol}//${hostname}/webAssets/game/common.json`;

            console.log(`嘗試從以下位置獲取貨幣資料: ${configUrl}`);
            currencyJson = await fetch(configUrl).then(res => res.json());
            console.log(`取得網路貨幣資料成功: ${configUrl}`);
        } catch (error) {
            console.log('無法取得網路貨幣資料，使用本地貨幣資料');
            currencyJson = await Utils.loadCurrency();
        }

        const urlCurrency = DataManager.getInstance().currency;
        BaseConfig.CurrencySymbol = currencyJson.CurrencySymbol[urlCurrency];
        BaseConfig.DecimalPlaces = parseInt(currencyJson.DecimalPlaces[urlCurrency]);
    }
}