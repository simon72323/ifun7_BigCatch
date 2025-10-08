


import { GameConst } from '@game/script/data/GameConst';

import { DataManager } from '@common/script/data/DataManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { Utils } from '@common/script/utils/Utils';


/**
 * 自動轉等待時間
 */
export class AutoSpinDelayTask extends GameTask {

    execute(): void {

        //自動轉 & 沒有skip 才延遲0.3秒
        if (DataManager.getInstance().isAutoMode == true &&
            DataManager.getInstance().slotData.hasSkip === false) {
            //延遲時間依照速度模式
            let delay = GameConst.SLOT_TIME[DataManager.getInstance().curTurboMode].autoSpinTime;
            Utils.scheduleOnce(() => {
                this.finish();
            }, delay, this);
        }
        else {
            this.finish();
        }
    }

    update(deltaTime: number): void {
        //
    }
}