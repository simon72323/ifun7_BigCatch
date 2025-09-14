import { _decorator } from 'cc';
const { ccclass } = _decorator;

/**
 * 圖示盤面資料基礎(遊戲有額外資料可繼承再添加客製化資料)
 */
@ccclass('BaseDropSymbolData')
export class BaseDropSymbolData {
    public symbolID: number = -1;
}

