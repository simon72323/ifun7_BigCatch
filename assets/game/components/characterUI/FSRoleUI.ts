import { _decorator, Component, sp } from 'cc';
import { AudioManager } from '@/base/script/audio/AudioManager';
import { BaseEvent } from '@/base/script/main/BaseEvent';
import { ModuleID } from '@/base/script/types/BaseType';
import { XEvent, XEvent1 } from '@/base/script/utils/XEvent';
import { XUtils } from '@/base/script/utils/XUtils';
import { GameAudioKey, GameConst } from '../../script/constant/GameConst';
const { ccclass, property } = _decorator;

/**
 * FS角色
 */
@ccclass('FSRoleUI')
export class FSRoleUI extends Component {


    /**待機 */
    public static idle: XEvent = new XEvent();

    /**播放開始 */
    public static prepare: XEvent = new XEvent();

    /**播放開始 */
    public static shoot: XEvent1<number> = new XEvent1();

    /**播放收槍 */
    public static reset: XEvent = new XEvent();
    /**播放結束 */
    public static final: XEvent1<() => void> = new XEvent1();

    private spine: sp.Skeleton = null;

    private multiplierList: number[] = [16, 64, 512];
    private prefixList: string[] = ["1", "2", "3"];
    private curPrefix: string = "";
    private hitMultiplier: number = -1;
    private soundTimeList: number[][] = [[0.4], [0.3, 0.6], [0.2, 0.4, 0.6]];

    onLoad() {

        this.spine = this.node.getChildByName("fg_character_ani").getComponent(sp.Skeleton);

        BaseEvent.changeScene.on(this.onChangeScene, this);

        FSRoleUI.idle.on(this.onIdle, this);
        FSRoleUI.prepare.on(this.onPrepare, this);
        FSRoleUI.shoot.on(this.onShoot, this);
        FSRoleUI.reset.on(this.onReset, this);
        FSRoleUI.final.on(this.onFinal, this);

        this.onLoop();

        this.onChangeScene(ModuleID.BS);
    }

    /**
     * 切換場景動畫
     * @param id 
     */
    private onChangeScene(id: ModuleID) {
        this.node.active = id !== ModuleID.BS;
    }

    private onIdle(): void {
        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(null);
        this.spine.setAnimation(0, FSAni.idel, true);
    }

    private onLoop(): void {
        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(() => {
            this.onLoop();
        })
        if (Math.random() <= 0.1) {
            this.spine.setAnimation(0, FSAni.fire_loop_B, false);
            this.scheduleOnce(() => {
                AudioManager.getInstance().play(GameAudioKey.rotation);
            }, 0.1);
        }
        else {
            this.spine.setAnimation(0, FSAni.fire_loop_A, false);
        }
    }

    private onPrepare(): void {
        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(null);
        this.spine.addAnimation(0, FSAni.to_prepare, false);
        this.spine.addAnimation(0, FSAni.prepare, true);

    }

    /**
     * 開槍動畫
     * @param hitMultiplier 
     */
    private onShoot(hitMultiplier: number): void {
        let aniIdx: number = 0;
        this.hitMultiplier = hitMultiplier;
        let aniName: string = FSAni.fire_start;

        if (this.hitMultiplier > GameConst.FS_INIT_MULTIPLIER) {
            this.multiplierList.forEach((value, idx) => {
                if (hitMultiplier >= value) {
                    aniIdx = idx;
                }
            })
            this.curPrefix = this.prefixList[aniIdx];
            aniName = FSAni.fire_hitX.replace("#", this.curPrefix);
        }

        let timeList = this.soundTimeList[aniIdx];
        timeList.forEach((t, idx) => this.scheduleOnce(() => {
            AudioManager.getInstance().playOneShot(GameAudioKey.hitGun);
            this.scheduleOnce(() => {
                AudioManager.getInstance().playOneShot(GameAudioKey.shot);
            }, 0.05);
        }, t));


        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(() => {
            this.spine.setCompleteListener(null);
            this.onLoop();
        });
        this.spine.addAnimation(0, aniName, false);

        if (aniName === FSAni.fire_start) {
            AudioManager.getInstance().play(GameAudioKey.dg);
        }
    }


    private onReset(): void {

        //-1表示該局沒中獎, 不用收槍
        if (this.hitMultiplier === -1) {
            return;
        }

        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(null);
        this.spine.addAnimation(0, FSAni.fire_end, false);
        this.spine.addAnimation(0, FSAni.prepare, true);

        AudioManager.getInstance().play(GameAudioKey.putaway);
        AudioManager.getInstance().play(GameAudioKey.laughing);

        this.hitMultiplier = -1;
        this.curPrefix = "";
    }

    private onFinal(onComplete): void {
        let timeList = this.soundTimeList[2];
        timeList.forEach((t, idx) => this.scheduleOnce(() => {
            AudioManager.getInstance().playOneShot(GameAudioKey.hitGun);
            this.scheduleOnce(() => {
                AudioManager.getInstance().playOneShot(GameAudioKey.shot);
            }, 0.05);
        }, t));
        this.scheduleOnce(() => {
            AudioManager.getInstance().play(GameAudioKey.die);//死亡聲+轉槍聲+收槍聲
        }, timeList[timeList.length - 1] + 0.5);


        let endAni = this.hitMultiplier > GameConst.FS_INIT_MULTIPLIER ? FSAni.end_a : FSAni.end_b;
        XUtils.ClearSpine(this.spine);
        this.spine.setCompleteListener(() => {
            onComplete();
        });
        this.spine.setAnimation(0, endAni, false);
    }
}


enum FSAni {
    end_a = "end_a",
    end_b = "end_b",
    fire_end = "fire_end",
    fire_hit1 = "fire_hit1",
    fire_hit2 = "fire_hit2",
    fire_hit3 = "fire_hit3",
    fire_loop_A = "fire_loop_A",
    fire_loop_B = "fire_loop_B",
    fire_start = "fire_start",
    fire_win = "fire_win",//
    idel = "idel",
    prepare = "prepare",
    to_prepare = "to_prepare",

    fire_hitX = "fire_hit#",

}
