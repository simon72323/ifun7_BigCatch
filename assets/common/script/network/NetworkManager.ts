import { _decorator } from 'cc';

import { DataManager } from '@common/script/data/DataManager';
import { NetworkData } from '@common/script/data/NetWorkData';
import { NetworkApi } from '@common/script/network/APIType';
import { ErrorCodeConfig } from '@common/script/network/ErrorCodeConfig';
import { HTTP_METHODS, HttpRequestUtils, IPayload } from '@common/script/network/HttpRequestUtils';
import { UrlParameters } from '@common/script/utils/UrlParameters';


const { ccclass, property } = _decorator;

@ccclass('NetworkManager')
export class NetworkManager {
    protected static _instance: NetworkManager;
    public static getInstance() {
        if (!NetworkManager._instance) {
            NetworkManager._instance = new NetworkManager();
        }
        return NetworkManager._instance;
    }

    protected httpRequest: HttpRequestUtils;
    protected errorCodeConfig: ErrorCodeConfig;

    constructor() {
        this.httpRequest = new HttpRequestUtils();
        this.httpRequest.onErrorDelegate.add(this.onHttpError.bind(this));

        this.errorCodeConfig = new ErrorCodeConfig();
    }

    /**
     * 錯誤處理
     * @param errorCode 錯誤代碼
     */
    protected onHttpError(errorCode: number): void {
        if (errorCode === -1) {
            // TODO: 處理網路錯誤
        }
    }

    /**
     * 檢查錯誤代碼
     * @param response 回應資料
     */
    protected checkErrorCode(response: IResponseData): void {
        if (response.error_code !== 0) {
            if (this.errorCodeConfig.retryErrorCodes.includes(response.error_code)) {
                // TODO: 重試邏輯
            } else if (this.errorCodeConfig.closeAndContinueCodes.includes(response.error_code)) {
                // TODO: 顯示關閉按鈕錯誤對話框
            } else {
                // TODO: 顯示一般錯誤對話框
            }
        }
    }

    /**
     * 發送請求
     * @param command 命令
     * @param data 請求資料
     * @returns 回應資料
     */
    public async sendRequest(command: string, data: any = {}): Promise<IResponseData> {
        const content: IRequestData = {
            command,
            token: UrlParameters.token,
            data
        };

        // 設置請求資料
        const payload: IPayload = {
            url: UrlParameters.serverUrl,
            method: HTTP_METHODS.POST,
            content: JSON.stringify(content)
        };

        return new Promise((resolve, reject) => {
            this.httpRequest.sendRequest(payload, (response: IResponseData) => {
                this.checkErrorCode(response);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * 更新 token
     */
    // public async getRenewToken(): Promise<void> {
    //     let paramToken = DataManager.getInstance().paramToken;
    //     let token = sessionStorage.getItem(paramToken);
    //     if (token != null && token.length > 0) {
    //         DataManager.getInstance().token = token;
    //         return;
    //     }

    //     const response = await this.sendRequest(NetworkApi.RENEW_TOKEN);
    //     console.log('[NetworkManager] onRenewTokenReceived =>', response);
    //     if (response.data && response.data.length > 0 && response.data[0].token) {
    //         const newToken = response.data[0].token as string;
    //         DataManager.getInstance().token = newToken;
    //         if (paramToken) {
    //             sessionStorage.setItem(paramToken, newToken);
    //         }
    //     }
    // }

    /**
     * 獲取用戶資料UserData
     */
    public async getUserData(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_USER_DATA);
        console.log('[NetworkManager] onGetUserDataReceived =>', response);
        NetworkData.getInstance().setUserData(response.data);
    }

    /**
     * 獲取遊戲資料GameData
     */
    public async getGameData(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_GAME_DATA, {
            game_id: UrlParameters.gameId
        });
        console.log('[NetworkManager] onGetGameDataReceived =>', response);
        NetworkData.getInstance().setGameData(response.data);
    }

    /**
     * 發送spin請求
     * @param betData 轉輪資料
     */
    public async sendSpin(betData: any): Promise<void> {
        const response = await this.sendRequest(NetworkApi.SPIN, betData);
        console.log('[NetworkManager] onSpinReceived =>', response);
        // slotData.getSpinData(response.data);
    }

    /**
     * 獲取累積獎金資料
     */
    public async getJackpot(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_JACKPOT);
        console.log('[NetworkManager] onGetJackpotReceived =>', response);
        // TODO: 處理累積獎金資料
    }

    /**
     * 獲取現金掉落資料
     */
    public async getCashDrop(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_CASH_DROP);
        console.log('[NetworkManager] onGetCashDropReceived =>', response);
        // TODO: 處理現金掉落資料
    }

    /**
     * 獲取錦標賽資料
     */
    public async getTournament(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_TOURNAMENT);
        console.log('[NetworkManager] onGetTournamentReceived =>', response);
        // TODO: 處理錦標賽資料
    }

    /**
     * 獲取促銷簡介資料
     */
    public async getPromotionBrief(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_PROMOTION_BRIEF);
        console.log('[NetworkManager] onGetPromotionBriefReceived =>', response);
        // TODO: 處理促銷簡介資料
    }

    /**
     * 獲取遊戲內選單狀態
     */
    public async getInGameMenuStatus(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU_STATUS);
        console.log('[NetworkManager] onGetInGameMenuStatusReceived =>', response);
        // TODO: 處理遊戲內選單狀態
    }

    /**
     * 獲取遊戲內選單資料
     */
    public async getInGameMenu(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU);
        console.log('[NetworkManager] onGetInGameMenuReceived =>', response);
        // TODO: 處理遊戲內選單資料
    }

    /**
     * 更新遊戲內選單最愛遊戲
     * @param favoriteList 最愛遊戲列表
     */
    public async updateInGameMenuFavoriteGame(favoriteList: any[]): Promise<void> {
        const response = await this.sendRequest(NetworkApi.UPDATE_IN_GAME_MENU_FAVORITE_GAME, {
            favorite: favoriteList
        });
        console.log('[NetworkManager] onUpdateInGameMenuFavoriteGameReceived =>', response);
        // TODO: 處理更新最愛遊戲結果
    }

    /**
     * 獲取遊戲內選單遊戲 URL
     * @param gameId 遊戲 ID
     * @param lang 語言
     */
    public async getInGameMenuGameUrl(gameId: number, lang: string): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU_GAME_URL, {
            game_id: gameId,
            lang
        });
        console.log('[NetworkManager] onGetInGameMenuGameUrlReceived =>', response);
        // TODO: 處理遊戲 URL
    }
}

export interface IRequestData {
    command: string;
    token: string;
    data: any;
}

export interface IResponseData {
    command: string;
    data: any;
    error_code: number;
    message?: string;
}