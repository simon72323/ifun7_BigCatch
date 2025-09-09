import { TaskManager } from "./TaskManager";

/**
 * 遊戲任務
 */
export abstract class GameTask {

    protected name: string;

    public executed: boolean = false;

    public getName(): string {
        return this.name;
    }

    public baseExecute(): void {
        this.executed = true;
        this.execute();
    }

    /**執行 */
    abstract execute(): void;

    /**持續更新 */
    abstract update(deltaTime: number): void;

    protected finish(): void {
        TaskManager.getInstance().finishEvent.emit(this);
    }
}