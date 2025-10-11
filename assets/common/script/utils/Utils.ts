import { EventHandler, bezier, JsonAsset, resources, CurveRange, _decorator, Enum, EventTarget, game, Node, tween, Vec3, UIOpacity, director, Scheduler, Component, Button, Toggle, sp } from 'cc';
import { PREVIEW, EDITOR } from 'cc/env';

import { BaseConfig } from '@common/script/data/BaseConfig';
import { Grid } from '@common/script/types/BaseType';


// declare const gtag: (command: string, event: string, data?: any) => void;

const { ccclass, property } = _decorator;

// export namespace _utilsDecorator {
//     /**
//      * 定義為只有在開發站才會執行的函式
//      * @param value 
//      * @returns 
//      */
//     export function isDevelopFunction(value: boolean = true) {
//         return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//             if (value === false) return;
//             if (typeof EDITOR !== 'undefined' && EDITOR === true) return;
//             if (Utils.isDevelopment() !== true) {
//                 target[propertyKey] = () => { return; };
//                 console.log = () => { };
//             }
//         };
//     }
// }

// export enum DATA_TYPE {
//     NODE = 0, // 節點
//     COMPONENT = 1, // 組件
//     TYPE = 2, // 組件類型
//     NODE_PATH = 3, // 節點路徑
//     CLICK_EVENT = 4, // 點擊事件
//     SCENE_PATH = 5, // 場景路徑
// }

export class Utils {
    //================= 用到的 Utils =================
    /**
     * 數字格式化，添加千分位逗號
     * @param value 要格式化的數字
     * @returns 格式化後的字符串
     */
    public static numberFormat(value: number): string {
        let decimalPoint = BaseConfig.DecimalPlaces;
        const preciseValue = Utils.accMul(value, 1);
        return Number(preciseValue.toFixed(decimalPoint)).toLocaleString('en', {
            minimumFractionDigits: decimalPoint
        });
    }

    /**
     * 精確數字
     * @param value 要精確的數字
     * @returns 精確的數字
     */
    public static accNumber(value: number): number {
        return Utils.accMul(value, 1);
    }

    /**
     * 精確乘法
     * @param arg1 第一個數
     * @param arg2 第二個數
     * @returns 精確的乘積
     */
    public static accMul(arg1: number, arg2: number): number {
        const arg1Str = `${arg1}`;
        const arg2Str = `${arg2}`;
        let pow = 0;

        const arg1Decimal = arg1Str.split('.')[1];
        const arg2Decimal = arg2Str.split('.')[1];

        pow += arg1Decimal ? arg1Decimal.length : 0;
        pow += arg2Decimal ? arg2Decimal.length : 0;

        const r1 = +arg1Str.replace('.', '');
        const r2 = +arg2Str.replace('.', '');

        return r1 * r2 / Math.pow(10, pow);
    }

    /**
     * 精確除法
     * @param arg1 被除數
     * @param arg2 除數
     * @returns 精確的商
     */
    public static accDiv(arg1: number, arg2: number): number {
        const arg1Str = `${arg1}`;
        const arg2Str = `${arg2}`;

        const t1 = arg1Str.split('.')[1]?.length || 0;
        const t2 = arg2Str.split('.')[1]?.length || 0;

        const r1 = +arg1Str.replace('.', '');
        const r2 = +arg2Str.replace('.', '');

        return Utils.accMul(r1 / r2, +`1e${t2 - t1}`);
    }

    /**
     * 精確加法
     * @param arg1 第一個數
     * @param arg2 第二個數
     * @returns 精確的和
     */
    public static accAdd(arg1: number, arg2: number): number {
        let r1 = 0;
        let r2 = 0;
        let m: number;

        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch {
            // 忽略錯誤
        }

        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch {
            // 忽略錯誤
        }

        m = Math.pow(10, Math.max(r1, r2));
        return (Utils.accMul(arg1, m) + Utils.accMul(arg2, m)) / m;
    }

