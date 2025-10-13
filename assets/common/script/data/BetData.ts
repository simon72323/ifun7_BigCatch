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

    public getCoinValue(): number {
        return this.coinValue;
    }


    /**
     * 設置大贏倍率數據
     */
    // public setBigWinMultiple(bigWinMultiple: number[]): void {
    //     this._bigWinMultiple = bigWinMultiple;
    // }

    // /**下注倍率清單 */
    // private rateList: number[];
    // /**下注清單 */
    // private betList: number[];
    // /**基本押注清單 */
    // private lineList: number[];
    // /**總下注金額清單 */
    // private TotalArray: number[];
    // /**Bet、Rate的組合 */
    // public TotalArrayX: number[][];

    // private rateIdx: number = 0;//倍率索引
    // private betIdx: number = 0;//押注索引
    // private lineIdx: number = 0;//線數索引

    // /**外部只能透過改TotalIndex來控制其他index */
    // private TotalIndex: number = 0;

    // /**活動面額 */
    // private promoRate: number = -1;
    // private promoLevel: number = -1;



    //================ 下注相關資料 ======================

    /**
     * 獲取總下注金額
     * @returns 總下注金額(總線數 x 下注值 x 線注)
     */
    public getBetTotal(): number {
        return Utils.accMul(this.gameData.line_total, this.getCurBetXCurLine());
    }

    /**
     * 取得免費遊戲總購買金額(免費遊戲購買倍率 x 總下注)
     * @returns 
     */
    public getBuyFeatureTotal(): number {
        return Utils.accMul(this.gameData.buy_spin.multiplier, this.getBetTotal());
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
        // this.betIdx = gameInformation.gameData.coin_value[this.totalIndex];
        // this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    }

    /**
     * 減少下注
     */
    public less(): void {
        this.betIdx = Math.max(this.betIdx - 1, 0);
        // this.betIdx = this.TotalArrayX[this.TotalIndex][0];
        // this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
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
        return Utils.accDiv(value, this.getCurBetXCurLine());
    }

    /**
     * @returns 下注值 x 線注
     */
    public getCurBetXCurLine(): number {
        const lineBet = this.gameData.line_bet[this.lineIdx];
        return Utils.accMul(this.coinValue, lineBet);
    }

    /**
     * 獲取總線數
     * @returns 
     */
    public getLineTotal(): number {
        return this.gameData.line_total;
    }
    //================ 下注相關資料 ======================

    /**
     * 設定總下注金額索引
     * @param index 總下注金額索引
     */
    // private setTotalIndex(index: number): void {
    //     this.TotalIndex = index;
    //     //SetTotal可以順便設定betIdx、rateIdx, 但設rateIdx, betIdx時不可以被total強制設定
    //     this.betIdx = this.TotalArrayX[this.TotalIndex][0];
    //     this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    // }

    // /**
    //  * 設定總下注金額索引
    //  * @param rateIdx 倍率索引
    //  * @param betIdx 押注索引
    //  */
    // public setTotalIndexByRateAndBet(rateIdx: number, betIdx: number): void {
    //     let value = this.betList[betIdx] * this.rateList[rateIdx] * this.lineList[0];
    //     this.setTotalIndex(this.TotalArray.indexOf(value));

    //     //SetTotal可以順便設定betIdx、rateIdx, 但設rateIdx, betIdx時不可以被total強制設定
    //     this.betIdx = betIdx;
    //     this.rateIdx = rateIdx;
    // }

    /**
     * 獲取總下注金額索引
     * @returns 總下注金額索引
     */
    // public getTotalIndex(): number {
    //     return this.TotalIndex;
    // }

    // /**
    //  * 獲取總下注金額索引
    //  * @param rateIdx 倍率索引
    //  * @param betIdx 押注索引
    //  * @returns 總下注金額索引
    //  */
    // public getTotalIndexByRateAndBet(rateIdx: number, betIdx: number): number {
    //     let value = this.betList[betIdx] * this.rateList[rateIdx] * this.lineList[0];
    //     return this.TotalArray.indexOf(value);
    // }

    // /**
    //  * 獲取倍率索引
    //  * @returns 倍率索引
    //  */
    // public getRateIdx(): number {
    //     return this.rateIdx;
    // }

    // /**
    //  * 獲取押注索引
    //  * @returns 押注索引
    //  */
    // public getBetIdx(): number {
    //     return this.betIdx;
    // }

    // /**
    //  * 獲取線數索引
    //  * @returns 線數索引
    //  */
    // public getLineIdx(): number {
    //     return this.lineIdx;
    // }

    // /**
    //  * 獲取倍率長度
    //  * @returns 倍率長度
    //  */
    // public getRateLength(): number {
    //     return this.rateList.length;
    // }

    // /**
    //  * 獲取押注長度
    //  * @returns 押注長度
    //  */
    // public getBetLength(): number {
    //     return this.betList.length;
    // }

    // /**
    //  * 獲取線數長度
    //  * @returns 線數長度
    //  */
    // public getLineLength(): number {
    //     return this.lineList.length;
    // }

    // /**
    //  * 獲取總下注金額長度
    //  * @returns 總下注金額長度
    //  */
    // public getTotalLength(): number {
    //     return this.TotalArray.length;
    // }


    // /**
    //  * 增加總下注金額索引
    //  */
    // public plus(): void {
    //     this.TotalIndex = Math.min(this.TotalIndex + 1, this.TotalArray.length - 1);
    //     this.betIdx = this.TotalArrayX[this.TotalIndex][0];
    //     this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    // }

    // /**
    //  * 減少總下注金額索引
    //  */
    // public less(): void {
    //     this.TotalIndex = Math.max(this.TotalIndex - 1, 0);
    //     this.betIdx = this.TotalArrayX[this.TotalIndex][0];
    //     this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    // }

    // /**
    //  * 獲取增加總下注金額索引是否可用
    //  * @returns 增加總下注金額索引是否可用
    //  */
    // public getPlusEnabled(): boolean {
    //     return this.TotalIndex < this.TotalArray.length - 1;
    // }

    // /**
    //  * 獲取減少總下注金額索引是否可用
    //  * @returns 減少總下注金額索引是否可用
    //  */
    // public getLessEnabled(): boolean {
    //     return this.TotalIndex > 0;
    // }

    // /**
    //  * 設定倍率、押注、線數
    //  * @param rateList 倍率列表
    //  * @param betList 押注列表
    //  * @param lineList 線數列表
    //  * @param rateIndex 倍率索引
    //  */
    // public setup(rateList: number[], betList: number[], lineList: number[], rateIndex: number): void {
    //     this.rateList = rateList;
    //     this.betList = betList;
    //     this.lineList = lineList;
    //     this.rateIdx = rateIndex;
    //     this.TotalArray = [];
    //     this.TotalArrayX = [];

    //     for (let i = 0; i < this.betList.length; i++) {
    //         for (let j = 0; j < this.rateList.length; j++) {
    //             let total = this.betList[i] * this.rateList[j] * this.lineList[0];
    //             if (this.TotalArray.indexOf(total) == -1) {
    //                 this.TotalArray.push(total);
    //                 this.TotalArrayX.push([i, j]);
    //             }
    //         }
    //     }
    //     this.TotalArray.sort((a, b) => {
    //         return a - b;
    //     });
    //     this.TotalArrayX.sort((a, b) => {
    //         let betXRateA = this.getBetAt(a[0]) * this.getRateAt(a[1]);
    //         let betXRateB = this.getBetAt(b[0]) * this.getRateAt(b[1]);
    //         return betXRateA - betXRateB;
    //     });

    //     //用total反查TotalIndex
    //     let total = this.getCurRate() * this.getCurBet() * this.getCurLine();
    //     this.TotalIndex = this.TotalArray.indexOf(total);
    // }

    // /**
    //  * 目前總下注金額 = betSize x betLevel x baseCost
    //  * @returns 
    //  */
    // public getCurTotal(): number {
    //     return this.getCurRate() * this.getCurBet() * this.getCurLine();

    // }

    // /**
    //  * 目前總下注金額 = betSize x betLevel
    //  * @returns 
    //  */
    // public getCurRateXCurBet(): number {
    //     return this.getCurRate() * this.getCurBet();
    // }

    // /**
    //  * 目前總下注金額 = betSize x betLevel
    //  * @returns 
    //  */
    // public getCurRateXCurLine(): number {
    //     return this.getCurRate() * this.getCurLine();
    // }


    // public getCurRate(): number {
    //     if (this.promoRate != -1) {
    //         return this.promoRate;
    //     }
    //     else {
    //         return this.getRateAt(this.rateIdx);
    //     }
    // }

    // /**
    //  * 獲取當前押注
    //  * @returns 當前押注
    //  */
    // public getCurBet(): number {
    //     if (this.promoLevel != -1) {
    //         return this.promoLevel;
    //     }
    //     else {
    //         return this.getBetAt(this.betIdx);
    //     }
    // }

    // /**
    //  * 獲取當前線數
    //  * @returns 當前線數
    //  */
    // public getCurLine(): number {
    //     return this.getLineAt(this.lineIdx);
    // }

    // /**
    //  * 獲取最大倍率
    //  * @returns 最大倍率
    //  */
    // public getMaxRate(): number {
    //     return this.getRateAt(this.rateList.length - 1);
    // }

    // /**
    //  * 獲取最大押注
    //  * @returns 最大押注
    //  */
    // public getMaxBet(): number {
    //     return this.getBetAt(this.betList.length - 1);
    // }

    // /**
    //  * 獲取最大線數
    //  * @returns 最大線數
    //  */
    // public getMaxLine(): number {
    //     return this.getLineAt(this.lineList.length - 1);
    // }

    // /**
    //  * 獲取最大總下注金額
    //  * @returns 最大總下注金額
    //  */
    // public getMaxTotal(): number {
    //     return this.getMaxRate() * this.getMaxBet() * this.getMaxLine();
    // }

    // /**
    //  * 獲取倍率
    //  * @param idx 倍率索引
    //  * @returns 倍率
    //  */
    // public getRateAt(idx: number): number {
    //     return this.rateList[idx];
    // }

    // /**
    //  * 獲取押注
    //  * @param idx 押注索引
    //  * @returns 押注
    //  */
    // public getBetAt(idx: number): number {
    //     return this.betList[idx];
    // }

    // /**
    //  * 獲取線數
    //  * @param idx 線數索引
    //  * @returns 線數
    //  */
    // public getLineAt(idx: number): number {
    //     return this.lineList[idx];
    // }

    // /**
    //  * 獲取總下注金額
    //  * @param idx 總下注金額索引
    //  * @returns 總下注金額
    //  */
    // public getTotalAt(idx: number): number {
    //     return this.TotalArray[idx];
    // }

    // /**
    //  * 獲取Bet、Rate的組合
    //  * @param idx 組合索引
    //  * @returns Bet、Rate的組合
    //  */
    // public getTotalXAt(idx: number): number[] {
    //     return this.TotalArrayX[idx];
    // }

    // /**
    //  * 設定活動面額
    //  * @param value 
    //  */
    // public setPromoRate(value: number, level: number): void {
    //     this.promoRate = value;
    //     this.promoLevel = level;
    // }
}

