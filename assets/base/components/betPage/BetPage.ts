// import { _decorator, Button, Color, Component, EventHandler, instantiate, Label, Node, ScrollView, sp, Sprite, UITransform } from 'cc';

// import { AudioKey } from '@base/script/audio/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { BaseConst } from '@common/script/data/BaseConst';
// import { BaseEvent } from '@common/script/event/BaseEvent';
// import { BundleLoader } from '@base/script/main/BundleLoader';
// import { BaseLangBundleDir, CreditMode, ScrollEventType } from '@base/script/types/BaseType';
// import { XEvent } from '@common/script/event/XEvent';
// import { XUtils } from '@base/script/utils/XUtils';

// import { DataManager } from '@common/script/data/DataManager';

// const { ccclass } = _decorator;

// /**
//  * 面板索引(編輯到一半還不能存到BaseData, 需要另外紀錄)
//  */
// class ScrollIndex {
//     private Bet: number = 0;
//     private Rate: number = 0;
//     private Total: number = 0;
//     private Line: number = 0;

//     public setRate(rateIdx: number) {
//         this.Rate = rateIdx;
//         this.Rate = Math.min(this.Rate, DataManager.getInstance().bet.getRateLength() - 1);
//         this.Rate = Math.max(this.Rate, 0);

//         this.Total = DataManager.getInstance().bet.getTotalIndexByRateAndBet(this.Rate, this.Bet);
//     }

//     public setBet(betIdx: number) {
//         this.Bet = betIdx;
//         this.Bet = Math.min(this.Bet, DataManager.getInstance().bet.getBetLength() - 1);
//         this.Bet = Math.max(this.Bet, 0);

//         this.Total = DataManager.getInstance().bet.getTotalIndexByRateAndBet(this.Rate, this.Bet);
//     }

//     public setTotal(totalIdx: number) {
//         this.Total = totalIdx;
//         this.Total = Math.min(this.Total, DataManager.getInstance().bet.getTotalLength() - 1);
//         this.Total = Math.max(this.Total, 0);
//         let totalX = DataManager.getInstance().bet.getTotalXAt(this.Total);
//         this.Bet = totalX[0];
//         this.Rate = totalX[1];
//     }

//     public getRate(): number {
//         return this.Rate;
//     }

//     public getBet(): number {
//         return this.Bet;
//     }

//     public getTotal(): number {
//         return this.Total;
//     }
// }

// @ccclass('BetPage')
// export class BetPage extends Component {

//     public static show: XEvent = new XEvent();

//     /**面板關閉通知 */
//     public static onHide: XEvent = new XEvent();

//     /**下注OK */
//     public static onBetCheck: XEvent = new XEvent();

//     /**下注索引儲存 */
//     private ScrollIndex: ScrollIndex = new ScrollIndex();

//     private container: Node;

//     /** */
//     private ScrollColor = {
//         Total_1: new Color(213, 123, 33, 255),
//         Total_2: new Color(213, 123, 33, 128),
//         Total_3: new Color(213, 123, 33, 64),
//         Bet_1: new Color(255, 255, 255, 255),
//         Bet_2: new Color(128, 128, 128, 255),
//         Bet_3: new Color(64, 64, 64, 255)
//     };

//     private ScrollItemArray = {
//         Rate: [],
//         Bet: [],
//         Line: [],
//         Total: []
//     };

//     /**
//      * 
//      */
//     onLoad() {
//         BundleLoader.onLoaded(BaseConst.BUNDLE_BASE_CURRENCY, `${DataManager.getInstance().urlParam.lang}/${BaseLangBundleDir.ui3_0}`, (langRes: any) => {
//             this.container.getChildByPath('ScrollBg/text1').getComponent(Sprite).spriteFrame = langRes['bet_title'];
//             this.container.getChildByPath('ScrollBg/text2').getComponent(Sprite).spriteFrame = langRes['bet_title_1'];
//             this.container.getChildByPath('MaxBetAnm/MaxBetTxt').getComponent(Sprite).spriteFrame = langRes['maxBet'];
//         });

