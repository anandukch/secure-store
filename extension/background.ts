import browser from "webextension-polyfill";
// browser.runtime.onMessage.addListener((msg) => {
//     console.log(msg);
//     }
// );
type Message = {
    action: "fetch";
    value: null;
};

type ResponseCallback = (data: object) => void;

async function handleMessage({ action }: Message, response: ResponseCallback) {
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
    browser.windows.getAll({ populate: true }).then((windows) => {
        console.log("windows", windows);

        const existingPopup = windows.find((window) => window.type === "popup");

        if (existingPopup) {
            browser.windows.remove(existingPopup.id!);
        }
    }
    ).catch((error) => {
        console.log("error", error);
    }
    );
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
        top: 10,
        left: 10,
    });
};

// interface GlobalState {
//     url: string;
// }

// let globalState: GlobalState;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

browser.runtime.onMessage.addListener( (msg, sender, response) => {
    handleMessage(msg, response);
    removePopupIfExists();
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
    if (msg.action === "pageRefreshed") {
        console.log("page refreshed");
    }
    if (msg.action === "pop") {
        // browser.action.setPopup({ popup: "index.html" });
        // browser.windows.create({
        //     url: "index.html",
        //     type: "popup",
        //     width: 500,
        //     height: 500,
        //     top: 30,
        //     left: 30,
        // });
    }
    if (msg.action === "login") {

        // removePopupIfExists();
        showPopup();
        // send reposne back
        // console.log("login", msg.payload);
        // createWindow();
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
