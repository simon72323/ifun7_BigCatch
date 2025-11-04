
import { AddSpinUI } from '@game/components/BootCatchUI/AddSpinUI';
import { BootCatchUI } from '@game/components/BootCatchUI/BootCatchUI';

import { GameTask } from '@common/script/tasks/GameTask';


/**
 * 釣靴事件任務
 */
export class BootCatchTask extends GameTask {
    protected name: string = 'BootCatchTask';

    async execute(): Promise<void> {
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