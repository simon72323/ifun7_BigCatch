import { BaseEvent } from "db://assets/base/script/main/BaseEvent";
import { ModuleID } from "db://assets/base/script/types/BaseType";
import { GameTask } from "../../../base/script/tasks/GameTask";

/**
 * FS總結算
 */
export class FSSettleTask extends GameTask {

    protected name: string = "FSSettleTask";

    /**目前累計獲得金額 */
    public win: number;

    execute(): void {

        BaseEvent.changeScene.emit(ModuleID.BS);
        this.finish();
    }


    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}