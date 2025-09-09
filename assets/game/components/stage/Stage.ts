import { _decorator, Animation, Component, easing, sp, tween, Tween, Vec3 } from 'cc';
import { AutoPage } from '@/base/components/autoPage/AutoPage';
import { GameHelpWebView } from '@/base/components/gameHelp/GameHelpWebView';
import { SettingsPage1 } from '@/base/components/settingsPage/SettingsPage1';
import { SettingsPage2 } from '@/base/components/settingsPage/SettingsPage2';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { TaskManager } from '@/base/script/tasks/TaskManager';
import { ModuleID } from '@/base/script/types/BaseType';
import { XEvent } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { GameAnimationName, GameAudioKey } from '../../script/constant/GameConst';
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

    private roller_ani: sp.Skeleton;

    private isMi: boolean = false;
    onLoad() {
        this.roller_ani = this.node.getChildByPath("ScaleNode/roller_ani").getComponent(sp.Skeleton);

        Stage.shake.on(() => {
            this.node.getComponent(Animation).play(GameAnimationName.gameShakeLeft);
        }, this);

        Stage.fsOpening.on(() => {
            XUtils.ClearSpine(this.roller_ani);
            this.roller_ani.addAnimation(0, RollerAni.intofg_roller, false);
            this.roller_ani.addAnimation(0, RollerAni.fg_roller, true);

            AudioManager.getInstance().play(GameAudioKey.scExpand);
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
            if (this.isMi) {
                return;
            }
            this.isMi = true;
            tween(scaleNode)
                .to(3, { scale: new Vec3(0.95, 0.95, 1) }, { easing: easing.circOut })
                .start()

            XUtils.ClearSpine(this.roller_ani);
            if (BaseDataManager.getInstance().isBS() === true) {
                this.roller_ani.setAnimation(0, RollerAni.ng_mipie, true);
            }
            else {
                this.roller_ani.setAnimation(0, RollerAni.fg_mipie, true);
            }
        }, this);
        SlotMachine2.stopMi.on(() => {
            if (!this.isMi) {
                return;
            }
            this.isMi = false;
            Tween.stopAllByTarget(scaleNode);
            tween(scaleNode)
                .to(1.5, { scale: new Vec3(1, 1, 1) })
                .start()

            XUtils.ClearSpine(this.roller_ani);
            if (BaseDataManager.getInstance().isBS() === true) {
                this.roller_ani.setAnimation(0, RollerAni.ng_roller, true);
            }
            else {
                this.roller_ani.setAnimation(0, RollerAni.fg_roller, true);
            }
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

        if (id === ModuleID.BS) {
            XUtils.ClearSpine(this.roller_ani);
            this.roller_ani.setAnimation(0, RollerAni.ng_roller, true);
        }
    }
}

enum RollerAni {
    fg_mipie = "fg_mipie",
    fg_roller = "fg_roller",
    intofg_roller = "intofg_roller",
    ng_mipie = "ng_mipie",
    ng_roller = "ng_roller",
}