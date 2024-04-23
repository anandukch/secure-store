import browser from "webextension-polyfill";
import React, { useEffect } from "react";

// function handleClick () {
//   browser.runtime.sendMessage({ action: 'Hi from content script 👋' });
// }

function App() {
    useEffect(() => {
        console.log("App mounted");
        // /check whether the page os a login page and if so, send a message to the background script
        if (window.location.href.includes("login")) {
            // browser.runtime.sendMessage({ action: 'login page detected' });
            // find the username and password fields and fill them in
            console.log("Filling in login form");

            const usernameField = document.querySelector('input[name="username"]') as HTMLInputElement;
            const passwordField = document.querySelector('input[name="password"]') as HTMLInputElement;
            console.log(usernameField, passwordField);

            // inert the username and password into the fields
            document.querySelector('input[type="email"]')?.setAttribute("value", "username");
            document.querySelector('input[name="password"]')?.setAttribute("value", "password");

            browser.runtime.sendMessage({ action: "fetch" }).then((response) => {
                console.log("response", response);
            });
        }

        return () => {
            console.log("App unmounted");
        };
    }, []);
    return <></>;
}

export default App;
