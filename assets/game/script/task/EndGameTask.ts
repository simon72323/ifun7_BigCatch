
import { BannerUI } from '@game/components/BannerUI/BannerUI';
import { BigWinUI } from '@game/components/BigWinUI/BigWinUI';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { DataManager } from '@common/script/data/DataManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { BigWinType, ModuleID } from '@common/script/types/BaseType';
import { delay } from '@common/script/utils/Utils';

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
            if (DataManager.getInstance().getBigWinTypeByValue(this.win) !== BigWinType.non) {
                if (DataManager.getInstance().isBS() === true) {
                    BigWinUI.complete.once(() => {
                        this.showTotalWin();
                    }, this);
                    BigWinUI.show.emit(this.win);
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

    /**顯示總贏分 */
    private async showTotalWin(): Promise<void> {
        let rateWin = this.win * DataManager.getInstance().bet.getLineTotal();
        let multiple: number = DataManager.getInstance().bet.getWinMultipleByValue(this.win);
        SettingsController.refreshCredit.emit(this.playerCent);

        //因為可能要跑分, 收到totalWinComplete才能完成任務
        BannerUI.totalWinComplete.once(async () => {
            await delay(1);//TotalWin顯示1秒
            this.finish();
        }, this);

        BannerUI.showTotalWin.emit(rateWin, multiple);
        SettingsController.refreshWin.emit(rateWin);
    }
}