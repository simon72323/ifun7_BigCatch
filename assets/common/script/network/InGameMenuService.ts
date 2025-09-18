import { getToken } from '@common/script/manager/AuthManager';
import { NetworkManager, APIResponse } from '@common/script/network/NetworkManager';

/**
 * 遊戲資訊介面
 */
export interface GameInfo {
    game_id: string;
    game_name: string;
    is_hot: boolean;
    is_new: boolean;
}

/**
 * 遊戲內選單服務
 */
export class InGameMenuService {
    private networkManager: NetworkManager;

    constructor(networkManager: NetworkManager) {
        this.networkManager = networkManager;
    }

    /**
     * 獲取遊戲內選單狀態
     * @returns Promise<number> 狀態碼 (1: 顯示選單, 0: 隱藏選單)
     */
    public async fetchInGameMenuStatus(): Promise<number> {
        try {
            const response = await this.networkManager.sendRequest({
                command: 'get_in_game_menu_status',
                token: getToken(),
                data: {}
            });

            if (response.error_code === 0) {
                return response.data.status || 0;
            } else {
                console.error('[InGameMenuService] Failed to fetch menu status:', response.message);
                return 0;
            }
        } catch (error) {
            console.error('[InGameMenuService] Error fetching menu status:', error);
            return 0;
        }
    }

    /**
     * 獲取遊戲內選單數據
     * @returns Promise<GameInfo[]> 遊戲列表
     */
    public async fetchInGameMenuData(): Promise<GameInfo[]> {
        try {
            const response = await this.networkManager.sendRequest({
                token: getToken(),
                command: 'get_in_game_menu_data',
                data: {}
            });

            if (response.error_code === 0) {
                return response.data.games || [];
            } else {
                console.error('[InGameMenuService] Failed to fetch menu data:', response.message);
                return [];
            }
        } catch (error) {
            console.error('[InGameMenuService] Error fetching menu data:', error);
            return [];
        }
    }

    /**
     * 獲取遊戲 URL
     * @param gameId 遊戲 ID
     * @returns Promise<string | null> 遊戲 URL
     */
    public async fetchGameUrl(gameId: string): Promise<string | null> {
        try {
            const response = await this.networkManager.sendRequest({
                token: getToken(),
                command: 'get_game_url',
                data: {
                    game_id: gameId
                }
            });

            if (response.error_code === 0) {
                return response.data.url || null;
            } else {
                console.error('[InGameMenuService] Failed to fetch game URL:', response.message);
                return null;
            }
        } catch (error) {
            console.error('[InGameMenuService] Error fetching game URL:', error);
            return null;
        }
    }
}