    /**
     * 延遲執行
     * @param callback 要執行的回調函數
     * @param delay 延遲秒數
     * @param scope 作用域（this 指向）
     */
    public static scheduleOnce(callback: (dt?: number) => void, delay: number, scope: any) {
        Utils.schedule(callback, scope, 0, 0, delay);
    }

    /**
     * 延遲執行
     * @param callback 要執行的回調函數
     * @param scope 作用域（this 指向）
     * @param interval 間隔秒數
     * @param repeat 重複次數
     * @param delay 延遲秒數
     */
    public static schedule(callback: (dt?: number) => void, scope: any, interval: number, repeat?: number, delay?: number) {
        Scheduler.enableForTarget(scope);
        director.getScheduler().schedule(callback, scope, interval, repeat, delay, false);
    }

    /**
     * 取消延遲執行
     * @param callback 要執行的回調函數
     * @param scope 作用域（this 指向）
     */
    public static unschedule(callback: (dt?: number) => void, scope: any) {
        director.getScheduler().unschedule(callback, scope);
    }

    /**
     * 精確減法
     * @param arg1 被減數
     * @param arg2 減數
     * @returns 精確的差
     */
    public static accSub(arg1: number, arg2: number): number {
        return Utils.accAdd(arg1, -arg2);
    }

    /**
     * 根據中獎線ID獲取路徑位置
     * @param payLineId 中獎線ID (從1開始)
     * @param amount 需要的位置数量
     * @param payLineData 中獎線路徑配置
     * @returns 路徑位置數組
     */
    public static getLinePathPosition(payLineId: number, amount: number, gameResult: number[], payLineData: number[][]): { winPos: number[], symbolIDs: number[] } {
        const linePath = payLineData[payLineId - 1]; // payLineId從1開始
        let winPos: number[] = [];
        let symbolIDs: number[] = [];

        // 從payLineData推導出行數 (假設所有路徑都有相同的行數)
        const rowCount = Math.max(...payLineData.flat()) + 1; // 最大行號 + 1

        // 根據amount限制返回的位置數量
        for (let col = 0; col < linePath.length && col < amount; col++) {
            const row = linePath[col];
            const pos = col * rowCount + row;
            winPos.push(pos);
            symbolIDs.push(gameResult[pos]);
        }

        return { winPos, symbolIDs };
    }

    /**
     * 排除陣列重複資料
     * @param list 
     * @returns 
     */
    public static uniq(list: any[]) {
        return Array.from(new Set(list));
    }

    /**
     * 清除Spine
     * @param obj 
     */
    public static ClearSpine(obj: sp.Skeleton) {
        obj.clearTracks();
        obj.setToSetupPose();
        obj.setCompleteListener(null);
    }
    //================= 用到的 Utils =================


    //================= 動畫相關 =================
    /**
     * 淡入
     * @param node 
     * @param time 
     * @param callback 
     */
    public static fadeIn(node: Node, time: number, callback?: () => void) {
        if (node.getComponent(UIOpacity) == null) {
            node.addComponent(UIOpacity);
        }
        node.getComponent(UIOpacity).opacity = 0;
        tween(node.getComponent(UIOpacity))
            .to(time, { opacity: 255 })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }

    /**
     * 淡出
     * @param node 
     * @param time 
     * @param callback 
     */
    public static fadeOut(node: Node, time: number, callback?: () => void) {
        if (node.getComponent(UIOpacity) == null) {
            node.addComponent(UIOpacity);
        }
        node.getComponent(UIOpacity).opacity = 255;
        tween(node.getComponent(UIOpacity))
            .to(time, { opacity: 0 })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }

