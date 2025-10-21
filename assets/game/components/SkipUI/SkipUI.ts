// import { _decorator, Button, Component } from 'cc';

// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { XEvent } from '@common/script/event/XEvent';

// const { ccclass } = _decorator;

// @ccclass('SkipUI')
// export class SkipUI extends Component {

//     public static show: XEvent = new XEvent();
//     public static hide: XEvent = new XEvent();

//     onLoad() {
//         this.node.on(Button.EventType.CLICK, () => {
//             BaseEvent.clickSkip.emit();
//         }, this);

//         SkipUI.show.on(() => {
//             this.node.active = true;
//         }, this);
//         SkipUI.hide.on(() => {
//             this.node.active = false;
//         }, this);
//         this.node.active = false;
//     }

//     update(_deltaTime: number) {

//     }
// }

