import { _decorator, Component, sys } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('AuthManager')
export class AuthManager extends Component {
    private static _instance: AuthManager;
    private token: string = '';
    
    public static getInstance(): AuthManager {
        if (!this._instance) {
            this._instance = new AuthManager();
        }
        return this._instance;
    }
    
    onLoad() {
        if (AuthManager._instance) {
            this.destroy();
            return;
        }
        AuthManager._instance = this;
        this.initToken();
    }
    
    /**
     * 初始化 Token
     */
    private initToken() {
        // 從 URL 參數獲取 token
        const urlParams = this.getURLParameters();
        const paramToken = urlParams.get('token');
        
        if (paramToken) {
            // 嘗試從 sessionStorage 獲取緩存的 token
            const cachedToken = sys.localStorage.getItem(paramToken);
            if (cachedToken && cachedToken.length > 0) {
                this.token = cachedToken;
            } else {
                this.token = paramToken;
            }
        }
    }
    
    /**
     * 獲取 URL 參數
     */
    private getURLParameters(): URLSearchParams {
        if (typeof window !== 'undefined' && window.location) {
            return new URLSearchParams(window.location.search);
        }
        return new URLSearchParams();
    }
    
    /**
     * 獲取當前 Token
     */
    public getToken(): string {
        return this.token;
    }
    
    /**
     * 設置 Token
     */
    public setToken(token: string) {
        this.token = token;
        
        // 緩存到 sessionStorage
        const urlParams = this.getURLParameters();
        const paramToken = urlParams.get('token');
        if (paramToken) {
            sys.localStorage.setItem(paramToken, token);
        }
    }
    
    /**
     * 清除 Token
     */
    public clearToken() {
        this.token = '';
        const urlParams = this.getURLParameters();
        const paramToken = urlParams.get('token');
        if (paramToken) {
            sys.localStorage.removeItem(paramToken);
        }
    }
    
    /**
     * 檢查是否已認證
     */
    public isAuthenticated(): boolean {
        return this.token.length > 0;
    }
    
    /**
     * 獲取 URL 參數值
     */
    public getURLParameter(name: string): string | null {
        const urlParams = this.getURLParameters();
        return urlParams.get(name);
    }
}
