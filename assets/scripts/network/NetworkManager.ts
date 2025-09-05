import { _decorator, Component, sys } from 'cc';
import { APIService } from './APIService';
import { PromotionService } from './PromotionService';
import { InGameMenuService } from './InGameMenuService';
import { JackpotService } from './JackpotService';
import { AuthManager } from '../Managers/AuthManager';

const { ccclass, property } = _decorator;

export interface APIResponse<T = any> {
    error_code?: number;
    message?: string;
    data: T;
}

export interface APIRequest {
    command: string;
    token: string;
    data: any;
}

@ccclass('NetworkManager')
export class NetworkManager extends Component {
    private static _instance: NetworkManager;
    
    @property
    public serverUrl: string = '';
    
    @property
    public timeout: number = 30000; // 30秒超時
    
    private promotionService: PromotionService;
    private inGameMenuService: InGameMenuService;
    private jackpotService: JackpotService;
    private authManager: AuthManager;
    
    // 定時器
    private extraDataTimer: number = 0;
    private readonly EXTRA_DATA_INTERVAL = 60000; // 60秒
    
    public static getInstance(): NetworkManager {
        if (!this._instance) {
            this._instance = new NetworkManager();
        }
        return this._instance;
    }
    
    onLoad() {
        if (NetworkManager._instance) {
            this.destroy();
            return;
        }
        NetworkManager._instance = this;
        
        this.initServices();
        this.startExtraDataPolling();
    }
    
    private initServices() {
        this.authManager = AuthManager.getInstance();
        this.promotionService = new PromotionService(this);
        this.inGameMenuService = new InGameMenuService(this);
        this.jackpotService = new JackpotService(this);
    }
    
    /**
     * 發送 HTTP 請求
     */
    public async sendRequest<T = any>(request: APIRequest): Promise<APIResponse<T>> {
        try {
            const response = await this.httpRequest<T>(request);
            return response;
        } catch (error) {
            console.error('[NetworkManager] Request failed:', error);
            throw error;
        }
    }
    
    /**
     * 執行 HTTP 請求
     */
    private httpRequest<T>(request: APIRequest): Promise<APIResponse<T>> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.timeout = this.timeout;
            xhr.open('POST', this.serverUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.responseType = 'json';
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                }
            };
            
            xhr.onerror = () => {
                reject(new Error('Network error'));
            };
            
            xhr.ontimeout = () => {
                reject(new Error('Request timeout'));
            };
            
            xhr.send(JSON.stringify(request));
        });
    }
    
    /**
     * 開始輪詢額外數據
     */
    private startExtraDataPolling() {
        this.extraDataTimer = setInterval(async () => {
            try {
                await this.fetchExtraData();
            } catch (error) {
                console.error('[NetworkManager] Extra data polling failed:', error);
            }
        }, this.EXTRA_DATA_INTERVAL);
    }
    
    /**
     * 獲取額外數據
     */
    private async fetchExtraData() {
        const request: APIRequest = {
            command: 'get_extra_data',
            token: this.authManager.getToken(),
            data: {
                interval: 60
            }
        };
        
        const response = await this.sendRequest(request);
        this.processExtraData(response);
    }
    
    /**
     * 處理額外數據
     */
    private processExtraData(response: APIResponse) {
        if (response.error_code) {
            console.log(`[NetworkManager] Extra data error: ${response.error_code} - ${response.message}`);
            return;
        }
        
        const extraData = response.data;
        for (let i = 0; i < extraData.length; i++) {
            const data = extraData[i];
            
            // 處理現金掉落
            if (data.cash_drop) {
                this.promotionService.handleCashDrop(data.cash_drop);
            }
            
            // 處理獎池
            if (data.jackpot) {
                this.jackpotService.handleJackpotUpdate(data.jackpot);
            }
        }
    }
    
    /**
     * 獲取促銷服務
     */
    public getPromotionService(): PromotionService {
        return this.promotionService;
    }
    
    /**
     * 獲取遊戲內選單服務
     */
    public getInGameMenuService(): InGameMenuService {
        return this.inGameMenuService;
    }
    
    /**
     * 獲取獎池服務
     */
    public getJackpotService(): JackpotService {
        return this.jackpotService;
    }
    
    onDestroy() {
        if (this.extraDataTimer) {
            clearInterval(this.extraDataTimer);
        }
    }
}
