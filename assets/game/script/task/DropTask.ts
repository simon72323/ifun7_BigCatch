import { AudioManager } from '@base/script/audio/AudioManager';
import { DataManager } from '@common/script/data/DataManager';;
import { GameTask } from '@base/script/tasks/GameTask';

import { BSRoleUI } from '@game/components/characterUI/BSRoleUI';
import { SlotMachine2 } from '@game/components/slotMachine2/base/slotMachine2/SlotMachine2';
import { SymbolData2 } from '@game/components/slotMachine2/SymbolData2';
import { GameAudioKey, GameConst, SlotMachineID, SymbolID } from '@game/script/constant/GameConst';
import { GameData } from '@game/script/main/GameData';
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
        BSRoleUI.scatterWin.emit(this.isScatterWin);

        let fromAllToReel: SymbolData2[][] = [];
        let allToReel: SymbolData2[][] = [];
        for (let col: number = 0; col < DataManager.getInstance().getData().REEL_COL; col++) {
            let toReel: SymbolData2[] = [];
            let fromReel: SymbolData2[] = [];
            for (let row: number = 0; row < DataManager.getInstance().getData().REEL_ROW; row++) {
                let fromData = new SymbolData2();
                fromData.symbolID = this.preSymbolPattern[col + 6 * row];
                fromData.isBadge = false;
                fromReel.push(fromData);

                let data = new SymbolData2();
                data.symbolID = this.newSymbolPattern[col + 6 * row];
                data.isBadge = this.goldenPattern[col + 6 * row] > 0;
                toReel.push(data);
            }
            fromAllToReel.push(fromReel);
            allToReel.push(toReel);
        }

        // SlotMachine2.drop.emit(SlotMachineID.BS, () => {

        // });

        let numScatterInPreSymbolPattern = this.preSymbolPattern.filter((symbolID) => symbolID === SymbolID.Scatter).length;
        //瞇牌掉落
        if (numScatterInPreSymbolPattern >= GameConst.BONUS_WIN_COUNT - 1) {
            SlotMachine2.drop.emit(SlotMachineID.BS, () => {
                SlotMachine2.fill.emit(SlotMachineID.BS, fromAllToReel, allToReel, () => {
                    this.finish();
                });
            });
        }
        //一般掉落
        else {
            SlotMachine2.fill.emit(SlotMachineID.BS, fromAllToReel, allToReel, () => {
                this.finish();
            });
        }

        SlotMachine2.fillOnReel.once((id: number, reelIndex: number) => {
            AudioManager.getInstance().play(GameAudioKey.down);
        }, this);
    }

    update(deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}