import browser from "webextension-polyfill";
import { ActionEnum, StorageEnum } from "../common/enum";
import { browserService } from "../services/browser";
import { authService } from "../services/auth";
import { createVaults, getSecrets } from "../axios";
import { VaultRequest, vaultService } from "../services/vault";
import { fetchService } from "../services/fetch";
// browser.runtime.onMessage.addListener((msg) => {
//     console.log(msg);
//     }
// );

// type ResponseCallback = (data: object) => void;

// async function handleMessage({ action }: MessageInterface, response: ResponseCallback) {
//     if (action === "fetch") {
//         console.log("fetching data");

//         const result = await fetch("https://meowfacts.herokuapp.com/");

//         const { data } = await result.json();

//         response({ message: "success", data });
//     } else {
//         response({ data: null, error: "Unknown action" });
//     }
// }

type GlobalState = {
    url?: string;
    showPopup?: boolean;
    token?: string;
    userAttributes?: any;
};

// type PayloadType = object | string | number | boolean | null | undefined;

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
        console.log("login", globalState);

        if (globalState && globalState.url === urlParts[0]) {
            sender.tab?.id &&
                browser.tabs.sendMessage(sender.tab.id, { action: "mount", payload: { globalState } }).then((response) => {
                    console.log("response", response);
                });
        }
    }

    if (msg.action === ActionEnum.LOGIN) {
        console.log("login", msg.payload);
        // const url = new URL(msg.payload?.url as string);
        // const urlParts = url.hostname.split("/");
        // console.log("domain", urlParts[0]);
        globalState = {
            token: msg.payload.token,
            userAttributes: msg.payload.userAttributes,
        };
        browserService.storeData(msg.payload, StorageEnum.LOCAL).then(() => {
            console.log("Data stored");
        });

        console.log("login", globalState);
        response({ message: "login  reposne from background" });
    }

    if (msg.action === "check_credentials") {
        console.log("check_credentials", msg);
        response({ message: "success  check_credentails" });
    }

    // if (msg.action === ActionEnum.LOGIN) {
    //     console.log("login", msg);
    //     const { email, password } = msg.payload;
    //     const userAttributes = await authService.initLogin(email, password);
    //     console.log("User attributes:", userAttributes);

    //     if (!userAttributes) {
    //         response({ message: "error" });
    //         return;
    //     }

    //     console.log("User attributes:", userAttributes);

    //     const data = await authService.completeLogin(email);
    //     if (!data) {
    //         response({ message: "error" });
    //         return;
    //     }
    //     console.log("complete login", data);

    //     // globalState = {
    //     //     token: msg.payload.token,
    //     //     userAttributes: msg.payload.userAttributes,
    //     // };
    //     browserService.storeData(msg.payload, StorageEnum.LOCAL).then(() => {
    //         console.log("Data stored");
    //     });

    //     console.log("login", globalState);
    //     response({ message: "login  reposne from background" });
    // }

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

    if (msg.action === ActionEnum.FETCH_SECRETS) {
        const { data } = await getSecrets();
        console.log("fetch secrets", data);
        response({ message: "fetch secrets response from background", data });
    }

    if (msg.action === ActionEnum.CREATE_SECRET) {
        console.log("create secret started", msg.payload);

        // const { data } = await createSecrets(msg.payload);
        const data = await vaultService.uploadSecret(msg.payload);
        // console.log("token", await browserService.getData("token", StorageEnum.LOCAL));
        console.log("create secer", data);

        // await fetch("http://localhost:5050/api/vaults", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${(await browserService.getData("token", StorageEnum.LOCAL))?.token}`,
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(async (res) => {
        //         console.log(await res.json());
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        return response({ message: "create secret response from background", data });
    }
});
