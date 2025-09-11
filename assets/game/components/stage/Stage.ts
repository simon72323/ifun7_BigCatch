import { _decorator, Animation, Component } from 'cc';
import { AutoPage } from 'db://assets/base/components/autoPage/AutoPage';
import { GameHelpWebView } from 'db://assets/base/components/gameHelp/GameHelpWebView';
import { SettingsPage1 } from 'db://assets/base/components/settingsPage/SettingsPage1';
import { SettingsPage2 } from 'db://assets/base/components/settingsPage/SettingsPage2';
import { BaseDataManager } from 'db://assets/base/script/main/BaseDataManager';
import { BaseEvent } from 'db://assets/base/script/main/BaseEvent';
import { TaskManager } from 'db://assets/base/script/tasks/TaskManager';
import { ModuleID } from 'db://assets/base/script/types/BaseType';
import { XEvent } from 'db://assets/base/script/utils/XEvent';
import { GameAnimationName } from '../../script/constant/GameConst';
import { GameData } from '../../script/main/GameData';
import { IdleTask } from '../../script/task/IdleTask';
import { FeatureBuyBtn } from '../featureBuy/FeatureBuyBtn';
import { FeatureBuyPage } from '../featureBuy/FeatureBuyPage';
import { SlotMachine2 } from '../slotMachine2/base/slotMachine2/SlotMachine2';
const { ccclass, property } = _decorator;

@ccclass('Stage')
export class Stage extends Component {

    /**畫面震動(動畫名稱) */
    public static shake: XEvent = new XEvent();

    public static fsOpening: XEvent = new XEvent();

    private isMi: boolean = false;
    onLoad() {

        Stage.shake.on(() => {
            this.node.getComponent(Animation).play(GameAnimationName.gameShakeLeft);
        }, this);

        //右下角幸運一擊
        FeatureBuyBtn.click.on(() => {
            BaseDataManager.getInstance().isMenuOn = true;
            FeatureBuyPage.show.emit(BaseDataManager.getInstance().getCurFeatureBuyTotal());
        }, this);

        SettingsPage2.clickHelp.on(this.HelpOpen, this);

        BaseEvent.initMessageComplete.once(this.netReady, this);

        BaseEvent.changeScene.on(this.onChangeScene, this);

        let scaleNode = this.node.getChildByName("ScaleNode");
        SlotMachine2.startMi.on(() => {

        }, this);
        SlotMachine2.stopMi.on(() => {

        }, this);

    }

    start() {
        this.onChangeScene(ModuleID.BS);

        AutoPage.setup.emit([10, 50, 100, 250, 1000]);
    }

    private netReady(): void {
        //初始化盤面
        let gameData = BaseDataManager.getInstance().getData<GameData>();
        gameData.slotParser.setStripTable(BaseDataManager.getInstance().getStripTable()._strips, gameData.bsInitRng, null, gameData.bsInitGoldenPattern);
        SlotMachine2.setup.emit(0, gameData.slotParser);

        SettingsPage1.lessEnabled.emit(BaseDataManager.getInstance().bet.getLessEnabled());
        BaseEvent.refreshCredit.emit(BaseDataManager.getInstance().playerCent);
        // BaseEvent.refreshBet.emit(this.TotalArray[this.TotalIndex]);
        BaseEvent.refreshWin.emit(0);

        BaseEvent.buyFeatureEnabled.emit(BaseDataManager.getInstance().isFeatureBuyEnabled());

        if (BaseDataManager.getInstance().recoverData) {
            // let recoverTask = new RecoverTask();
        }
        else {
        }

        //開始遊戲 --------------------------------------------------------
        BaseEvent.startGame.once(() => {
            TaskManager.getInstance().addTask(new IdleTask());
        }, this);
    }

    //Help
    private HelpOpen() {
        if (BaseDataManager.getInstance().isMenuOn == true) return;
        if (BaseDataManager.getInstance().auto.isAutoPlay() == true) return;
        if (BaseDataManager.getInstance().isIdle() === false) return;
        BaseDataManager.getInstance().isMenuOn = true;
        SettingsPage2.hide.emit();
        GameHelpWebView.show.emit();
    }

    private HelpClose() {
        BaseDataManager.getInstance().isMenuOn = false;
        SettingsPage2.show.emit();
    }


    /**
     * 切換場景動畫
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        this.node.getChildByPath("ScaleNode/BSUI1").active = id === ModuleID.BS;
        this.node.getChildByPath("ScaleNode/BSUI2").active = id === ModuleID.BS;
        this.node.getChildByPath("ScaleNode/FSUI").active = id !== ModuleID.BS;
    }
}

enum RollerAni {
    fg_mipie = "fg_mipie",
    fg_roller = "fg_roller",
    intofg_roller = "intofg_roller",
    ng_mipie = "ng_mipie",
    ng_roller = "ng_roller",
}