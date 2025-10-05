// import { _decorator, Button, Color, Input, instantiate, Label, Node, Prefab, sp, Sprite, SpriteFrame } from 'cc';

// import { FreeSpinInfoBtn } from '@base/components/campaign/FreeSpinInfoBtn';
// import { BaseSettingsPage } from '@base/components/settingsPage/BaseSettingsPage';
// import { BaseSpinBtn } from '@base/components/settingsPage/BaseSpinBtn';
// import { AudioKey } from '@base/script/audio/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { DataManager } from '@common/script/data/DataManager';;
// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { SpinButtonState, TurboMode } from '@base/script/types/BaseType';
// import { XEvent, XEvent1 } from '@common/script/event/XEvent';

// const { ccclass, property } = _decorator;

// /**
//  * 按鈕介面2
//  */
// @ccclass('SettingsPage1')
// export class SettingsPage1 extends BaseSettingsPage {

//     /**開啟 */
//     public static show: XEvent = new XEvent();
//     /**關閉 */
//     public static hide: XEvent = new XEvent();
//     /**淡入 */
//     public static fadeIn: XEvent = new XEvent();
//     /**淡出 */
//     public static fadeOut: XEvent = new XEvent();
//     /**設定靜音 */
//     public static setMute: XEvent1<boolean> = new XEvent1();
//     /**設定快速模式 */
//     public static setTurbo: XEvent1<TurboMode> = new XEvent1();
//     /**設定是否可用 */
//     public static setEnabled: XEvent1<boolean> = new XEvent1();
//     /**設定Spin狀態 */
//     public static setSpinState: XEvent1<SpinButtonState> = new XEvent1();
//     /**設定自動次數 */
//     public static setSpinNum: XEvent1<number> = new XEvent1();

//     public static showAutoPage: XEvent1<boolean> = new XEvent1();
//     public static stopAuto: XEvent = new XEvent();
//     public static plusEnabled: XEvent1<boolean> = new XEvent1();
//     public static lessEnabled: XEvent1<boolean> = new XEvent1();

//     public static clickTurbo: XEvent = new XEvent();
//     public static clickLess: XEvent = new XEvent();
//     public static clickSpin: XEvent = new XEvent();
//     public static clickPlus: XEvent = new XEvent();
//     public static clickAuto: XEvent = new XEvent();
//     public static clickMenu: XEvent = new XEvent();

//     /**設定免費轉次數 */
//     public static setFreeSpinRemainCount: XEvent1<number> = new XEvent1();
//     public static setFreeSpinVisible: XEvent1<boolean> = new XEvent1();

//     @property({ type: SpriteFrame })
//     public Speed_act = null;

//     @property({ type: SpriteFrame })
//     public Tubro_act = null;

//     @property({ type: SpriteFrame })
//     public Tubro_off = null;

//     @property({ type: SpriteFrame })
//     public BetAdd_act = null;

//     @property({ type: SpriteFrame })
//     public BetAdd_off = null;

//     @property({ type: SpriteFrame })
//     public BetLess_act = null;

//     @property({ type: SpriteFrame })
//     public BetLess_off = null;

//     private AutoBtn: Node = null;

//     @property({ type: Prefab, tooltip: 'Spin按鈕預製' })
//     public spinBtnPrefab = null;

//     private spinBtn: BaseSpinBtn;


//     /**是否正在免費轉(免費轉中禁止使用任一按鈕) */
//     private isFreeSpin: boolean = false;

//     private onTouchPlus(): void {
//         // AudioManager.getInstance().play(AudioKey.BetClick);
//         SettingsPage1.clickPlus.emit();
//     }

//     private onTouchLess(): void {
//         // AudioManager.getInstance().play(AudioKey.BetClick);
//         SettingsPage1.clickLess.emit();
//     }

//     // private startPress(): void {
//     //     document.addEventListener('mouseup', this.stopPress.bind(this), false);
//     // }

//     // private stopPress(): void {
//     //     document.removeEventListener('mouseup', this.stopPress, false);
//     // }

//     onLoad() {
//         super.onLoad();
//         this.spinBtn = instantiate(this.spinBtnPrefab).getComponent(BaseSpinBtn);
//         this.node.getChildByName('SpinBtnNode').addChild(this.spinBtn.node);
//         this.spinBtn.node.setSiblingIndex(0);

