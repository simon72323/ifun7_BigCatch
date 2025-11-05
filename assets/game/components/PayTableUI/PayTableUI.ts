// import { _decorator, Button, Component, Label, Node, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';

// import { SymbolID } from '@game/script/data/GameConst';

// import { DataManager } from '@common/script/data/DataManager';
// import { XEvent5 } from '@common/script/event/XEvent';
// import { Grid } from '@common/script/types/BaseType';


// const { ccclass, property } = _decorator;

// /**
//  * 圖示賠率
//  */
// @ccclass('PayTableUI')
// export class PayTableUI extends Component {

//     /**顯示賠率(grid, symbolID, SpriteFrame, worldPos) */
//     public static show: XEvent5<Grid, number, SpriteFrame, Vec3, { count: number, cent: string }[]> = new XEvent5();

//     /**賠率底圖(0:L, 1:Bonus_L, 2:R, 3:Bonus_R)*/
//     @property({ type: SpriteFrame })
//     public payBgSprite: SpriteFrame[] = [];

//     /**賠率表壓黑 */
//     private black: Node = null;
//     private sensor: Node = null;

//     /**賠率表圖示 */
//     private paySymbol: Node = null;

//     /**
//      * 
//      */
//     onLoad() {

//         this.black = this.node.getChildByName('Black');
//         this.sensor = this.node.getChildByName('Sensor');
//         this.paySymbol = this.node.getChildByPath('PaySymbol');

//         PayTableUI.show.on(this.onShow, this);
//         this.black.on(Button.EventType.CLICK, this.onHide, this);

//         // let lang = DataManager.getInstance().urlParam.lang;
//         // BundleLoader.onLoaded(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.paytable}`, (langRes: any) => {
//         //     this.node.getChildByPath('PaySymbol/Scatter/L/bg').getComponent(Sprite).spriteFrame = langRes['paytable_left_2'];
//         //     this.node.getChildByPath('PaySymbol/Scatter/R/bg').getComponent(Sprite).spriteFrame = langRes['paytable_right_2'];

//         //     this.node.getChildByPath('PaySymbol/Wild/L/bg').getComponent(Sprite).spriteFrame = langRes['paytable_left_1'];
//         //     this.node.getChildByPath('PaySymbol/Wild/R/bg').getComponent(Sprite).spriteFrame = langRes['paytable_right_1'];

//         // });

//         this.sensor.on(Button.EventType.CLICK, this.onHide, this);

//         this.node.active = false;
//     }


//     /**
//      * 顯示圖示賠率
//      * @param col 
//      * @param row 
//      * @param symbolID 
//      * @param spriteFrame 
//      */
//     private onShow(grid: Grid, symbolID: number, spriteFrame: SpriteFrame, worldPos: Vec3, payData: { count: number, cent: string }[]): void {

//         let localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
//         this.paySymbol.setPosition(localPos);
//         let isLeft = grid.col < 3;
//         let side = isLeft ? 'L' : 'R';
//         this.paySymbol.getChildByPath('Normal').active = false;
//         this.paySymbol.getChildByPath('Scatter').active = false;
//         this.paySymbol.getChildByPath('Wild').active = false;

//         if (symbolID === SymbolID.Scatter) {
//             this.paySymbol.getChildByPath('Scatter').active = true;
//             this.paySymbol.getChildByPath('Scatter/L').active = isLeft;
//             this.paySymbol.getChildByPath('Scatter/R').active = !isLeft;
//         }
//         else if (symbolID === SymbolID.Wild) {
//             this.paySymbol.getChildByPath('Wild').active = true;
//             this.paySymbol.getChildByPath('Wild/L').active = isLeft;
//             this.paySymbol.getChildByPath('Wild/R').active = !isLeft;
//         }
//         else {
//             this.paySymbol.getChildByPath('Normal').active = true;
//             this.paySymbol.getChildByPath('Normal/L').active = isLeft;
//             this.paySymbol.getChildByPath('Normal/R').active = !isLeft;

//             this.paySymbol.getChildByPath(`Normal/${side}/symbol`).getComponent(Sprite).spriteFrame = spriteFrame;
//             for (let i: number = 0; i < 4; ++i) {
//                 this.paySymbol.getChildByPath(`Normal/${side}/Layout/Pay${i}/num_paytable1`).getComponent(Label).string = `${payData[i].count}`;
//                 this.paySymbol.getChildByPath(`Normal/${side}/Layout/Pay${i}/num_paytable2`).getComponent(Label).string = `${payData[i].cent}`;
//             }
//         }

//         DataManager.getInstance().isPayTable = true;
//         this.node.active = true;

//     }

//     /**
//      * 隱藏
//      */
//     private onHide(): void {
//         this.node.active = false;
//         DataManager.getInstance().isPayTable = false;
//     }
// }

