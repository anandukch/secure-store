import browser from "webextension-polyfill";
import { ActionEnum, StorageEnum } from "../common/enum";

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

    public async sendLoginMessage(data: any): Promise<void> {
        await this.sendMessage({ action: ActionEnum.LOGIN, payload: data });
        // await this.storeData(token, StorageEnum.LOCAL);
        // await this.storeData(userAttributes, StorageEnum.SESSION);
    }

    public async storeData(data: any, storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            await browser.storage.local.set(data);
        } else if (storageType === StorageEnum.SESSION) {
            await browser.storage.session.set(data);
        }
    }

    public async getData(key: string, storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            return await browser.storage.local.get(key);
        } else if (storageType === StorageEnum.SESSION) {
            return await browser.storage.session.get(key);
        }
    }

    public async removeData(key: string, storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            await browser.storage.local.remove(key);
        } else if (storageType === StorageEnum.SESSION) {
            await browser.storage.session.remove(key);
        }
    }
}

export const browserService = new BrowserService();
