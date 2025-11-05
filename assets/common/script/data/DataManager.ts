
import { BetData } from 'db://assets/common/script/data/BetData';
import { UrlParam } from 'db://assets/common/script/data/UrlParam';
import { IGameData, IPromotionBrief, ISpinData, IUserData } from 'db://assets/common/script/network/NetworkApi';
import { BigWinType, ModuleID, TurboMode } from 'db://assets/common/script/types/BaseType';

/** 遊戲內選單資料 */
type InGameMenuStore = {
    imageURL: string,
    isAvailable: boolean,
    hot: number[],
    new: number[],
    gameList: number[],
    favList: number[]
};

/**
     * 遊戲資料控制器
     */
export class DataManager {
    private static instance: DataManager = null;
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }

    /** 玩家餘額 */
    public userCredit: number = 0;

    /** 是否自動旋轉模式 */
    public isAutoMode: boolean = false;
    /** 剩餘自動旋轉次數 */
    public autoSpinCount: number = 0;
    /** 是否選擇自動旋轉次數 */
    public isAutoTimes: boolean = false;
    /** 停止直到免費轉 */
    public isStopUntilFeature: boolean = false;

    /** 當前模式 */
    public curModuleID: ModuleID = ModuleID.BS;
    /** 當前加速模式(免費遊戲會強制設為Normal) */
    public curTurboMode: TurboMode = TurboMode.Fast;

    /** 音效狀態 */
    public isSoundEnabled: boolean = true;
    /** 音樂狀態 */
    public isMusicEnabled: boolean = true;

    /** 是否鎖定鍵盤 */
    public lockKeyboard: boolean = false;

    //=================================== 資料 ======================================
    /**網址參數 */
    public urlParam: UrlParam = new UrlParam();
    /**下注相關資料 */
    public bet: BetData = new BetData();
    //=================================== 資料 ======================================

    //============================= server資料 =====================================
    /** 用戶資料 */
    private _userData: IUserData;
    public get userData(): IUserData {
        return this._userData;
    }

    public set userData(userData: IUserData) {
        this._userData = userData;
        this.userCredit = userData.credit;
        this.currency = userData.currency;
    }

    /** 遊戲資料 */
    private _gameData: IGameData;
    public get gameData(): IGameData {
        return this._gameData;
    }

    public set gameData(gameData: IGameData) {
        this._gameData = gameData;
        this.bigWinMultiple.push(gameData.big_win);
        this.bigWinMultiple.push(gameData.super_win);
        this.bigWinMultiple.push(gameData.mega_win);

        // 初始化 BetData 的數據依賴
        this.bet.setGameData(gameData);
        this.bet.setLineIdx(gameData.line_bet_default_index);
        this.bet.setBetIdx(gameData.coin_value_default_index);
        this.bet.setCoinValue(gameData.coin_value[gameData.coin_value_default_index]);
    }

    /** 下注回傳資料 */
    private _spinResult: ISpinData;
    public get spinResult(): ISpinData {
        return this._spinResult;
    }

    public set spinResult(spinResult: ISpinData) {
        this._spinResult = spinResult;
    }

    /** 幣別 */
    public currency: string = '';
    /** 大贏跑分倍率 */
    public bigWinMultiple: number[] = [];
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
    //============================= server資料 ======================================

    /**
     * 取得完整下注紀錄網址
     * @returns 
     */
    public getFullBetrecordurl(): string {
        const { betRecordUrl, token, serverUrl, lang } = this.urlParam;
        return `${betRecordUrl}?token=${token}&lang=${lang}&serverurl=${serverUrl}`;
    }

    /**
     * 是否為BS模式(一般遊戲)
     * @returns 
     */
    public isBS(): boolean {
        return this.curModuleID === ModuleID.BS;
    }

    /**
     * 取得value對應BigWin類型
     * @param value 
     */
    public getBigWinTypeByValue(value: number): BigWinType {
        if (!this.bigWinMultiple || this.bigWinMultiple.length === 0) {
            // console.warn('BetData: bigWinMultiple not initialized');
            return BigWinType.non;
        }

        let bigWinLevel: BigWinType = BigWinType.non;
        //取得贏錢倍數
        const multiple: number = this.bet.getWinMultipleByValue(value);
        for (let i = 0; i < this.bigWinMultiple.length; i++) {
            if (multiple >= this.bigWinMultiple[i]) {
                bigWinLevel = i;
            }
        }
        return bigWinLevel;
    }

    /**
     * 取得免費遊戲購買金額
     * @returns 
     */
    public getBuySpinValue(): number {
        if (!this.gameData.buy_spin) {
            return -1;//代表沒有購買功能
        }
        const multiple = this.gameData.buy_spin.multiplier;
        const limit_total = this.gameData.buy_spin.limit_total;
        //總購買金額
        const totalBuy = multiple * this.bet.getBetTotal();
        if (totalBuy > limit_total) {
            return -1;//代表超過限額
        }
        return totalBuy;
    }

    /**
     * 是否鎖定鍵盤
     * @returns 
     */
    public isBlockKeyboard(): boolean {
        return this.lockKeyboard;
    }
}
