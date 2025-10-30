
import { SlotData } from '@game/script/data/SlotData';

import { BetData } from '@common/script/data/BetData';
import { UrlParam } from '@common/script/data/UrlParam';
import { IGameData, IPromotionBrief, ISpinData, IUserData } from '@common/script/network/NetworkApi';
import { BigWinType, ModuleID,  TurboMode } from '@common/script/types/BaseType';

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

    //=================================== 資料 ======================================
    /** 獲取slot資料 */
    public slotData: SlotData = new SlotData();
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
        console.log('設置遊戲資料', gameData);
        this._gameData = gameData;
        // this.bigWinMultiple.push(gameData.big_win);
        // this.bigWinMultiple.push(gameData.super_win);
        // this.bigWinMultiple.push(gameData.mega_win);
        this.bigWinMultiple.push(5);
        this.bigWinMultiple.push(10);
        this.bigWinMultiple.push(15);

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
     * 初始化資料
     * @param config 
     */
    // public init(config: any): void {

    // if (this.initialize) {
    //     return;//已經初始化過
    // }
    // this.initialize = true;

    // 根據信用模式設定貨幣單位
    // let currency = this.creditMode == CreditMode.Dollar ? 'USD' : 'EUR';
    // 根據數字模式設定地區格式
    // let locale = this.digitMode == DigitMode.COMMA ? 'vi-VN' : 'en-US';
    // 初始化數字格式
    // XUtils.initFormat(currency, locale);
    // }

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
            console.warn('BetData: bigWinMultiple not initialized');
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


    //=============================以上確定使用======================================
    // public isIdle(): boolean {
    //     return false;
    //     // return this.curState === s5g.game.proto.ESTATEID.K_IDLE;
    // }

    // public isBlockKeyboard(): boolean {
    //     return this.webViewVisible || this.isPayTable;
    // }

    // public setState(state: s5g.game.proto.ESTATEID): void {
    //     this.curState = state;
    //     SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eStateCall);
    // }

    /**
     * 金額模式
     */
    // public parseCreditMode(param: string): CreditMode {
    //     let mode: CreditMode;
    //     if (param.length == 0) {
    //         mode = CreditMode.Cent;
    //     }
    //     if (param.substring(0, 1) == '0') {
    //         mode = CreditMode.Cent;
    //     }
    //     else if (param.substring(0, 1) == '1') {
    //         mode = CreditMode.Dollar;
    //     }
    //     else if (param.substring(0, 1) == '2') {
    //         mode = CreditMode.Credit;  //so far do no support
    //     }
    //     return mode;
    // }

    // /**
    //  * 解析數字模式
    //  * @param param 
    //  * @returns 
    //  */
    // private parseDigitMode(param: string): DigitMode {
    //     let mode: DigitMode;
    //     if (param.length == 0) {
    //         mode = DigitMode.DOT;
    //     }
    //     else if (param.substr(1, 1) == '1') {
    //         mode = DigitMode.COMMA;
    //     }
    //     else {
    //         mode = DigitMode.DOT;
    //     }
    //     return mode;
    // }

    // /**
    //  * 取得輪帶
    //  * @param id 
    //  * @returns 
    //  */
    // public getStripTable() {
    //     for (let i = 0; i < this.stripTables.length; i++) {
    //         if (this.stripTables[i]._id == this.moduleID) {
    //             return this.stripTables[i];
    //         }
    //     }
    //     return null;
    // }

    // /**
    //  * 取得ID對應輪帶表
    //  * @param id 
    //  * @returns 
    //  */
    // public getStripTableByID(id: ModuleID) {
    //     for (let i = 0; i < this.stripTables.length; i++) {
    //         if (this.stripTables[i]._id == id) {
    //             return this.stripTables[i];
    //         }
    //     }
    //     return null;
    // }

    // public getSocketUrl(): string {
    //     return APIManager.getInstance().getSocketUrl() || this.defaultSocketUrl;
    // }

    // public getMapIndex(idx: number): number {
    //     // return XUtils.getMapIndex(idx, this.getData().REEL_ROW);
    //     return 0;
    // }

    // /**
    //  * 取得免費遊戲購買成本(多種免費遊戲選項)
    //  * @param type 免費遊戲選項id
    //  * @returns 
    //  */
    // public getFeatureBuyCostAt(type: number): number {
    //     return this.featureBuyMultipleList[type] * this.bet.getCurRateXCurBet();
    // }


    // /**
    //  * 免費遊戲金額為N個Bet
    //  * @returns 
    //  */
    // public getFeatureBuyNumOfCost(): number {
    //     return this.getCurFeatureBuyMultiple() / this.bet.getLineAt(0);
    // }

    /**
     * 取得免費遊戲最大購買金額
     */
    // public getFeatureBuyMaxBet(): number {
    //     let lk = this.luckyStrikeBlockRate;
    //     let max = this.bet.getMaxTotal();
    //     let numCost = this.getFeatureBuyNumOfCost();
    //     let len = this.bet.getTotalLength();
    //     let featureBuyLimit = (lk * max) / numCost;
    //     let totalIdx: number = -1;
    //     for (let i = 0; i < len; i++) {
    //         if (this.bet.getTotalAt(i) <= featureBuyLimit) {
    //             totalIdx = i;
    //         }
    //     }

    //     //設為0時, 回傳購買金額0
    //     if (totalIdx === -1) {
    //         return 0;
    //     }
    //     else {
    //         return XUtils.numberToFloor(this.bet.getTotalAt(totalIdx));
    //     }
    // }

    // /**
    //  * 取得免費遊戲購買倍率
    //  * @param type 
    //  * @returns 
    //  */
    // public getFeatureBuyMultipleByType(type: number): number {
    //     return this.featureBuyMultipleList[type] / this.bet.getLineAt(0);
    // }

    // /**
    //  * 是否為Demo模式
    //  * @returns 
    //  */
    // public isDemoMode(): boolean {
    //     return this.urlParam.playMode == '1';
    // }

    //TODO:太多地方用, 還不確定明確用途, 暫時保留
    // /**
    //  * 測試溢位
    //  * @param value 
    //  * @returns 
    //  */
    // public TestOverFlow(value: number): boolean {
    //     if (value < 1000000000000) {
    //         return true;
    //     }
    //     else {
    //         ErrorManager.getInstance().showError(ErrorCode.Overflow);
    //         return false;
    //     }
    // }

    // /**
    //  * 設定加速模式
    //  * @param mode 
    //  */
    // public setTurboMode(mode: TurboMode) {
    //     this.turboMode = mode;
    // }

    // /**
    //  * 取得加速模式
    //  * @returns 
    //  */
    // public getTurboMode(): TurboMode {
    //     if (this.moduleID != ModuleID.BS) {
    //         return TurboMode.Normal;
    //     }
    //     else {
    //         return this.turboMode;
    //     }
    // }

    // /**
    //  * 非Normal都是加速
    //  * @returns 
    //  */
    // public isTurboOn(): boolean {
    //     return this.getTurboMode() !== TurboMode.Normal;
    // }


    // /**
    //  * Rng是1-base所以要-1
    //  * @param rngList 
    //  * @returns 
    //  */
    // public getMapByRng(rngList: number[]): number[] {
    //     let stripTable = this.getStripTable();
    //     let strips = stripTable._strips;
    //     let map: number[] = [];
    //     for (let row: number = 0; row < 8; ++row) {
    //         for (let col: number = 0; col < 8; ++col) {
    //             let symbol: number = -1;
    //             let reel_strip = strips[col];
    //             if (reel_strip && row < this.data.REEL_ROW) {
    //                 let rng = (rngList[col] - 1 + row + strips[col].length) % strips[col].length;
    //                 symbol = strips[col][rng];
    //             }
    //             else {
    //                 symbol = 255;
    //             }
    //             map.push(symbol);
    //         }
    //     }
    //     return map;
    // }
}
