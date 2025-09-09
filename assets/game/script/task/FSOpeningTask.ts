import { GameTask } from "@/base/script/tasks/GameTask";
import { ModuleID } from "@/base/script/types/BaseType";
import { FSRoleUI } from "@/game/components/characterUI/FSRoleUI";
import { RevolverUI } from "@/game/components/RevolverUI/RevolverUI";
import { Stage } from "@/game/components/stage/Stage";
import { GameConst } from "@/game/script/constant/GameConst";

/**
 * FS開場
 */
export class FSOpeningTask extends GameTask {

    protected name: string = "FSOpeningTask";

    /**轉場目標 */
    public to: ModuleID;

    /**次數 */
    public times: number;

    execute(): void {

        Stage.shake.emit();

        FSRoleUI.prepare.emit();

        RevolverUI.fsOpening.emit(GameConst.FS_INIT_MULTIPLIER, () => {
            Stage.fsOpening.emit();
            this.finish();
        });

    }
    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}