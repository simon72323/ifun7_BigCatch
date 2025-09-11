import { AudioKey } from "db://assets/base/script/audio/AudioKey";
import { AudioManager } from "db://assets/base/script/audio/AudioManager";
import { BaseConst } from "db://assets/base/script/constant/BaseConst";
import { BaseIdleTask } from "db://assets/base/script/tasks/BaseIdleTask";
import { TimeoutManager } from "db://assets/base/script/utils/TimeoutManager";
import { TaskManager } from "../../../base/script/tasks/TaskManager";
import { SpinTask } from "./SpinTask";

/**
 * 待機
 */
export class IdleTask extends BaseIdleTask {

    private static firstIn: boolean = true;

    protected childExecute(): void {
        // let data = new CheatCodeData();
        // data.rngList = [[45, 84, 55, 76, 80, 40]];
        // data.rngList = [[78, 70, 55, 0, 79, 62]];
        // BaseDataManager.getInstance().cheatCodeData = data;

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