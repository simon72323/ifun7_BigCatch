import { _decorator, Component, Node, UIOpacity } from 'cc';

import { FeatureBuyBtn } from 'db://assets/game/components/FeatureBuyUI/FeatureBuyBtn';
import { FeatureBuyPage } from 'db://assets/game/components/FeatureBuyUI/FeatureBuyPage';
import { AudioKey } from 'db://assets/game/script/data/AudioKey';
import { GameConst } from 'db://assets/game/script/data/GameConst';
import { MessageHandler } from 'db://assets/game/script/main/MessageHandler';
import { IdleTask } from 'db://assets/game/script/task/IdleTask';

import { SettingsController } from 'db://assets/common/components/settingsController/SettingsController';
import { slotAudioKey, SlotMachine } from 'db://assets/common/components/slotMachine/SlotMachine';
import { DataManager } from 'db://assets/common/script/data/DataManager';
import { BaseEvent } from 'db://assets/common/script/event/BaseEvent';
import { XEvent } from 'db://assets/common/script/event/XEvent';
import { AudioManager } from 'db://assets/common/script/manager/AudioManager';
import { KeyboardManager } from 'db://assets/common/script/manager/KeyboardManager';
import { NetworkManager } from 'db://assets/common/script/network/NetworkManager';
import { TaskManager } from 'db://assets/common/script/tasks/TaskManager';
import { ScreenAdapter } from 'db://assets/common/script/utils/ScreenAdapter';
import { Utils } from 'db://assets/common/script/utils/Utils';

const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    /**畫面震動(動畫名稱) */
    public static shake: XEvent = new XEvent();
    public static fsOpening: XEvent = new XEvent();

    @property({ type: Node, tooltip: '初始遮黑' })
    private topBlack: Node = null;

    @property({ tooltip: '是否為假老虎機' })
    private isFake: boolean = false;

    async onLoad() {
        //初始化盤面
        //初始化遊戲資料

        await AudioManager.getInstance().loadBundleAudios();
        slotAudioKey.reelStop = AudioKey.reelStop;//指定公版輪軸停止音效名稱

        //顯示初始化遮黑
        this.topBlack.active = true;
        this.topBlack.getComponent(UIOpacity).opacity = 255;

        if (this.isFake === false) {
            this.sendPromotionBrief()
                .then(this.sendInGameMenuStatus)
                // .then(this.sendInGameMenu)
                .then(this.initGame.bind(this))
                .catch((e: any) => {
                    console.error(e);
                    // console.log('fail to fetch the brief of promotion or the status of in game menu from server');
                });
        } else {
            //獲取促銷簡介、遊戲內選單狀態、遊戲內選單
            const fakeData1 = { 'name': '', 'account': 'token5800', 'agent_account': 'CS8901', 'credit': 500000000, 'currency': 'IDR', 'free_spin_data': [{ 'free_spin_id': '', 'bet': 0, 'end_date': '', 'rounds_left': 0 }], 'is_anchor': false, 'simulator_data': {} };
            DataManager.getInstance().userData = fakeData1;
            const fakeData2 = { 'game_id': 5800, 'line_bet': [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 'coin_value': [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34], 'bet_available_idx': 0, 'line_total': 30, 'line_available': [30], 'line_bet_default_index': 0, 'coin_value_default_index': 0, 'win': 1, 'big_win': 20, 'super_win': 50, 'mega_win': 100, 'spin_mode': 1, 'buy_spin': { 'allow_buy': 1, 'multiplier': 50, 'limit_total': 6000000 } };
            DataManager.getInstance().gameData = fakeData2;
            this.scheduleOnce(() => {
                this.initGame();
            }, 0);
        }


        FeatureBuyBtn.click.on(this.clickFeatureBuyBtn, this);//監聽點擊免費遊戲事件

        SlotMachine.startMi.on((column: number) => {
            AudioManager.getInstance().playSound(AudioKey.teasing);
            AudioManager.getInstance().editMusicVolume(0.1);
            // this.isMi = true;
        }, this);

        SlotMachine.stopMi.on(() => {
            // if (!this.isMi) {
            //     return;
            // }
            AudioManager.getInstance().stopSound(AudioKey.teasing);
            AudioManager.getInstance().editMusicVolume(1);
            // this.isMi = false;
        }, this);
    }

    private async sendPromotionBrief() {
        await NetworkManager.getInstance().sendPromotionBrief();
    }

    private async sendInGameMenuStatus() {
        await NetworkManager.getInstance().sendInGameMenuStatus();
    }

    private async sendInGameMenu() {
        await NetworkManager.getInstance().sendInGameMenu();
    }

    /**
     * 遊戲初始化內容
     */
    private initGame() {
        // ScreenAdapter.setupResize();//初始化屏幕適配
        ScreenAdapter.handleResize();
        //淡出初始遮黑
        Utils.fadeOut(this.topBlack, 0.3, 255, 0, () => {
            this.topBlack.active = false;
        });

        //初始化盤面
        SlotMachine.initResultParser.emit(GameConst.BS_INIT_RESULT);

        //更新玩家資料
        // console.log('更新玩家資料', DataManager.getInstance().userCredit, DataManager.getInstance().bet.getBetTotal());
        SettingsController.refreshCredit.emit(DataManager.getInstance().userCredit);
        SettingsController.refreshBet.emit(DataManager.getInstance().bet.getBetTotal());
        SettingsController.refreshWin.emit(0, 0);//刷新贏分=0

        //設置購買功能是否可見、啟用
        const buyFeatureVisible = DataManager.getInstance().gameData.buy_spin.allow_buy === 1;
        BaseEvent.buyFeatureVisible.emit(buyFeatureVisible);//設置購買功能是否可見
        const buyFeatureEnabled = DataManager.getInstance().bet.getBuyFeatureTotal() !== -1;
        BaseEvent.buyFeatureEnabled.emit(buyFeatureEnabled);//設置購買功能是否啟用

        KeyboardManager.getInstance().initialize();
        SettingsController.getInstance().initialize();//初始化設定控制器
        MessageHandler.getInstance().initialize();//初始化消息處理

        //開始遊戲--------------------------------------------------------
        // console.log('開始遊戲');
        TaskManager.getInstance().addTask(new IdleTask());
        AudioManager.getInstance().playMusic(AudioKey.bgmMg);//播放背景音樂
    }

    /**點擊免費遊戲 */
    private clickFeatureBuyBtn(): void {
        FeatureBuyPage.show.emit();
    }

    /**持續更新任務 */
    update(deltaTime: number) {
        TaskManager.getInstance().update(deltaTime);
    }
}