//         this.node.getChildByPath('TurboBtn').on(Button.EventType.CLICK, () => {
//             AudioManager.getInstance().play(AudioKey.TurboClick);
//             SettingsPage1.clickTurbo.emit();
//         }, this);
//         this.spinBtn.node.on(Button.EventType.CLICK, () => {
//             SettingsPage1.clickSpin.emit();
//         }, this);

//         this.AutoBtn = this.node.getChildByPath('AutoButton');
//         this.AutoBtn.getComponent(Button).node.on('touch-start', this.onTouchAuto, this);
//         this.AutoBtn.getComponent(Button).node.on('touch-end', this.onTouchAuto, this);
//         this.AutoBtn.getComponent(Button).node.on('touch-cancel', this.onTouchAuto, this);

//         this.node.getChildByPath('MenuButton/Click').on(Button.EventType.CLICK, () => {
//             AudioManager.getInstance().play(AudioKey.BtnClick);
//             SettingsPage1.clickMenu.emit();
//         }, this);

//         //靜音
//         SettingsPage1.setMute.on((mute) => {
//             this.node.getChildByName('MenuButton').getChildByName('VoiceOff').active = mute;
//         }, this);

//         //自動面板開關
//         SettingsPage1.showAutoPage.on((autoPageVisible) => {
//             if (autoPageVisible) {
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).clearTrack(1);
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).addAnimation(1, 'begin', false);
//             }
//             else {
//                 if (DataManager.getInstance().auto.isAutoPlay() == false) {
//                     this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).clearTracks();
//                     this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).setToSetupPose();
//                     this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).addAnimation(0, 'normal', true);
//                 }
//             }
//         }, this);

//         //停止自動
//         BaseEvent.onStopAuto.on(() => {
//             this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).clearTrack(1);
//             this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).addAnimation(1, 'end', false);

//             this.spinBtn.stopAuto();
//             if (DataManager.getInstance().isIdle() === false) {
//                 this.AutoBtn.getComponent(Button).interactable = false;
//                 this.scheduleOnce(() => {
//                     if (DataManager.getInstance().isIdle() === false) {
//                         this.AutoBtn.getChildByName('AutoDis').getComponent(Sprite).color = new Color(255, 255, 255, 255);
//                         this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).color = new Color(255, 255, 255, 0);
//                     }
//                 }, 0.2);
//             }
//         }, this);

//         //加號是否可用
//         // SettingsPage1.plusEnabled.on((enabled) => {
//         //     let plusBtn = this.node.getChildByPath('BetPlusBtn');
//         //     plusBtn.getComponent(Sprite).spriteFrame = enabled ? this.BetAdd_act : this.BetAdd_off;
//         //     plusBtn.getComponent(Button).enabled = enabled;
//         //     if (enabled) {
//         //         plusBtn.on(Button.EventType.CLICK, this.onTouchPlus, this);
//         //     }
//         //     else {
//         //         plusBtn.off(Button.EventType.CLICK, this.onTouchPlus, this);
//         //     }


//         // }, this);

//         //減號是否可用
//         // SettingsPage1.lessEnabled.on((enabled) => {
//         //     let lessBtn = this.node.getChildByPath('BetLessBtn');
//         //     lessBtn.getComponent(Sprite).spriteFrame = enabled ? this.BetLess_act : this.BetLess_off;
//         //     lessBtn.getComponent(Button).enabled = enabled;
//         //     if (enabled) {
//         //         lessBtn.on(Button.EventType.CLICK, this.onTouchLess, this);
//         //     }
//         //     else {
//         //         lessBtn.off(Button.EventType.CLICK, this.onTouchLess, this);
//         //     }
//         // }, this);

//         //快速模式
//         // SettingsPage1.setTurbo.on(this.setTurboMode, this);
//         //設定是否可用
//         SettingsPage1.setEnabled.on(this.setEnabled, this);

//         SettingsPage1.setSpinState.on(this.setSpinState, this);

//         SettingsPage1.setSpinNum.on((value) => {
//             this.spinBtn.setAutoNum(value);
//         }, this);

//         SettingsPage1.fadeIn.on(this.fadeIn, this);
//         SettingsPage1.fadeOut.on(this.fadeOut, this);

