
import { IBetData, IGameData, IUserData } from '@common/script/network/APIType';

/**
 * 遊戲資料控制器
 */
export class NetworkData {
    private static instance: NetworkData = null;
    public static getInstance(): NetworkData {
        if (!NetworkData.instance) {
            NetworkData.instance = new NetworkData();
        }
        return NetworkData.instance;
    }

    /** 用戶資料 */
    private userData: IUserData;
    /** 遊戲資料 */
    private gameData: IGameData;
    /** 下注資料 */
    private betData: IBetData;

    //==========================獲取資料==========================
    /** 獲取用戶資料 */
    public getUserData(): IUserData {
        return this.userData;
    }

    /** 獲取遊戲資料 */
    public getGameData(): IGameData {
        return this.gameData;
    }

    /** 獲取下注資料 */
    public getBetData(): IBetData {
        return this.betData;
    }

    //==========================獲取資料==========================


    //==========================設置資料==========================
    /** 設定遊戲資料 */
    public setGameData(data: IGameData): void {
        this.gameData = data;
    }

    /** 設定用戶資料 */
    public setUserData(data: IUserData): void {
        this.userData = data;
    }

    /** 設定下注資料 */
    public setBetData(data: IBetData): void {
        this.betData = data;
    }

    //==========================設置資料==========================
}