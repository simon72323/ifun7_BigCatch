import { APIService } from './APIService';
import { NetworkManager, APIResponse } from './NetworkManager';

export interface PromotionInfo {
    promotion_id: string;
    end_date: string;
    promotion_name: string;
    time_zone: string;
    min_bet: number;
    currency: string;
    promotion_type: number;
}

export interface JackpotInfo {
    promotion_id: string;
    end_date: string;
    promotion_name: string;
    time_zone: string;
    min_bet: number;
    currency: string;
    promotion_type: number;
}

export interface CashDropData {
    promotion_id: string;
    amount: number;
    message: string;
}

export class PromotionService extends APIService {
    private promotionInfo: PromotionInfo[] = [];
    private jackpotInfo: JackpotInfo[] = [];
    
    constructor(networkManager: NetworkManager) {
        super(networkManager);
    }
    
    /**
     * 獲取促銷簡介
     */
    public async fetchPromotionBrief(): Promise<PromotionInfo[]> {
        try {
            const response = await this.sendAPIRequest<PromotionInfo[]>('get_promotion_brief', {
                promotion_id: '-1'
            });
            
            this.processPromotionBriefResponse(response.data);
            return this.promotionInfo;
        } catch (error) {
            this.handleAPIError(error, 'get_promotion_brief');
            return [];
        }
    }
    
    /**
     * 處理促銷簡介響應
     */
    private processPromotionBriefResponse(response: PromotionInfo[]) {
        // 按結束時間排序
        response.sort((a, b) => {
            const timeZoneNow = new Date(new Date().toLocaleString('sv-SE', { timeZone: a.time_zone }).replace(/-/g, '/'));
            const timeA = new Date(a.end_date.replace(/-/g, '/')).getTime() - timeZoneNow.getTime();
            const timeB = new Date(b.end_date.replace(/-/g, '/')).getTime() - timeZoneNow.getTime();
            return timeB > timeA ? 1 : -1;
        });
        
        // 把錦標賽放到後面
        const tournamentType = 1;
        const tournaments = response.filter(item => item.promotion_type === tournamentType);
        const otherPromotions = response.filter(item => item.promotion_type !== tournamentType);
        const sortedResponse = [...otherPromotions, ...tournaments];
        
        this.promotionInfo = [];
        this.jackpotInfo = [];
        
        for (let i = 0; i < sortedResponse.length; i++) {
            const item = sortedResponse[i];
            if (item.promotion_type === 2) { // 獎池類型
                this.jackpotInfo.push(item as JackpotInfo);
            } else {
                this.promotionInfo.push(item);
            }
        }
    }
    
    /**
     * 獲取現金掉落數據
     */
    public async fetchCashDrop(promotionId: string = '-1'): Promise<APIResponse> {
        try {
            return await this.sendAPIRequest('get_cash_drop', {
                promotion_id: promotionId
            });
        } catch (error) {
            this.handleAPIError(error, 'get_cash_drop');
            throw error;
        }
    }
    
    /**
     * 獲取錦標賽數據
     */
    public async fetchTournament(promotionId: string = '-1'): Promise<APIResponse> {
        try {
            return await this.sendAPIRequest('get_tournament', {
                promotion_id: promotionId
            });
        } catch (error) {
            this.handleAPIError(error, 'get_tournament');
            throw error;
        }
    }
    
    /**
     * 獲取現金掉落獎勵記錄
     */
    public async fetchCashDropPrizeRecord(promotionId: string = '-1'): Promise<APIResponse> {
        try {
            return await this.sendAPIRequest('get_cash_drop_prize_record', {
                promotion_id: promotionId
            });
        } catch (error) {
            this.handleAPIError(error, 'get_cash_drop_prize_record');
            throw error;
        }
    }
    
    /**
     * 獲取錦標賽獎勵記錄
     */
    public async fetchTournamentPrizeRecord(promotionId: string = '-1'): Promise<APIResponse> {
        try {
            return await this.sendAPIRequest('get_tournament_prize_record', {
                promotion_id: promotionId
            });
        } catch (error) {
            this.handleAPIError(error, 'get_tournament_prize_record');
            throw error;
        }
    }
    
    /**
     * 處理現金掉落通知
     */
    public handleCashDrop(cashDropData: CashDropData) {
        // 找到對應的促銷活動
        const promotionIndex = this.promotionInfo.findIndex(
            item => item.promotion_id === cashDropData.promotion_id
        );
        
        if (promotionIndex !== -1) {
            // 觸發現金掉落通知事件
            this.dispatchEvent('cash_drop_notification', {
                index: promotionIndex,
                data: cashDropData
            });
        }
    }
    
    /**
     * 獲取促銷信息
     */
    public getPromotionInfo(): PromotionInfo[] {
        return this.promotionInfo;
    }
    
    /**
     * 獲取獎池信息
     */
    public getJackpotInfo(): JackpotInfo[] {
        return this.jackpotInfo;
    }
    
    /**
     * 分發事件
     */
    private dispatchEvent(eventName: string, data: any) {
        // 使用 Cocos Creator 的事件系統
        // 這裡需要根據實際的事件管理器來實現
        console.log(`[PromotionService] Event: ${eventName}`, data);
    }
}
