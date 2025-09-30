import { SettingsPage1 } from '@base/components/settingsPage/SettingsPage1';
import { DataManager } from '@common/script/data/DataManager';;
import { BaseEvent } from '@common/script/event/BaseEvent';
import { GameTask } from '@base/script/tasks/GameTask';
import { BigWinType, ModuleID, SpinButtonState } from '@base/script/types/BaseType';
import { XUtils } from '@base/script/utils/XUtils';

import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { BigWinUI } from '@game/components/BigWinUI/BigWinUI';
import { BSRoleUI } from '@game/components/characterUI/BSRoleUI';

/**
 * 一局結束
 */
export class EndGameTask extends GameTask {

    protected name: string = 'EndGameTask';

    /**單轉總贏分(尚未xRate) */
    public win: number = 0;

    /**剩餘額度 */
    public playerCent: number = 0;


    execute(): void {

        //如果是即將進入FS的最後一轉不顯示'共贏得', 因為贏分會帶到FS內
        if (DataManager.getInstance().isBS() === true && DataManager.getInstance().nextModuleID !== ModuleID.BS) {
            this.finish();
        }
        else {

            //BS單轉總分達到BigWin額外演示
            if (DataManager.getInstance().getBigWinTypeByValue(this.win) != BigWinType.non) {
                if (DataManager.getInstance().isBS() === true) {
                    BSRoleUI.back.emit(() => {
                        //角色演完再播BigWin
                        BigWinUI.complete.once(() => {
                            this.showTotalWin();
                        }, this);
                        BigWinUI.show.emit(this.win);
                    });
                }
                else {
                    BigWinUI.complete.once(() => {
                        this.showTotalWin();
                    }, this);
                    BigWinUI.show.emit(this.win);

                }
            }
            //一般獎項
            else if (this.win > 0) {
                if (DataManager.getInstance().isBS() === true) {
                    BSRoleUI.back.emit(null);
                }
                this.showTotalWin();

            }
            //沒中
            else {
                this.finish();
            }
        }
    }

    update(deltaTime: number): void {
        // throw 
        // new Error('Method not implemented.');
    }

    private showTotalWin(): void {
        SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);

        let rateWin = this.win * DataManager.getInstance().bet.getCurRate();
        let multiple: number = DataManager.getInstance().getWinMultipleByValue(this.win);
        BaseEvent.refreshCredit.emit(this.playerCent);

        //因為可能要跑分, 收到totalWinComplete才能完成任務
        BannerUI.totalWinComplete.once(() => {
            //TotalWin顯示1秒
            XUtils.scheduleOnce(() => {
                this.finish();
            }, 1, this);
        }, this);

        BannerUI.showTotalWin.emit(rateWin, multiple);
        // BaseEvent.refreshWin.emit(rateWin);
    }
}