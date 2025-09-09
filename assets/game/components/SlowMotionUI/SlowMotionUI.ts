import { _decorator, Color, Component, sp } from 'cc';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { BaseDataManager } from '@/base/script/main/BaseDataManager';
import { XUtils } from '@/base/script/utils/XUtils';
import { GameAnimationName, GameAudioKey } from '@/game/script/constant/GameConst';
import { SlotMachine2 } from '../slotMachine2/base/slotMachine2/SlotMachine2';
const { ccclass, property } = _decorator;

@ccclass('SlowMotionUI')
export class SlowMotionUI extends Component {

    private miList: sp.Skeleton[] = [];
    /**紀錄是否正在瞇牌(避免淡入2次) */
    private isMi: boolean = false;

    private curIdx: number = -1;
    onLoad() {
        let len: number = BaseDataManager.getInstance().getData().REEL_COL;
        for (let i: number = 0; i < len; ++i) {
            let anm = this.node.getChildByName(`${i}`).getComponent(sp.Skeleton);
            this.miList.push(anm);
            anm.setAnimation(0, SlowMotionAnimation.loop, true);
        }

        SlotMachine2.startMi.on((id, column) => {
            //只播一次
            AudioManager.getInstance().play(GameAudioKey.waiting);
            this.isMi = true;
            this.setCurrentIndex(column);
        }, this);

        SlotMachine2.stopMi.on((id) => {
            if (!this.isMi) {
                return;
            }
            AudioManager.getInstance().stop(GameAudioKey.waiting);
            this.isMi = false;
            this.setCurrentIndex(-1);
        }, this);

        this.setCurrentIndex(-1);
    }

    private setCurrentIndex(target: number) {
        this.miList.forEach((v, idx) => {
            if (idx == this.curIdx) {
                XUtils.playAnimation(v.node, GameAnimationName.fadeOutSpine, 0.3, () => {
                    v.node.active = false;
                });
            }
            else {
                // v.node.getComponent(Animation).stop();
                v.node.active = idx === target;
                v.color = Color.WHITE;
            }
        }, this);
        this.curIdx = target;
    }
}

enum SlowMotionAnimation {
    begin = "begin",
    end = "end",
    loop = "loop",
}
