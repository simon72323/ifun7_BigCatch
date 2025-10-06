// import { _decorator, Button, Component, instantiate, Label, Node, ScrollView, EventTouch } from 'cc';

// import { addBtnClickEvent, Utils } from '@common/script/utils/Utils';

// const { ccclass, property } = _decorator;
// @ccclass('DropDown')
// export class DropDown extends Component {
//     /** 選單項目 */
//     public dropDownItem: Node = null;
//     /** 選單項目ScrollView */
//     public scrollView: ScrollView;
//     /** 選單項目Label */
//     public displayItemLabel: Label;
//     /** 遮罩返回按鈕 */
//     public maskBtn: Node;

//     private pickIdx: number = 0;//選擇的項目
//     private autoStringList: string[] = ['10', '20', '30', '40', '50', '80', '100', '150', '200', 'UNLIMITED'];

//     /**
//      * 載入
//      */
//     protected onLoad(): void {
//         this.dropDownItem = this.node.getChildByPath('DropDownItem');
//         this.scrollView = this.node.getChildByName('ScrollView').getComponent(ScrollView);
//         this.displayItemLabel = this.node.getChildByPath('DisplayItem/Label').getComponent(Label);
//         this.maskBtn = this.node.getChildByPath('ScrollView/MaskBtn');

//         this.scrollView.node.active = false;
//         this.maskBtn.active = false;

//         this.createItem();//建立選單項目

//         //監聽事件
//         this.displayItemLabel.node.on(Node.EventType.TOUCH_END, this.click, this);
//         addBtnClickEvent(this.node, 'DropDown', this.maskBtn.getComponent(Button), this.maskClose);
//     }

//     /**
//      * 建立選單項目
//      */
//     protected createItem() {
//         if (this.autoStringList == null) return;
//         for (let i in this.autoStringList) {
//             let item = instantiate(this.dropDownItem);
//             this.scrollView.content.addChild(item);
//             item.getChildByName('Label').getComponent(Label).string = this.autoStringList[i];
//             Utils.AddHandHoverEvent(item);
//             item.setPosition(0, 0, 0);
//             item.active = true;

//             //啟用監聽
//             addBtnClickEvent(this.node, 'DropDown', item.getComponent(Button), this.pickItem, this.autoStringList[i]);
//         }
//     }

//     /**
//      * 啟用事件
//      */
//     public onEnable(): void {
//         //添加手勢事件
//         Utils.AddHandHoverEvent(this.node);
//         //設置預設選擇的項目
//         this.displayItemLabel.string = this.autoStringList[this.pickIdx];
//     }

//     /**
//      * 禁用事件
//      */
//     public onDisable(): void {
//         this.maskClose();
//     }

//     /**
//      * 遮罩點擊事件
//      */
//     public maskClose() {
//         console.log('maskClose');
//         this.open(false);
//     }

//     /**
//      * 點擊事件
//      */
//     private click() {
//         this.open(!this.scrollView.node.active);
//     }

//     /**
//      * 打開下拉選單
//      * @param active 
//      */
//     private open(active: boolean) {
//         this.scrollView.node.active = active;
//         this.maskBtn.active = active;
//     }

//     /**
//      * 選擇項目
//      * @param event 
//      * @param autoString 
//      */
//     private pickItem(event: EventTouch, autoString: string) {
//         this.displayItemLabel.string = autoString;
//         if (event != null) this.open(false);
//     }
// }