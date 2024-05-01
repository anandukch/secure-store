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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

browser.runtime.onMessage.addListener((msg, sender, response) => {
    handleMessage(msg, response);

    if(msg.action === "pop"){
        browser.windows.create({
            url: "index.html",
            type: "popup",
            width: 500,
            height: 500,
            top: 300,
        });
    }

    browser.windows.getAll({populate:true}).then((windows) => {
        console.log("windows", windows);
        
        // const existingPopup = windows.find((window) => window.type === "popup");
        // console.log("existingPopup", existingPopup);
        
        // // If an existing popup window is found, close it
        // if (existingPopup) {
        //     browser.windows.remove(existingPopup.id!);
        // }
        // browser.windows.create({
        //     url: "https://www.google.com/",
        //     type: "popup",
        //     width: 500,
        //     height: 500,
        //     top: 300,
        // });
    });

    // browser.runtime.sendMessage({ action: "show_popup" })
    return true;
});
