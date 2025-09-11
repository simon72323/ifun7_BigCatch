import { _decorator, find, randomRangeInt, SpriteFrame } from 'cc';
import { CheatUI } from '@/base/components/cheat/CheatUI';
import { AudioKey } from '@/base/script/audio/AudioKey';
import { BaseConst } from '@/base/script/constant/BaseConst';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { CheatCodeData, ModuleID } from '@/base/script/types/BaseType';
import { XUtils } from '@/base/script/utils/XUtils';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { GameMain } from '@/base/script/main/GameMain';
import { BannerUI } from '@/game/components/BannerUI/BannerUI';
import { BigWinUI } from '@/game/components/BigWinUI/BigWinUI';
import { FSRoleUI } from '@/game/components/characterUI/FSRoleUI';
import { FSSettleUI } from '@/game/components/SettleUI/FSSettleUI';
import { SlotMachine2 } from '@/game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { SlotReelConfig2 } from '@/game/components/slotMachine2/base/slotMachine2/SlotType2';
import { TransUI } from '@/game/components/TransUI/TransUI';
import { GameAudioKey, LangBundleDir } from '../constant/GameConst';
import { GameData } from '@/game/script/main/GameData';
import { MessageHandler } from '@/game/script/main/MessageHandler';
const { ccclass, property } = _decorator;

/**
 * 遊戲主程式
 */
@ccclass('Game')
export class Game extends GameMain {

