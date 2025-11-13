
import { Notice } from 'db://assets/common/components/notice/Notice';
import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { GameTask } from 'db://assets/common/script/tasks/GameTask';
import { TaskManager } from 'db://assets/common/script/tasks/TaskManager';
import { ModuleID } from 'db://assets/common/script/types/BaseType';

import { SpinTask } from 'db://assets/game/script/task/SpinTask';
/**
 * 待機
 */
export class IdleTask extends GameTask {
    protected name: string = 'IdleTask';
    execute(): void {
        DataManager.getInstance().curModuleID = ModuleID.BS;

        if (DataManager.getInstance().isAutoMode) {
            if (DataManager.getInstance().isAutoTimes && DataManager.getInstance().autoSpinCount > 0) {
                DataManager.getInstance().autoSpinCount -= 1;
                SettingsController.updateAutoSpinCount.emit();
            }
            this.onSpin(false);
        }
        // 待機狀態
        else {
            this.idleState();
        }
    }

    /**
     * 待機狀態
     */
    private idleState(): void {
        BaseEvent.resetSpin.emit();//重置Spin按鈕
        BaseEvent.buyFeatureEnabled.emit(true);//啟用購買功能
        SettingsController.refreshBet.emit(DataManager.getInstance().bet.getBetTotal());//刷新下注

        BaseEvent.clickSpin.on(this.onSpin, this);

        //購買功能
        BaseEvent.buyFeature.on(() => {
            SettingsController.clickSpin.emit(true);//透過點擊Spin按鈕(購買免費遊戲)
        }, this);
    }

    /**
     * 執行Spin
     * @param buyFs 是否購買免費遊
     */
    private onSpin(buyFs: boolean = false): void {
        let betCredit = buyFs ? DataManager.getInstance().bet.getBuyFeatureTotal()
            : DataManager.getInstance().bet.getBetTotal();

        SettingsController.refreshWin.emit(0, 0);//刷新贏分=0

        if (DataManager.getInstance().userCredit < betCredit) {
            // 餘額不足
            SettingsController.refreshCredit.emit(DataManager.getInstance().userCredit);
            Notice.showError.emit(220);
            this.idleState();
        }
        else {
            // 成功SPIN
            BaseEvent.clickSpin.off(this);
            BaseEvent.buyFeature.off(this);

            const spinTask = new SpinTask();
            spinTask.isBuyFs = buyFs;
            spinTask.betCredit = betCredit;
            TaskManager.getInstance().addTask(spinTask);

            this.finish();
        }
    }

    public update(_deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}