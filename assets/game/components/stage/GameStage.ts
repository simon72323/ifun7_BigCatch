import { _decorator, Animation, Component, easing, Node, tween, Tween, Vec3 } from 'cc';

import { FeatureBuyBtn } from '@game/components/featureBuy/FeatureBuyBtn';
import { FeatureBuyPage } from '@game/components/featureBuy/FeatureBuyPage';
import { GameAnimationName, GameAudioKey, GameConst } from '@game/script/data/GameConst';
import { MessageHandler } from '@game/script/main/MessageHandler';
import { IdleTask } from '@game/script/task/IdleTask';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { SlotMachine } from '@common/components/slotMachine/SlotMachine';

import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent } from '@common/script/event/XEvent';
import { KeyboardManager } from '@common/script/manager/KeyboardManager';
import { NetworkManager } from '@common/script/network/NetworkManager';
import { TaskManager } from '@common/script/tasks/TaskManager';
import { ModuleID } from '@common/script/types/BaseType';

// enum RollerAni {
//     fg_mipie = 'fg_mipie',
//     fg_roller = 'fg_roller',
//     intofg_roller = 'intofg_roller',
//     ng_mipie = 'ng_mipie',
//     ng_roller = 'ng_roller',
// }

const { ccclass, property } = _decorator;

@ccclass('GameStage')
export class GameStage extends Component {
    /**畫面震動(動畫名稱) */
    public static shake: XEvent = new XEvent();
    public static fsOpening: XEvent = new XEvent();

    private isMi: boolean = false;
    private scaleNode: Node;
    onLoad() {
        //初始化盤面
        //初始化遊戲資料

        //===================不確定cocos內做，且收到要做甚麼?===================
        //獲取促銷簡介、遊戲內選單狀態、遊戲內選單
        this.sendPromotionBrief()
            .then(this.sendInGameMenuStatus)
            // .then(this.sendInGameMenu)
            .then(this.initGame.bind(this))
            .catch((e: any) => {
                console.error(e);
                // console.log('fail to fetch the brief of promotion or the status of in game menu from server');
            });
        //===================不確定cocos內做，且收到要做甚麼?===================

        // BaseEvent.initMessageComplete.once(this.netReady, this);//監聽網路準備完成事件(一次)
        BaseEvent.changeScene.on(this.onChangeScene, this);//監聽切換場景事件

        GameStage.shake.on(this.shake, this);//監聽震動事件
        // GameStage.fsOpening.on(this.fsOpening, this);//監聽FS開場事件

        FeatureBuyBtn.click.on(this.clickFeatureBuyBtn, this);//監聽點擊免費遊戲事件
        // SettingsPage2.clickHelp.on(this.HelpOpen, this);//監聽點擊幫助事件

        SlotMachine.startMi.on(this.startMi, this);//監聽開始咪牌事件
        SlotMachine.stopMi.on(this.stopMi, this);//監聽停止咪牌事件
    }

    private async sendPromotionBrief() {
        await NetworkManager.getInstance().sendPromotionBrief();
    }

    private async sendInGameMenuStatus() {
        await NetworkManager.getInstance().sendInGameMenuStatus();
        // this.initGame();
    }

    private async sendInGameMenu() {
        await NetworkManager.getInstance().sendInGameMenu();
    }

    /**
     * 遊戲初始化內容
     */
    private initGame() {
        this.scaleNode = this.node.getChildByName('ScaleNode');
        this.onChangeScene(ModuleID.BS);
        // AutoPage.setup.emit([10, 50, 100, 250, 1000]);
        //配置遊戲資料
        // DataManager.getInstance().setData(new GameData());

        //註冊語系資源(註冊完畢後GameMain會呼叫startLoadLanguage)
        //註冊聲音

        //初始化盤面
        // let slotParser = DataManager.getInstance().slotData.slotParser;
        // slotParser.slotPattern = GameConst.BS_INIT_RESULT;
        SlotMachine.initReelSymbolID.emit(GameConst.BS_INIT_RESULT);
        // SlotMachine.setSlotParser.emit(slotParser);

        // SettingsPage1.lessEnabled.emit(DataManager.getInstance().bet.getLessEnabled());
        SettingsController.refreshCredit.emit(DataManager.getInstance().userCredit);
        SettingsController.refreshBet.emit(DataManager.getInstance().bet.getBetTotal());
        SettingsController.refreshWin.emit(0);

        KeyboardManager.getInstance().initialize();
        MessageHandler.getInstance().initialize();//初始化消息處理
        // UIManager.getInstance().initialize();//需要注意各UI onLoad時機

        //讀取完成後通知LoadingScene可以關閉
        // BaseEvent.initResourceComplete.emit();
        //開始遊戲--------------------------------------------------------
        console.log('開始遊戲');
        TaskManager.getInstance().addTask(new IdleTask());
    }

    /**震動 */
    private shake(): void {
        this.node.getComponent(Animation).play(GameAnimationName.gameShakeLeft);
    }

    /**開始咪牌 */
    private startMi(): void {
        if (this.isMi) return;
        this.isMi = true;
        tween(this.scaleNode)
            .to(3, { scale: new Vec3(0.95, 0.95, 1) }, { easing: easing.circOut })
            .start();
    }

    /**停止咪牌 */
    private stopMi(): void {
        if (!this.isMi) return;
        this.isMi = false;
        Tween.stopAllByTarget(this.scaleNode);
        tween(this.scaleNode)
            .to(1.5, { scale: new Vec3(1, 1, 1) })
            .start();
    }

    /**點擊免費遊戲 */
    private clickFeatureBuyBtn(): void {
        DataManager.getInstance().isMenuOn = true;
        FeatureBuyPage.show.emit(DataManager.getInstance().bet.getBuyFeatureTotal());
    }

    /**網路準備完成(loading時已經獲取完玩家與遊戲資料) */
    // private netReady(): void {

    // }

    /**幫助開啟 */
    // private HelpOpen() {
    //     if (DataManager.getInstance().isMenuOn == true) return;
    //     if (DataManager.getInstance().isAutoMode == true) return;
    //     // if (DataManager.getInstance().isIdle() === false) return;
    //     DataManager.getInstance().isMenuOn = true;
    //     SettingsPage2.hide.emit();
    //     GameHelpWebView.show.emit();
    // }

    // /**幫助關閉 */
    // private HelpClose() {
    //     DataManager.getInstance().isMenuOn = false;
    //     SettingsPage2.show.emit();
    // }

    /**
     * 切換場景動畫
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        // this.node.getChildByPath('ScaleNode/BSUI1').active = id === ModuleID.BS;
        // this.node.getChildByPath('ScaleNode/BSUI2').active = id === ModuleID.BS;
        // this.node.getChildByPath('ScaleNode/FSUI').active = id !== ModuleID.BS;

        // if (id === ModuleID.BS) {
        //     XUtils.ClearSpine(this.roller_ani);
        //     this.roller_ani.setAnimation(0, RollerAni.ng_roller, true);
        // }
    }

    update(deltaTime: number) {
        TaskManager.getInstance().update(deltaTime);
    }
}