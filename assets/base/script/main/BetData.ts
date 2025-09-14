
/**
 * 下注相關資料
 */
export class BetData {

    /**下注倍率清單 */
    private rateList: number[];
    /**下注清單 */
    private betList: number[];
    /**基本押注清單 */
    private lineList: number[];

    private TotalArray: number[];

    /**Bet、Rate的組合 */
    public TotalArrayX: number[][];

    private rateIdx: number = 0;
    private betIdx: number = 0;
    private lineIdx: number = 0;

    /**外部只能透過改TotalIndex來控制其他index */
    private TotalIndex: number = 0;

    /**活動面額 */
    private promoRate: number = -1;
    private promoLevel: number = -1;

    private setTotalIndex(index: number): void {
        this.TotalIndex = index;

        //SetTotal可以順便設定betIdx、rateIdx, 但設rateIdx, betIdx時不可以被total強制設定
        this.betIdx = this.TotalArrayX[this.TotalIndex][0];
        this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    }

    public setTotalIndexByRateAndBet(rateIdx: number, betIdx: number): void {
        let value = this.betList[betIdx] * this.rateList[rateIdx] * this.lineList[0];
        this.setTotalIndex(this.TotalArray.indexOf(value));

        //SetTotal可以順便設定betIdx、rateIdx, 但設rateIdx, betIdx時不可以被total強制設定
        this.betIdx = betIdx;
        this.rateIdx = rateIdx;
    }

    public getTotalIndex(): number {
        return this.TotalIndex;
    }

    public getTotalIndexByRateAndBet(rateIdx: number, betIdx: number): number {
        let value = this.betList[betIdx] * this.rateList[rateIdx] * this.lineList[0];
        return this.TotalArray.indexOf(value);
    }

    public getRateIdx(): number {
        return this.rateIdx;
    }

    public getBetIdx(): number {
        return this.betIdx;
    }

    public getLineIdx(): number {
        return this.lineIdx;
    }

    public getRateLength(): number {
        return this.rateList.length;
    }

    public getBetLength(): number {
        return this.betList.length;
    }

    public getLineLength(): number {
        return this.lineList.length;
    }

    public getTotalLength(): number {
        return this.TotalArray.length;
    }


    public plus(): void {
        this.TotalIndex = Math.min(this.TotalIndex + 1, this.TotalArray.length - 1);
        this.betIdx = this.TotalArrayX[this.TotalIndex][0];
        this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    }

    public less(): void {
        this.TotalIndex = Math.max(this.TotalIndex - 1, 0);
        this.betIdx = this.TotalArrayX[this.TotalIndex][0];
        this.rateIdx = this.TotalArrayX[this.TotalIndex][1];
    }

    public getPlusEnabled(): boolean {
        return this.TotalIndex < this.TotalArray.length - 1;
    }

    public getLessEnabled(): boolean {
        return this.TotalIndex > 0;
    }

    public setup(rateList: number[], betList: number[], lineList: number[], rateIndex: number): void {
        this.rateList = rateList;
        this.betList = betList;
        this.lineList = lineList;
        this.rateIdx = rateIndex;
        this.TotalArray = [];
        this.TotalArrayX = [];

        for (let i = 0; i < this.betList.length; i++) {
            for (let j = 0; j < this.rateList.length; j++) {
                let total = this.betList[i] * this.rateList[j] * this.lineList[0];
                if (this.TotalArray.indexOf(total) == -1) {
                    this.TotalArray.push(total);
                    this.TotalArrayX.push([i, j]);
                }
            }
        }
        this.TotalArray.sort((a, b) => {
            return a - b;
        });
        this.TotalArrayX.sort((a, b) => {
            let betXRateA = this.getBetAt(a[0]) * this.getRateAt(a[1]);
            let betXRateB = this.getBetAt(b[0]) * this.getRateAt(b[1]);
            return betXRateA - betXRateB;
        });

        //用total反查TotalIndex
        let total = this.getCurRate() * this.getCurBet() * this.getCurLine();
        this.TotalIndex = this.TotalArray.indexOf(total);
    }

    /**
     * 目前總下注金額 = betSize x betLevel x baseCost
     * @returns 
     */
    public getCurTotal(): number {
        return this.getCurRate() * this.getCurBet() * this.getCurLine();

    }

    public getCurRateXCurBet(): number {
        return this.getCurRate() * this.getCurBet();
    }

    public getCurRateXCurLine(): number {
        return this.getCurRate() * this.getCurLine();
    }

    /**
     * SR回傳贏分不包含Rate, 所以計算倍數要以Bet x Line為基準, 最後顯示再乘上Rate
     * @returns 
     */
    public getCurBetXCurLine(): number {
        return this.getCurLine() * this.getCurBet();
    }

    public getCurRate(): number {
        if (this.promoRate != -1) {
            return this.promoRate;
        }
        else {
            return this.getRateAt(this.rateIdx);
        }
    }

    public getCurBet(): number {
        if (this.promoLevel != -1) {
            return this.promoLevel;
        }
        else {
            return this.getBetAt(this.betIdx);
        }
    }

    public getCurLine(): number {
        return this.getLineAt(this.lineIdx);
    }

    public getMaxRate(): number {
        return this.getRateAt(this.rateList.length - 1);
    }

    public getMaxBet(): number {
        return this.getBetAt(this.betList.length - 1);
    }

    public getMaxLine(): number {
        return this.getLineAt(this.lineList.length - 1);
    }

    public getMaxTotal(): number {
        return this.getMaxRate() * this.getMaxBet() * this.getMaxLine();
    }

    public getRateAt(idx: number): number {
        return this.rateList[idx];
    }

    public getBetAt(idx: number): number {
        return this.betList[idx];
    }

    public getLineAt(idx: number): number {
        return this.lineList[idx];
    }

    public getTotalAt(idx: number): number {
        return this.TotalArray[idx];
    }

    /**Bet、Rate的組合 */
    public getTotalXAt(idx: number): number[] {
        return this.TotalArrayX[idx];
    }

    /**
     * 設定活動面額
     * @param value 
     */
    public setPromoRate(value: number, level: number): void {
        this.promoRate = value;
        this.promoLevel = level;
    }
}

