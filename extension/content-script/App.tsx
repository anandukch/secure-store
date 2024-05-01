import browser from "webextension-polyfill";
import React, { useEffect } from "react";

// function handleClick () {
//   browser.runtime.sendMessage({ action: 'Hi from content script 👋' });
// }

function App() {
    useEffect(() => {
        console.log("App mounted");

        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM content loaded");
            
            browser.runtime.sendMessage({ action: 'pageRefreshed' });
        });
        browser.runtime.sendMessage({ action: "mount", payload: { url: window.location.href } });
        if (window.location.href.includes("login")) {
            // browser.runtime.sendMessage({ action: 'login page detected' });
            // find the username and password fields and fill them in
            // console.log("Filling in login form");

            // const usernameField = document.querySelector('input[name="username"]') as HTMLInputElement;
            // const passwordField = document.querySelector('input[name="password"]') as HTMLInputElement;
            // console.log(usernameField, passwordField);

            // inert the username and password into the fields
            document.querySelector('input[name="username"]')?.setAttribute("value", "username");
            document.querySelector('input[name="password"]')?.setAttribute("value", "password");

            browser.runtime.sendMessage({ action: "fetch" }).then((response) => {
                console.log("response", response);
            });
        }

        const handleUserInteraction = (event) => {
            const fieldInfo = {
                type: event.target.tagName,
                value: event.target.value,
                action: event.type,
            };

            if ((fieldInfo.type === "BUTTON" || fieldInfo.value === "Login") && fieldInfo.action === "click") {
                // console.log("Login button clicked");
                // can we get the resposne of the fetch request here
                browser.runtime.sendMessage({
                    action: "login",
                    payload: {
                        fieldInfo,
                        url: window.location.href,
                    },
                });
            }
            // what to know if its a form submit event when a button is clicked
            // console.log(event.target.tagName);

            // Check if the target element is an input field or textarea

            // if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            //     const fieldInfo = {
            //         type: event.target.tagName,
            //         value: event.target.value,
            //         action: event.type, // 'keydown', 'keyup', 'click', 'focus', 'change', etc.
            //     };
            //     // check if it is a login button

            //     console.log("Field information:", fieldInfo);

            //     // Send message to background script with field information
            //     browser.runtime.sendMessage({ action: "form_interaction", payload: fieldInfo }).then((response) => {
            //         console.log("Response from background script:", response);
            //     });
            // }

            // check if it is a login button

            // console.log("Field information:", fieldInfo);
            browser.runtime.sendMessage({ action: "form_interaction", payload: event });
            // if (event.target.tagName === "BUTTON") {
            //     console.log("Login button clicked");
            // browser.runtime.sendMessage({ action: "login", data: event });
            // }

            // Check if the target element is an input field or textarea
            // if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            //     const fieldInfo = {
            //         type: event.target.tagName,
            //         value: event.target.value,
            //         action: event.type, // 'keydown', 'keyup', 'click', 'focus', 'change', etc.
            //     };
            //     // check if it is a login button

            //     console.log("Field information:", fieldInfo);

            //     // Send message to background script with field information
            //     // browser.runtime.sendMessage({ action: "form_interaction", payload: fieldInfo }).then((response) => {
            //     //     console.log("Response from background script:", response);
            //     // });
            // }
        };

        document.addEventListener("keydown", handleUserInteraction);
        document.addEventListener("keyup", handleUserInteraction);
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("focus", handleUserInteraction);
        document.addEventListener("change", handleUserInteraction);

        return () => {
            console.log("App unmounted");
        };
    }, []);
    return <></>;
}

export default App;
