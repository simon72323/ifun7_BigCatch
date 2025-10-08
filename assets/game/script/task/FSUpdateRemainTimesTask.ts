import { FSUI } from '@game/components/FSUI/FSUI';

import { GameTask } from '@common/script/tasks/GameTask';

/**
 * 更新剩餘次數 
 */
export class FSUpdateRemainTimesTask extends GameTask {

    protected name: string = 'FSUpdateRemainTimesTask';

    /**免費轉次數 */
    public fsRemainTimes: number;

    execute(): void {

        //主畫面
        FSUI.refreshRemainTimes.emit(this.fsRemainTimes);

        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}