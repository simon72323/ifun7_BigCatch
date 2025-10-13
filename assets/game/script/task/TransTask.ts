// import { BannerUI } from '@game/components/BannerUI/BannerUI';
// import { FSUI } from '@game/components/FSUI/FSUI';
import { TransUI } from '@game/components/TransUI/TransUI';
import { GameAudioKey } from '@game/script/data/GameConst';

import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { TimeoutManager } from '@common/script/manager/TimeoutManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { ModuleID } from '@common/script/types/BaseType';


/**
 * 轉場
 */
export class TransTask extends GameTask {

    protected name: string = 'TransTask';

    /**轉場目標 */
    public toModuleID: ModuleID;

    /**次數 */
    public times: number;

    execute(): void {

        DataManager.getInstance().moduleID = this.toModuleID;

        //中免費轉停止
        if (DataManager.getInstance().isAutoMode && DataManager.getInstance().autoSpinCount <= 0) {
            DataManager.getInstance().isAutoMode = false;
        }

        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_TRIGGER);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SHOWSCATTERWIN);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_TRANSLATE);

        //設定初始次數
        // FeatureGameUI.refreshRemainTimes.emit(this.times);

        AudioManager.getInstance().stopMusic(AudioKey.BsMusic);

        //轉場開始
        TransUI.fadeIn.emit(this.times,
            () => {
                //轉場全遮(更換場景資源)
                BaseEvent.changeScene.emit(ModuleID.FG);

                //還原廣告狀態
                // BannerUI.reset.emit();

                // FSUI.refreshRemainTimes.emit(this.times);
                // RevolverUI.setMultiplier.emit(GameConst.FS_INIT_MULTIPLIER);


                //初始化盤面
                // let gameData = DataManager.getInstance().gameData;
                // gameData.slotParser.setStripTable(DataManager.getInstance().getStripTable()._strips, gameData.fsInitRng, null, gameData.fsInitGoldenPattern);
                // SlotMachine.setup.emit(0, gameData.slotParser);

            },
            () => {
                //點擊轉場按鈕
                TransUI.click.once(() => {
                    this.onTransEnd();
                }, this);
                //10秒自動進入
                TimeoutManager.getInstance().register(BaseConst.TIMEOUT_FEATURE_WAIT_START.key, BaseConst.TIMEOUT_FEATURE_WAIT_START.seconds, () => {
                    this.onTransEnd();
                });
            });
    }

    /**
     * 
     */
    private onTransEnd(): void {
        AudioManager.getInstance().playSound(GameAudioKey.FgStart);
        AudioManager.getInstance().playMusic(AudioKey.FsMusic);

        TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_FEATURE_WAIT_START.key);
        TransUI.click.off(this);
        //轉場結束
        TransUI.fadeOut.emit(() => {
            this.finish();
        });
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}