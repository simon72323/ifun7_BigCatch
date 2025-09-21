import { _decorator } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager {
    protected static _instance: DataManager;
    public static getInstance() {
        if (!DataManager._instance) {
            DataManager._instance = new DataManager();
        }
        return DataManager._instance;
    }

    /** 用戶資料 */
    private userData: IUserData;

    /** 遊戲資料 */
    private gameData: IGameData;

    /** 貨幣符號 */
    private currencySymbol: string;

    /** 小數位數 */
    private fixedDigit: string;

    /** 用戶信用值 */
    // private userCredit: number;

    constructor() {

    }

    /** 
     * 設定用戶資料
     * @param data 用戶資料
     */
    public setUserData(data: IUserData): void {
        this.userData = data;
    }

    /** 獲取用戶資料 */
    public getUserData(): IUserData {
        return this.userData;
    }

    /** 
     * 設定遊戲資料
     * @param data 遊戲資料
     */
    public setGameData(data: IGameData): void {
        this.gameData = data;
    }

    /** 獲取遊戲資料 */
    public getGameData(): IGameData {
        return this.gameData;
    }

    /** 設定貨幣符號 */
    // public setCurrencySymbol(symbol: string): void {
    //     this.currencySymbol = symbol;
    // }

    // /** 獲取貨幣符號 */
    // public getCurrencySymbol(): string {
    //     return this.currencySymbol;
    // }

    /** 設定小數位數 */
    // public setFixedDigit(digit: string): void {
    //     this.fixedDigit = digit;
    // }

    // /** 獲取小數位數 */
    // public getFixedDigit(): string {
    //     return this.fixedDigit;
    // }

    // /** 
    //  * 更新信用值
    //  * @param value 信用值
    //  */
    // public setUserCredit(value: number): void {
    //     this.userCredit = value;
    // }

    // /** 獲取用戶信用值 */
    // public getUserCredit(): number {
    //     return this.userCredit;
    // }
}

export interface IUserData {
    account: string;
    agent_account: string;
    credit: number;
    currency: string;
    free_spin_data: IFreeSpinData[];
    is_anchor: boolean;
}

interface IFreeSpinData {
    free_spin_id: string;
    bet: number;
    end_data: string;
    rounds_left: number;
}

export interface IGameData {
    gameId: number;
    line_bet: number[];
    coin_value: number[];
    line_total: number;
    line_available: number[];
    line_bet_default_index: number;
    coin_value_default_index: number;
    win: number;
    big_win: number;
    super_win: number;
    mega_win: number;
    spin_mode: number;
    buy_spin: IBuySpin;
}

interface IBuySpin {
    allow_buy: number;
    multiplier: number;
    limit_total: number;
}