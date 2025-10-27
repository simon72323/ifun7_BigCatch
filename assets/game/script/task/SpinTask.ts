
import { ReelBlackUI } from '@game/components/ReelBlackUI/ReelBlackUI';
import { WinScoreUI } from '@game/components/WinScoreUI/WinScoreUI';
import { IdleTask } from '@game/script/task/IdleTask';

import { SettingsController } from '@common/components/settingsController/SettingsController';
import { DataManager } from '@common/script/data/DataManager';
import { BaseEvent } from '@common/script/event/BaseEvent';
import { AudioKey } from '@common/script/manager/AudioKey';
import { AudioManager } from '@common/script/manager/AudioManager';
import { NetworkManager } from '@common/script/network/NetworkManager';
import { GameTask } from '@common/script/tasks/GameTask';
import { TaskManager } from '@common/script/tasks/TaskManager';
import { TurboMode } from '@common/script/types/BaseType';



/**
 * 共用開始轉動流程(成功送出Spin請求)
 */
export class SpinTask extends GameTask {

    protected name: string = 'BaseSpinTask';

    public isBuyFs: boolean = false;
    public betCredit: number = 0;

    async execute(): Promise<void> {
        console.log('==========================================新局開始==========================================');

        // const dataManager = DataManager.getInstance();
        AudioManager.getInstance().playSound(AudioKey.SpinLoop);

        //初始化遊戲
        BaseEvent.buyFeatureEnabled.emit(false);//禁用購買功能
        SettingsController.setEnabled.emit(false);
        ReelBlackUI.hide.emit();
        DataManager.getInstance().slotData.fsWildMultiply = 0;//重置免費遊戲 wild倍率
        // SettingsController.refreshWin.emit(0, 0);//重置贏分
        WinScoreUI.hideWin.emit();//隱藏贏得分數
        // SettingsPage1.setSpinState.emit(SpinBtnState.Loop);


        //購買免費遊戲強制取消Turbo, 但不跳通知
        if (this.isBuyFs) {
            DataManager.getInstance().curTurboMode = TurboMode.Normal;
            // dataManager.tempTurboMode = TurboMode.Normal;
            BaseEvent.setTurboBtnState.emit(TurboMode.Normal);

            //購買免費遊戲強制取消Turbo, 但不跳通知
            // Notice.showMode.emit(DataManager.getInstance().TurboMode);
        }

        //取消自動轉
        if (DataManager.getInstance().isAutoMode && DataManager.getInstance().autoSpinCount <= 0) {
            DataManager.getInstance().isAutoMode = false;
        }

        // BannerUI.reset.emit();//還原跑馬燈狀態
        //考量到先轉型、後轉型, 所以音效要在spin監聽
        // SlotMachine.spinComplete.once(() => {
        //     // AudioManager.getInstance().playSound(GameAudioKey.in);
        // }, this);

        const isBS = DataManager.getInstance().isBS();
        // if (isBS) {
        //     //先轉型(免費遊戲直接給結果不轉動)
        //     // if (!DataManager.getInstance().isBuyFs) {
        //     SlotMachine.spin.emit();
        //     // }
        // }

        //判斷要傳送一般spin還是免費spin(檢查一下免費遊戲按下時是否有變更成FS模式)
        // const isBuyFs = DataManager.getInstance().isBuyFs;
        // let betCredit = this.isBuyFs ? DataManager.getInstance().bet.getBuyFeatureTotal() : DataManager.getInstance().bet.getBetTotal();
        let spinID = this.isBuyFs ? 1 : 0;

        //發送spin請求
        console.log('發送spin請求', spinID);

        //跑假資料------------------------
        // const fakeSpinResult = { 'game_id': 5800, 'main_game': { 'pay_credit_total': 1.5, 'game_result': [[1, 17, 18], [19, 1, 1], [5, 6, 16], [18, 19, 6], [20, 17, 16]], 'pay_line': [{ 'pay_line': 6, 'symbol_id': 1, 'amount': 2, 'pay_credit': 1.5, 'multiplier': 1 }], 'scatter_info': { 'id': [20], 'position': [[4, 0]], 'amount': 1, 'multiplier': 0, 'pay_credit': 0, 'pay_rate': 0 }, 'wild_info': null, 'scatter_extra': null, 'extra': null }, 'get_sub_game': false, 'sub_game': { 'game_result': null, 'pay_credit_total': 0, 'over_win': false }, 'get_jackpot': false, 'jackpot': { 'jackpot_id': '', 'jackpot_credit': 0, 'symbol_id': null }, 'get_jackpot_increment': false, 'jackpot_increment': null, 'grand': 0, 'major': 0, 'minor': 0, 'mini': 0, 'user_credit': 499999995.5, 'bet_credit': 3, 'payout_credit': 1.5, 'change_credit': -1.5, 'effect_credit': 3, 'buy_spin': 0, 'buy_spin_multiplier': 1, 'extra': null };
        // const fakeSpinResult = {
        //     'game_id': 5800,
        //     'main_game': {
        //         'pay_credit_total': 0,
        //         'game_result': [
        //             [15, 19, 20],
        //             [18, 20, 16],
        //             [20, 17, 15],
        //             [19, 2, 15],
        //             [17, 19, 5]
        //         ],
        //         'pay_line': [],
        //         'scatter_info': {
        //             'id': [20],
        //             'position': [
        //                 [0, 2],
        //                 [1, 1],
        //                 [2, 0]
        //             ],
        //             'amount': 3,
        //             'multiplier': 0,
        //             'pay_credit': 0,
        //             'pay_rate': 0
        //         },
        //         'wild_info': null,
        //         'scatter_extra': null,
        //         'extra': null
        //     },
        //     'get_sub_game': true,
        //     'sub_game': {
        //         'game_result': [{
        //             'pay_credit_total': 27,
        //             'game_result': [
        //                 [18, 16, 5],
        //                 [6, 2, 17],
        //                 [0, 15, 18],
        //                 [18, 17, 3],
        //                 [5, 19, 17]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 1,
        //                 'wild_pos': [
        //                     [2, 0]
        //                 ]
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [5, 9, 15],
        //                 [1, 18, 4],
        //                 [16, 19, 2],
        //                 [6, 6, 18],
        //                 [17, 4, 3]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 1,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [17, 5, 6],
        //                 [1, 18, 19],
        //                 [15, 19, 3],
        //                 [15, 1, 18],
        //                 [15, 16, 15]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 1,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 36,
        //             'game_result': [
        //                 [1, 17, 18],
        //                 [4, 19, 2],
        //                 [17, 3, 17],
        //                 [0, 16, 18],
        //                 [18, 5, 7]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 2,
        //                 'wild_pos': [
        //                     [3, 0]
        //                 ]
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [17, 18, 4],
        //                 [18, 19, 0],
        //                 [4, 19, 2],
        //                 [19, 17, 3],
        //                 [0, 15, 16]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': true,
        //                 'total_wild_count': 4,
        //                 'wild_pos': [
        //                     [1, 2],
        //                     [4, 0]
        //                 ]
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [2, 19, 1],
        //                 [18, 4, 19],
        //                 [15, 16, 1],
        //                 [18, 19, 5],
        //                 [16, 15, 19]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 4,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [15, 16, 1],
        //                 [19, 5, 2],
        //                 [17, 6, 6],
        //                 [18, 19, 5],
        //                 [18, 1, 16]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 4,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [19, 3, 17],
        //                 [6, 5, 17],
        //                 [8, 5, 19],
        //                 [17, 16, 2],
        //                 [3, 3, 15]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 4,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [18, 5, 5],
        //                 [2, 17, 16],
        //                 [17, 2, 17],
        //                 [17, 18, 4],
        //                 [18, 6, 5]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 4,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 33,
        //             'game_result': [
        //                 [15, 16, 5],
        //                 [17, 1, 18],
        //                 [5, 5, 2],
        //                 [6, 15, 19],
        //                 [15, 0, 15]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 5,
        //                 'wild_pos': [
        //                     [4, 1]
        //                 ]
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [17, 6, 6],
        //                 [18, 17, 3],
        //                 [19, 2, 15],
        //                 [19, 5, 5],
        //                 [2, 16, 18]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 5,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [5, 15, 16],
        //                 [3, 19, 17],
        //                 [17, 3, 15],
        //                 [17, 1, 18],
        //                 [17, 4, 3]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 5,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 12,
        //             'game_result': [
        //                 [15, 19, 3],
        //                 [18, 4, 19],
        //                 [19, 2, 15],
        //                 [5, 18, 17],
        //                 [17, 15, 0]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 6,
        //                 'wild_pos': [
        //                     [4, 2]
        //                 ]
        //             }
        //         }, {
        //             'pay_credit_total': 30,
        //             'game_result': [
        //                 [15, 18, 1],
        //                 [18, 17, 3],
        //                 [6, 19, 17],
        //                 [1, 18, 19],
        //                 [15, 0, 15]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': [
        //                     [4, 1]
        //                 ]
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [3, 17, 18],
        //                 [2, 17, 16],
        //                 [17, 2, 17],
        //                 [17, 15, 2],
        //                 [18, 3, 17]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [15, 19, 3],
        //                 [18, 17, 3],
        //                 [15, 18, 2],
        //                 [19, 1, 17],
        //                 [5, 6, 5]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [17, 18, 4],
        //                 [2, 17, 15],
        //                 [5, 6, 6],
        //                 [17, 3, 19],
        //                 [3, 3, 15]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0.6000000000000001,
        //             'game_result': [
        //                 [1, 18, 17],
        //                 [18, 2, 17],
        //                 [18, 4, 19],
        //                 [16, 18, 1],
        //                 [19, 3, 17]
        //             ],
        //             'pay_line': [{
        //                 'pay_line': 3,
        //                 'symbol_id': 18,
        //                 'amount': 3,
        //                 'pay_credit': 0.6000000000000001,
        //                 'multiplier': 1
        //             }],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [16, 1, 17],
        //                 [18, 2, 17],
        //                 [2, 15, 16],
        //                 [5, 2, 18],
        //                 [17, 18, 18]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [19, 17, 3],
        //                 [19, 2, 15],
        //                 [15, 1, 18],
        //                 [15, 1, 18],
        //                 [17, 5, 5]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }, {
        //             'pay_credit_total': 0,
        //             'game_result': [
        //                 [8, 18, 19],
        //                 [15, 1, 18],
        //                 [19, 2, 15],
        //                 [8, 18, 17],
        //                 [17, 3, 18]
        //             ],
        //             'pay_line': [],
        //             'scatter_info': null,
        //             'wild_info': null,
        //             'scatter_extra': null,
        //             'extra': {
        //                 'no_m_add_spin': false,
        //                 'total_wild_count': 7,
        //                 'wild_pos': null
        //             }
        //         }],
        //         'pay_credit_total': 138.6,
        //         'over_win': false
        //     },
        //     'get_jackpot': false,
        //     'jackpot': {
        //         'jackpot_id': '',
        //         'jackpot_credit': 0,
        //         'symbol_id': null
        //     },
        //     'get_jackpot_increment': false,
        //     'jackpot_increment': null,
        //     'grand': 0,
        //     'major': 0,
        //     'minor': 0,
        //     'mini': 0,
        //     'user_credit': 499999988.6,
        //     'bet_credit': 150,
        //     'payout_credit': 138.6,
        //     'change_credit': -11.4,
        //     'effect_credit': 150,
        //     'buy_spin': 1,
        //     'buy_spin_multiplier': 50,
        //     'extra': null
        // };
        //多重連線
        // const fakeSpinResult = {'game_id':5800,'main_game':{'pay_credit_total':18,'game_result':[[1,19,2],[1,1,1],[1,17,15],[2,18,16],[18,16,1]],'pay_line':[{'pay_line':1,'symbol_id':1,'amount':3,'pay_credit':15,'multiplier':1},{'pay_line':6,'symbol_id':1,'amount':2,'pay_credit':1.5,'multiplier':1},{'pay_line':8,'symbol_id':1,'amount':2,'pay_credit':1.5,'multiplier':1}],'scatter_info':{'id':[20],'position':null,'amount':0,'multiplier':0,'pay_credit':0,'pay_rate':0},'wild_info':null,'scatter_extra':null,'extra':null},'get_sub_game':false,'sub_game':{'game_result':null,'pay_credit_total':0,'over_win':false},'get_jackpot':false,'jackpot':{'jackpot_id':'','jackpot_credit':0,'symbol_id':null},'get_jackpot_increment':false,'jackpot_increment':null,'grand':0,'major':0,'minor':0,'mini':0,'user_credit':500000000,'bet_credit':3,'payout_credit':18,'change_credit':15,'effect_credit':3,'buy_spin':0,'buy_spin_multiplier':1,'extra':null};


        // BaseEvent.onSpinResult.emit(fakeSpinResult);
        // //更新玩家餘額(減去spin額度)
        // const newUserCredit = dataManager.userCredit - betCredit;
        // SettingsController.refreshCredit.emit(newUserCredit);
        // dataManager.userCredit = newUserCredit;
        // this.finish();
        //跑假資料------------------------

        //真資料
        NetworkManager.getInstance().sendSpin(spinID, (spinResult) => {
            DataManager.getInstance().isBuyFs = false;//還原免費遊戲
            // DataManager.getInstance().featureBuyType = 0;
            // AudioManager.getInstance().stopSound(AudioKey.SpinLoop);//收到結果就停止loop音效

            //判斷是否有spin成功回傳資料
            if (spinResult) {
                BaseEvent.onSpinResult.emit(spinResult);
                //更新玩家餘額(減去總下注額度)
                const newUserCredit = DataManager.getInstance().userCredit - this.betCredit;
                SettingsController.refreshCredit.emit(newUserCredit);
                DataManager.getInstance().userCredit = newUserCredit;
            } else if (isBS) {
                TaskManager.getInstance().addTask(new IdleTask());//Spin失敗且是BS模式要回idle
            }
            this.finish();
        });
    }

    /**持續更新 */
    update(_deltaTime: number): void {
        // throw new Error('Method not implemented.');
    }
}