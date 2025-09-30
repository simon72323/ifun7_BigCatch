import { game, ResolutionPolicy, view, Game } from 'cc';

import { BaseEvent } from '@common/script/event/BaseEvent';
import { OrientationtMode } from '@common/script/types/BaseType';

/**
 * 屏幕適配管理器 - 靜態類
 * 在遊戲啟動時自動初始化，無需掛載到任何組件
 */
export class ScreenAdapter {
    private static resizeObserver: ResizeObserver | null = null;
    private static isInitialized: boolean = false;

    /**
     * 初始化屏幕適配（在遊戲啟動時調用）
     */
    public static init(): void {
        if (ScreenAdapter.isInitialized) return;
        ScreenAdapter.setupResize();
        ScreenAdapter.isInitialized = true;
    }

    /**
     * 初始化屏幕適配
     */
    private static setupResize() {
        // 等待遊戲完全加載後再設置監聽
        game.on(Game.EVENT_ENGINE_INITED, () => {
            // 優先使用 ResizeObserver
            if (typeof ResizeObserver !== 'undefined') {
                ScreenAdapter.resizeObserver = new ResizeObserver(() => ScreenAdapter.handleResize());
                ScreenAdapter.resizeObserver.observe(game.canvas);
            } else {
                window.addEventListener('resize', ScreenAdapter.handleResize);
            }
            // 初始設置一次
            ScreenAdapter.handleResize();
        });
    }

    /**
     * 清理屏幕適配
     */
    public static cleanupResize() {
        if (typeof ResizeObserver !== 'undefined' && ScreenAdapter.resizeObserver) {
            ScreenAdapter.resizeObserver.disconnect();
            ScreenAdapter.resizeObserver = null;
        } else {
            window.removeEventListener('resize', ScreenAdapter.handleResize);
        }
    }

    /** 
     * 處理畫面大小變化 
     */
    private static handleResize() {
        if (!game.canvas) return;

        const rect = game.canvas.getBoundingClientRect();
        const aspectRatio = rect.width / rect.height;

        // console.log('Canvas尺寸變化:', { width: rect.width, height: rect.height, aspectRatio });

        // 判斷橫豎屏並設置對應分辨率
        if (aspectRatio > (720 / 1280)) {
            // 橫屏模式
            view.setDesignResolutionSize(1280, 720, ResolutionPolicy.SHOW_ALL);
            BaseEvent.changeOrientation.emit(OrientationtMode.Landscape);
        } else {
            // 豎屏模式
            view.setDesignResolutionSize(720, 1280, ResolutionPolicy.SHOW_ALL);
            BaseEvent.changeOrientation.emit(OrientationtMode.Portrait);
        }
    }

    /**
     * 銷毀屏幕適配（如果需要）
     */
    public static destroy() {
        ScreenAdapter.cleanupResize();
        ScreenAdapter.isInitialized = false;
    }
}