    /**
     * 縮放動態
     * @param node 
     * @param time 
     * @param startScale 起始縮放
     * @param endScale 結束縮放
     * @param callback 
     */
    public static tweenScaleTo(node: Node, time: number, startScale: number, endScale: number, callback?: () => void) {
        node.scale = new Vec3(startScale, startScale, 1);
        tween(node)
            .to(time, { scale: new Vec3(endScale, endScale, 1) }, { easing: 'sineOut' })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }
    //================= 動畫相關 =================

    //================= 以下待確認 =================
    /**
     * 貝茲曲線動畫
     * @param t 時間
     * @param p1 起始點
     * @param cp1 控制點1
     * @param cp2 控制點2
     * @param p2 結束點
     * @returns 貝茲曲線動畫結果
     */
    public static twoBezier(t: number, p1: Vec3, cp1: Vec3, cp2: Vec3, p2: Vec3): Vec3 {
        const x = bezier(p1.x, cp1.x, cp2.x, p2.x, t);
        const y = bezier(p1.y, cp1.y, cp2.y, p2.y, t);
        return new Vec3(x, y, 0);
    }

    /**
     * 移動動畫
     * @param target 目標節點
     * @param toPos 目標位置
     * @param duration 動畫持續時間
     * @param option 選項
     */
    public static async tweenMove(target: Node, toPos: Vec3 | Node, duration: number = 1, option?: any | { onFinish?: Function, isWorldPos?: boolean, onUpdate?: (frame: number) => {} }) {
        const isWorldPos = option?.isWorldPos;
        const fromPos = option?.isWorldPos ? target.worldPosition.clone() : target.position.clone();
        const toPosition = (toPos instanceof Node) ? isWorldPos ? toPos.worldPosition : toPos.position : toPos;

        let eventTarget = new EventTarget();

        let onUpdate = (movePos: Vec3) => {
            if (isWorldPos) target.worldPosition = movePos;
            else target.position = movePos;

            if (option?.onUpdate != null) option.onUpdate(movePos);
        };
        let onComplete = () => { eventTarget.emit('done'); };

        tween(fromPos).to(duration, toPosition, { onUpdate: (x) => onUpdate(x), onComplete }).start();
        await Utils.delayEvent(eventTarget);
        eventTarget.removeAll('done');
        eventTarget = null;
        if (option?.onFinish != null) option.onFinish();
    }

    /**
     * 貝茲曲線動畫
     * @param target 目標節點
     * @param toPos 目標位置
     * @param option 選項
     */
    public static async tweenBezierCurve(target: Node, toPos: Vec3, option: any | { duration?: number, onFinish?: Function, isWorldPos?: boolean, middlePos?: Vec3, middlePos2?: Vec3, onUpdate?: (frame: number) => {} }) {
        if (option.isWorldPos == null) option.isWorldPos = true;

        const fromPos = option.isWorldPos ? target.worldPosition.clone() : target.position.clone();
        if (option.middlePos == null) {
            // 找出中間點 附上一點點的隨機值
            option.middlePos = fromPos.clone();
            option.middlePos.x += Utils.Random(-1, 2) * 300 + Utils.Random(-150, 150);
            option.middlePos.y += Utils.Random(-1, 2) * 300 + Utils.Random(-150, 150);
        }

        if (option.middlePos2 == null) {
            option.middlePos2 = toPos.clone();
        }

        if (option.duration == null) option.duration = 1;

        let eventTarget = new EventTarget();
        let tValue = { t: 0 }; // 用於跟踪 t 的值
        let onUpdate = (obj) => {
            const movePos = Utils.twoBezier(obj.t, fromPos, option.middlePos, option.middlePos2, toPos);
            if (option.isWorldPos) target.worldPosition = movePos;
            else target.position = movePos;

            if (option.onUpdate != null) option.onUpdate(obj.t);
        };
        let onComplete = () => { eventTarget.emit('done'); };

        tween(tValue).to(option.duration, { t: 1 }, { onUpdate: () => onUpdate(tValue), onComplete }).start();
        await Utils.delayEvent(eventTarget);
        eventTarget.removeAll('done');
        eventTarget = null;
        if (option.onFinish != null) option.onFinish();
    }

