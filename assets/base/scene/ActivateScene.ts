import { _decorator, Component, director, SpriteFrame } from 'cc';
import { BaseConst } from '../../base/script/constant/BaseConst';
import { BaseDataManager } from '../../base/script/main/BaseDataManager';
import { BundleLoader } from '../../base/script/main/BundleLoader';
import { BaseLangBundleDir } from '../../base/script/types/BaseType';
import { logger } from '../../base/script/utils/XUtils';
const { ccclass, property } = _decorator;

@ccclass('ActivateScene')
export class ActivateScene extends Component {

    private spineComplete: boolean = false;
    private bundleComplete: boolean = false;

    onLoad() {
        BaseDataManager.getInstance().init(window['gameConfig']);
    }

    async start() {

        //gif至少播一次
        this.scheduleOnce(() => {
            this.spineComplete = true;
            this.checkComplete();
        }, 1);

        const baseLoadingLoader = new BundleLoader();
        baseLoadingLoader.add(BaseConst.BUNDLE_BASE_LANGUAGE, `${BaseDataManager.getInstance().urlParam.lang}/${BaseLangBundleDir.loading}`, SpriteFrame);
        await baseLoadingLoader.load(true);

        const gameLoadingLoader = new BundleLoader();
        gameLoadingLoader.add(BaseConst.BUNDLE_LANGUAGE, BaseDataManager.getInstance().urlParam.lang + '/' + BaseConst.DIR_LOADING, SpriteFrame);
        await gameLoadingLoader.load(true);

        this.bundleComplete = true;
        this.checkComplete();

    }

    private checkComplete(): void {
        if (!this.spineComplete || !this.bundleComplete) return;

        director.loadScene("load", () => {
            if (document.getElementById("loading")) {
                document.getElementById("loading").parentNode.removeChild(document.getElementById("loading"));
            }
            logger("[ActivateScene] loadScene 完成!");
        });
    }
    update(deltaTime: number) {

    }
}

