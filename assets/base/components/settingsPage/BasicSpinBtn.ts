// import { _decorator, Label, sp } from 'cc';

// import { BaseSpinBtn } from '@base/components/settingsPage/BaseSpinBtn';
// import { BaseFont } from '@common/script/data/BaseConst';
// import { DataManager } from '@common/script/data/DataManager';;
// import { AutoPlayMode, SpinButtonState } from '@base/script/types/BaseType';
// import { FontManager } from '@base/script/utils/FontManager';

// enum SpinAnimation {
//     always = 'always',
//     auto = 'auto',
//     begin = 'begin',
//     disabled = 'disabled',
//     idle = 'idle',
//     loop = 'loop',
//     money = 'money',
// }

// const { ccclass } = _decorator;

// /**
//  * Spin按鈕基本元件, 表現不同需自行製作
//  */
// @ccclass('BasicSpinBtn')
// export class BasicSpinBtn extends BaseSpinBtn {

//     /**自動轉次數 */
//     private autoLabel: Label;

//     /**按鈕動畫 */
//     private spinAnm: sp.Skeleton;

//     /**自動轉動畫 */
//     private spinAnmAuto: sp.Skeleton;

//     onLoad() {
//         this.autoLabel = this.node.getChildByName('SpinNum').getComponent(Label);
//         this.spinAnm = this.node.getChildByName('SpinAnm').getComponent(sp.Skeleton);
//         this.spinAnmAuto = this.node.getChildByName('SpinAnmAuto').getComponent(sp.Skeleton);

//         this.spinAnm.clearTracks();
//         this.spinAnm.setToSetupPose();
//         this.spinAnm.addAnimation(0, SpinAnimation.idle, true);
//     }

//     /**
//      * 停止自動轉
//      */
//     public stopAuto(): void {
//         this.autoLabel.node.active = false;

//         this.spinAnm.node.active = true;
//         this.spinAnmAuto.node.active = false;
//     }

//     /**
//      * 設定自動轉次數
//      * @param value 
//      */
//     public setAutoNum(value: number): void {
//         this.autoLabel.string = FontManager.getInstance().convertToAsciiString(BaseFont.number, value.toString());
//     }

//     /**
//      * 設定按鈕狀態
//      * @param state 
//      */
//     public setState(state: SpinButtonState): void {
//         switch (state) {
//             case SpinButtonState.Idle: //idle
//                 this.spinAnm.clearTracks();
//                 this.spinAnm.setToSetupPose();
//                 this.spinAnm.setAnimation(0, SpinAnimation.idle, true);
//                 break;
//             case SpinButtonState.Loop:  //start
//                 this.spinAnm.addAnimation(1, SpinAnimation.begin, false);
//                 this.spinAnm.addAnimation(2, SpinAnimation.loop, true);
//                 break;
//             case SpinButtonState.Win:  //win
//                 this.spinAnm.clearTracks();
//                 this.spinAnm.setToSetupPose();
//                 this.spinAnm.setAnimation(0, SpinAnimation.money, true);
//                 break;
//             case SpinButtonState.Auto:  //auto
//                 this.spinAnmAuto.node.active = true;
//                 this.spinAnmAuto.clearTracks();
//                 this.spinAnmAuto.setToSetupPose();
//                 if (DataManager.getInstance().auto.mode == AutoPlayMode.always || DataManager.getInstance().auto.mode == AutoPlayMode.tillBonus) {
//                     this.spinAnmAuto.addAnimation(0, SpinAnimation.always, true);
//                 }
//                 else if (DataManager.getInstance().auto.mode == AutoPlayMode.num) {
//                     this.spinAnmAuto.addAnimation(0, SpinAnimation.auto, true);

//                     this.autoLabel.string = FontManager.getInstance().convertToAsciiString(BaseFont.number, DataManager.getInstance().auto.num.toString());
//                     this.autoLabel.node.active = true;
//                 }
//                 this.spinAnm.node.active = false;
//                 break;
//             case SpinButtonState.Disabled:  //disabled
//                 this.spinAnm.clearTracks();
//                 this.spinAnm.setToSetupPose();
//                 this.spinAnm.setAnimation(0, SpinAnimation.disabled, true);
//                 break;
//             default:
//                 break;
//         }
//     }
// }