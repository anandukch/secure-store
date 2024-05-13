import browser from "webextension-polyfill";
// browser.runtime.onMessage.addListener((msg) => {
//     console.log(msg);
//     }
// );

type ResponseCallback = (data: object) => void;

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
    url: string;
    showPopup: boolean;
};

type PayloadType = object | string | number | boolean | null | undefined;

type MessageInterface = {
    action: string;
    payload?: {
        [key: string]: PayloadType;
    };
};

let globalState: GlobalState;

browser.runtime.onMessage.addListener((msg: MessageInterface, sender, response: ResponseCallback) => {
    response({ message: "success" });
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
    if (msg.action === "login") {
        console.log("login", msg);

        const url = new URL(msg.payload?.url as string);
        const urlParts = url.hostname.split("/");
        console.log("domain", urlParts[0]);
        globalState = {
            url: urlParts[0],
            showPopup: true,
        };
        console.log("login", globalState);
    }

    return true;
});