//         //顯示
//         SettingsPage1.show.on(() => {
//             this.show();
//             this.setButtonEnabled(true);
//         }, this);

//         //隱藏
//         SettingsPage1.hide.on(this.hide, this);

//         //FreeSpin
//         let freeSpinLabel: Label = this.node.getChildByPath('FreeSpin/spinNumber').getComponent(Label);
//         let freeSpinNode: Node = this.node.getChildByPath('FreeSpin');
//         freeSpinNode.active = false;
//         SettingsPage1.setFreeSpinRemainCount.on((value) => {
//             freeSpinLabel.string = value.toString();
//         }, this);
//         SettingsPage1.setFreeSpinVisible.on((visible) => {
//             this.isFreeSpin = visible;
//             freeSpinNode.active = this.isFreeSpin && DataManager.getInstance().isBS();
//         }, this);
//         this.node.active = true;
//     }

//     /**
//      * 點擊自動按鈕
//      * @param event 
//      * @returns 
//      */
//     private onTouchAuto(event) {
//         if (DataManager.getInstance().isMenuOn == true) return;
//         if (event.type === 'touch-start' && !DataManager.getInstance().isAutoMode) {
//             this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).clearTracks();
//             this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).setToSetupPose();
//             this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).addAnimation(0, 'hit', true);
//         }
//         else if (event.type == 'touch-end') {
//             AudioManager.getInstance().play(AudioKey.BtnClick);
//             SettingsPage1.clickAuto.emit();
//         }
//         else if (event.type == 'touch-cancel') {
//             if (!DataManager.getInstance().isAutoMode) {
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).clearTracks();
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).setToSetupPose();
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).addAnimation(0, 'normal', true);
//             }
//             else {
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).clearTracks();
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).setToSetupPose();
//                 this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).addAnimation(0, 'stop', true);
//             }
//         }
//     }

//     private setTurboMode(turboMode: TurboMode) {
//         switch (turboMode) {
//             case TurboMode.Speed:
//                 this.node.getChildByName('TurboBtn').getComponent(Sprite).spriteFrame = this.Speed_act;
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).clearTracks();
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).setToSetupPose();
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).addAnimation(0, 'loop', true);
//                 break;
//             case TurboMode.Turbo:
//                 this.node.getChildByName('TurboBtn').getComponent(Sprite).spriteFrame = this.Tubro_act;
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).clearTracks();
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).setToSetupPose();
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).addAnimation(0, 'loop', true);
//                 break;
//             case TurboMode.Normal:
//                 this.node.getChildByName('TurboBtn').getComponent(Sprite).spriteFrame = this.Tubro_off;
//                 this.node.getChildByName('TurboBtn').getChildByName('TurboAnm').getComponent(sp.Skeleton).addAnimation(1, 'end', false);
//                 break;
//         }
//     }

//     private setEnabled(enabled: boolean) {
//         //免費轉中禁止使用任一按鈕
//         const isEnabled = enabled && this.isFreeSpin === false;

//         //非自動轉才能禁用
//         let autoEnabled: boolean = isEnabled || DataManager.getInstance().isAutoMode;
//         let invisibleColor = new Color(255, 255, 255, 0);
//         this.AutoBtn.getComponent(Button).interactable = autoEnabled;
//         this.AutoBtn.getChildByName('AutoDis').getComponent(Sprite).color = autoEnabled ? invisibleColor : Color.WHITE;
//         this.AutoBtn.getChildByName('AutoAnm').getComponent(sp.Skeleton).color = autoEnabled ? Color.WHITE : invisibleColor;

//         if (this.node.getChildByPath('MenuButton/Click')) {
//             this.node.getChildByPath('MenuButton/Click').getComponent(Button).interactable = autoEnabled;
//         }
//         else {
//             this.node.getChildByName('MenuButton').getComponent(Button).interactable = isEnabled;
//         }

//         FreeSpinInfoBtn.setEnabled.emit(isEnabled);
//     }

//     /**
//      * 更新Spin按鈕狀態
//      * @param state 
//      */
//     private setSpinState(state: SpinButtonState) {

//         AudioManager.getInstance().stop(AudioKey.SpinLoop);

//         this.spinBtn.setState(state);
//     }
// }

