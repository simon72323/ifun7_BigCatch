
import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { SlotMachine } from 'db://assets/common/components/slotMachine/SlotMachine';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';

import { ReelBlackUI } from 'db://assets/game/components/ReelBlackUI/ReelBlackUI';
import { GameConst, SymbolID } from 'db://assets/game/script/data/GameConst';

/**
 * 老虎機停輪
 */
export class StopTask extends GameTask {
    protected name: string = 'StopTask';

    /**盤面停止符號(二維陣列) */
    public resultPattern: number[][];
    /**免費遊戲次數 */
    public freeSpinTimes: number;

    execute(): void {
        ReelBlackUI.hide.emit();//隱藏壓黑
        BaseEvent.stopLineLoop.emit();//停止中獎線輪播

        const mipieList = this.getMipieList();//獲取該次咪牌狀態
        SlotMachine.slotRun.emit(this.resultPattern, mipieList);//開始轉動盤面

        SettingsController.setEnabled.emit(false);//公版規定, 停盤後Spin按鈕禁用

        //監聽轉動結束
        SlotMachine.slotRunFinish.once(() => {
            this.finish();
        }, this);
    }

    /**
     * 獲取該次咪牌狀態
     * @returns 
     */
    public getMipieList(): boolean[] {
        let mipieList: boolean[] = [];
        let scatterCount: number = 0;
        for (let col: number = 0; col < GameConst.REEL_COL; col++) {
            mipieList.push(scatterCount >= GameConst.SCATTER_WIN_COUNT - 1);
            for (let row: number = 0; row < GameConst.REEL_ROW; row++) {
                let symbolID = this.resultPattern[col][row];
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