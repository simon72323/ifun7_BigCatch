// import { BannerUI } from '@game/components/BannerUI/BannerUI';
// import { FSUI } from '@game/components/FSUI/FSUI';
// import { GameConst } from '@game/script/data/GameConst';

// import { AudioKey } from '@common/script/manager/AudioKey';
// import { AudioManager } from '@common/script/manager/AudioManager';
// import { GameTask } from '@common/script/tasks/GameTask';
// import { Utils } from '@common/script/utils/Utils';


// /**
//  * 更新剩餘次數
//  */
// export class UpdateTimesTask extends GameTask {

//     protected name: string = 'UpdateTimesTask';

//     /**當前剩餘次數 */
//     public times: number;

//     /**目標次數 */
//     // public to: number;

//     async execute(): Promise<void> {

//         AudioManager.getInstance().playSound(AudioKey.Retrigger);

//         //直接設定
//         if (this.from === -1 || this.from === this.to) {
//             FSUI.refreshRemainTimes.emit(this.to);
//             this.finish();
//         }
//         //增加轉數
//         else if (this.from !== this.to) {
//             let round: number = this.to - this.from;
//             let repeat: number = round - 1;//schedule內會自動+1, 所以次數要-1
//             BannerUI.retrigger.emit(round);
//             FSUI.refreshRemainTimes.emit(this.from);
//             Utils.schedule(() => {
//                 FSUI.refreshRemainTimes.emit(++this.from);
//             }, this, GameConst.BONUS_TIME_ADD_INTERVAL, repeat);

//             Utils.scheduleOnce(() => {
//                 this.finish();
//             }, GameConst.BONUS_TIME_ADD_INTERVAL * (round + 1), this);
//         }
//     }

//     update(deltaTime: number): void {
//         // throw new Error('Method not implemented.');
//     }
// }