import { _decorator, Button, Component, Input, Node, sp, Sprite, SpriteFrame } from 'cc';

import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { BaseAnimationName } from '@base/script/types/BaseType';
import { XEvent } from '@base/script/utils/XEvent';
import { XUtils } from '@base/script/utils/XUtils';

import { GameAudioKey, LangBundleDir } from '@game/script/constant/GameConst';

const { ccclass } = _decorator;

/**
 * 幸運一擊按鈕
 */
@ccclass('FeatureBuyBtn')
export class FeatureBuyBtn extends Component {

    /**點擊幸運一擊 */
    public static click: XEvent = new XEvent();

    /**購買功能按鈕 */
    private FeatureBuyButton: Node = null;
    private spine: sp.Skeleton = null;

    private isVisible: boolean = false;
    private isEnabled: boolean = false;

    private btnSpriteList: SpriteFrame[] = [];
    private sprite: Sprite;

    onLoad() {
        //點擊幸運一擊
        this.FeatureBuyButton = this.node.getChildByName('btn');
        this.FeatureBuyButton.on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(GameAudioKey.FeatureBuy);
            FeatureBuyBtn.click.emit();
            this.spine.setAnimation(0, 'press', false);
        }, this);
        this.FeatureBuyButton.on(Input.EventType.TOUCH_START, () => {
            this.sprite.spriteFrame = this.btnSpriteList[1];
            XUtils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'loop', true);
        }, this);
        this.FeatureBuyButton.on(Input.EventType.TOUCH_END, () => {
            this.sprite.spriteFrame = this.btnSpriteList[0];
            XUtils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'loop', true);
        }, this);
        this.FeatureBuyButton.on(Input.EventType.TOUCH_CANCEL, () => {
            this.sprite.spriteFrame = this.btnSpriteList[0];
            XUtils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'loop', true);
        }, this);

        this.sprite = this.node.getChildByPath('buyfeature_button_ani/btn_featurebuy').getComponent(Sprite);
        this.spine = this.node.getChildByName('buyfeature_button_ani').getComponent(sp.Skeleton);
        XUtils.ClearSpine(this.spine);
        this.spine.setAnimation(0, 'loop', true);

        //設定是否可見(後台設定)
        BaseEvent.buyFeatureVisible.on((visible) => {
            this.isVisible = visible;
            this.refresh();
        }, this);

        //設定是否可用(各階段)
        BaseEvent.buyFeatureEnabled.on((enabled) => {
            this.isEnabled = enabled;
            this.refresh();
        }, this);

        //淡入
        BaseEvent.fadeInFeatureBuy.on(() => {
            if (!this.FeatureBuyButton.isValid) {
                return;
            }
            this.FeatureBuyButton.getComponent(Button).enabled = true;

            XUtils.playAnimation(this.node, BaseAnimationName.fadeInOpacity, 0.5);
        }, this);

        //淡出
        BaseEvent.fadeOutFeatureBuy.on(() => {
            if (!this.FeatureBuyButton.isValid) {
                return;
            }

            this.FeatureBuyButton.getComponent(Button).enabled = false;
            XUtils.playAnimation(this.node, BaseAnimationName.fadeOutOpacity, 0.5);
        }, this);

        let lang: string = BaseDataManager.getInstance().urlParam.lang;
        BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.featureBuy}`, (langRes: any) => {
            this.btnSpriteList = [langRes['btn_featurebuy_N'], langRes['btn_featurebuy_H']];
            this.sprite.spriteFrame = this.btnSpriteList[0];
        });

    }

    private refresh(): void {
        if (!this.FeatureBuyButton.isValid) {
            return;
        }
        this.node.active = this.isVisible;
        this.FeatureBuyButton.active = this.isVisible;
        this.FeatureBuyButton.getComponent(Button).enabled = this.isEnabled;
    }
}

