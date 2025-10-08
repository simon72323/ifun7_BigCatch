import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { UIBlack } from '@game/components/UIBlack';
import { BlackKey, GameAudioKey, SlotMachineID, SymbolID } from '@game/script/data/GameConst';

import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { delay, Utils } from '@common/script/utils/Utils';



/**
 * Scatter中獎
 */
export class ScatterWinTask extends GameTask {

    protected name: string = 'ScatterWinTask';

    /**最終盤視覺盤面資料 */
    public symbolPattern: number[];

    public async execute(): Promise<void> {

        AudioManager.getInstance().playSound(GameAudioKey.st);

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

        SlotMachine2.showWin.emit(winPos);

        await delay(2);
        Utils.scheduleOnce(() => {
            UIBlack.hide.emit(BlackKey.UIBlack);
            this.finish();
        }, 2, this);
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}