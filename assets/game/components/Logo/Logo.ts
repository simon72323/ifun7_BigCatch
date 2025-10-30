import { _decorator, Component, Sprite } from 'cc';

import { DataManager } from '@common/script/data/DataManager';
import { BundleLoader } from '@common/script/loading/BundleLoader';

const { ccclass, property } = _decorator;

@ccclass('Logo')
export class Logo extends Component {
    onLoad() {
        let lang: string = DataManager.getInstance().urlParam.lang;
        BundleLoader.onLoaded('language', `${lang}/texture`, (langRes: any) => {
            this.node.getComponent(Sprite).spriteFrame = langRes['logo'];
        });

    }
}