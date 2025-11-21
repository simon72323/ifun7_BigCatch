
import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { SlotMachine } from 'db://assets/common/components/slotMachine/SlotMachine';
import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { ISymbolInfo } from 'db://assets/common/script/network/NetworkApi';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';

import { ReelBlackUI } from 'db://assets/game/components/ReelBlackUI/ReelBlackUI';
import { GameConst, SymbolID } from 'db://assets/game/script/data/GameConst';
import { HookCatchUI } from 'db://assets/game/components/HookCatchUI/HookCatchUI';
import { Symbol } from 'db://assets/game/components/Symbol/Symbol';

/**
 * 老虎機停輪
 */
export class StopTask extends GameTask {
    protected name: string = 'StopTask';

    /**盤面停止符號(二維陣列) */
    public resultPattern: number[][];
    /**盤面停止符號(拷貝resultPattern) */
    private stopResultPattern: number[][];
    /**免費遊戲次數 */
    public freeSpinTimes: number;
    /**scatter資訊 */
    public scatterInfo: ISymbolInfo;
    private randomRngIndex: number = 0;

    execute(): void {
        ReelBlackUI.hide.emit();//隱藏壓黑
        BaseEvent.stopLineLoop.emit();//停止中獎線輪播
        this.stopResultPattern = this.resultPattern.map(row => [...row]);

        //是否表演釣scatter(40%機率)
        let isCatchScatter: boolean = false;
        /**如果購買免費遊戲可釣起scatter，則isBuyFg重置為false */
        if (GameConst.buyFgCatchScatter) {
            DataManager.getInstance().isBuyFg = false;//購買免費遊戲重置為false
        }

        if (this.scatterInfo && this.scatterInfo.amount >= 3 && !DataManager.getInstance().isBuyFg) {
            isCatchScatter = Math.random() < GameConst.catchScatterRate;
            if (isCatchScatter) {
                const randomRng = this.scatterInfo.amount - 2;
                this.randomRngIndex = 1 + Math.floor(Math.random() * randomRng);
                const changePos = this.scatterInfo.position[this.randomRngIndex];//要改變的scatter位置
                const reel1Pattern = this.resultPattern[0];//第一軸盤面
                const normalSymbolID: number[] = [1, 2, 3, 4, 15, 16, 17, 18, 19];//一般圖示ID
                // 過濾出不在 reel1Pattern 中的 normalSymbolID
                const availableSymbols = normalSymbolID.filter(id => !reel1Pattern.includes(id));
                const randomIndex = Math.floor(Math.random() * availableSymbols.length);
                const selectedSymbol = availableSymbols[randomIndex];
                //先替換該盤面的scatter為一般圖示
                this.stopResultPattern[changePos[0]][changePos[1]] = selectedSymbol;
            }
        }
        DataManager.getInstance().isBuyFg = false;//購買免費遊戲重置為false
        const mipieList = this.getMipieList();//獲取該次咪牌狀態
        SlotMachine.slotRun.emit(this.stopResultPattern, mipieList);//開始轉動盤面

        SettingsController.setEnabled.emit(false);//公版規定, 停盤後Spin按鈕禁用

        //監聽轉動結束
        SlotMachine.slotRunFinish.once(() => {
            if (isCatchScatter) {
                //如果表演釣scatter，則恢復該scatter圖示
                const changePos = this.scatterInfo.position[this.randomRngIndex];//要改變的scatter位置
                HookCatchUI.catchScatter.emit(changePos[0], changePos[1], () => {
                    const posID = changePos[0] * GameConst.REEL_ROW + changePos[1];
                    const scatterSymbolNode = SlotMachine.getSymbolList()[posID];
                    const scatterSymbol = scatterSymbolNode.getComponent('Symbol') as Symbol;
                    scatterSymbol.setSymbolID(SymbolID.Scatter);
                    this.finish();
                });
            } else {
                this.finish();
            }

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
                let symbolID = this.stopResultPattern[col][row];
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