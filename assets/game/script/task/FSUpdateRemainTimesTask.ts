import { GameTask } from "@/base/script/tasks/GameTask";
import { FSUI } from "../../components/FSUI/FSUI";


/**
 * 更新剩餘次數 
 */
export class FSUpdateRemainTimesTask extends GameTask {

    protected name: string = "FSUpdateRemainTimesTask";

    /**免費轉次數 */
    public fsRemainTimes: number;

    execute(): void {

        //主畫面
        FSUI.refreshRemainTimes.emit(this.fsRemainTimes);

        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}