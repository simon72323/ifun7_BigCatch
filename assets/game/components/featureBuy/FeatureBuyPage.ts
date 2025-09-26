import { _decorator, Button, Component, Label, sp, Sprite, UIOpacity } from 'cc';

import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst } from '@base/script/constant/BaseConst';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@base/script/main/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseAnimationName } from '@base/script/types/BaseType';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { GameAudioKey, LangBundleDir } from '@game/script/constant/GameConst';

enum BoxAni {
    start = 'start'
}

const { ccclass } = _decorator;

/**
 * 購買功能頁面
 */
@ccclass('FeatureBuyPage')
export class FeatureBuyPage extends Component {

    /**顯示(免費遊戲花費) */
    public static show: XEvent1<number> = new XEvent1();

    /**隱藏 */
    public static hide: XEvent = new XEvent();

    private isHiding: boolean = false;

    /**底板動畫 */
    private spine: sp.Skeleton;

    /**花費 */
    private costLabel: Label;

    onLoad() {
        this.spine = this.node.getChildByPath('buyfeature_box_ani').getComponent(sp.Skeleton);
        this.costLabel = this.node.getChildByPath('buyfeature_box_ani/num_totalwin').getComponent(Label);

        let buyBtn = this.node.getChildByPath('buyfeature_box_ani/btn_buy/btn').getComponent(Button);
        buyBtn.node.on(Button.EventType.CLICK, this.onClickBuy, this);

        let cancelBtn = this.node.getChildByPath('buyfeature_box_ani/btn_cancel/btn').getComponent(Button);
        cancelBtn.node.on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BetClick);
            this.onClickCancel();
        }, this);

        //關閉
        this.node.getChildByName('Block').on(Button.EventType.CLICK, this.onClickCancel, this);

        FeatureBuyPage.show.on(this.show, this);
        FeatureBuyPage.hide.on(this.hide, this);

        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${DataManager.getInstance().urlParam.lang}/${LangBundleDir.featureBuy}`, (langRes: any) => {

            this.node.getChildByPath('buyfeature_box_ani/label_featurebuy').getComponent(Sprite).spriteFrame = langRes['label_featurebuy'];
            this.node.getChildByPath('buyfeature_box_ani/text_featurebuy').getComponent(Sprite).spriteFrame = langRes['text_featurebuy'];
            this.node.getChildByPath('buyfeature_box_ani/title_featurebuy').getComponent(Sprite).spriteFrame = langRes['title_featurebuy'];
            this.node.getChildByPath('buyfeature_box_ani/title_featurebuy_cost').getComponent(Sprite).spriteFrame = langRes['title_featurebuy_cost'];

            XUtils.setButtonSprite(buyBtn, langRes['btn_buy_N'], langRes['btn_buy_H']);
            XUtils.setButtonSprite(cancelBtn, langRes['btn_cancel_N'], langRes['btn_cancel_H']);
        });

        this.node.active = false;
    }

    update(_deltaTime: number) {

    }

    /**
     * 開啟FeatureBuy介面
     */
    private show(value: number): void {

        this.costLabel.string = XUtils.NumberToCentString(value);

        AudioManager.getInstance().play(AudioKey.Open, 0.6);



        this.node.active = true;
        XUtils.ClearSpine(this.spine);
        this.spine.setAnimation(0, BoxAni.start, false);

        //延遲一幀避免動畫閃爍, 先最大又突然縮小再放大
        this.scheduleOnce(() => {
            this.node.getComponent(UIOpacity).opacity = 255;
        }, 0);

    }

    /**
     * 關閉FeatureBuy介面
     */
    private hide(): void {

        if (this.isHiding) {
            return;
        }
        this.isHiding = true;

        XUtils.playAnimation(this.node, BaseAnimationName.fadeOutOpacity, 0.3, () => {
            this.forceHide();
        });

        AudioManager.getInstance().play(AudioKey.Close);
        AudioManager.getInstance().play(AudioKey.Trans);

    }

    /**
     * 點擊購買
     */
    private onClickBuy(): void {
        if (this.isHiding) {
            return;
        }

        AudioManager.getInstance().play(GameAudioKey.buy);
        this.forceHide();
        BaseEvent.buyFeature.emit();
    }

    /**
     * 購買不能再淡出, 否則看不到遊戲轉動
     */
    private forceHide(): void {
        this.node.active = false;
        this.isHiding = false;
        DataManager.getInstance().isMenuOn = false;
    }


    private onClickCancel(): void {
        this.hide();
    }
}