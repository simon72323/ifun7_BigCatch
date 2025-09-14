import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { GameTask } from '@base/script/tasks/GameTask';
import { XUtils } from '@base/script/utils/XUtils';

import { GameData } from '@game/script/main/GameData';

/**
 * 自動轉等待時間
 */
export class AutoSpinDelayTask extends GameTask {

    execute(): void {

        //自動轉 & 沒有skip 才延遲0.3秒
        if (BaseDataManager.getInstance().auto.isAutoPlay() == true &&
            BaseDataManager.getInstance().getData<GameData>().hasSkip === false) {
            //延遲時間依照速度模式
            let delay = BaseDataManager.getInstance().getData<GameData>().getTurboSetting().autoSpinRoundDelay;
            XUtils.scheduleOnce(() => {
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