import { FreeGameUI } from '@game/components/FreeGameUI/FreeGameUI';
import { TotalWinUI } from '@game/components/TotalWinUI/TotalWinUI';

import { SlotReelMachine } from '@common/components/slotMachine/SlotReelMachine';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { ModuleID } from '@common/script/types/BaseType';




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
                SlotReelMachine.backBSParser.emit(this.backBSParser);
                BaseEvent.changeScene.emit(ModuleID.BS);
                FreeGameUI.hide.emit();
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