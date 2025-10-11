import { _decorator } from 'cc';

import { Notice } from '@common/components/notice/Notice';
import { DataManager } from '@common/script/data/DataManager';
import { ErrorCodeConfig } from '@common/script/network/ErrorCodeConfig';
import { FETCH_METHODS, FetchRequestUtils, IFetchPayload } from '@common/script/network/FetchRequestUtils';
import { ICashDrop, ICashDropPrizeRecord, IExtraDataResponse, IFreeSpinTotalPayoutResponse, IPromotionBrief, ISpinData, ITournament, ITournamentPrizeRecord, NetworkApi } from '@common/script/network/NetworkApi';



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

    protected fetchRequest: FetchRequestUtils;
    protected errorCodeConfig: ErrorCodeConfig;

    constructor() {
        this.fetchRequest = new FetchRequestUtils();
        this.fetchRequest.onErrorDelegate.add(this.onFetchError.bind(this));
        this.errorCodeConfig = new ErrorCodeConfig();
    }

    /**
     * 錯誤處理
     * @param errorCode 錯誤代碼
     */
    protected onFetchError(errorCode: number): void {
        console.error(`網路錯誤: ${errorCode}`);

        // 根據錯誤代碼顯示相應的錯誤彈窗
        if (errorCode === -1) {
            // 網路連線錯誤
            Notice.showError.emit(-1);
        } else if (errorCode === -2) {
            // 超時錯誤
            Notice.showError.emit(-1); // 使用相同的網路錯誤提示
        } else {
            // 其他HTTP錯誤狀態碼
            Notice.showError.emit(errorCode);
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

            if (this.errorCodeConfig.retryErrorCodes.includes(response.error_code)) {
                // 需要重試的錯誤 - 顯示錯誤彈窗，用戶可以點擊重新連線
                console.warn(`需要重試的錯誤: ${fullErrorMessage}`);
                Notice.showError.emit(response.error_code);
            } else if (this.errorCodeConfig.closeAndContinueCodes.includes(response.error_code)) {
                // 需要關閉並繼續的錯誤 - 顯示錯誤彈窗(有OK按鈕，會關閉視窗並繼續)
                console.error(`需要關閉並繼續的錯誤: ${fullErrorMessage}`);
                Notice.showError.emit(response.error_code);
            } else {
                // 一般錯誤 - 顯示錯誤彈窗(有重新連線按鈕)
                console.error(`一般錯誤: ${fullErrorMessage}`);
                Notice.showError.emit(response.error_code);
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
    private async sendRequest(command: string, data: any = {}): Promise<IResponseData> {
        const content: IRequestData = {
            command,
            token: DataManager.getInstance().urlParam.token,
            data
        };

        // 設置請求資料
        const fetchPayload: IFetchPayload = {
            url: DataManager.getInstance().urlParam.serverUrl,
            method: FETCH_METHODS.POST,
            content: JSON.stringify(content)
        };
        console.log('sendRequest', fetchPayload);

        return new Promise((resolve, reject) => {
            this.fetchRequest.sendRequest(fetchPayload, (response: IResponseData) => {
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
    public async sendRenewToken(): Promise<string> {
        const response = await this.sendRequest(NetworkApi.RENEW_TOKEN);
        console.log('[NetworkManager] onRenewTokenReceived =>', response);
        return response.data[0].token as string;
    }

    /**
     * 發送spin請求（支援免費旋轉）
     * @param betCredit 下注金額
     * @param SpinID 0=一般投注，1=免費投注
     * @param callback spinResult=回傳spin結果（失敗回傳null）
     */
    public async sendSpin(betCredit: number, SpinID: number, callback: (spinResult: ISpinData) => void): Promise<void> {
        try {
            const gameData = DataManager.getInstance().gameData;
            const response = await this.sendRequest(NetworkApi.SPIN, {
                game_id: DataManager.getInstance().urlParam.gameId,
                coin_value: gameData.coin_value[gameData.coin_value_default_index],
                line_bet: gameData.line_bet[gameData.line_bet_default_index],
                line_num: gameData.line_total,
                bet_credit: betCredit,
                buy_spin: SpinID
            });
            // console.log('[NetworkManager] onGetGSSpinDataReceived =>', response);
            DataManager.getInstance().spinResult = response.data;
            callback(response.data);// 成功回調
        } catch (error) {
            // console.error('[NetworkManager] sendSpin error =>', error);
            callback(null);// 失敗回調
        }
    }

    /**
     * 獲取免費旋轉結算
     * @param freeSpinId 免費旋轉 ID
     */
    public async sendFreeSpinTotalPayout(freeSpinId: string): Promise<IFreeSpinTotalPayoutResponse> {
        const response = await this.sendRequest(NetworkApi.GET_FREE_SPIN_TOTAL_PAYOUT, {
            free_spin_id: freeSpinId
        });
        console.log('[NetworkManager] onGetFreeSpinTotalPayoutReceived =>', response);
        return response.data[0] as IFreeSpinTotalPayoutResponse;
    }

    /**
     * 發送滾輪停止通知（主播用）
     */
    public async sendReelStop(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.REEL_STOP);
        console.log('[NetworkManager] onReelStopReceived =>', response);
    }

    /**
     * 獲取促銷簡介資料
     */
    public async sendPromotionBrief(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_PROMOTION_BRIEF, {
            promotion_id: '-1'
        });
        console.log('[NetworkManager] onGetPromotionBriefReceived =>', response);
        this.processPromotionBrief(response);
    }

    /**
     * 處理促銷簡介資料
     * @param response 原始促銷資料
     */
    private processPromotionBrief(response: any): void {
        let promotionBriefResponse = response.data;
        // 按結束時間排序
        promotionBriefResponse.sort((a: IPromotionBrief, b: IPromotionBrief) => {
            const timeZoneNow = new Date(new Date().toLocaleString('sv-SE', { timeZone: a.time_zone }).replace(/-/g, '/'));
            const TIME_A = new Date(a.end_date.replace(/-/g, '/')).getTime() - timeZoneNow.getTime();
            const TIME_B = new Date(b.end_date.replace(/-/g, '/')).getTime() - timeZoneNow.getTime();
            return TIME_B > TIME_A ? 1 : -1;
        });

        // 把錦標賽拿到後面放
        const pushType = 1;
        const temp = promotionBriefResponse.filter(value => value.promotion_type === pushType);
        for (let i = promotionBriefResponse.length - 1; i >= 0; i--) {
            if (promotionBriefResponse[i].promotion_type === pushType) {
                promotionBriefResponse.splice(i, 1);
            }
        }
        promotionBriefResponse = promotionBriefResponse.concat(temp);
        //更新資料
        DataManager.getInstance().promotionData = promotionBriefResponse;
    }

    /**
     * 獲取現金掉落活動詳細資料
     */
    public async sendCashDrop(promotionId: string = '-1'): Promise<ICashDrop[]> {
        const response = await this.sendRequest(NetworkApi.GET_CASH_DROP, {
            promotion_id: promotionId
        });
        console.log('[NetworkManager] onGetCashDropReceived =>', response);
        return response.data as ICashDrop[];
    }

    /**
     * 獲取現金掉落中獎紀錄
     */
    public async sendCashDropPrizeRecord(promotionId: string = '-1'): Promise<ICashDropPrizeRecord[]> {
        const response = await this.sendRequest(NetworkApi.GET_CASH_DROP_PRIZE_RECORD, {
            promotion_id: promotionId
        });
        console.log('[NetworkManager] onGetCashDropPrizeRecordReceived =>', response);
        return response.data as ICashDropPrizeRecord[];
    }

    /**
     * 獲取錦標賽詳細資料
     */
    public async sendTournament(promotionId: string = '-1'): Promise<ITournament[]> {
        const response = await this.sendRequest(NetworkApi.GET_TOURNAMENT, {
            promotion_id: promotionId
        });
        console.log('[NetworkManager] onGetTournamentReceived =>', response);
        return response.data as ITournament[];
    }

    /**
     * 獲取錦標賽排行榜
     */
    public async sendTournamentPrizeRecord(promotionId: string = '-1'): Promise<ITournamentPrizeRecord[]> {
        const response = await this.sendRequest(NetworkApi.GET_TOURNAMENT_PRIZE_RECORD, {
            promotion_id: promotionId
        });
        console.log('[NetworkManager] onGetTournamentPrizeRecordReceived =>', response);
        return response.data as ITournamentPrizeRecord[];
    }

    /**
     * 獲取額外資料（最近中獎資料）
     */
    public async sendExtraData(interval: number = 60): Promise<IExtraDataResponse[]> {
        const response = await this.sendRequest(NetworkApi.GET_EXTRA_DATA, {
            interval
        });
        console.log('[NetworkManager] onGetExtraDataReceived =>', response);
        return response.data as IExtraDataResponse[];
    }

    /**
     * 獲取遊戲內選單狀態開關 0=off，1=on
     */
    public async sendInGameMenuStatus(): Promise<boolean> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU_STATUS);
        console.log('[NetworkManager] onGetInGameMenuStatusReceived =>', response);
        return response.data[0].status as boolean;
    }

    /**
     * 獲取遊戲內選單遊戲 URL
     * @param gameId 遊戲 ID
     * @param lang 語言
     * @param b loading 頁面底圖
     */
    public async sendInGameMenuGameUrl(gameId: number, lang: string, b: string): Promise<string> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU_GAME_URL, {
            game_id: gameId,
            lang,
            b
        });
        console.log('[NetworkManager] onGetInGameMenuGameUrlReceived =>', response);
        return response.data[0].url as string;
    }

    /**
     * 獲取用戶資料UserData
     */
    public async sendUserData(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_USER_DATA);
        console.log('[NetworkManager] onGetGSUserDataReceived =>', response);
        // return response.data as IUserData;
        DataManager.getInstance().userData = response.data;
    }

    /**
     * 獲取遊戲資料GameData
     */
    public async sendGameData(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_GAME_DATA, {
            game_id: DataManager.getInstance().urlParam.gameId
        });
        console.log('[NetworkManager] onGetGSGameDataReceived =>', response);
        // return response.data as IGameData;
        DataManager.getInstance().gameData = response.data;
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
     * 獲取遊戲內選單資料
     */
    public async sendInGameMenu(): Promise<void> {
        const response = await this.sendRequest(NetworkApi.GET_IN_GAME_MENU);
        console.log('[NetworkManager] onGetInGameMenuReceived =>', response);
        this.getInGameMenu(response);
    }

    /**
     * 處理遊戲內選單資料
     * @param response 原始遊戲內選單資料
     */
    private getInGameMenu(response: any): any {
        if (response.game && response.game.length > 0) {
            // * Process Hot, New and All game list
            let menuGames = response.game;
            for (let i = 0; i < menuGames.length; i++) {
                if (menuGames[i][1] == 1) {
                    DataManager.getInstance().inGameMenuStore.new.push(menuGames[i][0]);
                } else if (menuGames[i][1] == 2) {
                    DataManager.getInstance().inGameMenuStore.hot.push(menuGames[i][0]);
                }
                DataManager.getInstance().inGameMenuStore.gameList.push(menuGames[i][0]);
            }

            // * Process favorite game list
            let favGames = response.favorite;
            for (let i = 0; i < favGames.length; i++) {
                DataManager.getInstance().inGameMenuStore.favList.push(favGames[i]);
            }

            // * Keeps imageURL
            DataManager.getInstance().inGameMenuStore.imageURL = response.image;

            // * Create game data
            let allGamesData = response.game_name;
            for (let i = 0; i < allGamesData.length; i++) {
                DataManager.getInstance().gameNameList[allGamesData[i].game_id] = allGamesData[i].language;
            }
        }
    }

    /**
     * 更新遊戲內選單最愛遊戲
     * @param favoriteList 最愛遊戲ID列表
     */
    public async sendUpdateInGameMenuFavoriteGame(favoriteList: number[]): Promise<void> {
        const response = await this.sendRequest(NetworkApi.UPDATE_IN_GAME_MENU_FAVORITE_GAME, {
            favorite: favoriteList
        });
        console.log('[NetworkManager] onUpdateInGameMenuFavoriteGameReceived =>', response);
        // TODO: 處理更新最愛遊戲結果
    }
}

//傳送格式
export interface IRequestData {
    command: string,
    token: string,
    data: any
}

//回應格式
export interface IResponseData {
    command: string,
    error_code: number,
    message?: string,
    data: any
}