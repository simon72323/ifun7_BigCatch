import { ReelBlackUI } from '@game/components/ReelBlackUI/ReelBlackUI';
import { AudioKey } from '@game/script/data/AudioKey';

import { SlotMachine } from '@common/components/slotMachine/SlotMachine';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
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
        AudioManager.getInstance().playSound(AudioKey.scatterWin);
        ReelBlackUI.show.emit(); //壓黑
        SlotMachine.showSymbolWin.emit(this.winPos); //顯示中獎位置

        //如果設定停止直到免費轉，則停止自動遊戲
        if (DataManager.getInstance().isStopUntilFeature) {
            BaseEvent.stopAutoSpin.emit();//停止自動遊戲
        }

        await Utils.delay(2);
        ReelBlackUI.hide.emit();
        this.finish();
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}