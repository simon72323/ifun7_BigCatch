// import { _decorator, Component, CCInteger, Node, Prefab, tween, CCFloat, instantiate, UITransform, Vec3, Tween, Size } from 'cc';

// import { BaseSymbol } from '@common/components/slotMachine/BaseSymbol';
// import { IWinLineData } from '@common/components/slotMachine/SlotType';

// import { XEvent, XEvent1, XEvent2 } from '@common/script/event/XEvent';
// import { delay, Utils } from '@common/script/utils/Utils';



// const { ccclass, property } = _decorator;
// /**
//  * 老虎機
//  */
// @ccclass('SlotReelMachine')
// export class SlotReelMachine extends Component {
//     /**中獎(winPos) */
//     public static showSymbolWin: XEvent1<IWinLineData[]> = new XEvent1();

//     @property({ type: Node, tooltip: '中獎位置(順序)' })
//     public reelPosList: Node[] = [];

//     @property({ type: Node, tooltip: 'scatter層' })
//     public scatterLayer: Node = null!;

//     @property({ type: Node, tooltip: '勝利層' })
//     public winLayer: Node = null!;


//     /**
//      * 建立物件
//      */
//     // onLoad() {
//     //     SlotReelMachine.showSymbolWin.on(this.onShowSymbolWin, this);
//     // }



//     // /**
//     //  * 關閉中獎效果
//     //  */
//     // private onHideSymbolWin(): void {
//     //     for (let i = 0; i < this.spinList.length; i++) {
//     //         this.spinList[i].hideSymbolWin();
//     //     }
//     // }

//     // /**
//     //  * 關閉中獎效果
//     //  * @param reelIdx 
//     //  * @param visible 
//     //  */
//     // private onSetReelVisible(reelIdx: number, visible: boolean): void {
//     //     let reel = this.spinList[reelIdx];
//     //     reel.setVisible(visible);
//     // }

// }