import browser from "webextension-polyfill";
import { ActionEnum } from "../common/enum";

class BrowserService {
    public async openTab(url: string): Promise<void> {
        await browser.tabs.create({ url });
    }

    public async sendMessage(message: any): Promise<any> {
        return await browser.runtime.sendMessage(message);
    }

    public async sendMessageToTab(tabId: number, message: any): Promise<any> {
        return await browser.tabs.sendMessage(tabId, message);
    }

    public async sendStatusMessage(message: any): Promise<void> {
        await this.sendMessage({ action: ActionEnum.SET_STATE, payload: message });
    }

    public async sendLoginMessage(message: any): Promise<void> {
        await this.sendMessage({ action: ActionEnum.LOGIN, payload: message });
    }
}

export const browserService = new BrowserService();
