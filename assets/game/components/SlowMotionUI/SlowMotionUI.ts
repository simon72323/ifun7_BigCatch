// import { _decorator, Color, Component, sp } from 'cc';

// import { AudioKey } from '@game/script/data/AudioKey';
// import { GameConst } from '@game/script/data/GameConst';

// import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { Utils } from '@common/script/utils/Utils';

// enum SlowMotionAnimation {
//     begin = 'begin',
//     end = 'end',
//     loop = 'loop',
// }

// const { ccclass, property } = _decorator;

// /**
//  * 咪牌特效
//  */
// @ccclass('SlowMotionUI')
// export class SlowMotionUI extends Component {

//     private miList: sp.Skeleton[] = [];
//     /**紀錄是否正在瞇牌(避免淡入2次) */
//     private isMi: boolean = false;

//     private curIdx: number = -1;
//     onLoad() {
//         let len: number = GameConst.REEL_COL;
//         for (let i: number = 0; i < len; ++i) {
//             let anm = this.node.getChildByName(`${i}`).getComponent(sp.Skeleton);
//             this.miList.push(anm);
//             anm.setAnimation(0, SlowMotionAnimation.loop, true);
//         }

//         SlotMachine.startMi.on((column: number) => {
//             AudioManager.getInstance().playSound(AudioKey.teasing);
//             this.isMi = true;
//             this.setCurrentIndex(column);
//         }, this);

//         SlotMachine.stopMi.on(() => {
//             if (!this.isMi) {
//                 return;
//             }
//             AudioManager.getInstance().stopSound(AudioKey.teasing);
//             this.isMi = false;
//             this.setCurrentIndex(-1);
//         }, this);

//         this.setCurrentIndex(-1);
//     }

//     /**
//      * 設定當前咪牌索引
//      * @param target 目標索引
//      */
//     private setCurrentIndex(target: number) {
//         this.miList.forEach((v, idx) => {
//             if (idx == this.curIdx) {
//                 Utils.fadeOut(v.node, 0.3, 255, 0, () => {
//                     v.node.active = false;
//                 });
//             }
//             else {
//                 v.node.active = idx === target;
//                 v.color = Color.WHITE;
//             }
//         }, this);
//         this.curIdx = target;
//     }
// }