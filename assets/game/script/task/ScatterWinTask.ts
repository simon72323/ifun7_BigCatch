import { UIBlack } from '@game/components/UIBlack';
import { BlackKey, GameAudioKey } from '@game/script/data/GameConst';

import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { delay } from '@common/script/utils/Utils';

/**
 * Scatter中獎
 */
export class ScatterWinTask extends GameTask {
    protected name: string = 'ScatterWinTask';
    /**中獎位置 */
    public winPos: number[];
    /**派彩金額 */
    public payCredit: number;

    public async execute(): Promise<void> {
        AudioManager.getInstance().playSound(GameAudioKey.st);
        UIBlack.show.emit(BlackKey.UIBlack); //壓黑
        SlotMachine.showSymbolWin.emit(this.winPos); //顯示中獎位置
        await delay(2);
        UIBlack.hide.emit(BlackKey.UIBlack);
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}