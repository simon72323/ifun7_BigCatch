import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';
import { ModuleID } from 'db://assets/common/script/types/BaseType';

import { FeatureBuyBtn } from 'db://assets/game/components/FeatureBuyUI/FeatureBuyBtn';
import { FreeGameUI } from 'db://assets/game/components/FreeGameUI/FreeGameUI';
import { AudioKey } from 'db://assets/game/script/data/AudioKey';
import { TransUI } from 'db://assets/game/components/TransUI/TransUI';

/**
 * 轉場
 */
export class TransTask extends GameTask {
    protected name: string = 'TransTask';
    /**免費遊戲次數 */
    public freeSpinTimes: number = 0;
    /**是否第一次轉場 */
    public isFirstTrans: boolean = true;
    /**wild倍率 */
    public wildMultiplier: number = 0;

    execute(): void {
        //第一次進入轉場
        if (this.isFirstTrans) {
            DataManager.getInstance().curModuleID = ModuleID.FG;
            AudioManager.getInstance().playMusic(AudioKey.bgmFg);
            FeatureBuyBtn.hide.emit();
            //中免費轉停止Auto模式
            if (DataManager.getInstance().isAutoMode && DataManager.getInstance().autoSpinCount === 0) {
                DataManager.getInstance().isAutoMode = false;
            }
        }

        //轉場開始
        SettingsController.updateFreeSpinCount.emit(this.freeSpinTimes);
        TransUI.show.emit(this.freeSpinTimes, this.wildMultiplier,
            () => {
                //轉場全遮(更換場景資源)
                if (this.isFirstTrans) {
                    BaseEvent.changeScene.emit(ModuleID.FG);
                    FreeGameUI.show.emit();//顯示免費遊戲UI
                }
            },
            () => {
                this.finish();
            });
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}