// import { FSUI } from '@game/components/FSUI/FSUI';

import { GameTask } from '@common/script/tasks/GameTask';


/**
 * 更新免費遊戲次數
 */
export class UpdateFreeTimesTask extends GameTask {

    protected name: string = 'UpdateFreeTimesTask';

    /**目標次數 */
    public times: number;

    execute(): void {

        //直接設定
        // FSUI.refreshRemainTimes.emit(this.times);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}