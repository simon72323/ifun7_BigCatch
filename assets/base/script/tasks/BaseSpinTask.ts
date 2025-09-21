import { InfoBar } from '@base/components/infoBar/InfoBar';
import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { AudioKey } from '@base/script/audio/AudioKey';
import { AudioManager } from '@base/script/audio/AudioManager';
import { BaseConst } from '@base/script/constant/BaseConst';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
// import { SocketManager } from '@base/script/socket/SocketManager';
import { GameTask } from '@base/script/tasks/GameTask';
import { AutoPlayMode, SpinButtonState, TurboMode } from '@base/script/types/BaseType';
import { TimeoutManager } from '@base/script/utils/TimeoutManager';
import { logger } from '@base/script/utils/XUtils';
/**
 * 共用開始轉動流程(成功送出Spin請求)
 */
export abstract class BaseSpinTask extends GameTask {

    protected name: string = 'BaseSpinTask';

    execute(): void {
        logger('==========================================新局開始==========================================');

        TimeoutManager.getInstance().remove(BaseConst.TIMEOUT_IDLE_MUTE.key);
        if (BaseDataManager.getInstance().isBS() == true) {
            //沒在播放的話才從頭淡入
            if (AudioManager.getInstance().isPlaying(AudioKey.BsMusic) === false) {
                //一秒淡入BS背景音樂
                AudioManager.getInstance().play(AudioKey.BsMusic, 1, 1);
            }
            //正在播放的話直接編輯音量
            else {
                AudioManager.getInstance().edit(AudioKey.BsMusic, 1);
            }
        }

        InfoBar.setEnabled.emit(false);

        BaseEvent.buyFeatureEnabled.emit(false);

        SettingsPage1.setSpinState.emit(SpinButtonState.Loop);
        AudioManager.getInstance().play(AudioKey.SpinLoop);


        SettingsPage1.setEnabled.emit(false);
        SettingsPage1.lessEnabled.emit(false);
        SettingsPage1.plusEnabled.emit(false);


        //購買幸運一擊強制取消Turbo, 但不跳通知
        if (BaseDataManager.getInstance().buyFs == true && BaseDataManager.getInstance().isTurboOn() == true) {
            BaseDataManager.getInstance().setTurboMode(TurboMode.Normal);
            BaseDataManager.getInstance().tempTurboMode = TurboMode.Normal;
            SettingsPage1.setTurbo.emit(TurboMode.Normal);

            //購買幸運一擊強制取消Turbo, 但不跳通知
            // Notice.showMode.emit(BaseDataManager.getInstance().TurboMode);
        }

        if (BaseDataManager.getInstance().auto.isAutoPlay() == true &&
            BaseDataManager.getInstance().auto.mode == AutoPlayMode.num &&
            BaseDataManager.getInstance().auto.num <= 0) {
            BaseDataManager.getInstance().auto.stopAuto();
        }

        //監聽spin是否成功,
        BaseEvent.spinResult.once((success) => {

            //還原幸運一擊
            BaseDataManager.getInstance().buyFs = false;
            BaseDataManager.getInstance().featureBuyType = 0;

            //收到結果就停止loop音效
            AudioManager.getInstance().stop(AudioKey.SpinLoop);

            //失敗要回idle
            if (!success) {
                this.childSpinFailed();
            }

            this.finish();
        }, this);
        if (BaseDataManager.getInstance().isBS() === true) {
            // BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SPIN);
            // SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eResultCall);
        }
        else {
            // BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SPIN);
            // SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eResultCall);
        }

        this.childExecute();


    }

    update(_deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }

    protected childExecute(): void {
        //由子類別覆寫, 處理閒置狀態額外需要的動作
    }

    /**子類別實現Spin失敗 */
    abstract childSpinFailed(): void;

}