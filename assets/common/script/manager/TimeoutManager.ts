import { logger } from '@base/script/utils/XUtils';

/**
 * 逾時處理器
 */
export class TimeoutManager {
    private static instance: TimeoutManager;

    /**
     * 取得單例實例
     */
    public static getInstance(): TimeoutManager {
        if (!TimeoutManager.instance) {
            TimeoutManager.instance = new TimeoutManager();
        }
        return TimeoutManager.instance;
    }

    /** 逾時任務映射表 */
    private timeoutMap: Map<string, { key: number, callback: Function }> = new Map();

    /**
     * 註冊逾時任務
     * @param name 任務名稱
     * @param seconds 秒數
     * @param callback 回調函數
     */
    public register(name: string, seconds: number, callback: Function): void {
        // 如果已存在同名任務，先移除舊的
        if (this.timeoutMap.has(name)) {
            this.remove(name);
        }
        // 創建新的逾時任務
        let timeout = setTimeout(callback, seconds * 1000);
        this.timeoutMap.set(name, { key: timeout, callback });
    }

    /**
     * 移除逾時任務
     * @param name 任務名稱
     */
    public remove(name: string): void {
        let timeout = this.timeoutMap.get(name);
        if (timeout) {
            // 清除逾時任務
            clearTimeout(timeout.key);
            this.timeoutMap.delete(name);
        }
        else {
            logger(`TimeoutManager找不到對應的key = ${name}`);
        }
    }
}