import { SlotMachine } from 'db://assets/common/components/slotMachine/SlotMachine';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';
import { ModuleID } from 'db://assets/common/script/types/BaseType';

import { FreeGameUI } from 'db://assets/game/components/FreeGameUI/FreeGameUI';
import { ReelBlackUI } from 'db://assets/game/components/ReelBlackUI/ReelBlackUI';
import { TotalWinUI } from 'db://assets/game/components/TotalWinUI/TotalWinUI';
import { SlotData } from 'db://assets/game/script/data/SlotData';
/**
 * FS總結算
 */
export class TotalWinTask extends GameTask {
    protected name: string = 'TotalWinTask';

    /**目前累計獲得金額 */
    public totalWin: number;
    /**返回BS盤面 */
    public backBSParser: number[][];
    /**總免費遊戲次數 */
    public totalFreeSpinTimes: number;

    execute(): void {
        TotalWinUI.show.emit(this.totalWin, this.totalFreeSpinTimes,
            //轉場全遮蔽
            () => {
                //回復BS盤面
                BaseEvent.stopLineLoop.emit();//停止中獎線輪播
                ReelBlackUI.hide.emit();//隱藏遮黑
                BaseEvent.changeScene.emit(ModuleID.BS);
                FreeGameUI.hide.emit();
                SlotData.fsWildMultiply = 1;//重置免費遊戲 wild倍率
                SlotMachine.backBSParser.emit(this.backBSParser);//回復BS盤面
            },
            //演示完畢
            () => {
                this.finish();
            });

    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}