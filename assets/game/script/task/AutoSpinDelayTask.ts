


import { GameConst } from '@game/script/data/GameConst';

import { DataManager } from '@common/script/data/DataManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { delay } from '@common/script/utils/Utils';


/**
 * 自動轉等待時間
 */
export class AutoSpinDelayTask extends GameTask {

    async execute(): Promise<void> {
        const dataManager = DataManager.getInstance();
        //自動轉 & 沒有skip 才延遲0.3秒
        if (dataManager.isAutoMode && !dataManager.slotData.hasSkip) {
            //延遲時間依照速度模式
            await delay(GameConst.SLOT_TIME[dataManager.curTurboMode].autoSpinTime);
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