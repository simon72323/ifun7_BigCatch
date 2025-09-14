import { _decorator, Button, Sprite, SpriteFrame } from 'cc';

import { BaseSettingsPage } from '@base/components/settingsPage/BaseSettingsPage';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { APIManager } from '@base/script/utils/APIManager';
import { XEvent, XEvent1 } from '@base/script/utils/XEvent';

const { ccclass, property } = _decorator;

/**
 * 按鈕介面2
 */
@ccclass('SettingsPage2')
export class SettingsPage2 extends BaseSettingsPage {

    /**開啟 */
    public static show: XEvent = new XEvent();
    /**關閉 */
    public static hide: XEvent = new XEvent();
    /**淡入 */
    public static fadeIn: XEvent = new XEvent();
    /**淡出 */
    public static fadeOut: XEvent = new XEvent();
    /**設定靜音 */
    public static setMute: XEvent1<boolean> = new XEvent1();

    public static clickCancel: XEvent = new XEvent();
    public static clickHistory: XEvent = new XEvent();
    public static clickHelp: XEvent = new XEvent();
    public static clickHome: XEvent = new XEvent();
    public static clickVoice: XEvent = new XEvent();

    public static setHistoryVisible: XEvent1<boolean> = new XEvent1();

    @property({ type: SpriteFrame })
    public Voice_act = null;

    @property({ type: SpriteFrame })
    public Voice_off = null;

    onLoad() {
        super.onLoad();
        this.node.getChildByPath('CancelButton').on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            SettingsPage2.clickCancel.emit();
        }, this);

        this.node.getChildByPath('SetBlock').on(Button.EventType.CLICK, () => {
            SettingsPage2.clickCancel.emit();
        }, this);

        this.node.getChildByPath('HistoryButton').on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            SettingsPage2.clickHistory.emit();
        }, this);
        this.node.getChildByPath('HistoryButton').active = BaseDataManager.getInstance().isDemoMode() === false;

        this.node.getChildByPath('HelpButton').on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            SettingsPage2.clickHelp.emit();
        }, this);

        this.node.getChildByPath('HomeButton').on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            SettingsPage2.clickHome.emit();
        }, this);

        //顯示
        SettingsPage2.show.on(this.show, this);
        //隱藏
        SettingsPage2.hide.on(this.hide, this);


        this.node.getChildByName('VoiceButton').on(Button.EventType.CLICK, () => {
            AudioManager.getInstance().play(AudioKey.BtnClick);
            SettingsPage2.clickVoice.emit();
        });

        SettingsPage2.setMute.on((mute) => {
            this.node.getChildByName('VoiceButton').getComponent(Sprite).spriteFrame = mute ? this.Voice_off : this.Voice_act;
        }, this);

        SettingsPage2.fadeIn.on(this.fadeIn, this);
        SettingsPage2.fadeOut.on(this.fadeOut, this);

        //TODO:API關閉HOME?
        if (APIManager.getInstance().isReady() && APIManager.getInstance().getReturnType() === 0) {
            this.node.getChildByPath('HomeButton').active = false;
        }

        SettingsPage2.setHistoryVisible.on((v) => {
            this.node.getChildByPath('HistoryButton').active = v;
        }, this);

        this.hide();
    }
}

