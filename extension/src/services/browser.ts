import browser from "webextension-polyfill";
import { ActionEnum, StorageEnum } from "../common/enum";

class BrowserService {
    extension: typeof browser;
    constructor(extension: typeof browser = browser) {
        this.extension = extension;
    }
    public async openTab(url: string): Promise<void> {
        await this.extension.tabs.create({ url });
    }

    public async sendMessage(message: any): Promise<any> {
        return await browser.runtime.sendMessage(message);
    }

    public async sendMessageToTab(tabId: number, message: any): Promise<any> {
        return await this.extension.tabs.sendMessage(tabId, message);
    }

    public async sendStatusMessage(message: any): Promise<void> {
        return await this.sendMessage({ action: ActionEnum.SET_STATE, payload: message });
    }

    public async sendLoginMessage(data: any): Promise<void> {
        return await this.sendMessage({ action: ActionEnum.LOGIN, payload: data });
        // await this.storeData(token, StorageEnum.LOCAL);
        // await this.storeData(userAttributes, StorageEnum.SESSION);
    }

    public async storeData(data: any, storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            return await this.extension.storage.local.set(data);
        } else if (storageType === StorageEnum.SESSION) {
            return await this.extension.storage.session.set(data);
        }
    }

    public async getData(key: string, storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            return await this.extension.storage.local.get(key);
        } else if (storageType === StorageEnum.SESSION) {
            return await this.extension.storage.session.get(key);
        }
    }

    public async removeData(key: string, storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            await this.extension.storage.local.remove(key);
        } else if (storageType === StorageEnum.SESSION) {
            await this.extension.storage.session.remove(key);
        }
    }

    public async removeAllData(storageType: StorageEnum) {
        if (storageType === StorageEnum.LOCAL) {
            await this.extension.storage.local.clear();
        } else if (storageType === StorageEnum.SESSION) {
            await this.extension.storage.session.clear();
        }
    }

    public async sendVaultCreationMessage(data: any) {
        return await this.sendMessage({ action: ActionEnum.CREATE_SECRET, payload: data });
    }

    public async sendGetSecretMessage(siteUrl: string = "", projectId: string = "") {
        return await this.sendMessage({ action: ActionEnum.FETCH_SECRETS, payload: { siteUrl, projectId } });
    }
}

export const browserService = new BrowserService(browser);
