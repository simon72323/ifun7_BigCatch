import { logger } from "../utils/XUtils";
import { XEvent1 } from "../utils/XEvent";
import { GameTask } from "./GameTask";

/**
 * 任務管理
 */
export class TaskManager {
    private static instance: TaskManager;
    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    /**任務完成事件 */
    public finishEvent: XEvent1<GameTask> = new XEvent1<GameTask>();

    /**目前待處理任務 */
    private tasks: GameTask[] = [];

    /**當前任務 */
    private curTask: GameTask;

    public constructor() {
        this.finishEvent.on(this.onFinishTask, this);
    }
    public addTask(task: GameTask) {
        this.tasks.push(task);
        if (!this.curTask) {
            //先儲存, 等update再執行, 確保執行順序
            this.curTask = this.tasks.shift();
        }
    }

    public update(deltaTime: number): void {
        if (this.curTask) {
            //第一次進入該任務才執行baseExecute
            if (this.curTask.executed === false) {
                logger("TaskManager 执行任務 " + this.curTask.getName());
                this.curTask.baseExecute();
            }
            else {
                this.curTask.update(deltaTime);
            }
        }
    }

    /**
     * 
     * @param task 
     */
    private onFinishTask(task: GameTask) {
        if (task != this.curTask) {
            logger('TaskManager 不是當前任務');
            return;
        }

        this.doNextTask();
    }
    /**
     * 換新任務
     */
    private doNextTask(): void {
        this.curTask = this.tasks.shift();
        if (!this.curTask) {
            logger('TaskManager 所有任務完成');
            return;
        }
        logger("TaskManager 执行任務 " + this.curTask.getName());
        this.curTask.baseExecute();
    }

}