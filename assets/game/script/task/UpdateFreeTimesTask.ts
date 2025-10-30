import { SettingsController } from '@common/components/settingsController/SettingsController';
import { DataManager } from '@common/script/data/DataManager';

import { GameTask } from '@common/script/tasks/GameTask';

/**
 * 更新免費遊戲次數
 */
export class UpdateFreeTimesTask extends GameTask {
    protected name: string = 'UpdateFreeTimesTask';
    public wildMultiplier: number = 0;
    public freeSpinTimes: number;

    async execute(): Promise<void> {
        if (this.wildMultiplier > 0) {
            DataManager.getInstance().slotData.fsWildMultiply = this.wildMultiplier;//變更免費遊戲 wild倍率
        }
        SettingsController.updateFreeSpinCount.emit(this.freeSpinTimes);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}