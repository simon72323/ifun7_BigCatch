import { _decorator } from 'cc';

import { BaseSymbolData } from 'db://assets/common/components/slotMachine/BaseSymbolData';
const { ccclass, property } = _decorator;

/**
 * 圖示盤面資料基礎(遊戲有額外資料可繼承客製化)
 */
@ccclass('SymbolData')
export class SymbolData extends BaseSymbolData {
}

