import { AudioManager } from "@/base/script/audio/AudioManager";
import { GameTask } from "@/base/script/tasks/GameTask";
import { XUtils } from "@/base/script/utils/XUtils";
import { SlotMachine2 } from "../../components/slotMachine2/base/slotMachine2/SlotMachine2";
import { UIBlack } from "../../components/UIBlack";
import { BlackKey, GameAudioKey, SlotMachineID, SymbolID } from "../constant/GameConst";
/**
 * Scatter中獎
 */
export class ScatterWinTask extends GameTask {

    protected name: string = "ScatterWinTask";

    /**最終盤視覺盤面資料 */
    public symbolPattern: number[];

    public execute(): void {

        AudioManager.getInstance().play(GameAudioKey.st);

        let winPos: number[] = [];

        //整理出中獎位置
        this.symbolPattern.forEach((symbolID, mapIdx) => {
            if (symbolID === SymbolID.Scatter) {
                let row = mapIdx % 6;
                let col = Math.floor(mapIdx / 6);
                winPos.push(row * 10 + col + 1);
            }
        }, this);

        //壓黑
        UIBlack.show.emit(BlackKey.UIBlack);

        SlotMachine2.showWin.emit(SlotMachineID.BS, winPos);
        XUtils.scheduleOnce(() => {
            UIBlack.hide.emit(BlackKey.UIBlack);
            this.finish();
        }, 2, this);
    }

    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}