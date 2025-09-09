import { _decorator } from 'cc';
import { getToken } from '../managers/AuthManager';

/**
 * API 回應
 */
export interface APIResponse<T = any> {
    error_code?: number;
    message?: string;
    data: T;
}

/**
 * API 請求
 */
export interface APIRequest {
    command: string;
    token: string;
    data: any;
}

/**
 * 網路管理器
 */
export class NetworkManager {
    private static _instance: NetworkManager;
    private extraDataTimer: number = 0;
    private readonly EXTRA_DATA_INTERVAL = 60000;

    public serverUrl: string = '';
    public timeout: number = 30000;

    private constructor() { }

    public static getInstance(): NetworkManager {
        if (!this._instance) {
            this._instance = new NetworkManager();
        }
        return this._instance;
    }

    /**
     * 初始化設置服務器 URL
     */
    public init() {
        this.serverUrl = this.getParameter('serverurl') || this.serverUrl;
        this.startExtraDataPolling();
    }

    /**
     * 獲取 URL 參數
     */
    private getParameter(name: string): string | undefined {
        if (typeof window === 'undefined') return undefined;

        const location = new URL(window.location.href);
        if (location.searchParams.has(name)) {
            return location.searchParams.get(name);
        } else {
            return undefined;
        }
    }

    /**
     * 銷毀
     */
    public destroy() {
        if (this.extraDataTimer) {
            clearInterval(this.extraDataTimer);
        }
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
            token: getToken(),
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

        if (!response.data || !Array.isArray(response.data)) {
            console.warn('[NetworkManager] Invalid extra data format');
            return;
        }

        const extraData = response.data;
        for (const data of extraData) {
            if (!data) continue;

            // 處理現金掉落 - 直接記錄日誌
            if (data.cash_drop) {
                console.log('[NetworkManager] Cash drop received:', data.cash_drop);
            }

            // 處理獎池 - 直接記錄日誌
            if (data.jackpot) {
                console.log('[NetworkManager] Jackpot update:', data.jackpot);
            }
        }
    }
}

export function getNetworkManager(): NetworkManager {
    return NetworkManager.getInstance();
}
