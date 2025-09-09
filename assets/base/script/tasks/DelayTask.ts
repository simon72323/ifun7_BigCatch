import { GameTask } from "./GameTask";

/**
 * 等待任務
 */
export class DelayTask extends GameTask {

    protected name: string = "DelayTask";

    /**等待秒數 */
    public delaySeconds: number;

    constructor(delaySeconds: number) {
        super();
        this.delaySeconds = delaySeconds;
    }

    execute(): void {
        setTimeout(() => {
            this.finish();
        }, 1000 * this.delaySeconds);
    }
    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}