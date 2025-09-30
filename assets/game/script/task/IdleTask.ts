import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { BaseConst } from '@common/script/data/BaseConst';
import { BaseIdleTask } from '@base/script/tasks/BaseIdleTask';
import { TaskManager } from '@base/script/tasks/TaskManager';
import { TimeoutManager } from '@base/script/utils/TimeoutManager';

import { SpinTask } from '@game/script/task/SpinTask';

/**
 * 待機
 */
export class IdleTask extends BaseIdleTask {

    private static firstIn: boolean = true;

    protected childExecute(): void {
        // let data = new CheatCodeData();
        // data.rngList = [[45, 84, 55, 76, 80, 40]];
        // data.rngList = [[78, 70, 55, 0, 79, 62]];
        // DataManager.getInstance().cheatCodeData = data;

        //待機過久淡出音樂
        TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_IDLE_MUTE.key);
        TimeoutManager.getInstance().register(BaseConst.TIMEOUT_IDLE_MUTE.key, BaseConst.TIMEOUT_IDLE_MUTE.seconds, () => {
            AudioManager.getInstance().edit(AudioKey.BsMusic, 0.5, 1);
        });

        if (IdleTask.firstIn) {
            IdleTask.firstIn = false;
            AudioManager.getInstance().play(AudioKey.BsMusic, 1);
        }

    }

    protected childFinish(): void {
        let task = new SpinTask();
        TaskManager.getInstance().addTask(task);
    }
}