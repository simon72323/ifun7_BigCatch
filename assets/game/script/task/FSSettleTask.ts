import { FreeGameUI } from '@game/components/FreeGameUI/FreeGameUI';
import { ReelBlackUI } from '@game/components/ReelBlackUI/ReelBlackUI';
import { TotalWinUI } from '@game/components/TotalWinUI/TotalWinUI';


import { SlotMachine } from '@common/components/slotMachine/SlotMachine';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { ModuleID } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';



/**
 * FS總結算
 */
export class FSSettleTask extends GameTask {

    protected name: string = 'FSSettleTask';

    /**目前累計獲得金額 */
    public totalWin: number;
    /**返回BS盤面 */
    public backBSParser: number[][];

    /**總免費遊戲次數 */
    public totalFreeSpinTimes: number;

    execute(): void {

        // AudioManager.getInstance().stopMusic(AudioKey.FsMusic);

        TotalWinUI.show.emit(this.totalWin, this.totalFreeSpinTimes,
            //轉場全遮蔽
            () => {
                //回復BS盤面
                BaseEvent.stopLineLoop.emit();//停止中獎線輪播
                ReelBlackUI.hide.emit();//隱藏遮黑
                BaseEvent.changeScene.emit(ModuleID.BS);
                FreeGameUI.hide.emit();
                DataManager.getInstance().slotData.fsWildMultiply = 1;//重置免費遊戲 wild倍率
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