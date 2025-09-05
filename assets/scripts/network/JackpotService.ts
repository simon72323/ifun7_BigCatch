import { APIService } from './APIService';
import { NetworkManager, APIResponse } from './NetworkManager';

export interface JackpotData {
    jackpot_id: string;
    amount: number;
    currency: string;
    tier: number;
}

export interface JackpotPrizeRecord {
    prize_id: string;
    player_name: string;
    amount: number;
    currency: string;
    win_time: string;
}

export class JackpotService extends APIService {
    private jackpotData: JackpotData[] = [];
    
    constructor(networkManager: NetworkManager) {
        super(networkManager);
    }
    
    /**
     * 獲取獎池數據
     */
    public async fetchJackpotData(): Promise<JackpotData[]> {
        try {
            const response = await this.sendAPIRequest<JackpotData[]>('get_jackpot', {});
            this.jackpotData = response.data;
            return this.jackpotData;
        } catch (error) {
            this.handleAPIError(error, 'get_jackpot');
            return [];
        }
    }
    
    /**
     * 獲取獎池金額
     */
    public async fetchJackpotAmount(): Promise<APIResponse> {
        try {
            return await this.sendAPIRequest('get_jackpot_amount', {});
        } catch (error) {
            this.handleAPIError(error, 'get_jackpot_amount');
            throw error;
        }
    }
    
    /**
     * 獲取獎池獎勵記錄
     */
    public async fetchJackpotPrizeRecord(): Promise<JackpotPrizeRecord[]> {
        try {
            const response = await this.sendAPIRequest<JackpotPrizeRecord[]>('get_jackpot_prize_record', {});
            return response.data;
        } catch (error) {
            this.handleAPIError(error, 'get_jackpot_prize_record');
            return [];
        }
    }
    
    /**
     * 處理獎池更新
     */
    public handleJackpotUpdate(jackpotData: JackpotData) {
        // 更新獎池數據
        const existingIndex = this.jackpotData.findIndex(
            item => item.jackpot_id === jackpotData.jackpot_id
        );
        
        if (existingIndex !== -1) {
            this.jackpotData[existingIndex] = jackpotData;
        } else {
            this.jackpotData.push(jackpotData);
        }
        
        // 觸發獎池更新事件
        this.dispatchEvent('jackpot_update', jackpotData);
    }
    
    /**
     * 獲取獎池數據
     */
    public getJackpotData(): JackpotData[] {
        return this.jackpotData;
    }
    
    /**
     * 根據層級獲取獎池
     */
    public getJackpotByTier(tier: number): JackpotData | undefined {
        return this.jackpotData.find(item => item.tier === tier);
    }
    
    /**
     * 獲取總獎池金額
     */
    public getTotalJackpotAmount(): number {
        return this.jackpotData.reduce((total, item) => total + item.amount, 0);
    }
    
    /**
     * 分發事件
     */
    private dispatchEvent(eventName: string, data: any) {
        // 使用 Cocos Creator 的事件系統
        console.log(`[JackpotService] Event: ${eventName}`, data);
    }
}
