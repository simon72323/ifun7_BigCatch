// import { _decorator, Component, Label, Node, tween, UITransform, Vec3 } from 'cc';

// import { BaseFont } from '@common/script/data/BaseConst';
// import { FontManager } from '@common/script/manager/FontManager';
// import { XEvent, XEvent1 } from '@common/script/event/XEvent';
// import { XUtils } from '@common/script/utils/XUtils';

// const { ccclass } = _decorator;

// /**
//  * 公版贏分UI
//  */
// @ccclass('BasicWinUI')
// export class BasicWinUI extends Component {

//     /**顯示(顯示時會被除100) */
//     public static show: XEvent1<number> = new XEvent1();
//     /**隱藏 */
//     public static hide: XEvent = new XEvent();

//     private label: Label;

//     private bg: Node;

//     private static bigger: Vec3 = new Vec3(1.2, 1.2, 1);

//     onLoad() {
//         this.label = this.node.getChildByPath('win_number').getComponent(Label);
//         this.bg = this.node.getChildByPath('win_bg');

//         //顯示
//         BasicWinUI.show.on((value) => {
//             this.node.active = true;
//             this.label.string = FontManager.getInstance().convertToAsciiString(BaseFont.number, XUtils.NumberToCentString(value));
//             this.label.updateRenderData(true);//強制刷新label寬度,否則背景無法正確呈現大小
//             let bgSize = this.label.getComponent(UITransform).contentSize.clone();
//             bgSize.width += 50;//增加一點padding
//             this.bg.getComponent(UITransform).setContentSize(bgSize);
//             tween(this.label.node)
//                 .to(0.1, { scale: BasicWinUI.bigger })
//                 .to(0.1, { scale: Vec3.ONE })
//                 .start();
//         }, this);

//         //隱藏
//         BasicWinUI.hide.on(() => {
//             this.node.active = false;
//         }, this);

//         this.node.active = false;
//     }

//     start() {

//     }

//     update(_deltaTime: number) {

//     }
// }

