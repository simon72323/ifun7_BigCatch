import { _decorator } from 'cc';

import { NetworkData } from '@common/script/data/NetworkData';
import { ErrorCodeConfig } from '@common/script/network/ErrorCodeConfig';
import { HTTP_METHODS, HttpRequestUtils, IPayload } from '@common/script/network/HttpRequestUtils';
import { IGameData, IGameMenu, ISpinData, IUserData, NetworkApi } from '@common/script/network/NetworkApi';
import { UrlParameters } from '@common/script/utils/UrlParameters';
import { Utils } from '@common/script/utils/Utils';


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
            console.error(`網路錯誤: ${errorCode}`);
            // TODO: 處理網路錯誤
        }
    }

    /**
     * 檢查錯誤代碼
     * @param response 回應資料
     */
    protected checkErrorCode(response: any): boolean {
        if (response.error_code !== 0) {
            // 獲取錯誤描述
            const errorMessage = this.errorCodeConfig.errorCodes.get(response.error_code) || 'Unknown Error';
            const fullErrorMessage = `${response.error_code} - ${errorMessage}`;

            // if (this.errorCodeConfig.retryErrorCodes.includes(response.error_code)) {
            //     // TODO: 重試邏輯(有重新連線按鈕)
            //     console.warn(`需要重試的錯誤: ${fullErrorMessage}`);
            // } else 
            if (this.errorCodeConfig.closeAndContinueCodes.includes(response.error_code)) {
                // TODO: 顯示關閉按鈕錯誤對話框(有OK按鈕，會關閉視窗並繼續)
                console.error(`需要關閉並繼續的錯誤: ${fullErrorMessage}`);
            } else {
                // TODO: 顯示一般錯誤對話框(有重新連線按鈕)
                console.error(`一般錯誤: ${fullErrorMessage}`);
            }
            return false; // 有錯誤
        }
        return true; // 沒有錯誤
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
                if (this.checkErrorCode(response)) {
                    resolve(response);  // 沒有錯誤，成功
                }
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
    public async sendUserData(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_USER_DATA);
        console.log('[NetworkManager] onGetGSUserDataReceived =>', response);
        // return response.data as IUserData;
        NetworkData.getInstance().userData = response.data;
    }

    /**
     * 獲取遊戲資料GameData
     */
    public async sendGameData(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_GAME_DATA, {
            game_id: UrlParameters.gameId
        });
        console.log('[NetworkManager] onGetGSGameDataReceived =>', response);
        // return response.data as IGameData;
        NetworkData.getInstance().gameData = response.data;
    }

    /**
     * 發送spin請求
     */
    public async sendSpin(): Promise<void> {
        const gameData = NetworkData.getInstance().gameData;
        const coinValue = gameData.coin_value[gameData.coin_value_default_index];
        const lineBet = gameData.line_bet[gameData.line_bet_default_index];
        const lineTotal = gameData.line_total;
        const betCredit = Utils.accNumber(coinValue * lineBet * lineTotal);//處理浮點數問題

        const response = await this.sendRequest(NetworkApi.SPIN, {
            game_id: UrlParameters.gameId,
            coin_value: coinValue,
            line_bet: lineBet,
            line_num: lineTotal,
            bet_creait: betCredit,
            buy_spin: 0
        });
        console.log('[NetworkManager] onGetGSSpinDataReceived =>', response);
        // return response.data as ISpinData;
        NetworkData.getInstance().spinData = response.data;
        // slotData.getSpinData(response.data);
    }

    /**
     * 發送購買免費遊戲spin請求
     */
    public async sendBuyFreeSpin(buyFreeBet: number): Promise<ISpinData> {
        const gameData = NetworkData.getInstance().gameData;
        // const coinValue = gameData.coin_value[gameData.coin_value_default_index];
        const lineBet = gameData.line_bet[gameData.line_bet_default_index];
        const lineTotal = gameData.line_total;
        const betCredit = Utils.accNumber(buyFreeBet * lineBet * lineTotal);//處理浮點數問題

        const response = await this.sendRequest(NetworkApi.SPIN, {
            game_id: UrlParameters.gameId,
            coin_value: buyFreeBet,
            line_bet: lineBet,
            line_num: lineTotal,
            bet_creait: betCredit,
            buy_spin: 0
        });
        console.log('[NetworkManager] onGetGSSpinDataReceived =>', response);
        return response.data as ISpinData;
        // NetworkData.getInstance().spinData = response.data;
        // slotData.getSpinData(response.data);
    }

    /**
     * 獲取累積獎金資料
     */
    public async sendJackpot(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_JACKPOT);
        console.log('[NetworkManager] onGetJackpotReceived =>', response);
        // TODO: 處理累積獎金資料
    }

    /**
     * 獲取現金掉落資料
     */
    public async sendCashDrop(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_CASH_DROP);
        console.log('[NetworkManager] onGetCashDropReceived =>', response);
        // TODO: 處理現金掉落資料
    }

    /**
     * 獲取錦標賽資料
     */
    public async sendTournament(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_TOURNAMENT);
        console.log('[NetworkManager] onGetTournamentReceived =>', response);
        // TODO: 處理錦標賽資料
    }

    /**
     * 獲取促銷簡介資料
     */
    public async sendPromotionBrief(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_PROMOTION_BRIEF);
        console.log('[NetworkManager] onGetPromotionBriefReceived =>', response);
        // TODO: 處理促銷簡介資料
    }

    /**
     * 獲取遊戲內選單狀態
     */
    // public async sendInGameMenuStatus(): Promise<IGameMenu> {
    //     const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU_STATUS);
    //     console.log('[NetworkManager] onGetInGameMenuStatusReceived =>', response);
    //     return response.data as IGameMenu;
    // }

    /**
     * 獲取遊戲內選單資料
     */
    public async sendInGameMenu(): Promise<IGameMenu> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU);
        console.log('[NetworkManager] onGetInGameMenuReceived =>', response);
        return response.data as IGameMenu;
    }

    /**
     * 更新遊戲內選單最愛遊戲
     * @param favoriteList 最愛遊戲列表
     */
    public async sendUpdateInGameMenuFavoriteGame(favoriteList: any[]): Promise<void> {
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
    public async sendInGameMenuGameUrl(gameId: number, lang: string): Promise<void> {
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