    /**
     * 遊戲初始化內容
     */
    protected initializeGame() {
        
        //配置遊戲資料
        BaseDataManager.getInstance().setData(new GameData());

        //封包處理
        MessageHandler.getInstance().initialize();

        //註冊語系資源(註冊完畢後GameMain會呼叫startLoadLanguage)
        {
            let lang: string = BaseDataManager.getInstance().urlParam.lang;
            this.loadLanguage(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.banner}`, SpriteFrame);
            this.loadLanguage(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.featureBuy}`, SpriteFrame);
            this.loadLanguage(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.board}`, SpriteFrame);
            this.loadLanguage(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.paytable}`, SpriteFrame);
            this.loadLanguage(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.fs}`, SpriteFrame);
            this.loadLanguage(BaseConst.BUNDLE_LANGUAGE, `${lang}/${LangBundleDir.bigwin}`, SpriteFrame);
        }

        //註冊聲音
        {

            AudioManager.getInstance().initialize(this.node.getChildByPath('audioNode'));

            AudioManager.getInstance().register(AudioKey.BtnClick, 'Common/SFX/BtnClick');
            AudioManager.getInstance().register(AudioKey.TurboClick, 'Common/SFX/TurboClick');
            AudioManager.getInstance().register(AudioKey.BetClick, 'Common/SFX/BetClick');
            AudioManager.getInstance().register(AudioKey.CheckClick, 'Common/SFX/CheckClick');
            AudioManager.getInstance().register(AudioKey.FestBet, 'Common/SFX/FestBet');
            // AudioManager.getInstance().register(AudioKey.SpinLoop, 'Game/SFX/in');

            //BGM
            AudioManager.getInstance().register(AudioKey.BsMusic, 'Game/BGM/MG');
            AudioManager.getInstance().register(AudioKey.FsMusic, 'Game/BGM/FG');
            // AudioManager.getInstance().register(GameAudioKey.noBtn, 'Game/BGM/noBtn');
            AudioManager.getInstance().register(AudioKey.WinRolling, 'Game/BGM/cs');

            //BigWin
            AudioManager.getInstance().register(AudioKey.BigWin, 'Game/SFX/bw');
            AudioManager.getInstance().register(AudioKey.MegaWin, 'Game/SFX/mw');
            AudioManager.getInstance().register(AudioKey.SuperWin, 'Game/SFX/sw');
            AudioManager.getInstance().register(AudioKey.UltraWin, 'Game/SFX/uw');
            AudioManager.getInstance().register(AudioKey.UltimateWin, 'Game/SFX/umw');
            AudioManager.getInstance().register(AudioKey.SpinClick, 'Game/SFX/spin');
            AudioManager.getInstance().register(AudioKey.ReelStop, 'Game/SFX/stop');
            AudioManager.getInstance().register(AudioKey.WinEnd, 'Game/SFX/we');

            //滾輪
            AudioManager.getInstance().register(GameAudioKey.down, 'Game/SFX/down');
            AudioManager.getInstance().register(GameAudioKey.waiting, 'Game/SFX/waiting');

            //FS轉場
            AudioManager.getInstance().register(GameAudioKey.FgTran, 'Game/SFX/FgTran');
            AudioManager.getInstance().register(GameAudioKey.FgStart, 'Game/SFX/FgStart');
            AudioManager.getInstance().register(GameAudioKey.confrats, 'Game/SFX/confrats');

            //準心
            AudioManager.getInstance().register(GameAudioKey.line, 'Game/SFX/line');
            AudioManager.getInstance().register(GameAudioKey.lineShot, 'Game/SFX/lineShot');

            //scatter
            AudioManager.getInstance().register(GameAudioKey.scatter, 'Game/SFX/scatter');
            AudioManager.getInstance().register(GameAudioKey.st, 'Game/SFX/st');

            //左輪
            AudioManager.getInstance().register(GameAudioKey.reloading, 'Game/SFX/reloading');

            //FS
            AudioManager.getInstance().register(GameAudioKey.TW, 'Game/SFX/TW');
            AudioManager.getInstance().register(GameAudioKey.dg, 'Game/SFX/dg');
            AudioManager.getInstance().register(GameAudioKey.hitGun, 'Game/SFX/hitGun');
            AudioManager.getInstance().register(GameAudioKey.shot, 'Game/SFX/shot');
            AudioManager.getInstance().register(GameAudioKey.putaway, 'Game/SFX/putaway');
            AudioManager.getInstance().register(GameAudioKey.rotation, 'Game/SFX/rotation');
            AudioManager.getInstance().register(GameAudioKey.laughing, 'Game/SFX/laughing');//搭配fire_win
            AudioManager.getInstance().register(GameAudioKey.die, 'Game/SFX/die');

            //FeatureBuy
            AudioManager.getInstance().register(GameAudioKey.buy, 'Game/SFX/buy');
            AudioManager.getInstance().register(GameAudioKey.FeatureBuy, 'Game/SFX/FeatureBuy');

            //所有跑分音效
            AudioManager.getInstance().register(GameAudioKey.combine, 'Game/SFX/combine');
            AudioManager.getInstance().register(GameAudioKey.win, 'Game/SFX/win');
            AudioManager.getInstance().register(GameAudioKey.wt, 'Game/SFX/wt');
            AudioManager.getInstance().register(GameAudioKey.fuse, 'Game/SFX/fuse');

            AudioManager.getInstance().register(GameAudioKey.Letter, 'Game/SFX/Letter');
            AudioManager.getInstance().register(GameAudioKey.scExpand, 'Game/SFX/scExpand');
            AudioManager.getInstance().register(GameAudioKey.symbolGun, 'Game/SFX/symbolGun');
            AudioManager.getInstance().register(GameAudioKey.symbolHat, 'Game/SFX/symbolHat');
            AudioManager.getInstance().register(GameAudioKey.in, 'Game/SFX/in');

            //共用--------------------------------------------------------------
        }

        CheatUI.activate = true;
    }

    /**
     * 子類別實作
     */
    public childOnStart() {
        CheatUI.registerButton.emit('槍客', '其他', '金框', () => {
            BigWinUI.show.emit(randomRangeInt(1000, 100000));
            CheatUI.hide.emit();
        });

        //密技
        CheatUI.registerButton.emit('槍客', 'UI', '轉場', () => {
            let times = randomRangeInt(1, 20);
            console.log(`轉場 ${times}`);
            TransUI.fadeIn.emit(times,
                () => {

                },
                () => {
                    console.log(`轉場進場完成`);
                    this.scheduleOnce(() => {
                        TransUI.fadeOut.emit(() => {
                            console.log(`轉場出場完成`);
                        })
                    }, 1);
                })
            CheatUI.hide.emit();
        });

        CheatUI.registerButton.emit('槍客', 'UI', 'BW', () => {
            BigWinUI.show.emit(randomRangeInt(1000, 100000));
            CheatUI.hide.emit();
        });

        CheatUI.registerButton.emit('槍客', 'UI', '再轉', () => {
            BannerUI.retrigger.emit(randomRangeInt(1, 20));
            CheatUI.hide.emit();
        });

        CheatUI.registerButton.emit('槍客', 'FS', '待機', () => {
            FSRoleUI.idle.emit();
        });
        CheatUI.registerButton.emit('槍客', 'FS', '準備', () => {
            FSRoleUI.prepare.emit();
        });
        CheatUI.registerButton.emit('槍客', 'FS', '開槍', () => {
            FSRoleUI.shoot.emit(XUtils.getRandomFromList([8, 16, 32, 64, 128, 256, 512, 1024]));
        });
        CheatUI.registerButton.emit('槍客', 'FS', '收槍', () => {
            FSRoleUI.reset.emit();
        });
        CheatUI.registerButton.emit('槍客', 'FS', '結尾', () => {
            FSRoleUI.final.emit(() => { });
        });
        CheatUI.registerButton.emit('槍客', 'FS', 'FS', () => {
            BaseEvent.changeScene.emit(ModuleID.FS);
        });
        CheatUI.registerButton.emit('槍客', 'FS', '結算', () => {
            FSSettleUI.show.emit(randomRangeInt(1000, 100000), () => { }, () => { });
        });


        //註冊RNG
        this.registerRNGButton('沒中', [16, 18, 26, 24, 92, 15]);
        this.registerRNGButton('消1', [21, 20, 55, 57, 0, 81]);
        this.registerRNGButton('消2', [74, 38, 71, 73, 92, 7]);
        this.registerRNGButton('消4', [34, 66, 6, 99, 11, 31]);

        this.registerRNGButton('SC12', [45, 46, 8, 1, 1, 18]);
        this.registerRNGButton('SC得分', [66, 28, 45, 45, 21, 22]);
        this.registerRNGButton('手槍', [90, 1, 1, 1, 1, 1]);
        this.registerRNGButton('炸彈', [1, 19, 31, 13, 39, 36]);
        this.registerRNGButton('帽子', [90, 40, 1, 1, 1, 1]);

        let speedConfig = (find('Canvas/Game/ScaleNode/ReelController').getComponent(SlotMachine2)['config'] as SlotReelConfig2).speedConfigList[0];
        CheatUI.registerSlider.emit('節奏', 'Slot', '啟動間隔', [0, 1, speedConfig.spinInterval], (value) => {
            speedConfig.spinInterval = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '啟動時間', [0, 1, speedConfig.beginCurveTime], (value) => {
            speedConfig.beginCurveTime = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '循環時間', [0, 1, speedConfig.loopCurveTime], (value) => {
            speedConfig.loopCurveTime = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '滾動時間', [0, 1, speedConfig.spinTime], (value) => {
            speedConfig.spinTime = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '結束時間', [0, 1, speedConfig.endCurveTime], (value) => {
            speedConfig.endCurveTime = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '掉落間隔', [0, 1, speedConfig.dropInterval], (value) => {
            speedConfig.dropInterval = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '掉落時間', [0, 1, speedConfig.dropTime], (value) => {
            speedConfig.dropTime = value;
        });
        CheatUI.registerSlider.emit('節奏', 'Slot', '瞇牌時間', [0, 3, speedConfig.slowMotionTime], (value) => {
            speedConfig.slowMotionTime = value;
        });
    }

    private registerRNGButton(title: string, rng: number[]): void {
        CheatUI.registerButton.emit('槍客', 'RNG', title, () => {
            let data = new CheatCodeData();
            data.rngList = [rng];
            BaseDataManager.getInstance().cheatCodeData = data;
            CheatUI.hide.emit();
        });
    }
}