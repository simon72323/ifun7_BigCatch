import { IGameData, IPromotionBrief, ISpinData, IUserData } from '@common/script/network/NetworkApi';

export class GameInformation {
    private _isInitialized: boolean = false;

    /** 用戶資料 */
    private _userData: IUserData;
    public get userData(): IUserData {
        return this._userData;
    }

    public set userData(userData: IUserData) {
        this._userData = userData;
        this.currency = userData.currency;
    }

    /** 遊戲資料 */
    private _gameData: IGameData;
    public get gameData(): IGameData {
        return this._gameData;
    }

    public set gameData(gameData: IGameData) {
        this._gameData = gameData;
    }

    /** 下注回傳資料 */
    private _spinResult: ISpinData;
    public get spinResult(): ISpinData {
        return this._spinResult;
    }

    public set spinResult(spinResult: ISpinData) {
        this._spinResult = spinResult;
    }

    /** 用戶token */
    public token: string = '';
    /** 遊戲id */
    public gameId: number = 0;
    /** 語言 */
    public lang: string = '';
    /** 投注記錄url */
    public betRecordUrl: string = '';
    /** 主頁url */
    public homeUrl: string = '';
    /** 模式 */
    public mode: string = '';
    /** 伺服器url */
    public serverUrl: string = '';
    /** 依據參數顯示不同 loading 頁 */
    public b: string = '';
    /** 幣別 */
    public currency: string = '';
    /** 促銷資料 */
    public promotionData: IPromotionBrief[];
    /** 遊戲內選單狀態(0=off，1=on) */
    public inGameMenuStatus: boolean;

    /** 遊戲內選單資料 */
    public inGameMenuStore: InGameMenuStore = {
        new: [],
        hot: [],
        gameList: [],
        favList: [],
        imageURL: '',
        isAvailable: false
    };

    /** 遊戲選單資料(語系ID: 遊戲名稱) */
    public gameNameList: { [key: number]: string } = {};

    /**
     * 初始化並快取所有URL參數
     */
    public initUrlParameters(): void {
        if (this._isInitialized) return;

        const urlParams = new URLSearchParams(window.location.search);

        this.token = urlParams.get(urlParamKey.TOKEN) || '';
        this.gameId = parseInt(urlParams.get(urlParamKey.GAME_ID) || '0');
        this.lang = urlParams.get(urlParamKey.LANGUAGE) || '';
        this.betRecordUrl = urlParams.get(urlParamKey.BET_RECORD_URL) || '';
        this.homeUrl = urlParams.get(urlParamKey.HOME_URL) || '';
        this.mode = urlParams.get(urlParamKey.MODE) || '';
        this.serverUrl = urlParams.get(urlParamKey.SERVER_URL) || '';
        this.b = urlParams.get(urlParamKey.B) || '';

        this._isInitialized = true;
    }

    // 重置
    public reset(): void {
        this._isInitialized = false;
        this.initUrlParameters();
    }

    //================ 獲取下注資料 ======================

    //================ 獲取下注資料 ======================

    //================ 獲取下注資料 ======================
}

export const gameInformation = new GameInformation();

enum urlParamKey {
    TOKEN = 'token',
    GAME_ID = 'gameid',
    LANGUAGE = 'lang',
    BET_RECORD_URL = 'betrecordurl',
    HOME_URL = 'homeurl',
    MODE = 'mode',
    SERVER_URL = 'serverurl',
    B = 'b',
}

type InGameMenuStore = {
    imageURL: string,
    isAvailable: boolean,
    hot: number[],
    new: number[],
    gameList: number[],
    favList: number[]
};