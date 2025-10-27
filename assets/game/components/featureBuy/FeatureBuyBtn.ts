import { _decorator, Button, Component, Node } from 'cc';


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

    private isVisible: boolean = false;
    private isEnabled: boolean = false;

    onLoad() {
        //點擊免費遊戲
        this.FeatureBuyButton = this.node.getChildByName('btn');
        this.FeatureBuyButton.on(Button.EventType.CLICK, () => {
            // AudioManager.getInstance().playSound(GameAudioKey.FeatureBuy);
            FeatureBuyBtn.click.emit();
        }, this);

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
        // BaseEvent.fadeInFeatureBuy.on(() => {
        //     if (!this.FeatureBuyButton.isValid) {
        //         return;
        //     }
        //     this.FeatureBuyButton.getComponent(Button).enabled = true;
        //     Utils.fadeIn(this.node, 0.4, 0, 255);
        // }, this);

        // //淡出
        // BaseEvent.fadeOutFeatureBuy.on(() => {
        //     if (!this.FeatureBuyButton.isValid) {
        //         return;
        //     }
        //     this.FeatureBuyButton.getComponent(Button).enabled = false;
        //     Utils.fadeOut(this.node, 0.4, 255, 0);
        // }, this);
    }

    /**刷新 */
    private refresh(): void {
        if (!this.FeatureBuyButton.isValid) {
            return;
        }
        this.node.active = this.isVisible;
        this.FeatureBuyButton.active = this.isVisible;
        this.FeatureBuyButton.getComponent(Button).interactable = this.isEnabled;
    }
}