//         BetPage.show.on(this.onShow, this);

//         this.container = this.node.getChildByPath('Container');

//         this.container.getChildByPath('Block2').on(Button.EventType.CLICK, this.onClickClose, this);
//         this.container.getChildByPath('BtnClose').on(Button.EventType.CLICK, this.onClickClose, this);
//         this.container.getChildByPath('Block').on(Button.EventType.CLICK, this.onClickClose, this);

//         //Max
//         this.container.getChildByPath('MaxBetAnm/MaxBetAlpha').on('touch-start', this.MaxAnmState, this);
//         this.container.getChildByPath('MaxBetAnm/MaxBetAlpha').on('touch-end', this.MaxAnmState, this);
//         this.container.getChildByPath('MaxBetAnm/MaxBetAlpha').on('touch-cancel', this.MaxAnmState, this);

//         this.container.getChildByPath('ScrollBtn/ScrollUpR').on('touch-start', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollUpR').on('touch-end', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollUpR').on('touch-cancel', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownR').on('touch-start', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownR').on('touch-end', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownR').on('touch-cancel', this.ScrollSingleBtn, this);

//         this.container.getChildByPath('ScrollBtn/ScrollUpB').on('touch-start', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollUpB').on('touch-end', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollUpB').on('touch-cancel', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownB').on('touch-start', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownB').on('touch-end', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownB').on('touch-cancel', this.ScrollSingleBtn, this);

//         this.container.getChildByPath('ScrollBtn/ScrollUpT').on('touch-start', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollUpT').on('touch-end', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollUpT').on('touch-cancel', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownT').on('touch-start', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownT').on('touch-end', this.ScrollSingleBtn, this);
//         this.container.getChildByPath('ScrollBtn/ScrollDownT').on('touch-cancel', this.ScrollSingleBtn, this);

//         let scrollType: string[] = ['R', 'B', 'L', 'T'];
//         scrollType.forEach((type) => {
//             const scrollViewEventHandler = new EventHandler();
//             scrollViewEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
//             scrollViewEventHandler.component = 'BetPage';// 这个是脚本类名
//             scrollViewEventHandler.handler = 'ScrollCallback';
//             scrollViewEventHandler.customEventData = type;
//             const scrollview = this.container.getChildByPath(`Scroll${type}`).getComponent(ScrollView);
//             scrollview.scrollEvents.push(scrollViewEventHandler);
//         });

//         this.container.getChildByPath('MaxBetAnm/BetCheck').on(Button.EventType.CLICK, () => {
//             DataManager.getInstance().bet.setTotalIndexByRateAndBet(this.ScrollIndex.getRate(), this.ScrollIndex.getBet());
//             this.onClickClose();
//             AudioManager.getInstance().play(AudioKey.CheckClick);
//             BetPage.onBetCheck.emit();
//         }, this);

//         //收到封包後初始化資料
//         BaseEvent.initMessageComplete.on(this.onInit, this);

//         this.node.active = false;
//     }

//     update(_deltaTime: number) {

//     }

//     /**
//      * 收到資料初始化
//      */
//     private onInit(): void {

//         // RateScroll
//         let ScrollRateItem = this.container.getChildByPath('ScrollR/view/content/item');
//         let ScrollRateContent = this.container.getChildByPath('ScrollR/view/content');
//         for (let i = 0; i < DataManager.getInstance().bet.getRateLength(); i++) {
//             if (i == 0) {
//                 ScrollRateItem.getComponent(Label).string = XUtils.NumberToCentString(DataManager.getInstance().bet.getRateAt(0), false);
//                 this.ScrollItemArray.Rate.push(ScrollRateItem);
//             }
//             else {
//                 let instance = instantiate(ScrollRateItem);
//                 instance.setPosition(0, (-100 - 50 * i));
//                 instance.getComponent(Label).string = XUtils.NumberToCentString(DataManager.getInstance().bet.getRateAt(i), false);
//                 if (i == 1) {
//                     instance.getComponent(Label).fontSize = 30;
//                     instance.getComponent(Label).color = this.ScrollColor.Bet_2;
//                 }
//                 else {
//                     instance.getComponent(Label).getComponent(Label).fontSize = 0;
//                 }
//                 ScrollRateContent.addChild(instance);
//                 this.ScrollItemArray.Rate.push(instance);

