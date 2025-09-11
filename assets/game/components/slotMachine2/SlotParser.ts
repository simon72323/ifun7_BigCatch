import { BaseDataManager } from "@/base/script/main/BaseDataManager";
import { GameConst, SymbolID } from "../../script/constant/GameConst";
import { GameData } from "../../script/main/GameData";
import { BaseSlotParser2 } from "./base/slotMachine2/BaseSlotData2";
import { BaseSymbolData2 } from "./base/slotMachine2/BaseSymbolData2";

/**
 * BSX5軸 遊戲客製化分析盤面
 */
export class SlotParser extends BaseSlotParser2 {

    public buyFS: boolean = false;

    private symbolPattern: number[];
    /**
     * 每一轉設定輪帶, 遇到scatter要隨機或依照最終盤面設定
     * @param stripTable 輪帶表，二維陣列，每個子陣列代表一軸的符號ID列表
     * @param rngList RNG隨機數列表，用於決定每軸的起始位置
     * @param symbolPattern 符號圖案，一維陣列，表示盤面上每個位置的符號ID
     * @param goldenPattern 金框圖案，一維陣列，表示盤面上每個位置是否為金框(1)或普通(0)
     */
    public setStripTable(stripTable: number[][], rngList: number[], symbolPattern: number[], goldenPattern: number[]): void {

        this.rngList = rngList;
        this.stripTable = stripTable;
        this.symbolPattern = symbolPattern;

        if (!goldenPattern) {
            return;
        }
        let stripDataList = BaseDataManager.getInstance().getData<GameData>().stripBadgeDataList;
        stripDataList.length = 0;

        let numRow = BaseDataManager.getInstance().getData().REEL_ROW;
        let numCol: number = stripTable.length;
        for (let col: number = 0; col < numCol; ++col) {
            let strip = stripTable[col];
            let valueList = [];
            let rng = this.rngList[col];
            for (let row: number = 0; row < numRow; ++row) {
                valueList[(rng - 1 + row + strip.length) % strip.length] = goldenPattern[row * numCol + col];
            }
            stripDataList.push(valueList);
        }

        //轉動隨機金框
        let goldenReel: number[] = BaseDataManager.getInstance().getData<GameData>().getGoldenReelRange();
        goldenReel.forEach((col) => {
            let strip = stripTable[col];
            strip.forEach((symbolID, rng) => {
                //盤面未設定 & 非scatter的圖示 => 隨機出現金框
                if (stripDataList[col][rng] === undefined && symbolID !== SymbolID.Scatter) {
                    stripDataList[col][rng] = Math.random() < GameConst.RANDOM_GOLDEN ? 1 : 0;
                }
            }, this);
        });
    }

    /**
     * 轉動瞇牌
     * @returns 
     */
    public getMiList(): boolean[] {
        let gameData = BaseDataManager.getInstance().getData<GameData>();

        let miList: boolean[] = [];
        let scatterCount: number = 0;
        for (let col: number = 0; col < gameData.REEL_COL; ++col) {
            miList.push(scatterCount >= 2);
            for (let row: number = 0; row < gameData.REEL_ROW; ++row) {
                let symbolID = this.symbolPattern[row * gameData.REEL_COL + col];
                if (symbolID === SymbolID.Scatter) {
                    scatterCount++;
                }
            }
        }

        return miList;
    }

    /**
     * 用上一盤盤面判斷掉落是否需要瞇牌
     * @param fromMap 
     * @returns 
     */
    public getMiList2(fromMap: BaseSymbolData2[][]): boolean[] {
        let gameData = BaseDataManager.getInstance().getData<GameData>();
        let miList: boolean[] = [];
        let scatterCount: number = 0;
        fromMap.forEach((symbolOfReel: BaseSymbolData2[], col) => {
            scatterCount += symbolOfReel.filter((symbolData: BaseSymbolData2) => symbolData.symbolID === SymbolID.Scatter).length;
        })

        if (scatterCount >= GameConst.BONUS_WIN_COUNT - 1) {
            miList = [];
            fromMap.forEach((symbolOfReel: BaseSymbolData2[], col) => {
                //該軸沒有sc就可以瞇牌
                miList.push(symbolOfReel.filter((symbolData: BaseSymbolData2) => symbolData.symbolID === SymbolID.Scatter).length == 0);
            });
        }
        else {
            miList = [false, false, false, false, false, false];
        }
        return miList;
    }
    public getNudgeTypeList(): number[] {
        return null;
    }

    public canSkip(): boolean {
        if (this.buyFS) {
            return true;
        }
        else {
            return this.getMiList().every((mi) => mi === false);
        }
    }
}