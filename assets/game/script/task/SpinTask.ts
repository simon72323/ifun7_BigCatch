import { AudioManager } from "db://assets/base/script/audio/AudioManager";
import { BaseDataManager } from "db://assets/base/script/main/BaseDataManager";
import { BaseSpinTask } from "db://assets/base/script/tasks/BaseSpinTask";
import { TaskManager } from "db://assets/base/script/tasks/TaskManager";
import { APIManager } from "db://assets/base/script/utils/APIManager";
import { XUtils } from "db://assets/base/script/utils/XUtils";
import { BannerUI } from "../../components/BannerUI/BannerUI";
import { RevolverUI } from "../../components/RevolverUI/RevolverUI";
import { SlotMachine2 } from "../../components/slotMachine2/base/slotMachine2/SlotMachine2";
import { GameAudioKey, GameConst, SlotMachineID } from "../constant/GameConst";
import { GameData } from "../main/GameData";
import { IdleTask } from "./IdleTask";
/**
 * 開始轉動
 */
export class SpinTask extends BaseSpinTask {

    protected childExecute(): void {

        XUtils.scheduleOnce(() => {
            let initMultiplier = GameConst.multiplierList[BaseDataManager.getInstance().getData<GameData>().getInitMultiplierIdx()]
            RevolverUI.reset.emit(BaseDataManager.getInstance().curModuleID, initMultiplier);
        }, 0.3, this);

        //還原廣告狀態
        BannerUI.reset.emit();

        //考量到先轉型、後轉型, 所以音效要在spin監聽
        SlotMachine2.spinComplete.once((id) => {
            AudioManager.getInstance().play(GameAudioKey.in);
        }, this);

        if (BaseDataManager.getInstance().isBS() === true) {
            //先轉型(幸運一擊直接給結果不轉動)
            if (BaseDataManager.getInstance().buyFs === false && APIManager.getInstance().getSpinLate() === false) {
                SlotMachine2.spin.emit(SlotMachineID.BS);
            }
        }
    }

    public childSpinFailed(): void {
        if (BaseDataManager.getInstance().isBS() === true) {
            TaskManager.getInstance().addTask(new IdleTask());
        }
    }
}