    /**
     * 貝茲曲線動畫
     * @param target 目標節點
     * @param toPos 目標位置
     * @param duration 動畫持續時間
     * @param onFinish 動畫完成後的回調函數
     * @param isWorldPos 是否使用世界坐標
     * @param easing 動畫緩動函數
     */
    public static async tweenBezierCurve2(target: Node, toPos: Vec3, duration: number, onFinish: Function, isWorldPos: boolean, easing: any = 'smooth') {
        let eventTarget = new EventTarget();
        let onComplete = () => { eventTarget.emit('done'); };
        if (isWorldPos) {
            tween(target).to(duration, { worldPosition: toPos }, { easing, onComplete }).start();
        } else {
            tween(target).to(duration, { position: toPos }, { easing, onComplete }).start();
        }
        await Utils.delayEvent(eventTarget);
        eventTarget.removeAll('done');
        eventTarget = null;
        if (onFinish != null) onFinish();
    }

    /**
     * 合併兩個 JSON 物件
     * @param target 目標 JSON 物件
     * @param source 源 JSON 物件
     * @returns 合併後的 JSON 物件
     */
    public static mergeJsonData(target: any, source: any) {
        const result = target ?? {};
        if (source == null) return target;

        let keys = Object.keys(source);
        for (let i in keys) {
            let key = keys[i];
            target[key] = source[key];
        }

        return target;
    }

    /**
     * 添加手型懸停事件
     * @param target 目標節點
     */
    public static AddHandHoverEvent(target: Node) {
        target.on(Node.EventType.MOUSE_ENTER, () => { game.canvas.style.cursor = 'pointer'; });
        target.on(Node.EventType.MOUSE_LEAVE, () => { game.canvas.style.cursor = 'default'; });
    }

    private static seed: number = Date.now();

    /**
     * 獲取隨機數
     * @param min 最小值
     * @param max 最大值
     * @returns 隨機數
     */
    private static seededRandom(min: number, max: number): number {
        Utils.seed = (Utils.seed * 9301 + 49297) % 233280;
        const rnd = Utils.seed / 233280;
        return Math.floor(min + rnd * (max - min));
    }

    /**
     * 獲取隨機數
     * @param min 最小值
     * @param max 最大值
     * @returns 隨機數
     */
    public static Random(min: number = 0, max: number): number {
        return Utils.seededRandom(min, max);
    }


    /**
     * 加法
     * @param x 
     * @param y 
     * @returns 加法結果
     */
    public static add(x: number, y: number): number {
        return (x * 1000 + y * 1000) / 1000;
    }

    /**
     * 獲取枚舉的所有鍵
     * @param enumType 枚舉
     * @returns 枚舉的所有鍵
     */
    public static getEnumKeys(enumType: any): Array<string> {
        return Object.keys(enumType).filter(item => isNaN(Number(item)));
    }

    protected static encoder: TextEncoder = new TextEncoder();
    /**
     * 字符串轉換為二進制數據
     * @param text 字符串
     * @returns 轉換後的二進制字符串
     */
    public static stringToArrayBuffer(text: string): ArrayBuffer {
        return Utils.encoder.encode(text).buffer;
    }

    protected static decoder: TextDecoder = new TextDecoder();
    /**
     * 二進制數據轉換為字符串
     * @param data 二進制數據
     * @returns 轉換後的字符串
     */
    public static arrayBufferToString(data: ArrayBuffer): string {
        return Utils.decoder.decode(data);
    }

    /**
     * 字符串轉換為二進制
     * @param text 字符串
     * @returns 轉換後的二進制字符串
     */
    public static stringToBinary(text: string): string {
        return text.split('').map((char) => char.charCodeAt(0).toString(2)).join(' ');
    }

