import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { GameTask } from '@base/script/tasks/GameTask';
import { XUtils } from '@base/script/utils/XUtils';

import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { FSUI } from '@game/components/FSUI/FSUI';
import { GameConst } from '@game/script/constant/GameConst';

/**
 * 增加次數
 */
export class RetriggerTask extends GameTask {

    protected name: string = 'RetriggerTask';

    /**當前剩餘次數 */
    public from: number;

    /**目標次數 */
    public to: number;

    execute(): void {

        AudioManager.getInstance().play(AudioKey.Retrigger);

        //直接設定
        if (this.from === -1 || this.from === this.to) {
            FSUI.refreshRemainTimes.emit(this.to);
            this.finish();
        }
        //增加轉數
        else if (this.from !== this.to) {
            let round: number = this.to - this.from;
            let repeat: number = round - 1;//schedule內會自動+1, 所以次數要-1
            BannerUI.retrigger.emit(round);
            FSUI.refreshRemainTimes.emit(this.from);
            XUtils.schedule(() => {
                FSUI.refreshRemainTimes.emit(++this.from);
            }, this, GameConst.BONUS_TIME_ADD_INTERVAL, repeat);

            XUtils.scheduleOnce(() => {
                this.finish();
            }, GameConst.BONUS_TIME_ADD_INTERVAL * (round + 1), this);
        }
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}