import { BaseFont } from '@common/script/data/BaseConst';

/**
 * LabelAtlas字型管理
 */
export class FontManager {
    private static instance: FontManager;

    public static getInstance(): FontManager {
        if (!FontManager.instance) {
            FontManager.instance = new FontManager();
        }
        return FontManager.instance;
    }

    private ascii: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    private fontMap: { [key: string]: { [key: string]: string } } = {};

    public constructor() {
        this.registerFont(BaseFont.number, ['0123456789|2', '.,|1']);
    }

    /**
     * 註冊labelAtlas
     * @param fontName 
     * @param fontSetting 字串陣列,依圖片順序設定字串|ascii長度(ex:'012|2' 表示0,1,2對應的ascii長度為2)
     */
    public registerFont(fontName: string, fontSetting: string[]) {
        let map: { [key: string]: string } = {};
        let asciiIdx: number = 0;
        fontSetting.forEach((setting, _settingIdx) => {
            let settingData = setting.split('|');
            let content = settingData[0];
            let len = parseInt(settingData[1]);
            let contentList = content.split('');
            contentList.forEach((content, _index) => {
                map[content] = this.ascii.substring(asciiIdx, asciiIdx + len);
                asciiIdx += len;
            }, this);

        });
        this.fontMap[fontName] = map;
    }

    public convertToAsciiString(fontName: string, str: string): string {
        let strList = str.split('');
        let result = '';
        let map = this.fontMap[fontName];
        strList.forEach((str, _index) => {
            result += map[str];
        });
        return result;
    }
}