    /**
     * 二進制數據轉換為字符串
     * @param binaryData 二進制數據
     * @returns 轉換後的字符串
     */
    public static binaryToString(binaryData: string): string {
        return String.fromCharCode(...binaryData.split(' ').map(binary => parseInt(binary, 2)));
    }

    /**
     * 轉換單位
     * @param value 要轉換的數字
     * @param allowThousand 是否允許千分位
     * @returns 轉換後的字符串
     */
    public static changeUnit(value: number | string, allowThousand: boolean = true): string {
        const THOUSAND: number = 1000;
        const MILLION: number = 1000000;
        const BILLION: number = 1000000000;

        let item: number = (typeof value === 'string') ? parseInt(value) : value;
        if (item / BILLION >= 1) {
            return Utils.toFixedNoRound(item / BILLION, 3) + 'B';
        } else if (item / MILLION >= 1) {
            return Utils.toFixedNoRound(item / MILLION, 3) + 'M';
        } else if (allowThousand && item / THOUSAND >= 1) {
            return Utils.toFixedNoRound(item / THOUSAND, 3) + 'K';
        } else {
            return Utils.numberFormat(item);
        }
    }

    /**
     * 將數字格式化，不進行四捨五入
     * @param value 要格式化的數字
     * @param fixed 小數位數
     * @returns 格式化後的字符串
     */
    public static toFixedNoRound(value: number | string, fixed: number): string {
        let item: number = (typeof value === 'string') ? parseInt(value) : value;
        let re = new RegExp('^-?\\d+(?:\\.\\d{0,' + (fixed || -1) + '})?');
        let itemString = item.toFixed(fixed);
        let rt = itemString.match(re)[0];
        let result = rt.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        while (result.endsWith('0') == true) result = result.substring(0, result.length - 1);
        if (result.endsWith('.') == true) result = result.substring(0, result.length - 1);
        return result;
    }

    /**
     * 將字符串中的 `{0}...{1}` 替換為參數
     * @param target 要替換的字符串
     * @param args 參數
     * @returns 替換後的字符串
     */
    public static formatString(target: string, ...args: string[]): string {
        let result: string = target;
        for (let i = 0; i < args.length; i++) {
            result = result.replace('{' + i + '}', args[i]);
        }
        return result;
    }

    /**
     * 將字符串中的逗號去除
     * @param value 要去除逗號的字符串
     * @returns 去除逗號後的數字
     */
    public static toNoCommaNumber(value: string): number {
        return Number(value.replace(/,/g, ''));
    }

    /**
     * 數字格式化，添加千分位逗號
     * @param value 要格式化的數字
     * @returns 格式化後的字符串
     */
    public static numberFormatM(value: number) {
        if (value < 1000000) return Utils.numberFormat(value);
        return Utils.toFixedNoRound(value / 1000000, 3) + 'M';
    }

    /**
     * 數字格式化，添加千分位逗號
     * @param value 要格式化的數字
     * @param decimalPoint 小數位數
     * @returns 格式化後的字符串
     */
    public static numberFormatFloat(value: number, decimalPoint: number = 1) {
        let result = Number(value.toFixed(decimalPoint));
        if (result % 1 === 0) {//沒有小於1的值
            return result.toLocaleString('en');
        } else {
            return result.toLocaleString('en', { minimumFractionDigits: decimalPoint });
        }
    }

    /**
     * 將 URL 參數轉換為 JSON
     * @returns JSON
     */
    public static parseURLToJson(): any {
        let fullURL: string = window.location.href;
        if (fullURL == null) return null;

        let splitURL = fullURL.split('?');
        if (splitURL.length != 2) return null;

        let queryString = splitURL[1];
        let params = new URLSearchParams(queryString);
        let paramsObj: { [key: string]: string } = {};

        for (const [key, value] of params.entries()) {
            paramsObj[key] = value;
        }

        return paramsObj;
    }

