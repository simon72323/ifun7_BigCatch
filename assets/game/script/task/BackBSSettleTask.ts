import { SettingsPage1 } from "db://assets/base/components/settingsPage/SettingsPage1";
import { AudioKey } from "db://assets/base/script/audio/AudioKey";
import { AudioManager } from "db://assets/base/script/audio/AudioManager";
import { BaseDataManager } from "db://assets/base/script/main/BaseDataManager";
import { XUtils } from "db://assets/base/script/utils/XUtils";
import { BaseEvent } from "../../../base/script/main/BaseEvent";
import { GameTask } from "../../../base/script/tasks/GameTask";
import { BigWinType, SpinButtonState } from "../../../base/script/types/BaseType";
import { BannerUI } from "../../components/BannerUI/BannerUI";
import { BigWinUI } from "../../components/BigWinUI/BigWinUI";
import { SlotMachine2 } from "../../components/slotMachine2/base/slotMachine2/SlotMachine2";
import { SlotMachineID } from "../constant/GameConst";
import { GameData } from "../main/GameData";

/**
 * FS返回NG總結算(先BigWin再橫幅)
 */
export class BackBSSettleTask extends GameTask {

    protected name: string = "BackBSSettleTask";

    /**目前累計獲得金額(右下角Win) */
    public sumWin: number;

    /**剩餘額度 */
    public playerCent: number;

    execute(): void {

        AudioManager.getInstance().stop(AudioKey.FsMusic);
        AudioManager.getInstance().play(AudioKey.BsMusic);

        //回復盤面
        SlotMachine2.change.emit(SlotMachineID.BS, BaseDataManager.getInstance().getData<GameData>().bsLastMap);
        // UIController
        SettingsPage1.setSpinState.emit(SpinButtonState.Disabled);

        //達到BigWin額外演示
        if (BaseDataManager.getInstance().getBigWinTypeByValue(this.sumWin) != BigWinType.non) {
            BigWinUI.complete.once(() => {
                this.onTaskEnd();
            }, this);

            BigWinUI.show.emit(this.sumWin);
        }
        else {
            this.onTaskEnd();
        }
    }

    /**
     * 
     */
    private onTaskEnd(): void {

        BaseEvent.refreshCredit.emit(this.playerCent);
        BaseEvent.refreshWin.emit(this.sumWin * BaseDataManager.getInstance().bet.getCurRate());

        //橫幅贏分
        if (this.sumWin > 0) {
            let multiple: number = BaseDataManager.getInstance().getWinMultipleByValue(this.sumWin);
            BannerUI.showTotalWin.emit(this.sumWin * BaseDataManager.getInstance().bet.getCurRate(), multiple);
        }

        //要多等一秒
        XUtils.scheduleOnce(() => {

            BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_SHOWWIN);
            BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_WAIT);
            BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_FEATURE_CHEKRESULT);
            BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_SHOWWIN);
            BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_WAIT);
            BaseDataManager.getInstance().setState(s5g.game.proto.ESTATEID.K_ENDGAME);

            this.finish();
        }, 1, this);
    }

    update(deltaTime: number): void {
        // throw new Error("Method not implemented.");
    }
}