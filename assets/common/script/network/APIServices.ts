import { getToken } from '@common/script/manager/AuthManager';
import { APIRequest, APIResponse, getNetworkManager } from '@common/script/network/NetworkManager';

/**
 * API 服務 - 實例模式
 */
export class APIServices {
    private static _instance: APIServices;

    public static getInstance(): APIServices {
        if (!this._instance) {
            this._instance = new APIServices();
        }
        return this._instance;
    }

    /**
     * 發送旋轉請求
     */
    public async spin(bet: number, lines: number, coinValue: number, multiplier?: number): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'spin',
            token: getToken(),
            data: {
                bet,
                lines,
                coinValue,
                multiplier: multiplier || 1
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送免費旋轉請求
     */
    public async freeSpin(bet: number, lines: number, coinValue: number, multiplier?: number): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'free_spin',
            token: getToken(),
            data: {
                bet,
                lines,
                coinValue,
                multiplier: multiplier || 1
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送購買免費遊戲請求
     */
    public async buyFreeGame(multiplier: number): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'buy_free_game',
            token: getToken(),
            data: {
                multiplier
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送收集獎勵請求
     */
    public async collectWin(): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'collect_win',
            token: getToken(),
            data: {}
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取免費遊戲總獎金請求
     */
    public async getFreeSpinTotalPayout(freeSpinId: string): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_free_spin_total_payout',
            token: getToken(),
            data: {
                free_spin_id: freeSpinId
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送處理轉輪數據請求
     */
    public async processReelData(reelData: any, isFreeGame: boolean = false): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'process_reel_data',
            token: getToken(),
            data: {
                reel_data: reelData,
                is_free_game: isFreeGame
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取促銷簡介請求
     */
    public async getPromotionBrief(): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_promotion_brief',
            token: getToken(),
            data: {
                promotion_id: '-1'
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取獎池數據請求
     */
    public async getJackpot(): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_jackpot',
            token: getToken(),
            data: {}
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取獎池金額請求
     */
    public async getJackpotAmount(): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_jackpot_amount',
            token: getToken(),
            data: {}
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送 ping 請求
     */
    public async ping(): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'ping',
            token: getToken(),
            data: {}
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取現金掉落請求
     */
    public async getCashDrop(promotionId: string = '-1'): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_cash_drop',
            token: getToken(),
            data: {
                promotion_id: promotionId
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取錦標賽請求
     */
    public async getTournament(promotionId: string = '-1'): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_tournament',
            token: getToken(),
            data: {
                promotion_id: promotionId
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取現金掉落獎勵記錄請求
     */
    public async getCashDropPrizeRecord(promotionId: string = '-1'): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_cash_drop_prize_record',
            token: getToken(),
            data: {
                promotion_id: promotionId
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取錦標賽獎勵記錄請求
     */
    public async getTournamentPrizeRecord(promotionId: string = '-1'): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_tournament_prize_record',
            token: getToken(),
            data: {
                promotion_id: promotionId
            }
        };

        return await getNetworkManager().sendRequest(request);
    }

    /**
     * 發送獲取獎池獎勵記錄請求
     */
    public async getJackpotPrizeRecord(): Promise<APIResponse> {
        const request: APIRequest = {
            command: 'get_jackpot_prize_record',
            token: getToken(),
            data: {}
        };

        return await getNetworkManager().sendRequest(request);
    }
}

export function getAPIServices(): APIServices {
    return APIServices.getInstance();
}