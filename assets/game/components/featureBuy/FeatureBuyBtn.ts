import { _decorator, Button, Component, Input, Node, sp, Sprite, SpriteFrame } from 'cc';

import { GameAudioKey } from '@game/script/data/GameConst';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent } from '@common/script/event/XEvent';
import { AudioManager } from '@common/script/manager/AudioManager';
import { Utils } from '@common/script/utils/Utils';

const { ccclass } = _decorator;

/**
 * 免費遊戲按鈕
 */
@ccclass('FeatureBuyBtn')
export class FeatureBuyBtn extends Component {

    /**點擊免費遊戲 */
    public static click: XEvent = new XEvent();

    /**購買功能按鈕 */
    private FeatureBuyButton: Node = null;
    private spine: sp.Skeleton = null;

    private isVisible: boolean = false;
    private isEnabled: boolean = false;

    private btnSpriteList: SpriteFrame[] = [];
    private sprite: Sprite;

    onLoad() {
        //點擊免費遊戲
        this.FeatureBuyButton = this.node.getChildByName('btn');
        this.FeatureBuyButton.on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().playSound(GameAudioKey.FeatureBuy);
            FeatureBuyBtn.click.emit();
            this.spine.setAnimation(0, 'press', false);
        }, this);
        this.FeatureBuyButton.on(Input.EventType.TOUCH_START, () => {
            this.sprite.spriteFrame = this.btnSpriteList[1];
            Utils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'loop', true);
        }, this);
        this.FeatureBuyButton.on(Input.EventType.TOUCH_END, () => {
            this.sprite.spriteFrame = this.btnSpriteList[0];
            Utils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'loop', true);
        }, this);
        this.FeatureBuyButton.on(Input.EventType.TOUCH_CANCEL, () => {
            this.sprite.spriteFrame = this.btnSpriteList[0];
            Utils.ClearSpine(this.spine);
            this.spine.setAnimation(0, 'loop', true);
        }, this);

        this.sprite = this.node.getChildByPath('buyfeature_button_ani/btn_featurebuy').getComponent(Sprite);
        this.spine = this.node.getChildByName('buyfeature_button_ani').getComponent(sp.Skeleton);
        Utils.ClearSpine(this.spine);
        this.spine.setAnimation(0, 'loop', true);

        //設定是否可見(後台設定)
        // BaseEvent.buyFeatureVisible.on((visible) => {
        //     this.isVisible = visible;
        //     this.refresh();
        // }, this);

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

            Utils.fadeIn(this.node, 0.5);
        }, this);

        //淡出
        BaseEvent.fadeOutFeatureBuy.on(() => {
            if (!this.FeatureBuyButton.isValid) {
                return;
            }

            this.FeatureBuyButton.getComponent(Button).enabled = false;
            Utils.fadeOut(this.node, 0.5);
        }, this);
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

