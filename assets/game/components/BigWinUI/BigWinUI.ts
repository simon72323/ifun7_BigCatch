import { _decorator, Button, Color, Component, KeyCode, Label, sp, tween, Tween } from 'cc';

import { GameConst } from '@game/script/data/GameConst';

import { BaseConst } from '@common/script/data/BaseConst';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { XEvent, XEvent1 } from '@common/script/event/XEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { BigWinType } from '@common/script/types/BaseType';
import { Utils } from '@common/script/utils/Utils';

type BigWinConfig = {
    sound: AudioKey
    in: string
    loop: string
    duration: number //跑分時間
}

type ScrollingData = {
    currentRateValue: number,
    endRateValue: number,
    finalRateValue: number,
    currentType: BigWinType,
    finalType: BigWinType,
}

enum CoinAnimation {
    superWin_loop = 'superWin_loop',
    superWin_in = 'superWin_in',
}

enum WinAnimation {
    big_loop = 'big_loop',
    big_in = 'big_in',
    mega_loop = 'mega_loop',
    mega_in = 'mega_in',
    super_loop = 'super_loop',
    super_in = 'super_in',
}

const { ccclass } = _decorator;

/**
 * BigWin演示
 */
@ccclass('BigWinUI')
export class BigWinUI extends Component {
    /** 顯示大獎 (BigWin終值, 顯示時會被除100) */
    public static show: XEvent1<number> = new XEvent1();
    /**演示完畢通知 */
    public static complete: XEvent = new XEvent();
    /**是否正在滾動 */
    private isPlaying: boolean = false;
    /**數字label */
    private winLabel: Label;

    private aniWin: sp.Skeleton;
    private aniCoin: sp.Skeleton;

    /**是否提早結束 */
    private isSkip: boolean = false;
    /**獎項參數 */
    private bigWinConfig: BigWinConfig[] = [
        {
            sound: AudioKey.BigWin,
            in: WinAnimation.big_in,
            loop: WinAnimation.big_loop,
            duration: 4
        },
        {
            sound: AudioKey.MegaWin,
            in: WinAnimation.mega_in,
            loop: WinAnimation.mega_loop,
            duration: 4
        }, {
            sound: AudioKey.SuperWin,
            in: WinAnimation.super_in,
            loop: WinAnimation.super_loop,
            duration: 4
        }
    ];

    /**跑分資料 */
    private data: ScrollingData = {
        currentType: BigWinType.big,
        finalType: BigWinType.big,
        currentRateValue: 0,
        endRateValue: 0,
        finalRateValue: 0
    };

    onLoad() {
        BigWinUI.show.on(this.onShow, this);
        // BigWin.hide.on(this.onHide, this);

        this.aniWin = this.node.getChildByPath('bigWinNode/ani_win').getComponent(sp.Skeleton);
        this.aniCoin = this.node.getChildByPath('bigWinNode/ani_coin').getComponent(sp.Skeleton);
        this.winLabel = this.node.getChildByPath('bigWinNode/num_totalwin').getComponent(Label);
        this.node.active = false;
    }


    /**
     * 大獎演示
     * @param value 
     */
    private onShow(value: number): void {
        //skip
        this.node.getChildByPath('SkipSensor').once(Button.EventType.CLICK, this.onSkip, this);
        BaseEvent.keyDown.once((code: KeyCode) => {
            if (code === KeyCode.SPACE) {
                this.onSkip();
            }
        }, this);

        Utils.fadeIn(this.node, 0.3);

        //設定終值
        this.data.currentRateValue = 0;
        this.data.endRateValue = 0;
        this.data.finalRateValue = value * DataManager.getInstance().bet.getLineTotal();
        this.data.currentType = BigWinType.big;
        this.data.finalType = DataManager.getInstance().getBigWinTypeByValue(value);

        this.node.active = true;
        this.isPlaying = true;
        this.isSkip = false;

        this.winLabel.string = '';
        this.winLabel.color = Color.WHITE;

        // Utils.ClearSpine(this.aniCoin);
        this.aniCoin.setAnimation(0, CoinAnimation.superWin_in, false);
        this.aniCoin.addAnimation(0, CoinAnimation.superWin_loop, true);

        AudioManager.getInstance().playSound(AudioKey.Win);
        AudioManager.getInstance().playSound(AudioKey.WinRolling);
        AudioManager.getInstance().lowerMusic();
        this.tweenAtLevel();
    }

