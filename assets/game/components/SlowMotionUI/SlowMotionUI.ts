import { _decorator, Color, Component, sp } from 'cc';

import { AudioManager } from '@common/script/manager/AudioManager';
import { DataManager } from '@common/script/data/DataManager';;
import { XUtils } from '@base/script/utils/XUtils';

import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { GameAnimationName, GameAudioKey } from '@game/script/constant/GameConst';

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
        let len: number = DataManager.getInstance().getData().REEL_COL;
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