import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { AutoPlayMode, ModuleID } from '@base/script/types/BaseType';
import { TimeoutManager } from '@base/script/utils/TimeoutManager';

import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { FSRoleUI } from '@game/components/characterUI/FSRoleUI';
import { FSUI } from '@game/components/FSUI/FSUI';
import { RevolverUI } from '@game/components/RevolverUI/RevolverUI';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { TransUI } from '@game/components/TransUI/TransUI';
import { GameAudioKey, GameConst } from '@game/script/constant/GameConst';
import { GameData } from '@game/script/main/GameData';

/**
 * 轉場
 */
export class TransTask extends GameTask {

    protected name: string = 'TransTask';

    /**轉場目標 */
    public to: ModuleID;

    /**次數 */
    public times: number;

    execute(): void {

        DataManager.getInstance().curModuleID = DataManager.getInstance().nextModuleID;

        //中免費轉停止
        if (DataManager.getInstance().auto.isAutoPlay() === true && DataManager.getInstance().auto.mode === AutoPlayMode.tillBonus) {
            DataManager.getInstance().auto.stopAuto();
        }

        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_TRIGGER);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SHOWSCATTERWIN);
        // DataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_TRANSLATE);

        //設定初始次數
        // FeatureGameUI.refreshRemainTimes.emit(this.times);

        AudioManager.getInstance().stop(AudioKey.BsMusic);

        //轉場開始
        TransUI.fadeIn.emit(this.times,
            () => {
                //轉場全遮(更換場景資源)
                BaseEvent.changeScene.emit(ModuleID.FS);

                //還原廣告狀態
                BannerUI.reset.emit();

                FSUI.refreshRemainTimes.emit(this.times);
                // RevolverUI.setMultiplier.emit(GameConst.FS_INIT_MULTIPLIER);

                //FS強制改回倍數1
                RevolverUI.reset.emit(ModuleID.BS, GameConst.multiplierList[0]);

                //初始化盤面
                let gameData = DataManager.getInstance().getData<GameData>();
                gameData.slotParser.setStripTable(DataManager.getInstance().getStripTable()._strips, gameData.fsInitRng, null, gameData.fsInitGoldenPattern);
                SlotMachine2.setup.emit(0, gameData.slotParser);
                FSRoleUI.idle.emit();

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
        AudioManager.getInstance().play(GameAudioKey.FgStart);
        AudioManager.getInstance().play(AudioKey.FsMusic);

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