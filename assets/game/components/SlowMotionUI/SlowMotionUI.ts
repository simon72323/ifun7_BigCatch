import { _decorator, Color, Component, sp } from 'cc';

import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { GameAudioKey, GameConst } from '@game/script/data/GameConst';

import { AudioManager } from '@common/script/manager/AudioManager';
import { Utils } from '@common/script/utils/Utils';

enum SlowMotionAnimation {
    begin = 'begin',
    end = 'end',
    loop = 'loop',
}

const { ccclass, property } = _decorator;

@ccclass('SlowMotionUI')
export class SlowMotionUI extends Component {

    private miList: sp.Skeleton[] = [];
    /**紀錄是否正在瞇牌(避免淡入2次) */
    private isMi: boolean = false;

    private curIdx: number = -1;
    onLoad() {
        let len: number = GameConst.REEL_COL;
        for (let i: number = 0; i < len; ++i) {
            let anm = this.node.getChildByName(`${i}`).getComponent(sp.Skeleton);
            this.miList.push(anm);
            anm.setAnimation(0, SlowMotionAnimation.loop, true);
        }

        SlotMachine2.startMi.on((column: number) => {
            //只播一次
            AudioManager.getInstance().playSound(GameAudioKey.waiting);
            this.isMi = true;
            this.setCurrentIndex(column);
        }, this);

        SlotMachine2.stopMi.on(() => {
            if (!this.isMi) {
                return;
            }
            AudioManager.getInstance().stopSound(GameAudioKey.waiting);
            this.isMi = false;
            this.setCurrentIndex(-1);
        }, this);

        this.setCurrentIndex(-1);
    }

    private setCurrentIndex(target: number) {
        this.miList.forEach((v, idx) => {
            if (idx == this.curIdx) {
                Utils.fadeOut(v.node, 0.3, () => {
                    v.node.active = false;
                });
            }
            else {
                v.node.active = idx === target;
                v.color = Color.WHITE;
            }
        }, this);
        this.curIdx = target;
    }
}