//                 if (i == DataManager.getInstance().bet.getRateLength() - 1) {
//                     let instance = instantiate(this.container.getChildByPath('ScrollR/view/content/-'));
//                     instance.setPosition(0, (-100 - 50 * (i + 1)));
//                     ScrollRateContent.addChild(instance);
//                     ScrollRateContent.getComponent(UITransform).setContentSize(110, (300 + 50 * (i - 1)));
//                 }
//             }
//         }
//         // BetScroll
//         let ScrollBetItem = this.container.getChildByPath('ScrollB/view/content/item');
//         let ScrollBetContent = this.container.getChildByPath('ScrollB/view/content');
//         for (let i = 0; i < DataManager.getInstance().bet.getBetLength(); i++) {
//             if (i == 0) {
//                 ScrollBetItem.getComponent(Label).string = DataManager.getInstance().bet.getBetAt(0).toString();
//                 this.ScrollItemArray.Bet.push(ScrollBetItem);
//             }
//             else {
//                 let instance = instantiate(ScrollBetItem);
//                 instance.setPosition(0, (-100 - 50 * i));
//                 instance.getComponent(Label).string = DataManager.getInstance().bet.getBetAt(i).toString();
//                 if (i == 1) {
//                     instance.getComponent(Label).getComponent(Label).fontSize = 30;
//                     instance.getComponent(Label).color = this.ScrollColor.Bet_2;
//                 }
//                 else {
//                     instance.getComponent(Label).getComponent(Label).fontSize = 0;
//                 }
//                 ScrollBetContent.addChild(instance);
//                 this.ScrollItemArray.Bet.push(instance);

//                 if (i == DataManager.getInstance().bet.getBetLength() - 1) {
//                     let instance = instantiate(this.container.getChildByPath('ScrollB/view/content/-'));
//                     instance.setPosition(0, (-100 - 50 * (i + 1)));
//                     ScrollBetContent.addChild(instance);
//                     ScrollBetContent.getComponent(UITransform).setContentSize(110, (300 + 50 * (i - 1)));
//                 }
//             }
//         }
//         // LineScroll
//         let ScrollLineItem = this.container.getChildByPath('ScrollL/view/content/item');
//         ScrollLineItem.getComponent(Label).string = DataManager.getInstance().bet.getLineAt(0).toString();

//         // BetScroll
//         let ScrollTotalItem = this.container.getChildByPath('ScrollT/view/content/item');
//         let ScrollTotalContent = this.container.getChildByPath('ScrollT/view/content');
//         for (let i = 0; i < DataManager.getInstance().bet.getTotalLength(); i++) {
//             if (i == 0) {
//                 ScrollTotalItem.getComponent(Label).string = XUtils.NumberToCentString(DataManager.getInstance().bet.getTotalAt(0), false);
//                 this.ScrollItemArray.Total.push(ScrollTotalItem);
//             } else {
//                 let instance = instantiate(ScrollTotalItem);
//                 instance.setPosition(0, (-100 - 50 * i));
//                 instance.getComponent(Label).string = XUtils.NumberToCentString(DataManager.getInstance().bet.getTotalAt(i), false);
//                 if (i == 1) {
//                     instance.getComponent(Label).fontSize = 30;
//                     instance.getComponent(Label).color = this.ScrollColor.Total_2;
//                 } else {
//                     instance.getComponent(Label).fontSize = 25;
//                     instance.getComponent(Label).color = this.ScrollColor.Total_3;
//                 }
//                 ScrollTotalContent.addChild(instance);
//                 this.ScrollItemArray.Total.push(instance);

