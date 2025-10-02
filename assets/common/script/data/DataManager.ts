
// import { APIManager } from '@base/script/utils/APIManager';
// import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';
// import { XUtils } from '@base/script/utils/XUtils';

// import { SlotData } from '@game/script/data/SlotData';

// import { BaseConst } from '@common/script/data/BaseConst';
import { gameInformation } from '@common/script/data/GameInformation';
// import { IGameData } from '@common/script/network/NetworkApi';
import { CheatCodeData, CreditMode, DigitMode, GameState, ModuleID, StripTable, TurboMode, UrlParam } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';



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

    /** 當前SPIN模式 */
    // public curSpinMode: SpinMode = SpinMode.Normal;

    /** 超級模式 */
    // public isSuperMode: boolean = false;

    /** 音效狀態 */
    public isSoundEnabled: boolean = true;
    /** 音樂狀態 */
    public isMusicEnabled: boolean = true;
    /** 自動旋轉模式 */
    public isAutoMode: boolean = false;
    /** 自動旋轉次數索引 */
    public autoIndex: number = 0;
    /** 剩餘自動旋轉次數 */
    public autoSpinCount: number = 0;
    /** 停止直到免費轉 */
    public isStopUntilFeature: boolean = false;



    /** 是否購買免費遊戲 */
    // public isBuyFreeGame: boolean = false;
    /** 當前方向模式 */
    // public orientationMode: OrientationtMode = OrientationtMode.Portrait;
    /** 當前模式 */
    public moduleID: ModuleID = ModuleID.BS;
    /** 下一模式 */
    public nextModuleID: ModuleID = ModuleID.BS;
    /** 當前加速模式(免費遊戲會強制設為Normal) */
    public turboMode: TurboMode = TurboMode.Normal;
    /** 當前遊戲狀態 */
    public gameState: GameState = GameState.Ready;
    /** 大贏跑分倍率 */
    public bigWinMultiple: number[] = [10, 20, 50];
    /** 當前下注索引 */
    public betIdx: number = 1;
    /** 當前下注值 */
    public betValue: number = 0;
    /** 玩家餘額 */
    public userCredit: number = 0;
    /** 是否跳過 */
    public hasSkip: boolean = false;


    /** 獲取slot資料 */
    // public slotData: SlotData = new SlotData();





    /**是否要走API版本 */
    public useAPI: boolean = false;

    /**網址參數 */
    private urlParamMap: Map<string, string> = new Map();

    /**網址參數 */
    public urlParam: UrlParam = new UrlParam();

    /**下注相關資料 */
    // public bet: BetData = new BetData();

    /**轉動過程設定的新模式,待機時帶入 */
    public tempTurboMode: TurboMode = TurboMode.Normal;

    /**目前狀態 */
    // public curState: s5g.game.proto.ESTATEID;

    /**剩餘額度顯示模式 */
    public creditMode: CreditMode = CreditMode.Cent;

    /** 小數點顯示模式 */
    public digitMode: DigitMode = DigitMode.DOT;

    /**遊戲ID */
    public gameID: string;

    /**預設socket網址(但API優先) */
    public defaultSocketUrl: string;

    /**購買功能限制倍率(超過倍率不允許使用) */
    public luckyStrikeBlockRate: number = 0;

    /**是否開啟webview */
    public webViewVisible: boolean = false;

    /**是否已呼叫過init */
    private initialize: boolean = false;

    /**免費遊戲購買類型(一般狀況為0) */
    public featureBuyType = 0;

    /**遊戲總贏分(BS表示一轉總得分, FS表示N轉總得分) */
    public winTotal: number = 0;

    /**輪帶資料 */
    public stripTables: StripTable[] = [];

    /**盤面圖示賠率 */
    public payOfPos = [];

    /**免費遊戲購買倍率清單(免費遊戲允許N個Bet) */
    // public featureBuyMultipleList: number[] = [];

    /**最低下注額(目前僅用於印尼版) */
    public lawMinBet: number = 0;

    /**自動轉資料 */
    // public auto: Auto = new Auto();

    //TODO:不明
    public isMenuOn = false;
    //TODO:不明
    public isPayTable = false;

    /**狀態回復資料 */
    // public recoverData: s5g.game.proto.IRecoverData = null;

    /**8x12初始盤面 */
    public initFullSymbolPattern: number[] = [];

    /**輪帶索引 */
    public rng: number[] = [];

    /**登入帳號 */
    public account: string;
    /**登入密碼 */
    public password: string;

    /**密技內容 */
    public cheatCodeData: CheatCodeData = null;

    /**會員ID */
    public memberID: string;
    /**營運商ID */
    public operatorID: string;
    /**Token */
    public token: string;


    /**
     * 初始化資料
     * @param config 
     */
    public init(config: any): void {

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
    }

    /**
     * 檢查餘額是否足夠
     * @returns 
     */
    public checkCredit(): boolean {
        return this.userCredit >= this.getBetCredit();
    }

    /**
     * 檢查是否夠買免費遊戲(玩家餘額 >= 免費遊戲總購買金額)
     * @returns 
     */
    public checkBuyFeature(): boolean {
        return this.userCredit >= this.getBuyFeatureTotal();
    }

    /**
     * 取得總下注金額
     * @returns 
     */
    public getBetCredit() {
        const gameData = gameInformation.gameData;
        const coinValue = gameData.coin_value[gameData.coin_value_default_index];
        const lineBet = gameData.line_bet[gameData.line_bet_default_index];
        const lineTotal = gameData.line_total;
        return Utils.accNumber(coinValue * lineBet * lineTotal);//處理浮點數問題
    }

    /**
     * 取得免費遊戲總購買金額(免費遊戲購買倍率 x 總下注)
     * @returns 
     */
    public getBuyFeatureTotal(): number {
        return gameInformation.gameData.buy_spin.multiplier * this.getBetCredit();
    }

    /**
     * 改變下注並回傳下注值
     * @param changeValue 改變值（正數為增加，負數為減少）
     */
    public getChangeBetValue(changeValue: number): number {
        this.betIdx += changeValue;
        const gameData = gameInformation.gameData;
        const length = gameData.coin_value.length;
        const betIdxMin = gameData.bet_available_idx;

        if (changeValue > 0) {
            // 增加下注
            if (this.betIdx >= length) {
                this.betIdx = betIdxMin;
            }
        } else {
            // 減少下注
            if (this.betIdx < betIdxMin) {
                this.betIdx = length - 1;
            }
        }

        // 更新下注值
        this.betValue = gameData.coin_value[this.betIdx];
        return this.betValue;
    }

    /**
     * 取得完整下注紀錄網址
     * @returns 
     */
    public getFullBetrecordurl(): string {
        const { betrecordurl, token, serverurl, lang } = this.urlParam;
        return `${betrecordurl}?token=${token}&lang=${lang}&serverurl=${serverurl}`;
    }

    /**
     * 是否為BS模式(一般遊戲)
     * @returns 
     */
    public isBS(): boolean {
        return this.moduleID === ModuleID.BS;
    }

    //=============================以上確定使用======================================

    /**
     * 金額模式
     */
    public parseCreditMode(param: string): CreditMode {
        let mode: CreditMode;
        if (param.length == 0) {
            mode = CreditMode.Cent;
        }
        if (param.substring(0, 1) == '0') {
            mode = CreditMode.Cent;
        }
        else if (param.substring(0, 1) == '1') {
            mode = CreditMode.Dollar;
        }
        else if (param.substring(0, 1) == '2') {
            mode = CreditMode.Credit;  //so far do no support
        }
        return mode;
    }

    /**
     * 取得贏錢倍數
     * @param value 
     * @returns 
     */
    // public getWinMultipleByValue(value: number): number {
    //     return value / this.bet.getCurBetXCurLine();
    // }

    /**
     * 取得value對應BigWin類型
     * @param value 
     */
    // public getBigWinTypeByValue(value: number): BigWinType {
    //     let bigWinLevel: BigWinType = BigWinType.non;
    //     let multiple: number = this.getWinMultipleByValue(value);
    //     for (let i = 0; i < this.bigWinMultiple.length; i++) {
    //         if (multiple >= this.bigWinMultiple[i]) {
    //             bigWinLevel = i;
    //         }
    //     }
    //     return bigWinLevel;
    // }

    // public isIdle(): boolean {
    //     return false;
    //     // return this.curState === s5g.game.proto.ESTATEID.K_IDLE;
    // }

    // public setState(state: s5g.game.proto.ESTATEID): void {
    //     this.curState = state;
    //     SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eStateCall);
    // }

    /**
     * 解析數字模式
     * @param param 
     * @returns 
     */
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

    /**
     * 取得輪帶
     * @param id 
     * @returns 
     */
    // public getStripTable() {
    //     for (let i = 0; i < this.stripTables.length; i++) {
    //         if (this.stripTables[i]._id == this.moduleID) {
    //             return this.stripTables[i];
    //         }
    //     }
    //     return null;
    // }

    /**
     * 取得ID對應輪帶表
     * @param id 
     * @returns 
     */
    // public getStripTableByID(id: ModuleID) {
    //     for (let i = 0; i < this.stripTables.length; i++) {
    //         if (this.stripTables[i]._id == id) {
    //             return this.stripTables[i];
    //         }
    //     }
    //     return null;
    // }


    public isBlockKeyboard(): boolean {
        return this.webViewVisible || this.isPayTable;
    }

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


    /**
     * 免費遊戲金額為N個Bet
     * @returns 
     */
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

    /**
     * 取得免費遊戲購買倍率
    //  * @param type 
    //  * @returns 
    //  */
    // public getFeatureBuyMultipleByType(type: number): number {
    //     return this.featureBuyMultipleList[type] / this.bet.getLineAt(0);
    // }

    /**
     * 是否為Demo模式
     * @returns 
     */
    // public isDemoMode(): boolean {
    //     return this.urlParam.playMode == '1';
    // }

    //TODO:太多地方用, 還不確定明確用途, 暫時保留
    /**
     * 測試溢位
     * @param value 
     * @returns 
     */
    // public TestOverFlow(value: number): boolean {
    //     if (value < 1000000000000) {
    //         return true;
    //     }
    //     else {
    //         ErrorManager.getInstance().showError(ErrorCode.Overflow);
    //         return false;
    //     }
    // }

    /**
     * 設定加速模式
     * @param mode 
     */
    // public setTurboMode(mode: TurboMode) {
    //     this.turboMode = mode;
    // }

    /**
     * 取得加速模式
     * @returns 
     */
    // public getTurboMode(): TurboMode {
    //     if (this.moduleID != ModuleID.BS) {
    //         return TurboMode.Normal;
    //     }
    //     else {
    //         return this.turboMode;
    //     }
    // }

    /**
     * 非Normal都是加速
     * @returns 
     */
    // public isTurboOn(): boolean {
    //     return this.getTurboMode() !== TurboMode.Normal;
    // }


    /**
     * Rng是1-base所以要-1
     * @param rngList 
     * @returns 
     */
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