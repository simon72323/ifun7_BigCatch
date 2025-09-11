//ts
import { _decorator, Component, dynamicAtlasManager, macro, profiler, SpriteFrame } from 'cc';
import { CheatUI } from '../../components/cheat/CheatUI';
import { BaseConst } from '../constant/BaseConst';
import { KeyboardManager } from "../keyboard/KeyboardManager";
import { CampaignCall } from '../message/CampaignCall';
import { CampaignEventRecall } from '../message/CampaignEventRecall';
import { CampaignInfoNotify } from '../message/CampaignInfoNotify';
import { CampaignRecall } from '../message/CampaignRecall';
import { CampaignWinRecall } from '../message/CampaignWinRecall';
import { ConfigCall } from '../message/ConfigCall';
import { ConfigRecall } from '../message/ConfigRecall';
import { LoginCall } from '../message/LoginCall';
import { LoginRecall } from '../message/LoginRecall';
import { ResultCall } from '../message/ResultCall';
import { ResultRecall } from '../message/ResultRecall';
import { StateCall } from '../message/StateCall';
import { StateRecall } from '../message/StateRecall';
import { StripsCall } from '../message/StripsCall';
import { StripsRecall } from '../message/StripsRecall';
import { SocketEvent } from "../socket/SocketEvent";
import { SocketManager } from "../socket/SocketManager";
import { TaskManager } from "../tasks/TaskManager";
import { BaseLangBundleDir, TurboMode } from '../types/BaseType';
import { ErrorCode, ErrorManager } from '../utils/ErrorManager';
import { UIManager } from '../utils/UIManager';
import { BaseDataManager } from "./BaseDataManager";
import { BaseEvent } from './BaseEvent';
import { BundleLoader } from './BundleLoader';
const { ccclass, property } = _decorator;
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
        //不明的全域設定 ======================================================
        macro.CLEANUP_IMAGE_CACHE = false;
        dynamicAtlasManager.enabled = true;
        dynamicAtlasManager.maxFrameSize = 512;

        //不明的全域設定 ======================================================
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
        this.loadLanguage(BaseConst.BUNDLE_BASE_LANGUAGE, `${lang}/${BaseLangBundleDir.ui3_0}`, SpriteFrame);
        this.loadLanguage(BaseConst.BUNDLE_BASE_CURRENCY, "", SpriteFrame);

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
        CheatUI.registerButton.emit("共用", "按鈕", "FPS", () => {
            profiler.isShowingStats() ? profiler.hideStats() : profiler.showStats();
        })
        CheatUI.registerButton.emit("共用", "按鈕", "斷線", () => {
            SocketManager.getInstance().disconnect();
        })
        CheatUI.registerButton.emit("共用", "按鈕", "極速", () => {
            BaseDataManager.getInstance().getTurboMode = () => { return TurboMode.Turbo }
        })

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
