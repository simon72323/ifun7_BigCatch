import { IGameData } from '@common/script/network/NetworkApi';
import { Utils } from '@common/script/utils/Utils';

/**
 * 下注相關資料
 */
export class BetData {

    /** 當前下注索引 */
    private betIdx: number = 1;
    public setBetIdx(value: number): void {
        this.betIdx = value;
    }

    /** 當前線注索引 */
    private lineIdx: number = 0;
    public setLineIdx(value: number): void {
        this.lineIdx = value;
    }

    /** 遊戲數據引用 */
    private gameData: IGameData;
    public setGameData(gameData: IGameData): void {
        this.gameData = gameData;
    }

    /** 當前下注額 */
    private coinValue: number = 0;
    public setCoinValue(value: number): void {
        this.coinValue = value;
    }

    //================ 下注相關資料 ======================

    /**
     * 獲取總下注金額
     * @returns 總下注金額(總線數 x 下注值 x 線注)
     */
    public getBetTotal(): number {
        //當前下注額 x 線注
        const curBetXCurLine = Utils.accMul(this.coinValue, this.getLineBet());
        //總線數 x 當前下注額 x 線注
        const betTotal = Utils.accMul(this.gameData.line_total, curBetXCurLine);
        return betTotal;
    }

    /**
    * 獲取當前下注額
    * @returns 當前下注額
    */
    public getCoinValue(): number {
        return this.coinValue;
    }

    /**
     * 獲取線注
     * @returns 線注
     */
    public getLineBet(): number {
        return this.gameData.line_bet[this.lineIdx];
    }

    /**
     * 獲取總線數
     * @returns 
     */
    public getLineTotal(): number {
        return this.gameData.line_total;
    }

    /**
     * 取得免費遊戲總購買金額(免費遊戲購買倍率 x 總下注)，-1代表沒有購買功能或超過限額
     * @returns 
     */
    public getBuyFeatureTotal(): number {
        if (!this.gameData.buy_spin) {
            return -1;//代表沒有購買功能
        }
        const multiple = this.gameData.buy_spin.multiplier;
        const limit_total = this.gameData.buy_spin.limit_total;
        //總購買金額
        const totalBuy = multiple * this.getBetTotal();
        if (totalBuy > limit_total) {
            return -1;//代表超過限額
        }
        return totalBuy;
        // return Utils.accMul(this.gameData.buy_spin.multiplier, this.getBetTotal());
    }

    /**
     * 改變下注並回傳下注值
     * @param changeValue 改變值（正數為增加，負數為減少）
     */
    public getChangeBetValue(changeValue: number): number {
        this.betIdx += changeValue;
        const length = this.gameData.coin_value.length;
        const betIdxMin = this.gameData.bet_available_idx;

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
        this.coinValue = this.gameData.coin_value[this.betIdx];
        return this.coinValue;
    }

    /**
     * 增加下注
     */
    public plus(): void {
        this.betIdx = Math.min(this.betIdx + 1, this.gameData.coin_value.length - 1);
    }

    /**
     * 減少下注
     */
    public less(): void {
        this.betIdx = Math.max(this.betIdx - 1, 0);
    }

    /**
     * 取得加下注按鈕是否可用
     * @returns 
     */
    public getPlusEnabled(): boolean {
        return this.betIdx < this.gameData.coin_value.length - 1;
    }

    /**
     * 取得減下注按鈕是否可用
     * @returns 
     */
    public getLessEnabled(): boolean {
        return this.betIdx > 0;
    }

    /**
     * 取得贏錢倍數
     * @param value 
     * @returns 
     */
    public getWinMultipleByValue(value: number): number {
        // return Utils.accDiv(value, this.getCurBetXCurLine());
        return value / this.getBetTotal();
    }

    //================ 下注相關資料 ======================
}

