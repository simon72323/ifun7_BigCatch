import { FSUI } from '@game/components/FSUI/FSUI';

import { DataManager } from '@common/script/data/DataManager';
import { GameTask } from '@common/script/tasks/GameTask';



/**
 * 更新免費遊戲次數
 */
export class UpdateFreeTimesTask extends GameTask {

    protected name: string = 'UpdateFreeTimesTask';


    execute(): void {

        FSUI.refreshRemainTimes.emit(DataManager.getInstance().freeSpinTimes);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}