//                 if (i == DataManager.getInstance().bet.getTotalLength() - 1) {
//                     let instance = instantiate(this.container.getChildByPath('ScrollT/view/content/-'));
//                     instance.setPosition(0, (-100 - 50 * (i + 1)));
//                     ScrollTotalContent.addChild(instance);
//                     ScrollTotalContent.getComponent(UITransform).setContentSize(110, (300 + 50 * (i - 1)));
//                 }
//             }
//         }
//     }

//     /**
//      * 面板開啟
//      */
//     private onShow(): void {
//         this.ScrollIndex.setRate(DataManager.getInstance().bet.getRateIdx());
//         this.ScrollIndex.setBet(DataManager.getInstance().bet.getBetIdx());

//         this.refreshContent();

//         //最大投注
//         let MaxBetNum = this.container.getChildByPath('MaxBetNum');
//         if (DataManager.getInstance().creditMode === CreditMode.Credit) {
//             MaxBetNum.getComponent(Label).string = DataManager.getInstance().bet.getMaxTotal().toString();
//         }
//         else {
//             MaxBetNum.getComponent(Label).string = (DataManager.getInstance().bet.getMaxTotal() / 100).toString();
//         }

//         this.node.active = true;
//     }

//     /**
//      * 點擊關閉
//      */
//     private onClickClose(): void {
//         this.node.active = false;
//         AudioManager.getInstance().play(AudioKey.BtnClick);
//         BetPage.onHide.emit();
//     }

//     /**
//      * 點擊最大投注
//      * @param event 
//      */
//     private MaxAnmState(event) {
//         if (event.type == 'touch-start') {
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).clearTracks();
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).setToSetupPose();
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).addAnimation(0, 'hit', true);
//         }
//         else if (event.type == 'touch-end') {
//             AudioManager.getInstance().play(AudioKey.FestBet);

//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).clearTrack(1);
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).addAnimation(1, 'begin', false);

//             this.ScrollIndex.setTotal(this.ScrollItemArray.Total.length - 1);
//             this.scheduleOnce(() => {
//                 this.refreshContent();
//             }, 0.35);
//         }
//         else {
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).clearTracks();
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).setToSetupPose();
//             this.container.getChildByPath('MaxBetAnm').getComponent(sp.Skeleton).addAnimation(0, 'normal', true);
//         }
//     }

//     /**
//      * 注意!!! Onload scrollViewEventHandler 用字串監聽
//      * @param event 
//      * @param event_id 
//      * @param type 
//      */
//     private ScrollCallback(event, event_id, type) {
//         if (type.indexOf('R') > -1) {
//             if (event_id === ScrollEventType.SCROLLING || event_id === ScrollEventType.SCROLL_ENDED) {
//                 let content = this.container.getChildByPath('ScrollR/view/content');
//                 let cost = content.getPosition().y - 125;
//                 if (cost < 0)
//                     cost = 0;
//                 let index = Math.floor(Math.round(cost / 50));
//                 if (index > (this.ScrollItemArray.Rate.length - 1))
//                     index = this.ScrollItemArray.Rate.length - 1;
//                 this.ScrollItemArray.Rate.forEach((e, idx) => {
//                     if (idx <= (index - 2)) {
//                         e.getComponent(Label).fontSize = 0;
//                     }
//                     else if (idx == (index - 1)) {
//                         e.getComponent(Label).fontSize = 30;
//                         e.getComponent(Label).color = this.ScrollColor.Bet_2;
//                     }
//                     else if (idx == index) {
//                         if (e.getComponent(Label).fontSize != 40) {
//                             AudioManager.getInstance().play(AudioKey.BetClick);
//                         }
//                         e.getComponent(Label).fontSize = 40;
//                         e.getComponent(Label).color = this.ScrollColor.Bet_1;
//                     }
//                     else if (idx == (index + 1)) {
//                         e.getComponent(Label).fontSize = 30;
//                         e.getComponent(Label).color = this.ScrollColor.Bet_2;
//                     }
//                     else if (idx >= (index + 2)) {
//                         e.getComponent(Label).fontSize = 0;
//                     }
//                 });