    /**
     * 獲取隨機數
     * @returns 隨機數
     */
    public static s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    /**
     * 是否為開發環境
     * @returns 是否為開發環境
     */
    public static isDevelopment(): boolean {
        const getSite = Utils.getSite();
        if (getSite === 'Develop') return true;
        if (PREVIEW === true) return true;

        return false;
    }

    /**
     * 獲取網站
     * @returns 網站
     */
    public static getSite() {
        if (EDITOR === true) return 'Develop';
        let domain = window.location.hostname;

        if (BaseConfig.Sites == null) return null;

        let keys = Object.keys(BaseConfig.Sites);
        for (let i in keys) {
            let key = keys[i];
            let sites: string[] = BaseConfig.Sites[key];

            if (sites == null) continue;
            if (sites.length === 0) continue;
            if (sites.indexOf(domain) < 0) continue;

            return key;
        }

        return null;
    }

    /**
     * 載入本地貨幣資料
     * @returns 本地貨幣資料
     */
    public static loadCurrency(): Promise<any> {
        return new Promise((resolve, reject) => {
            resources.load('data/currency', JsonAsset, (err, currency) => {
                if (err != null) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(currency.json);
            });
        });
    }

    /**
     * 載入錯誤訊息
     * @returns 錯誤訊息
     */
    public static getErrorMessage(): Promise<any> {
        return new Promise((resolve, reject) => {
            resources.load('data/errorMessage', JsonAsset, (err, errorMessage) => {
                if (err != null) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(errorMessage.json);
            });
        });
    }

    /**
     * 字符串格式化
     * @param str 字符串
     * @param args 參數
     * @returns 格式化後的字符串
     */
    public static stringFormat(str: string, ...args: any[]): string {
        return str.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    }

    /**
     * 創建曲線範圍
     * @returns 曲線範圍
     */
    public static createCurveRange() {
        let curve = new CurveRange();
        curve.mode = CurveRange.Mode.Curve;
        curve.spline.postExtrapolation = 1;
        curve.spline.preExtrapolation = 1;
        return curve;
    }

    /**
     * 等待事件處理
     * @param event 事件
     * @param eventType 事件類型
     * @returns 
     */
    public static async delayEvent(event: EventTarget = null, eventType: string = 'done'): Promise<any> {
        if (event == null) return;
        return await new Promise((resolve) => { event.once(eventType, resolve); });
    }

    /**
     * 等待事件處理
     * @param eventHandler 事件處理
     * @param args 參數
     * @returns 
     */
    public static async awaitEventHandler(eventHandler: EventHandler, ...args): Promise<any> {
        if (eventHandler == null) return;
        if (eventHandler.target == null) return;
        if (eventHandler.component == null) return;

        let obj = eventHandler.target;
        let comp = obj.getComponent(eventHandler.component);
        let event = eventHandler.handler;

        if (comp == null) return;
        if (event == null) return;
        return await comp[event](...args);
    }

    /**
     * 谷歌分析
     * @param event 事件
     * @param data 數據
     * @returns 
     */
    // public static GoogleTag(event: string, data: any = null) {
    //     try {
    //         if (gtag == undefined || gtag == null) return;

    //         const eventData = data ?? { 'event_category': 'click' };

    //         // console.log('GoogleTag', event, data);
    //         return gtag('event', event, data);

    //     } catch (e) {
    //         return;
    //     }
    // }

    /**
     * 計算環狀距離
     * @param a 
     * @param b 
     * @param length 
     * @returns 
     */
    public static circularDistance(a: number, b: number, length: number): number {
        return Math.min(Math.abs(a - b), length - Math.abs(a - b));
    }

    /**
     * winPos轉換col,row
     * @param pos 
     * @returns 
     */
    public static posToGrid(pos: number): Grid {
        let col = Math.floor(pos / 10);
        let row = (pos % 10) - 1;
        return { col, row };
    }
}

