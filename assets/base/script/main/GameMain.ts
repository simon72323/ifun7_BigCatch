//ts
import { _decorator, Component, profiler, SpriteFrame } from 'cc';

import { CheatUI } from '@base/components/cheat/CheatUI';
import { BaseConst } from '@base/script/constant/BaseConst';
import { KeyboardManager } from '@base/script/keyboard/KeyboardManager';
import { BaseDataManager } from '@base/script/main/BaseDataManager';
import { BaseEvent } from '@base/script/main/BaseEvent';
import { BundleLoader } from '@base/script/main/BundleLoader';
import { CampaignCall } from '@base/script/message/CampaignCall';
import { CampaignEventRecall } from '@base/script/message/CampaignEventRecall';
import { CampaignInfoNotify } from '@base/script/message/CampaignInfoNotify';
import { CampaignRecall } from '@base/script/message/CampaignRecall';
import { CampaignWinRecall } from '@base/script/message/CampaignWinRecall';
import { ConfigCall } from '@base/script/message/ConfigCall';
import { ConfigRecall } from '@base/script/message/ConfigRecall';
import { LoginCall } from '@base/script/message/LoginCall';
import { LoginRecall } from '@base/script/message/LoginRecall';
import { ResultCall } from '@base/script/message/ResultCall';
import { ResultRecall } from '@base/script/message/ResultRecall';
import { StateCall } from '@base/script/message/StateCall';
import { StateRecall } from '@base/script/message/StateRecall';
import { StripsCall } from '@base/script/message/StripsCall';
import { StripsRecall } from '@base/script/message/StripsRecall';
import { SocketEvent } from '@base/script/socket/SocketEvent';
import { SocketManager } from '@base/script/socket/SocketManager';
import { TaskManager } from '@base/script/tasks/TaskManager';
import { BaseLangBundleDir, TurboMode } from '@base/script/types/BaseType';
import { ErrorCode, ErrorManager } from '@base/script/utils/ErrorManager';
import { UIManager } from '@base/script/utils/UIManager';

const { ccclass } = _decorator;
/**
 * 共用遊戲主程式
 */
@ccclass('GameMain')
export abstract class GameMain extends Component {

    private languageLader: BundleLoader;

    /**
     * 
     */
    async onLoad() {
        //註冊封包
        {
            SocketManager.getInstance().registerSendMessage(new LoginCall());
            SocketManager.getInstance().registerReceiveMessage(new LoginRecall());

            SocketManager.getInstance().registerSendMessage(new ConfigCall());
            SocketManager.getInstance().registerReceiveMessage(new ConfigRecall());

            SocketManager.getInstance().registerSendMessage(new StripsCall());
            SocketManager.getInstance().registerReceiveMessage(new StripsRecall());

            SocketManager.getInstance().registerSendMessage(new ResultCall());
            SocketManager.getInstance().registerReceiveMessage(new ResultRecall());

            SocketManager.getInstance().registerSendMessage(new StateCall());
            SocketManager.getInstance().registerReceiveMessage(new StateRecall());

            SocketManager.getInstance().registerSendMessage(new CampaignCall());
            SocketManager.getInstance().registerReceiveMessage(new CampaignRecall());

            //非DEMO模式才註冊活動封包
            if (BaseDataManager.getInstance().isDemoMode() === false) {
                SocketManager.getInstance().registerReceiveMessage(new CampaignEventRecall());
                SocketManager.getInstance().registerReceiveMessage(new CampaignInfoNotify());
                SocketManager.getInstance().registerReceiveMessage(new CampaignWinRecall());
            }
        }

        //keyboard ======================================================
        KeyboardManager.getInstance().initialize();

        //需要注意各UI onLoad時機
        UIManager.getInstance().initialize();

        //定義BundleLoader並且讓子類別添加完畢一起讀取
        this.languageLader = new BundleLoader();

        let lang: string = BaseDataManager.getInstance().urlParam.lang;
        this.loadLanguage(BaseConst.BUNDLE_BASE_CURRENCY, `${lang}/${BaseLangBundleDir.ui3_0}`, SpriteFrame);
        this.loadLanguage(BaseConst.CURRENCY, '', SpriteFrame);

        this.initializeGame();//執行初始化遊戲內容

        //Socket
        SocketEvent.open.on(this.onOpen, this);
        SocketEvent.close.on(this.onClose, this);
        SocketManager.getInstance().connect(BaseDataManager.getInstance().getSocketUrl());

        await this.languageLader.load(true);

        //讀取完成後通知LoadingScene可以關閉
        BaseEvent.initResourceComplete.emit();
    }

    start() {
        //cheat
        CheatUI.registerButton.emit('共用', '按鈕', 'FPS', () => {
            profiler.isShowingStats() ? profiler.hideStats() : profiler.showStats();
        });
        CheatUI.registerButton.emit('共用', '按鈕', '斷線', () => {
            SocketManager.getInstance().disconnect();
        });
        CheatUI.registerButton.emit('共用', '按鈕', '極速', () => {
            BaseDataManager.getInstance().getTurboMode = () => { return TurboMode.Turbo; };
        });

        this.childOnStart();
    }

    // component ===========================================================================
    // component ===========================================================================
    // component ===========================================================================

    update(deltaTime: number) {
        TaskManager.getInstance().update(deltaTime);
    }

    // socket ===========================================================================
    // socket ===========================================================================
    // socket ===========================================================================

    /**
     * 開啟連線
     */
    private onOpen(): void {
        //連線完成自動登入
        SocketManager.getInstance().sendMessage(s5g.game.proto.EMSGID.eLoginCall);
    }

    /**
     * 斷線
     */
    private onClose(): void {
        ErrorManager.getInstance().showError(ErrorCode.NetDisconnect);
    }

    protected loadLanguage(bundle: string, dir: string, type: any): void {
        this.languageLader.add(bundle, dir, type);
    }

    // override ===========================================================================
    // override ===========================================================================
    // override ===========================================================================
    /**
     * 遊戲初始設定
     */
    protected abstract initializeGame(): void;

    protected childOnStart(): void {
        //override
    }
}
