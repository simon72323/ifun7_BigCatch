import { APIService } from './APIService';
import { NetworkManager, APIResponse } from './NetworkManager';

export interface GameInfo {
    game_id: string;
    game_name: string;
    game_url: string;
    game_image: string;
    is_hot: boolean;
    is_new: boolean;
}

export interface InGameMenuStatus {
    status: number;
}

export class InGameMenuService extends APIService {
    private gameList: GameInfo[] = [];
    private favoriteList: string[] = [];
    private inGameMenuStatus: number = 0;
    
    constructor(networkManager: NetworkManager) {
        super(networkManager);
    }
    
    /**
     * 獲取遊戲內選單狀態
     */
    public async fetchInGameMenuStatus(): Promise<number> {
        try {
            const response = await this.sendAPIRequest<InGameMenuStatus[]>('get_in_game_menu_status', {});
            this.inGameMenuStatus = response.data[0].status;
            return this.inGameMenuStatus;
        } catch (error) {
            this.handleAPIError(error, 'get_in_game_menu_status');
            return 0;
        }
    }
    
    /**
     * 獲取遊戲內選單數據
     */
    public async fetchInGameMenuData(): Promise<GameInfo[]> {
        try {
            const response = await this.sendAPIRequest<{game: GameInfo[]}>('get_in_game_menu', {});
            this.processGameListData(response.data.game);
            return this.gameList;
        } catch (error) {
            this.handleAPIError(error, 'get_in_game_menu');
            return [];
        }
    }
    
    /**
     * 獲取遊戲 URL
     */
    public async fetchGameUrl(gameId: string): Promise<string> {
        try {
            const response = await this.sendAPIRequest<{game_url: string}>('get_in_game_menu_game_url', {
                game_id: gameId,
                b: this.getURLParameter('b')
            });
            return response.data.game_url;
        } catch (error) {
            this.handleAPIError(error, 'get_in_game_menu_game_url');
            return '';
        }
    }
    
    /**
     * 更新收藏列表
     */
    public async updateFavoriteList(favoriteList: string[]): Promise<boolean> {
        try {
            await this.sendAPIRequest('update_favorite_list', {
                favorite: favoriteList
            });
            this.favoriteList = favoriteList;
            return true;
        } catch (error) {
            this.handleAPIError(error, 'update_favorite_list');
            return false;
        }
    }
    
    /**
     * 處理遊戲列表數據
     */
    private processGameListData(games: GameInfo[]) {
        this.gameList = games;
        
        // 可以根據需要進行排序或分類
        this.gameList.sort((a, b) => {
            // 熱門遊戲優先
            if (a.is_hot && !b.is_hot) return -1;
            if (!a.is_hot && b.is_hot) return 1;
            
            // 新遊戲其次
            if (a.is_new && !b.is_new) return -1;
            if (!a.is_new && b.is_new) return 1;
            
            return 0;
        });
    }
    
    /**
     * 獲取遊戲列表
     */
    public getGameList(): GameInfo[] {
        return this.gameList;
    }
    
    /**
     * 獲取收藏列表
     */
    public getFavoriteList(): string[] {
        return this.favoriteList;
    }
    
    /**
     * 獲取遊戲內選單狀態
     */
    public getInGameMenuStatus(): number {
        return this.inGameMenuStatus;
    }
    
    /**
     * 添加收藏
     */
    public addToFavorites(gameId: string): boolean {
        if (!this.favoriteList.includes(gameId)) {
            this.favoriteList.push(gameId);
            this.updateFavoriteList(this.favoriteList);
            return true;
        }
        return false;
    }
    
    /**
     * 移除收藏
     */
    public removeFromFavorites(gameId: string): boolean {
        const index = this.favoriteList.indexOf(gameId);
        if (index > -1) {
            this.favoriteList.splice(index, 1);
            this.updateFavoriteList(this.favoriteList);
            return true;
        }
        return false;
    }
    
    /**
     * 檢查是否已收藏
     */
    public isFavorite(gameId: string): boolean {
        return this.favoriteList.includes(gameId);
    }
    
    /**
     * 獲取 URL 參數
     */
    private getURLParameter(name: string): string | null {
        if (typeof window !== 'undefined' && window.location) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }
        return null;
    }
}