//                 if (event_id == ScrollEventType.SCROLL_ENDED) {
//                     content.setPosition(0, (125 + 50 * index));
//                     this.ScrollIndex.setRate(index);

//                     this.refreshContent();
//                 }
//             }
//         }
//         else if (type.indexOf('B') > -1) {
//             if (event_id === ScrollEventType.SCROLLING || event_id === ScrollEventType.SCROLL_ENDED) {
//                 let content = this.container.getChildByPath('ScrollB/view/content');
//                 let cost = content.getPosition().y - 125;
//                 if (cost < 0)
//                     cost = 0;
//                 let index = Math.floor(Math.round(cost / 50));
//                 if (index > (this.ScrollItemArray.Bet.length - 1))
//                     index = this.ScrollItemArray.Bet.length - 1;
//                 this.ScrollItemArray.Bet.forEach((e, idx) => {
//                     if (idx <= (index - 2)) {
//                         e.getComponent(Label).fontSize = 0;
//                     }
//                     else if (idx == (index - 1)) {
//                         e.getComponent(Label).fontSize = 30;
//                         e.getComponent(Label).color = this.ScrollColor.Bet_2;
//                     }
//                     else if (idx == index) {
//                         if (e.getComponent(Label).fontSize != 40) {
//                             AudioManager.getInstance().play(AudioKey.BetClick);
//                         }
//                         e.getComponent(Label).fontSize = 40;
//                         e.getComponent(Label).color = this.ScrollColor.Bet_1;
//                     }
//                     else if (idx == (index + 1)) {
//                         e.getComponent(Label).fontSize = 30;
//                         e.getComponent(Label).color = this.ScrollColor.Bet_2;
//                     }
//                     else if (idx >= (index + 2)) {
//                         e.getComponent(Label).fontSize = 0;
//                     }
//                 });

//                 if (event_id == ScrollEventType.SCROLL_ENDED) {
//                     content.setPosition(0, (125 + 50 * index));
//                     this.ScrollIndex.setBet(index);

//                     this.refreshContent();
//                 }
//             }
//         }
//         else if (type.indexOf('T') > -1) {
//             if (event_id === ScrollEventType.SCROLLING || event_id === ScrollEventType.SCROLL_ENDED) {
//                 let content = this.container.getChildByPath('ScrollT/view/content');
//                 let cost = content.getPosition().y - 125;
//                 if (cost < 0)
//                     cost = 0;
//                 let index = Math.floor(Math.round(cost / 50));
//                 if (index > (this.ScrollItemArray.Total.length - 1))
//                     index = this.ScrollItemArray.Total.length - 1;
//                 this.ScrollItemArray.Total.forEach((e, idx) => {
//                     if (idx <= (index - 2)) {
//                         e.getComponent(Label).fontSize = 25;
//                         e.getComponent(Label).color = this.ScrollColor.Total_3;
//                     }
//                     else if (idx == (index - 1)) {
//                         e.getComponent(Label).fontSize = 30;
//                         e.getComponent(Label).color = this.ScrollColor.Total_2;
//                     }
//                     else if (idx == index) {
//                         if (e.getComponent(Label).fontSize != 40) {
//                             AudioManager.getInstance().play(AudioKey.BetClick);
//                         }
//                         e.getComponent(Label).fontSize = 40;
//                         e.getComponent(Label).color = this.ScrollColor.Total_1;
//                     }
//                     else if (idx == (index + 1)) {
//                         e.getComponent(Label).fontSize = 30;
//                         e.getComponent(Label).color = this.ScrollColor.Total_2;
//                     }
//                     else if (idx >= (index + 2)) {
//                         e.getComponent(Label).fontSize = 25;
//                         e.getComponent(Label).color = this.ScrollColor.Total_3;
//                     }
//                 });

