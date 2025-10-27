// import { FSUI } from '@game/components/FSUI/FSUI';
import { SettingsController } from '@common/components/settingsController/SettingsController';
import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';

// import { DataManager } from '@common/script/data/DataManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { Utils } from '@common/script/utils/Utils';


/**
 * 更新免費遊戲次數
 */
export class UpdateFreeTimesTask extends GameTask {
    protected name: string = 'UpdateFreeTimesTask';

    public freeSpinTimes: number;

    async execute(): Promise<void> {
        SettingsController.updateFreeSpinCount.emit(this.freeSpinTimes);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}