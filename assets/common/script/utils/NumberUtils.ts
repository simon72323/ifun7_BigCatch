/**
 * 數字工具類 - 提供數字格式化、隨機數生成、精確計算等功能
 */

/**
 * 數字工具類
 */
export class NumberUtils {
    /**
     * 精確乘法 - 避免浮點數精度問題
     * @param num1 第一個數
     * @param num2 第二個數
     * @returns 精確的乘積
     */
    public static accMul(num1: number, num2: number): number {
        let m = 0;
        const s1 = num1.toString();
        const s2 = num2.toString();
        
        try {
            m += s1.split('.')[1].length;
        } catch (e) {
            // 沒有小數點
        }
        
        try {
            m += s2.split('.')[1].length;
        } catch (e) {
            // 沒有小數點
        }
        
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    }

    /**
     * 精確除法 - 避免浮點數精度問題
     * @param num1 被除數
     * @param num2 除數
     * @returns 精確的商
     */
    public static accDiv(num1: number, num2: number): number {
        let t1 = 0;
        let t2 = 0;
        
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch (e) {
            // 沒有小數點
        }
        
        try {
            t2 = num2.toString().split('.')[1].length;
        } catch (e) {
            // 沒有小數點
        }
        
        const r1 = Number(num1.toString().replace('.', ''));
        const r2 = Number(num2.toString().replace('.', ''));
        
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }

    /**
     * 精確加法 - 避免浮點數精度問題
     * @param num1 第一個數
     * @param num2 第二個數
     * @returns 精確的和
     */
    public static accAdd(num1: number, num2: number): number {
        let r1: number, r2: number, m: number;
        
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        
        try {
            r2 = num2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        
        m = Math.pow(10, Math.max(r1, r2));
        return (num1 * m + num2 * m) / m;
    }

    /**
     * 精確減法 - 避免浮點數精度問題
     * @param num1 被減數
     * @param num2 減數
     * @returns 精確的差
     */
    public static accSub(num1: number, num2: number): number {
        let r1: number, r2: number, m: number;
        
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        
        try {
            r2 = num2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        
        m = Math.pow(10, Math.max(r1, r2));
        return (num1 * m - num2 * m) / m;
    }

    /**
     * 計算下注金額 - 使用精確計算避免浮點數精度問題
     * @param coinValue 硬幣值
     * @param lineBet 線注
     * @param lineTotal 總線數
     * @returns 精確的下注金額
     */
    public static calculateBetCredit(coinValue: number, lineBet: number, lineTotal: number): number {
        return this.accMul(this.accMul(coinValue, lineBet), lineTotal);
    }

    /**
     * 獲取指定範圍內的隨機浮點數
     * @param start 起始值
     * @param end 結束值
     * @returns 隨機浮點數
     */
    public static getRandomFloat(start: number, end: number): number {
        return Math.random() * (end - start) + start;
    }

    /**
     * 獲取指定範圍內的隨機整數
     * @param start 起始值
     * @param end 結束值
     * @returns 隨機整數
     */
    public static getRandomInt(start: number, end: number): number {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    /**
     * 千分位格式化
     * @param value 要格式化的值
     * @returns 格式化後的字串
     */
    public static thousandFormat(value: number | string): string {
        const valueStr = `${value}`;
        if (isNaN(+valueStr)) {
            return valueStr;
        }

        const arr = valueStr.split('.');
        const re = /(\d{1,3})(?=(\d{3})+$)/g;
        const num = arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
        return num;
    }
}

// 匯出靜態方法作為獨立函數，保持向後相容性
export const accMul = NumberUtils.accMul;
export const accDiv = NumberUtils.accDiv;
export const accAdd = NumberUtils.accAdd;
export const accSub = NumberUtils.accSub;
export const calculateBetCredit = NumberUtils.calculateBetCredit;
export const getRandomFloat = NumberUtils.getRandomFloat;
export const getRandomInt = NumberUtils.getRandomInt;
export const thousandFormat = NumberUtils.thousandFormat;