//                 if (event_id == ScrollEventType.SCROLL_ENDED) {
//                     content.setPosition(0, (125 + 50 * index));
//                     this.ScrollIndex.setTotal(index);

//                     this.refreshContent();
//                 }
//             }
//         }
//     }


//     /**
//      * 點擊Scroll上下按鈕
//      * @param event 
//      */
//     private ScrollSingleBtn(event) {
//         if (event.type == 'touch-start') {
//             //y>0表示上排箭頭
//             if (event.target.getPosition().y > 0) {
//                 if (event.target._name.indexOf('R') > -1) {
//                     event.target.setPosition(-244, 163);
//                 }
//                 else if (event.target._name.indexOf('B') > -1) {
//                     event.target.setPosition(-78, 163);
//                 }
//                 else if (event.target._name.indexOf('T') > -1) {
//                     event.target.setPosition(234, 163);
//                 }
//             }
//             else {
//                 if (event.target._name.indexOf('R') > -1) {
//                     event.target.setPosition(-244, -177);
//                 }
//                 else if (event.target._name.indexOf('B') > -1) {
//                     event.target.setPosition(-78, -177);
//                 }
//                 else if (event.target._name.indexOf('T') > -1) {
//                     event.target.setPosition(234, -177);
//                 }
//             }
//         }
//         else if (event.type == 'touch-end' || event.type == 'touch-cancel') {
//             AudioManager.getInstance().play(AudioKey.BetClick);

//             //y>0表示上排箭頭
//             if (event.target.getPosition().y > 0) {
//                 if (event.target._name.indexOf('R') > -1) {
//                     this.ScrollIndex.setRate(this.ScrollIndex.getRate() - 1);
//                     event.target.setPosition(-244, 153);
//                 }
//                 else if (event.target._name.indexOf('B') > -1) {
//                     this.ScrollIndex.setBet(this.ScrollIndex.getBet() - 1);
//                     event.target.setPosition(-78, 153);
//                 }
//                 else if (event.target._name.indexOf('T') > -1) {
//                     this.ScrollIndex.setTotal(this.ScrollIndex.getTotal() - 1);
//                     event.target.setPosition(234, 153);
//                 }

//                 this.refreshContent();
//             }
//             else {
//                 if (event.target._name.indexOf('R') > -1) {
//                     this.ScrollIndex.setRate(this.ScrollIndex.getRate() + 1);
//                     event.target.setPosition(-244, -167);
//                 }
//                 else if (event.target._name.indexOf('B') > -1) {
//                     this.ScrollIndex.setBet(this.ScrollIndex.getBet() + 1);
//                     event.target.setPosition(-78, -167);
//                 }
//                 else if (event.target._name.indexOf('T') > -1) {
//                     this.ScrollIndex.setTotal(this.ScrollIndex.getTotal() + 1);
//                     event.target.setPosition(234, -167);
//                 }

//                 this.refreshContent();
//             }
//         }
//     }

//     /**
//      * 刷新content位置及fontSize
//      */
//     private refreshContent() {

//         this.container.getChildByPath('ScrollB/view/content').setPosition(0, (125 + 50 * this.ScrollIndex.getBet()));
//         this.container.getChildByPath('ScrollR/view/content').setPosition(0, (125 + 50 * this.ScrollIndex.getRate()));
//         this.container.getChildByPath('ScrollT/view/content').setPosition(0, (125 + 50 * this.ScrollIndex.getTotal()));

