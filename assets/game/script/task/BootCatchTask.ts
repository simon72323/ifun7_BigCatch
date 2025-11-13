import { GameTask } from 'db://assets/common/script/tasks/GameTask';

import { AddSpinUI } from 'db://assets/game/components/BootCatchUI/AddSpinUI';
import { BootCatchUI } from 'db://assets/game/components/BootCatchUI/BootCatchUI';

/**
 * 釣靴事件任務
 */
export class BootCatchTask extends GameTask {
    protected name: string = 'BootCatchTask';

    execute(): void {
        BootCatchUI.show.emit(() => {
            AddSpinUI.show.emit( () => {
                this.finish();
            });
        });
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}