import localforage from "localforage";
import { StorageEnum } from "../common/enum";

export class StorageService {
    storage: Storage | LocalForage;
    constructor(type: StorageEnum = StorageEnum.LOCAL) {
        this.storage = type === StorageEnum.SESSION ? sessionStorage : this.setUpLocalForage(type);
    }

    setUpLocalForage(type: StorageEnum) {
        localforage.config({
            driver: type === StorageEnum.LOCAL ? localforage.LOCALSTORAGE : localforage.INDEXEDDB,
            name: "password_manager",
            version: 1.0,
            storeName: "password_manager",
            description: "Password manager storage",
        });
        const driver = type === StorageEnum.LOCAL ? localforage.LOCALSTORAGE : localforage.INDEXEDDB;
        localforage.setDriver(driver);
        return localforage;
    }

    async get(key: string) {
        return this.storage.getItem(key);
    }

    async set(key: string, value: any) {
        localforage.setItem(key, value);
        return this.storage.setItem(key, value);
    }

    async remove(key: string) {
        return this.storage.removeItem(key);
    }
}