    /**
     * 跑分
     */
    private tweenAtLevel() {
        let config = this.bigWinConfig[this.data.currentType];

        //設定bigWin等級樣式
        this.setTypeStyle(this.data.currentType);

        //設定終點
        let levelBeginValue = GameConst.BIG_WIN_MULTIPLE[this.data.currentType] * DataManager.getInstance().bet.getBetTotal();
        this.data.currentRateValue = this.data.currentType == BigWinType.big ? 0 : levelBeginValue;
        let endType = this.data.currentType + 1;
        let duration: number = 0;
        let endDelay: number = 0;

        //超過極限
        if (endType > GameConst.BIG_WIN_MULTIPLE.length - 1) {
            this.data.endRateValue = this.data.finalRateValue;
            duration = config.duration;
        }
        //最後等級,直接到終值,時間等比例換算
        else if (this.data.currentType === this.data.finalType) {
            this.data.endRateValue = this.data.finalRateValue;
            let levelEndValue = GameConst.BIG_WIN_MULTIPLE[endType] * DataManager.getInstance().bet.getBetTotal();
            duration = config.duration * (this.data.finalRateValue - this.data.currentRateValue) / (levelEndValue - this.data.currentRateValue);
            endDelay = config.duration - duration;
        }
        else {
            let levelEndValue = GameConst.BIG_WIN_MULTIPLE[endType] * DataManager.getInstance().bet.getBetTotal();
            this.data.endRateValue = levelEndValue;
            duration = config.duration;
        }

        tween(this.data)
            .to(duration, { currentRateValue: this.data.endRateValue }, {
                onUpdate: (obj: ScrollingData) => {
                    this.winLabel.string = Utils.numberFormat(obj.currentRateValue);
                }
            })
            .call(() => {
                if (this.data.endRateValue === this.data.finalRateValue) {
                    AudioManager.getInstance().stopSound(AudioKey.WinRolling);
                }
            })
            .delay(endDelay)
            .call(() => {
                //繼續下一等級
                if (this.data.currentType !== this.data.finalType) {
                    //停止播放前一等級音效
                    AudioManager.getInstance().stopSound(this.bigWinConfig[this.data.currentType].sound);

                    this.data.currentType++;
                    this.tweenAtLevel();
                }
                //BigWin結束
                else if (this.data.endRateValue === this.data.finalRateValue) {
                    this.onBigWinEnd();
                }
            })
            .start();
    }

    /**
     * 依照等級設定樣式
     * @param type 
     */
    private setTypeStyle(type: BigWinType) {
        let config = this.bigWinConfig[type];
        AudioManager.getInstance().playSound(config.sound);

        Utils.ClearSpine(this.aniWin);
        this.aniWin.setAnimation(0, config.in, false);
        this.aniWin.addAnimation(0, config.loop, true);
    }

    /**
     * 跳過大獎演示
     * @returns 
     */
    private onSkip() {
        this.node.getChildByPath('SkipSensor').off(Button.EventType.CLICK, this.onSkip, this);
        BaseEvent.keyDown.off(this);

        //正在播放才能skip
        if (!this.isPlaying) {
            return;
        }

        if (this.data.currentType !== this.data.finalType) {
            //停止播放前一等級音效
            AudioManager.getInstance().stopSound(this.bigWinConfig[this.data.currentType].sound);
            //補最後一次等級設定
            this.data.currentType = this.data.finalType;
            this.setTypeStyle(this.data.currentType);
        }
        this.isSkip = true;
        this.onBigWinEnd();
    }

    /**
     * 到達終值
     */
    private async onBigWinEnd(): Promise<void> {
        let config = this.bigWinConfig[this.data.finalType];
        this.isPlaying = false;
        Tween.stopAllByTarget(this.data);
        this.winLabel.string = Utils.numberFormat(this.data.finalRateValue);
        AudioManager.getInstance().stopSound(AudioKey.WinRolling);
        AudioManager.getInstance().stopSound(AudioKey.Win);
        AudioManager.getInstance().stopSound(config.sound);

        //除了mega以外都要播放WinEnd
        if (this.isSkip || this.data.finalType !== BigWinType.mega) {
            AudioManager.getInstance().playSound(AudioKey.WinEnd);
        }

        await Utils.delay(BaseConst.WIN_END_DELAY);
        Utils.fadeOut(this.node, 1, () => {
            this.onBigWinComplete();
        });
    }

    /**
     * 演示完畢
     */
    private onBigWinComplete() {
        AudioManager.getInstance().stopSound(AudioKey.WinEnd);
        let config = this.bigWinConfig[this.data.finalType];
        AudioManager.getInstance().stopSound(config.sound);
        AudioManager.getInstance().playSound(AudioKey.BsMusic);
        this.node.active = false;
        BigWinUI.complete.emit();
    }
}