

import { BaseConst } from '@common/script/data/BaseConst';

import { DataManager } from '@common/script/data/DataManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { Utils } from '@common/script/utils/Utils';


/**
 * 自動轉等待時間
 */
export class AutoSpinDelayTask extends GameTask {
    protected name: string = 'AutoSpinDelayTask';

    async execute(): Promise<void> {
        const dataManager = DataManager.getInstance();
        //自動轉 & 沒有skip 才延遲0.3秒
        if (dataManager.isAutoMode && !dataManager.slotData.hasSkip) {
            //延遲時間依照速度模式
            await Utils.delay(BaseConst.SLOT_TIME[dataManager.curTurboMode].waitNextSpinTime);
            this.finish();
        }
        else {
            this.finish();
        }
    }

    update(deltaTime: number): void {
        //
    }
}