//         this.ScrollItemArray.Bet.forEach((e, idx) => {
//             if (idx <= (this.ScrollIndex.getBet() - 2)) {
//                 e.getComponent(Label).fontSize = 0;
//             }
//             else if (idx == (this.ScrollIndex.getBet() - 1)) {
//                 e.getComponent(Label).fontSize = 30;
//                 e.getComponent(Label).color = this.ScrollColor.Bet_2;
//             }
//             else if (idx == this.ScrollIndex.getBet()) {
//                 e.getComponent(Label).fontSize = 40;
//                 e.getComponent(Label).color = this.ScrollColor.Bet_1;
//             }
//             else if (idx == (this.ScrollIndex.getBet() + 1)) {
//                 e.getComponent(Label).fontSize = 30;
//                 e.getComponent(Label).color = this.ScrollColor.Bet_2;
//             }
//             else if (idx >= (this.ScrollIndex.getBet() + 2)) {
//                 e.getComponent(Label).fontSize = 0;
//             }
//         });

//         this.ScrollItemArray.Rate.forEach((e, idx) => {
//             if (idx <= (this.ScrollIndex.getRate() - 2)) {
//                 e.getComponent(Label).fontSize = 0;
//             }
//             else if (idx == (this.ScrollIndex.getRate() - 1)) {
//                 e.getComponent(Label).fontSize = 30;
//                 e.getComponent(Label).color = this.ScrollColor.Bet_2;
//             }
//             else if (idx == this.ScrollIndex.getRate()) {
//                 e.getComponent(Label).fontSize = 40;
//                 e.getComponent(Label).color = this.ScrollColor.Bet_1;
//             }
//             else if (idx == (this.ScrollIndex.getRate() + 1)) {
//                 e.getComponent(Label).fontSize = 30;
//                 e.getComponent(Label).color = this.ScrollColor.Bet_2;
//             }
//             else if (idx >= (this.ScrollIndex.getRate() + 2)) {
//                 e.getComponent(Label).fontSize = 0;
//             }
//         });

//         this.ScrollItemArray.Total.forEach((e, idx) => {
//             if (idx <= (this.ScrollIndex.getTotal() - 2)) {
//                 e.getComponent(Label).fontSize = 25;
//                 e.getComponent(Label).color = this.ScrollColor.Total_3;
//             }
//             else if (idx == (this.ScrollIndex.getTotal() - 1)) {
//                 e.getComponent(Label).fontSize = 30;
//                 e.getComponent(Label).color = this.ScrollColor.Total_2;
//             }
//             else if (idx == this.ScrollIndex.getTotal()) {
//                 e.getComponent(Label).fontSize = 40;
//                 e.getComponent(Label).color = this.ScrollColor.Total_1;
//             }
//             else if (idx == (this.ScrollIndex.getTotal() + 1)) {
//                 e.getComponent(Label).fontSize = 30;
//                 e.getComponent(Label).color = this.ScrollColor.Total_2;
//             }
//             else if (idx >= (this.ScrollIndex.getTotal() + 2)) {
//                 e.getComponent(Label).fontSize = 25;
//                 e.getComponent(Label).color = this.ScrollColor.Total_3;
//             }
//         });

//         //陣列最大或最小，那個對應的箭頭消失
//         this.container.getChildByPath('ScrollBtn/ScrollUpB').active = this.ScrollIndex.getBet() > 0;
//         this.container.getChildByPath('ScrollBtn/ScrollDownB').active = this.ScrollIndex.getBet() < this.ScrollItemArray.Bet.length - 1;

//         this.container.getChildByPath('ScrollBtn/ScrollUpR').active = this.ScrollIndex.getRate() > 0;
//         this.container.getChildByPath('ScrollBtn/ScrollDownR').active = this.ScrollIndex.getRate() < this.ScrollItemArray.Rate.length - 1;

//         this.container.getChildByPath('ScrollBtn/ScrollUpT').active = this.ScrollIndex.getTotal() > 0;
//         this.container.getChildByPath('ScrollBtn/ScrollDownT').active = this.ScrollIndex.getTotal() < this.ScrollItemArray.Total.length - 1;
//     }
// }