export enum TWEEN_EASING_TYPE { '自定義曲線', 'linear', 'smooth', 'fade', 'constant', 'quadIn', 'quadOut', 'quadInOut', 'quadOutIn', 'cubicIn', 'cubicOut', 'cubicInOut', 'cubicOutIn', 'quartIn', 'quartOut', 'quartInOut', 'quartOutIn', 'quintIn', 'quintOut', 'quintInOut', 'quintOutIn', 'sineIn', 'sineOut', 'sineInOut', 'sineOutIn', 'expoIn', 'expoOut', 'expoInOut', 'expoOutIn', 'circIn', 'circOut', 'circInOut', 'circOutIn', 'elasticIn', 'elasticOut', 'elasticInOut', 'elasticOutIn', 'backIn', 'backOut', 'backInOut', 'backOutIn', 'bounceIn', 'bounceOut', 'bounceInOut', 'bounceOutIn' }

@ccclass('CurveProperty')
export class CurveRangeProperty {

    @property({ type: Enum(TWEEN_EASING_TYPE), displayName: '動態曲線設定', tooltip: '動態曲線設定' })
    public curveType: TWEEN_EASING_TYPE = TWEEN_EASING_TYPE['quadOut'];

    @property({
        type: CurveRange,
        displayName: '曲線設定',
        tooltip: '曲線設定',
        visible(this: CurveRangeProperty) {
            return this.curveType === TWEEN_EASING_TYPE['自定義曲線'];
        }
    })
    public curveRange: CurveRange = null;

    /**
     * 取得 easing 設定
     * @param property 
     * @returns 
     */
    public static getEasing(property: CurveRangeProperty): string | ((k: number) => number) {

        if (property.curveType !== TWEEN_EASING_TYPE['自定義曲線']) return TWEEN_EASING_TYPE[property.curveType.valueOf()].toString();

        return (k: number) => {
            let value = property.curveRange.evaluate(k, 1);
            return value;
        };
    }
}

/**
 * 延遲
 * @param ms 
 * @returns 
 */
export async function delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        Utils.scheduleOnce(() => resolve(), ms, null);
    });
}

/**
 * 等待下一幀
 * @returns 
 */
export async function waitNextFrame(): Promise<void> {
    return new Promise<void>(resolve => {
        Utils.scheduleOnce(() => resolve(), 0, null);
    });
}

/**
* 添加button Click事件監聽器
* @param target 目標(掛腳本的節點)
* @param component 組件名稱
* @param button 按鈕
* @param handler 處理器
* @param eventData 事件數據(可選)
*/
export function addBtnClickEvent(target: Node, component: string, button: Button, handler: Function, eventData?: string) {
    const eventHandler = new Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler.name;
    if (eventData) eventHandler.customEventData = eventData;
    button.clickEvents.push(eventHandler);
}

// /**
// * 添加toggle check事件監聽器
// * @param target 目標(掛腳本的節點)
// * @param component 組件名稱
// * @param toggle 切換按鈕
// * @param handler 處理器
// */
// export function addToggleCheckEvent(target: Node, component: string, toggle: Toggle, handler: Function) {
//     const eventHandler = new Component.EventHandler();
//     eventHandler.target = target;
//     eventHandler.component = component;
//     eventHandler.handler = handler.name;
//     toggle.checkEvents.push(eventHandler);
// }

/**
* 添加toggle事件監聽器（包含check和uncheck）
* @param target 目標(掛腳本的節點)
* @param component 組件名稱
* @param toggle 切換按鈕
* @param handler 處理器
* @param eventData 事件數據(可選)
*/
export function addToggleClickEvent(target: Node, component: string, toggle: Toggle, handler: Function, eventData?: string) {
    const eventHandler = new Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler.name;
    if (eventData) eventHandler.customEventData = eventData;
    toggle.checkEvents.push(eventHandler);
}
