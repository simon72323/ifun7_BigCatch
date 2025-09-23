import { ISpinData, IGameData, IUserData } from '@common/script/network/NetworkApi';

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
    public userData: IUserData;
    /** 遊戲資料 */
    public gameData: IGameData;
    /** 下注資料 */
    public spinData: ISpinData;
}

//==========================獲取資料==========================
/** 獲取用戶資料 */
// export function getUserData() {
//     return NetworkData.getInstance().userData as IUserDataResponse;
// }
// /** 獲取遊戲資料 */
// export function getGameData() {
//     return NetworkData.getInstance().gameData as IGameDataResponse;
// }
// /** 獲取下注資料 */
// export function getBetData() {
//     return NetworkData.getInstance().betData as IBetDataResponse;
// }
// //==========================獲取資料==========================


// //==========================設置資料==========================
// /** 設定用戶資料 */
// export function setUserData(data: IUserDataResponse) {
//     NetworkData.getInstance().userData = data;
// }
// /** 設定遊戲資料 */
// export function setGameData(data: IGameDataResponse) {
//     NetworkData.getInstance().gameData = data;
// }

// /** 設定下注資料 */
// export function setBetData(data: IBetDataResponse) {
//     NetworkData.getInstance().betData = data;
// }
//==========================設置資料==========================

