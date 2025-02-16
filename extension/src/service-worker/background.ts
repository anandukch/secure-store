import browser from "webextension-polyfill";
import { ActionEnum, StorageEnum } from "../common/enum";
import { browserService } from "../services/browser";
import { VaultResponse, vaultService } from "../services/vault";

type GlobalState = {
    url?: string;
    showPopup?: boolean;
    token?: string;
    userAttributes?: any;
};

type MessageInterface = {
    action: string;
    payload?: any;
};

let globalState: GlobalState;

browser.runtime.onMessage.addListener(async (msg: MessageInterface, sender, response: any) => {
    console.log("background message", msg);

    if (msg.action === "mount") {
        console.log("mount", msg.payload!.url!);

        const url = new URL(msg.payload!.url! as string);
        const urlParts = url.hostname.split("/");

        if (globalState && globalState.url === urlParts[0]) {
            sender.tab?.id &&
                chrome.tabs.sendMessage(sender.tab.id, { action: "mount", payload: { globalState } }).then((response) => {
                    console.log("response", response);
                });
        }
    }

    if (msg.action === ActionEnum.LOGIN) {
        console.log("login", msg.payload);

        globalState = {
            token: msg.payload.token,
            userAttributes: msg.payload.userAttributes,
        };
        browserService.storeData(msg.payload, StorageEnum.LOCAL).then(() => {
            console.log("Data stored");
        });

        response({ message: "login  reposne from background" });
    }

    if (msg.action === "check_credentials") {
        console.log("check_credentials", msg);
        response({ message: "success  check_credentails" });
    }

    if (msg.action === ActionEnum.LOG_OUT) {
        console.log("logout", msg);
        globalState = {};
        browserService.removeData("token", StorageEnum.LOCAL);
        browserService.removeData("masterKey", StorageEnum.LOCAL);
        response({ message: "logout  reposne from background" });
    }

    if (msg.action === ActionEnum.FETCH_STATE) {
        console.log("fetch state", globalState);
        response({ message: "fetch state response from background", data: globalState });
    }

    if (msg.action === ActionEnum.CREATE_SECRET) {
        console.log("create secret started", msg.payload);

        const data = await vaultService.uploadSecret(msg.payload);
        console.log({ message: "create secret response from background", data });

        return { message: "create secret response from background", data };
    }
    if (msg.action === ActionEnum.FETCH_SECRETS) {
        const payload = msg.payload;
        console.log("fetch secrets", payload);

        const data = await vaultService.getSecretApi(payload?.siteUrl, payload?.projectId);
        const secretsResponse: VaultResponse[] = (await data.json()).data;
        console.log("fetch secrets", secretsResponse);

        const decryptedSecrets = await vaultService.decryptSecrets(secretsResponse);
        console.log("fetch secrets", decryptedSecrets);
        return decryptedSecrets;
    }
    return true;
});
