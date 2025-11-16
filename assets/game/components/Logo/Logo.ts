import { _decorator, Component, Sprite } from 'cc';
import { UrlParam } from 'db://assets/common/script/data/UrlParam';
import { BundleLoader } from 'db://assets/common/script/loading/BundleLoader';

const { ccclass, property } = _decorator;

@ccclass('Logo')
export class Logo extends Component {
    onLoad() {
        let lang: string = UrlParam.lang;
        BundleLoader.onLoaded('language', `${lang}/texture`, (langRes: any) => {
            this.node.getComponent(Sprite).spriteFrame = langRes['logo'];
        });

    }
}