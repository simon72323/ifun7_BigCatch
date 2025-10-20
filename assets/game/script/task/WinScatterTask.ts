import { ReelBlackUI } from '@game/components/ReelBlackUI/ReelBlackUI';
import { BlackKey, GameAudioKey } from '@game/script/data/GameConst';

import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { Utils } from '@common/script/utils/Utils';

/**
 * Scatter中獎
 */
export class WinScatterTask extends GameTask {
    protected name: string = 'WinScatterTask';
    /**中獎位置 */
    public winPos: number[];
    /**派彩金額 */
    public payCredit: number;

    public async execute(): Promise<void> {
        AudioManager.getInstance().playSound(GameAudioKey.st);
        ReelBlackUI.show.emit(); //壓黑
        SlotMachine.showSymbolWin.emit(this.winPos); //顯示中獎位置
        await Utils.delay(2);
        ReelBlackUI.hide.emit();
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}