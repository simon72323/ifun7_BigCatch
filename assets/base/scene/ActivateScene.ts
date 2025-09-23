import { _decorator, Component, director, SpriteFrame } from 'cc';

import { BaseConst } from '@base/script/constant/BaseConst';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseLangBundleDir } from '@base/script/types/BaseType';
import { logger } from '@base/script/utils/XUtils';

import { DataManager } from '@common/script/data/DataManager';

const { ccclass } = _decorator;

@ccclass('ActivateScene')
export class ActivateScene extends Component {

    private spineComplete: boolean = false;
    private bundleComplete: boolean = false;

    onLoad() {
        DataManager.getInstance().init(window['gameConfig']);
    }

    async start() {

        //gif至少播一次
        this.scheduleOnce(() => {
            this.spineComplete = true;
            this.checkComplete();
        }, 1);

        const lang = DataManager.getInstance().urlParam.lang;

        const loadingLoader = new BundleLoader();
        //加載幣別符號
        loadingLoader.add(BaseConst.BUNDLE_BASE_CURRENCY, `${lang}/${BaseLangBundleDir.loading}`, SpriteFrame);
        //加載載入頁語系
        loadingLoader.add(BaseConst.BUNDLE_LANGUAGE, `${lang}/${BaseConst.DIR_LOADING}`, SpriteFrame);
        await loadingLoader.load(true);

        this.bundleComplete = true;
        this.checkComplete();

    }

    /**
     * 檢查是否完成
     */
    private checkComplete(): void {
        if (!this.spineComplete || !this.bundleComplete) return;
        //載入載入頁
        director.loadScene('load', () => {
            //移除loading元素
            document.getElementById('loading')?.remove();
            logger('[ActivateScene] loadScene 完成!');
        });
    }
}

