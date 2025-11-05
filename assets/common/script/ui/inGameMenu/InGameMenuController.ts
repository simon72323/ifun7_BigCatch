// import { _decorator, Component, Node, Label, Sprite, Button, tween, Vec3, Color } from 'cc';

// // import { IN_GAME_MENU_CONFIG } from '@common/script/data/GameConfig';
// import { GameInfo, InGameMenuService } from '@common/script/network/InGameMenuService';
// import { NetworkManager } from '@common/script/network/NetworkManager';

// const { ccclass, property } = _decorator;

// @ccclass('InGameMenuController')
// export class InGameMenuController extends Component {
//     @property(Node)
//     public layoutContainer: Node = null!;

//     @property(Node)
//     public mainContainer: Node = null!;

//     @property(Node)
//     public iconContainer: Node = null!;

//     @property(Button)
//     public slideButton: Button = null!;

//     @property(Sprite)
//     public redDot: Sprite = null!;

//     @property(Node)
//     public gameListContainer: Node = null!;

//     private networkManager: NetworkManager;
//     private inGameMenuService: InGameMenuService;
//     private gameList: GameInfo[] = [];
//     private isSlidedOut: boolean = false;

//     onLoad() {
//         this.networkManager = NetworkManager.getInstance();
//         this.inGameMenuService = new InGameMenuService(this.networkManager);

//         this.initUI();
//         this.setupEventListeners();
//         this.loadGameData();
//     }

//     private initUI() {
//         // 設置初始位置
//         this.layoutContainer.setPosition(IN_GAME_MENU_CONFIG.ICON_CONTAINER_POSITION_X, IN_GAME_MENU_CONFIG.ICON_CONTAINER_POSITION_Y);

//         // 設置滑動按鈕
//         this.slideButton.node.on(Button.EventType.CLICK, this.onSlideClick, this);

//         // 設置紅點位置
//         this.redDot.node.setPosition(IN_GAME_MENU_CONFIG.RED_DOT_POSITION_X, IN_GAME_MENU_CONFIG.RED_DOT_POSITION_Y);
//         this.redDot.node.active = false;
//     }

//     private setupEventListeners() {
//         // 監聽遊戲數據更新事件
//         // 這裡需要根據實際的事件系統來實現
//     }

//     private async loadGameData() {
//         try {
//             // 獲取遊戲內選單狀態
//             const status = await this.inGameMenuService.fetchInGameMenuStatus();

//             if (status === 1) {
//                 // 獲取遊戲列表
//                 this.gameList = await this.inGameMenuService.fetchInGameMenuData();
//                 this.createGameList();
//                 this.showRedDot();
//             } else {
//                 this.hideMenu();
//             }
//         } catch (error) {
//             console.error('[InGameMenuController] Failed to load game data:', error);
//         }
//     }

//     private createGameList() {
//         // 清除現有遊戲列表
//         this.gameListContainer.removeAllChildren();
//         // 創建遊戲項目
//         for (let i = 0; i < this.gameList.length; i++) {
//             const gameInfo = this.gameList[i];
//             const gameItem = this.createGameItem(gameInfo, i);
//             this.gameListContainer.addChild(gameItem);
//         }
//     }

//     private createGameItem(gameInfo: GameInfo, index: number): Node {
//         // 創建遊戲項目節點
//         const gameItem = new Node(`GameItem_${index}`);

//         // 添加背景精靈
//         const background = gameItem.addComponent(Sprite);
//         // 設置背景圖片

//         // 添加遊戲名稱標籤
//         const nameLabel = gameItem.addComponent(Label);
//         nameLabel.string = gameInfo.game_name;

//         // 添加熱門/新遊戲標記
//         if (gameInfo.is_hot) {
//             const hotLabel = gameItem.addComponent(Label);
//             hotLabel.string = 'HOT';
//             hotLabel.color = new Color(255, 0, 0, 255);
//         }

//         if (gameInfo.is_new) {
//             const newLabel = gameItem.addComponent(Label);
//             newLabel.string = 'NEW';
//             newLabel.color = new Color(0, 255, 0, 255);
//         }

//         // 添加點擊事件
//         const button = gameItem.addComponent(Button);
//         button.node.on(Button.EventType.CLICK, () => {
//             this.onGameItemClick(gameInfo);
//         }, this);

//         return gameItem;
//     }

//     private onGameItemClick(gameInfo: GameInfo) {
//         console.log(`[InGameMenuController] Game clicked: ${gameInfo.game_name}`);
//         // 獲取遊戲 URL 並跳轉
//         this.inGameMenuService.fetchGameUrl(gameInfo.game_id).then(url => {
//             if (url) {
//                 // 跳轉到遊戲
//                 if (typeof window !== 'undefined') {
//                     window.open(url, '_blank');
//                 }
//             }
//         });
//     }

//     private onSlideClick() {
//         if (this.isSlidedOut) {
//             this.slideIn();
//         } else {
//             this.slideOut();
//         }
//     }

//     private slideOut() {
//         this.isSlidedOut = true;
//         tween(this.mainContainer)
//             .to(0.3, { position: new Vec3(IN_GAME_MENU_CONFIG.MAIN_CONTAINER_ON_SLIDE_X, 0, 0) })
//             .start();
//     }

//     private slideIn() {
//         this.isSlidedOut = false;
//         tween(this.mainContainer)
//             .to(0.3, { position: new Vec3(IN_GAME_MENU_CONFIG.MAIN_CONTAINER_OFF_SLIDE_X, 0, 0) })
//             .start();
//     }

//     private showRedDot() {
//         this.redDot.node.active = true;
//     }

//     private hideRedDot() {
//         this.redDot.node.active = false;
//     }

//     private hideMenu() {
//         this.layoutContainer.active = false;
//     }

//     public onResize(isPortrait: boolean) {
//         // 根據屏幕方向調整 UI 位置
//         if (isPortrait) {
//             this.layoutContainer.setPosition(0, 0);
//         } else {
//             this.layoutContainer.setPosition(IN_GAME_MENU_CONFIG.ICON_CONTAINER_POSITION_X, IN_GAME_MENU_CONFIG.ICON_CONTAINER_POSITION_Y);
//         }
//     }
// }
