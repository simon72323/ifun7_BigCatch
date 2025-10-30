// import { BannerUI } from '@game/components/BannerUI/BannerUI';
// import { FSUI } from '@game/components/FSUI/FSUI';
import { tween } from 'cc';

import { FreeGameUI } from '@game/components/FreeGameUI/FreeGameUI';
import { TransUI } from '@game/components/TransUI/TransUI';
import { GameAudioKey } from '@game/script/data/GameConst';

import { SettingsController } from '@common/components/settingsController/SettingsController';

import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
// import { TimeoutManager } from '@common/script/manager/TimeoutManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { ModuleID } from '@common/script/types/BaseType';


/**
 * 轉場
 */
export class TransTask extends GameTask {

    protected name: string = 'TransTask';

    /**轉場目標 */
    public toModuleID: ModuleID;

    /**免費遊戲次數 */
    public freeSpinTimes: number = 0;

    /**是否第一次轉場 */
    public isFirstTrans: boolean = true;

    private timer = {
        curTime: 0,
        finalTime: 10
    };

    execute(): void {
        //第一次進入轉場
        if (this.isFirstTrans) {
            DataManager.getInstance().curModuleID = this.toModuleID;
            //中免費轉停止Auto模式
            if (DataManager.getInstance().isAutoMode && DataManager.getInstance().autoSpinCount <= 0) {
                DataManager.getInstance().isAutoMode = false;
            }
            // AudioManager.getInstance().stopMusic(AudioKey.BsMusic);
            // AudioManager.getInstance().playMusic(AudioKey.FsMusic);
        }

        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_TRIGGER);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SHOWSCATTERWIN);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_TRANSLATE);

        //設定初始次數
        // FeatureGameUI.refreshRemainTimes.emit(this.times);

        //轉場開始
        SettingsController.updateFreeSpinCount.emit(this.freeSpinTimes);
        TransUI.show.emit(this.freeSpinTimes,
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
        //10秒自動進入
        // TimeoutManager.getInstance().register(BaseConst.TIMEOUT_FEATURE_WAIT_START.key, BaseConst.TIMEOUT_FEATURE_WAIT_START.seconds, () => {
        //     this.onTransEnd();
        // });
    }

    /**
     * 轉場結束
     */
    // private onTransEnd(): void {
    //     // TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_FEATURE_WAIT_START.key);
    //     this.finish();
    // }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}