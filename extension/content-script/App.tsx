import browser from "webextension-polyfill";
import React, { useEffect } from "react";

// function handleClick () {
//   browser.runtime.sendMessage({ action: 'Hi from content script 👋' });
// }

function App() {
    useEffect(() => {
        console.log("App mounted");
        if (window.location.href.includes("login")) {
            // browser.runtime.sendMessage({ action: 'login page detected' });
            // find the username and password fields and fill them in
            console.log("Filling in login form");

            const usernameField = document.querySelector('input[name="username"]') as HTMLInputElement;
            const passwordField = document.querySelector('input[name="password"]') as HTMLInputElement;
            console.log(usernameField, passwordField);

            // inert the username and password into the fields
            document.querySelector('input[name="username"]')?.setAttribute("value", "username");
            document.querySelector('input[name="password"]')?.setAttribute("value", "password");
            
            browser.runtime.sendMessage({ action: "fetch" }).then((response) => {
                console.log("response", response);
            });
        }



        const handleUserInteraction = (event) => {
            // Check if the target element is an input field or textarea
            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                const fieldInfo = {
                    type: event.target.tagName,
                    value: event.target.value,
                    action: event.type // 'keydown', 'keyup', 'click', 'focus', 'change', etc.
                };

                console.log("Field information:", fieldInfo);
                

                // Send message to background script with field information
                // browser.runtime.sendMessage({ action: "form_interaction", payload: fieldInfo }).then((response) => {
                //     console.log("Response from background script:", response);
                // });
            }
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
