import { GameStage } from '@game/components/stage/GameStage';

import { GameTask } from '@common/script/tasks/GameTask';
import { ModuleID } from '@common/script/types/BaseType';

/**
 * FS開場
 */
export class FSOpeningTask extends GameTask {

    protected name: string = 'FSOpeningTask';

    /**轉場目標 */
    public to: ModuleID;

    /**次數 */
    public times: number;

    execute(): void {
        GameStage.shake.emit();
        GameStage.fsOpening.emit();
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}