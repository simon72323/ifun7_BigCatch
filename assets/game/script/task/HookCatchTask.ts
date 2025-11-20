import { GameTask } from 'db://assets/common/script/tasks/GameTask';

import { AddSpinUI } from 'db://assets/game/components/HookCatchUI/AddSpinUI';
import { HookCatchUI } from 'db://assets/game/components/HookCatchUI/HookCatchUI';

/**
 * 釣靴事件任務
 */
export class HookCatchTask extends GameTask {
    protected name: string = 'HookCatchTask';

    execute(): void {
        HookCatchUI.catchBoot.emit(() => {
            AddSpinUI.show.emit( () => {
                this.finish();
            });
        });
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}