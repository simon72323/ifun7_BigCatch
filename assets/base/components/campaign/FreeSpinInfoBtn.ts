// import { _decorator, Button, Component } from 'cc';

// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { ModuleID } from '@base/script/types/BaseType';
// import { XEvent, XEvent1 } from '@common/script/event/XEvent';

// import { DataManager } from '@common/script/data/DataManager';

// const { ccclass } = _decorator;

// /**
//  * 活動資訊按鈕
//  */
// @ccclass('FreeSpinInfoBtn')
// export class FreeSpinInfoBtn extends Component {

//     public static show: XEvent = new XEvent();
//     public static hide: XEvent = new XEvent();
//     public static clickInfo: XEvent = new XEvent();
//     public static setEnabled: XEvent1<boolean> = new XEvent1();

//     private isShow: boolean = false;

//     onLoad() {

//         FreeSpinInfoBtn.show.on(() => {
//             this.isShow = true;
//             this.node.active = this.isShow && DataManager.getInstance().isBS();
//         }, this);
//         FreeSpinInfoBtn.hide.on(() => {
//             this.isShow = false;
//             this.node.active = this.isShow;
//         }, this);

//         let btn = this.node.getChildByName('Button').getComponent(Button);
//         btn.node.on(Button.EventType.CLICK, () => {
//             FreeSpinInfoBtn.clickInfo.emit();
//         }, this);

//         FreeSpinInfoBtn.setEnabled.on((enabled) => {
//             btn.interactable = enabled;
//         }, this);

//         //FS內不顯示活動按鈕
//         BaseEvent.changeScene.on((_moduleID: ModuleID) => {
//             this.node.active = this.isShow && DataManager.getInstance().isBS();
//         }, this);

//         this.node.active = false;
//     }

// }

