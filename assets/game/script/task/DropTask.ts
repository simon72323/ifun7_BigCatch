
import { SymbolData } from '@game/components/slotMachine/SymbolData';
import { GameAudioKey, GameConst, SlotMachineID, SymbolID } from '@game/script/data/GameConst';

import { SlotMachine } from '@common/components/slotMachine/SlotMachine';
import { AudioManager } from '@common/script/manager/AudioManager';
import { GameTask } from '@common/script/tasks/GameTask';

/**
 * 掉落
 */
export class DropTask extends GameTask {
    protected name: string = 'DropTask';
    public preSymbolPattern: number[];
    public newSymbolPattern: number[];
    public goldenPattern: number[];
    public isScatterWin: boolean = false;
    public isLastPlane: boolean = false;

    execute(): void {

        // DataManager.getInstance().getData<GameData>().isLastPlane = this.isLastPlane;

        //預先設定此盤面是否中獎, 讓瞇牌結束可以決定要播什麼動作

        let fromAllToReel: SymbolData[][] = [];
        let allToReel: SymbolData[][] = [];
        for (let col: number = 0; col < GameConst.REEL_COL; col++) {
            let toReel: SymbolData[] = [];
            let fromReel: SymbolData[] = [];
            for (let row: number = 0; row < GameConst.REEL_ROW; row++) {
                let fromData = new SymbolData();
                fromData.symbolID = this.preSymbolPattern[col + 6 * row];
                fromData.isBadge = false;
                fromReel.push(fromData);

                let data = new SymbolData();
                data.symbolID = this.newSymbolPattern[col + 6 * row];
                data.isBadge = this.goldenPattern[col + 6 * row] > 0;
                toReel.push(data);
            }
            fromAllToReel.push(fromReel);
            allToReel.push(toReel);
        }

        // SlotMachine.drop.emit(SlotMachineID.BS, () => {

        // });

        // let numScatterInPreSymbolPattern = this.preSymbolPattern.filter((symbolID) => symbolID === SymbolID.Scatter).length;
        //瞇牌掉落
        // if (numScatterInPreSymbolPattern >= GameConst.BONUS_WIN_COUNT - 1) {
        //     SlotMachine.drop.emit(SlotMachineID.BS, () => {
        //         SlotMachine.fill.emit(SlotMachineID.BS, fromAllToReel, allToReel, () => {
        //             this.finish();
        //         });
        //     });
        // }

        // //一般掉落
        // else {
        //     SlotMachine.fill.emit(SlotMachineID.BS, fromAllToReel, allToReel, () => {
        //         this.finish();
        //     });
        // }

        SlotMachine.fillOnReel.once(() => {
            AudioManager.getInstance().playSound(GameAudioKey.down);
        }, this);
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}