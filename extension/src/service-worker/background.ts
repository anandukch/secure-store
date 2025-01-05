import browser from "webextension-polyfill";
import { ActionEnum, StorageEnum } from "../common/enum";
import { browserService } from "../services/browser";
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

browser.runtime.onMessage.addListener((msg: MessageInterface, sender, response: any) => {
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
        console.log("login", msg);
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
});
