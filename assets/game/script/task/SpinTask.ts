import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { IdleTask } from '@game/script/task/IdleTask';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { NetworkManager } from '@common/script/network/NetworkManager';

import { GameTask } from '@common/script/tasks/GameTask';
import { TaskManager } from '@common/script/tasks/TaskManager';

import { TurboMode } from '@common/script/types/BaseType';

/**
 * 共用開始轉動流程(成功送出Spin請求)
 */
export class SpinTask extends GameTask {

    protected name: string = 'BaseSpinTask';

    execute(): void {
        console.log('==========================================新局開始==========================================');

        const dataManager = DataManager.getInstance();
        AudioManager.getInstance().playSound(AudioKey.SpinLoop);

        //禁用所有設定相關按鈕
        BaseEvent.buyFeatureEnabled.emit(false);
        SettingsController.setEnabled.emit(false);
        // SettingsPage1.setSpinState.emit(SpinBtnState.Loop);


        //購買免費遊戲強制取消Turbo, 但不跳通知
        if (dataManager.isBuyFs) {
            dataManager.curTurboMode = TurboMode.Normal;
            // dataManager.tempTurboMode = TurboMode.Normal;
            BaseEvent.setTurboBtnState.emit(TurboMode.Normal);

            //購買免費遊戲強制取消Turbo, 但不跳通知
            // Notice.showMode.emit(DataManager.getInstance().TurboMode);
        }

        //取消自動轉
        if (dataManager.isAutoMode && dataManager.autoSpinCount <= 0) {
            dataManager.isAutoMode = false;
        }

        BannerUI.reset.emit();//還原跑馬燈狀態
        //考量到先轉型、後轉型, 所以音效要在spin監聽
        SlotMachine.spinComplete.once(() => {
            // AudioManager.getInstance().playSound(GameAudioKey.in);
        }, this);

        const isBS = dataManager.isBS();
        if (isBS) {
            //先轉型(免費遊戲直接給結果不轉動)
            // if (!DataManager.getInstance().isBuyFs && APIManager.getInstance().getSpinLate() === false) {
            //     SlotMachine.spin.emit();
            // }
        }

        //判斷要傳送一般spin還是免費spin(檢查一下免費遊戲按下時是否有變更成FS模式)
        let betCredit = isBS ? dataManager.bet.getBetTotal() : dataManager.bet.getBuyFeatureTotal();
        let spinID = isBS ? 0 : 1;

        //發送spin請求
        NetworkManager.getInstance().sendSpin(betCredit, spinID, (spinResult) => {
            dataManager.isBuyFs = false;//還原免費遊戲
            // DataManager.getInstance().featureBuyType = 0;
            AudioManager.getInstance().stopSound(AudioKey.SpinLoop);//收到結果就停止loop音效

            //判斷是否有spin成功回傳資料
            if (spinResult) {
                BaseEvent.onSpinResult.emit(spinResult);
            } else if (isBS) {
                TaskManager.getInstance().addTask(new IdleTask());//Spin失敗且是BS模式要回idle
            }
            this.finish();
        });
    }

    /**持續更新 */
    update(_deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}