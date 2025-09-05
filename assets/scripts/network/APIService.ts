import { NetworkManager, APIRequest, APIResponse } from './NetworkManager';

export abstract class APIService {
    protected networkManager: NetworkManager;
    
    constructor(networkManager: NetworkManager) {
        this.networkManager = networkManager;
    }
    
    /**
     * 發送 API 請求
     */
    protected async sendAPIRequest<T = any>(command: string, data: any = {}): Promise<APIResponse<T>> {
        const request: APIRequest = {
            command: command,
            token: this.getToken(),
            data: data
        };
        
        return await this.networkManager.sendRequest<T>(request);
    }
    
    /**
     * 獲取 Token
     */
    protected getToken(): string {
        // 這裡可以從 AuthManager 獲取 token
        return this.networkManager['authManager'].getToken();
    }
    
    /**
     * 處理 API 錯誤
     */
    protected handleAPIError(error: any, command: string) {
        console.error(`[APIService] ${command} failed:`, error);
        // 可以在這裡添加統一的錯誤處理邏輯
    }
}
