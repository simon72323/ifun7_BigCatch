import { GameConst, SymbolID } from '@game/script/data/GameConst';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotReelMachine } from '@common/components/slotMachine/SlotReelMachine';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@common/script/tasks/GameTask';


/**
 * 老虎機停輪
 */
export class StopTask extends GameTask {

    protected name: string = 'StopTask';

    /**盤面停止符號(二維陣列) */
    public resultPattern: number[][];
    /**輪帶索引 */
    // public rngList: number[];

    /**中線資料 */
    // public winLineData: IWinLineData[];
    /**scatter獲得資料 */
    // public winScatterData: IWinScatterData;

    /**是否中scatter免費遊戲 */
    // public isScatterWin: boolean = false;

    /**是否為最後一盤 */
    // public isLastPlane: boolean = false;


    execute(): void {
        // DataManager.getInstance().hasSkip = false;

        //預先設定此盤面是否中獎, 讓瞇牌結束可以決定要播什麼動作
        // BSRoleUI.scatterWin.emit(this.isScatterWin);

        //設定老虎機盤面停止符號
        // let slotParser = DataManager.getInstance().slotData.slotParser;
        // slotParser.slotPattern = this.resultPattern;
        const mipieList = this.getMipieList();//獲取該次咪牌狀態
        SlotReelMachine.slotRun.emit(this.resultPattern, mipieList);//開始轉動盤面

        SettingsController.setEnabled.emit(false);//公版規定, 停盤後Spin按鈕禁用

        console.log('開始監聽轉動結束');
        //監聽轉動結束
        SlotReelMachine.slotRunFinish.once(() => {
            // BaseEvent.clickSkip.off(this);
            this.finish();
        }, this);

        //監聽急停
        // BaseEvent.clickSkip.once(() => {
        //     // DataManager.getInstance().hasSkip = true;
        //     BaseEvent.clickSkip.off(this);
        //     // SlotReelMachine.slotSkip.emit();
        // }, this);
    }

    /**
     * 獲取該次咪牌狀態
     * @returns 
     */
    public getMipieList(): boolean[] {
        let mipieList: boolean[] = [];
        let scatterCount: number = 0;
        for (let col: number = 0; col < GameConst.REEL_COL; ++col) {
            mipieList.push(scatterCount >= GameConst.SCATTER_WIN_COUNT - 1);
            for (let row: number = 0; row < GameConst.REEL_ROW; ++row) {
                let symbolID = this.resultPattern[row][col];
                if (symbolID === SymbolID.Scatter) {
                    scatterCount++;
                }
            }
        }
        return mipieList;
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}