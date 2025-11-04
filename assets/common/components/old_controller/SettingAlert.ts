// import { _decorator, Button, Component, EventTouch, Node, screen, Toggle } from 'cc';

// import { DataManager } from '@common/script/data/DataManager';
// import { XEvent } from '@common/script/event/XEvent';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { addBtnClickEvent, addToggleClickEvent } from '@common/script/utils/Utils';

// const { ccclass, property } = _decorator;

// @ccclass('SettingAlert')
// export class SettingAlert extends Component {
//     // public static open: XEvent = new XEvent();
//     public static close: XEvent = new XEvent();

//     private closeBtn: Node = null;//關閉按鈕
//     private speedToggleList: Node = null;//速度開關列表
//     private soundToggle: Toggle = null;//聲音開關
//     private musicToggle: Toggle = null;//音樂開關

//     private favoritesBtn: Button = null;//收藏按鈕
//     private historyBtn: Button = null;//下注紀錄按鈕
//     private screenBtn: Button = null;//全螢幕按鈕
//     private informationBtn: Button = null;//資訊說明按鈕

//     private isFullScreen: boolean = false;//是否全螢幕

//     onLoad() {
//         // AutoSpin.open.on(this.onOpen, this);
//         SettingAlert.close.on(this.onClose, this);
//         this.setupNode();
//         this.setupBtnEvent();
//     }

//     /**
//      * 設定節點
//      */
//     private setupNode() {
//         this.closeBtn = this.node.getChildByPath('Title/CloseBtn');
//         this.speedToggleList = this.node.getChildByPath('Speed/SpeedToggleList');
//         this.soundToggle = this.node.getChildByPath('Sound/SoundToggle').getComponent(Toggle);
//         this.musicToggle = this.node.getChildByPath('Music/MusicToggle').getComponent(Toggle);

//         // this.favoritesBtn = this.node.getChildByPath('Other/FavoritesBtn').getComponent(Button);
//         this.historyBtn = this.node.getChildByPath('Other/HistoryBtn').getComponent(Button);
//         this.screenBtn = this.node.getChildByPath('Other/ScreenBtn').getComponent(Button);
//         this.informationBtn = this.node.getChildByPath('Other/InformationBtn').getComponent(Button);
//     }

//     /**
//      * 設定監聽事件
//      */
//     private setupBtnEvent() {
//         const scriptName = 'ControllerUI';
//         addBtnClickEvent(this.node, scriptName, this.closeBtn.getComponent(Button), this.onClose);
//         addBtnClickEvent(this.node, scriptName, this.historyBtn.getComponent(Button), this.onHistory);
//         addBtnClickEvent(this.node, scriptName, this.screenBtn.getComponent(Button), this.onScreen);
//         addBtnClickEvent(this.node, scriptName, this.informationBtn.getComponent(Button), this.onInformation);

//         addToggleClickEvent(this.node, scriptName, this.soundToggle.getComponent(Toggle), this.onSound);
//         addToggleClickEvent(this.node, scriptName, this.musicToggle.getComponent(Toggle), this.onMusic);
//         for (let i = 0; i < this.speedToggleList.children.length; i++) {
//             addToggleClickEvent(this.node, scriptName, this.speedToggleList.children[i].getComponent(Toggle), this.onSpeed, i.toString());
//         }
//         SettingAlert.close.on(this.onClose, this);
//     }

//     protected onEnable() {
//         this.init();//初始化
//     }

//     private onClose() {
//         this.node.active = false;
//     }

//     /**
//      * 初始化
//      */
//     private init() {
//         //更新音效和音樂開關
//         const isSoundEnabled = DataManager.getInstance().isSoundEnabled;
//         const isMusicEnabled = DataManager.getInstance().isMusicEnabled;
//         this.soundToggle.isChecked = isSoundEnabled;
//         this.musicToggle.isChecked = isMusicEnabled;

//         //更新速度開關
//         const turboIndex = DataManager.getInstance().turboMode;
//         this.speedToggleList.children[turboIndex].getComponent(Toggle).isChecked = true;
//     }

//     /**
//      * 更新速度開關
//      * @param event 事件
//      * @param eventData 事件數據
//      */
//     private onSpeed(event: EventTouch, eventData: string) {
//         const turboIndex = parseInt(eventData);
//         DataManager.getInstance().turboMode = turboIndex;
//     }

//     /**
//      * 切換音效狀態
//      */
//     private onSound() {
//         DataManager.getInstance().isSoundEnabled = this.soundToggle.isChecked;
//         AudioManager.getInstance().setSoundMute(this.soundToggle.isChecked);
//     }

//     /**
//      * 切換音樂狀態
//      */
//     private onMusic() {
//         DataManager.getInstance().isMusicEnabled = this.musicToggle.isChecked;
//         AudioManager.getInstance().setMusicMute(this.musicToggle.isChecked);
//     }

//     /**
//      * 開啟我的最愛視窗
//      */
//     private onFavorites() {
//         // 開啟我的最愛視窗
//     }

//     /**
//      * 開啟下注紀錄
//      */
//     private onHistory() {
//         const betrecordurl = DataManager.getInstance().getFullBetrecordurl();
//         window.open(betrecordurl, '_blank');
//     }

//     /**
//      * 切換全螢幕
//      */
//     private onScreen() {
//         this.isFullScreen = !this.isFullScreen;
//         if (this.isFullScreen) {
//             screen.requestFullScreen();//請求全螢幕
//         } else {
//             screen.exitFullScreen();//退出全螢幕
//         }
//     }

//     /**
//      * 開啟遊戲說明
//      */
//     private onInformation() {
//         // 發送xevent 開啟遊戲說明
//         // if (this.machine.isBusy === true) return;
//         // this.clickOptionBack();
//         // Utils.GoogleTag('ClickInformation', { 'event_category': 'Information', 'event_label': 'ClickInformation' });
//         // GameInformationUI.OpenUI();
//     }
// }