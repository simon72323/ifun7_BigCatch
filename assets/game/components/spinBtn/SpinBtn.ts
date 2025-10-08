// import { _decorator, Label, Node, sp } from 'cc';

// import { BaseSpinBtn } from '@base/components/settingsPage/BaseSpinBtn';

// import { DataManager } from '@common/script/data/DataManager';
// import { Utils } from '@common/script/utils/Utils';

// enum SpinAnimation {
//     arrows = 'arrows',
//     disable = 'disable',
//     game = 'game',
//     idle = 'idel',
//     infinity = 'infinity',
//     rotate = 'rotate',
//     stop = 'stop',
// }

// const { ccclass, property } = _decorator;

// /**
//  * Spin按鈕元件
//  */
// @ccclass('SpinBtn')
// export class SpinBtn extends BaseSpinBtn {

//     /**一般狀態容器 */
//     private normalNode: Node;
//     /**自動轉次數 */
//     private autoLabel: Label;
//     /**按鈕動畫 */
//     private spinAnm: sp.Skeleton;
//     private autoSpinAnm: sp.Skeleton;

//     /**自動轉容器 */
//     private autoNode: Node;

//     onLoad() {
//         this.normalNode = this.node.getChildByName('Normal');
//         this.spinAnm = this.normalNode.getChildByName('spin_button_ani').getComponent(sp.Skeleton);
//         Utils.ClearSpine(this.spinAnm);
//         this.spinAnm.addAnimation(0, SpinAnimation.arrows, true);

//         this.autoNode = this.node.getChildByName('Auto');
//         this.autoSpinAnm = this.autoNode.getChildByName('spin_button_ani').getComponent(sp.Skeleton);
//         this.autoLabel = this.autoNode.getChildByPath('spin_button_ani/Slot/SpinNum').getComponent(Label);
//         this.autoNode.active = false;
//     }

//     /**
//      * 停止自動轉
//      */
//     public stopAuto(): void {
//         this.autoNode.active = false;
//         this.normalNode.active = true;
//     }

//     /**
//      * 設定自動轉次數
//      * @param value 
//      */
//     public setAutoNum(value: number): void {
//         this.autoLabel.string = value.toString();
//     }


//     /**
//      * 設定按鈕狀態
//      * @param state 
//      */
//     public setState(state: SpinButtonState): void {

//         switch (state) {
//             case SpinButtonState.Idle: //idle
//                 XUtils.ClearSpine(this.spinAnm);
//                 this.spinAnm.setAnimation(0, SpinAnimation.idle, true);
//                 break;
//             case SpinButtonState.Loop:  //start
//                 XUtils.ClearSpine(this.spinAnm);
//                 this.spinAnm.setAnimation(0, SpinAnimation.rotate, true);
//                 break;
//             case SpinButtonState.Win:  //win
//                 XUtils.ClearSpine(this.spinAnm);
//                 break;
//             case SpinButtonState.Auto:  //auto
//                 this.autoNode.active = true;
//                 this.normalNode.active = false;
//                 XUtils.ClearSpine(this.autoSpinAnm);

//                 //無限轉
//                 if (DataManager.getInstance().auto.mode == AutoPlayMode.always || DataManager.getInstance().auto.mode == AutoPlayMode.tillBonus) {
//                     this.autoLabel.node.active = false;
//                     this.autoSpinAnm.setAnimation(0, SpinAnimation.infinity, true);
//                 }
//                 //次數轉
//                 else if (DataManager.getInstance().auto.mode == AutoPlayMode.num) {
//                     this.autoLabel.string = DataManager.getInstance().auto.num.toString();
//                     this.autoLabel.node.active = true;
//                     this.autoSpinAnm.setAnimation(0, SpinAnimation.game, true);
//                 }
//                 break;
//             case SpinButtonState.Disabled:  //disabled
//                 XUtils.ClearSpine(this.spinAnm);
//                 this.spinAnm.setAnimation(0, SpinAnimation.disable, true);
//                 break;
//             default:
//                 break;
//         }
//     }
// }