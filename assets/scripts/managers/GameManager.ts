import { _decorator, Component, Node } from 'cc';
import { NetworkManager } from '../network/NetworkManager';
const { ccclass, property } = _decorator;

@ccclass('gameManager')
export class gameManager extends Component {
    onLoad() {
        // 在場景中創建 NetworkManager 節點
        const networkManager = NetworkManager.getInstance();
        networkManager.serverUrl = "https://your-api-server.com/api";
    }

    /**
     * 獲取促銷數據
     */
    public async getPromotionData() {
        const promotionService = NetworkManager.getInstance().getPromotionService();
        const promotions = await promotionService.fetchPromotionBrief();
        return promotions;
    }

    /**
     * 獲取遊戲列表
     */
    public async getGameList() {
        const menuService = NetworkManager.getInstance().getInGameMenuService();
        const games = await menuService.fetchInGameMenuData();
        return games;
    }

    update(deltaTime: number) {

    }
}


