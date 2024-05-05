import browser from "webextension-polyfill";
// browser.runtime.onMessage.addListener((msg) => {
//     console.log(msg);
//     }
// );

type ResponseCallback = (data: object) => void;

async function handleMessage({ action }: MessageInterface, response: ResponseCallback) {
    if (action === "fetch") {
        console.log("fetching data");

        const result = await fetch("https://meowfacts.herokuapp.com/");

        const { data } = await result.json();

        response({ message: "success", data });
    } else {
        response({ data: null, error: "Unknown action" });
    }
}

const removePopupIfExists = () => {
    browser.windows
        .getAll({ populate: true })
        .then((windows) => {
            console.log("windows", windows);

            const existingPopup = windows.find((window) => window.type === "popup");

            if (existingPopup) {
                browser.windows.remove(existingPopup.id!);
            }
        })
        .catch((error) => {
            console.log("error", error);
        });
    // try {
    //     const windows = await browser.windows.getAll({ populate: true });
    //     console.log("windows", windows);

    //     const existingPopup = windows.find((window) => window.type === "popup");

    //     if (existingPopup) {
    //         await browser.windows.remove(existingPopup.id!);
    //     }
    // } catch (error) {
    //     return;
    // }
};

const showPopup = () => {
    browser.windows.create({
        url: "index.html",
        type: "popup",

        width: 500,
        height: 500,
        top: 100,
        left: 90,
    });
};

type GlobalState = {
    url: string;
    showPopup: boolean;
};
type MessageInterface = {
    action: string;
    payload?: object;
};
let globalState: GlobalState;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

browser.runtime.onMessage.addListener((msg: MessageInterface, sender, response) => {
    // removePopupIfExists();

    handleMessage(msg, response);
    // browser.windows.getAll({populate:true}).then((windows) => {
    //     console.log("windows", windows);

    //     const existingPopup = windows.find((window) => window.type === "popup");
    //     // console.log("existingPopup", existingPopup);

    //     // // If an existing popup window is found, close it
    //     if (existingPopup) {
    //         browser.windows.remove(existingPopup.id!);
    //     }
    // });
    // if (msg.action != "login") {
    // await removePopupIfExists();
    // }
    // if (msg.action === "mount") {
    //     console.log("mounting");
    //     console.log(msg, globalState);

    //     if (msg.payload.url === globalState.url) {
    //         showPopup();
    //     }
    // }
    // if (msg.action === "show_popup") {
    //     browser.windows.create({
    //         url: "index.html",
    //         type: "popup",
    //         width: 500,
    //         height: 500,
    //         top: 30,
    //         left: 30,
    //     });
    // }

    // if (msg.action === "form_interaction") {
    //     console.log("form_interaction", msg.payload);
    //     if (msg.payload.type === "INPUT") {
    //          removePopupIfExists();
    //         showPopup();
    //         // browser.runtime.openOptionsPage();
    //     }
    // }

    if (msg.action === "mount") {
        const url = new URL((msg.payload as { url: string }).url);
        const urlParts = url.hostname.split("/");
        console.log("domain", urlParts[0]);
        console.log("globalState", globalState);
        
        sender.tab?.id &&
            browser.tabs.sendMessage(sender.tab.id, { action: "mount", payload: { globalState } }).then((response) => {
                console.log("response", response);
            });
    }
    if (msg.action === "login") {
        // removePopupIfExists();
        const url = new URL((msg.payload as { url: string }).url);
        const urlParts = url.hostname.split("/");
        console.log("domain", urlParts[0]);
        globalState = {
            url: urlParts[0],
            showPopup: true,
        };


        // browser.runtime.sendMessage({ action: "login", data: msg.payload });
        // globalState = {
        //     url: msg.payload.url,
        // };
        // browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        //     console.log("tabs", tabs);
        //     browser.tabs.sendMessage(tabs[0].id!, { action: "login", data: msg.payload });
        // });
        // browser.windows.getAll({ populate: true }).then((windows) => {
        //     console.log("windows", windows);
        //     const existingPopup = windows.find((window) => window.type === "popup");
        //     // console.log("existingPopup", existingPopup);
        //     // // If an existing popup window is found, close it
        //     if (existingPopup) {
        //         browser.windows.remove(existingPopup.id!);
        //     }
        //     browser.windows.create({
        //         url: "index.html",
        //         type: "popup",
        //         width: 500,
        //         height: 500,
        //         top: 30,
        //         left: 30,
        //     });
        // });
    }

    // browser.runtime.sendMessage({ action: "show_popup" })
    return true;
});

// onready function);
// browser.runtime.onInstalled.addListener(() => {
//     removePopupIfExists();
// });
