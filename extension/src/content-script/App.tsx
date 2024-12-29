import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { SaveCredentialsPopup } from "./components/SaveCredentialsPopup";
import { useSuggestionBox } from "../hooks/useSuggestionBox";
import { SuggestionBox } from "./components/suggestions/SuggestionBox";
// import Confirmation from "./components/Confirmation";

function App() {
    const [showPopup, setShowPopup] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const createSuggestionBox = (field: HTMLInputElement) => {
    //     const suggestionDiv = document.createElement("div");
    //     suggestionDiv.style.width = `${field.offsetWidth}px`;
    //     suggestionDiv.style.height = "50px";
    //     suggestionDiv.style.position = "absolute";
    //     suggestionDiv.style.top = `${field.offsetTop + field.offsetHeight}px`;
    //     suggestionDiv.style.left = `${field.offsetLeft}px`;
    //     suggestionDiv.style.zIndex = "1000";
    //     suggestionDiv.style.border = "1px solid black";
    //     suggestionDiv.style.display = "none";
    //     suggestionDiv.style.textAlign = "center";
    //     suggestionDiv.style.color = "black";
    //     suggestionDiv.style.fontWeight = "bold";
    //     suggestionDiv.style.fontSize = "12px";
    //     suggestionDiv.style.padding = "5px";
    //     suggestionDiv.style.borderRadius = "5px";
    //     suggestionDiv.style.display = "block";
    //     suggestionDiv.innerText = "Suggestion";
    //     field.parentNode?.appendChild(suggestionDiv);
    // };

    useEffect(() => {
        console.log("App mounted");
        browser.runtime.sendMessage({
            action: "mount",
            payload: {
                url: window.location.href,
            },
        });

        browser.runtime.onMessage.addListener((msg) => {
            console.log("mount", msg);
            if (msg.action === "mount") {
                if (msg.payload.globalState && msg.payload.globalState.showPopup) {
                    console.log("Show confirmation");
                }
            }

            return Promise.resolve("Got your message");
        });
        browser.runtime.sendMessage({ action: "check_credentials", payload: { url: window.location.href } }).then((response) => {
            console.log("response message ", response);
        });
        // console.log("tested message ", a);

        if (window.location.href.includes("login")) {
            // const usernameField = document.querySelector('input[name="username"]') as HTMLInputElement;
            // const passwordField = document.querySelector('input[name="password"]') as HTMLInputElement;
            // console.log(usernameField, passwordField);

            // inert the username and password into the fields
            // document.querySelector('input[name="username"]')?.setAttribute("value", "username");
            // document.querySelector('input[name="password"]')?.setAttribute("value", "password");

            // browser.runtime.sendMessage({ action: "fetch" }).then((response) => {
            //     console.log("response", response);
            // });

            console.log("Login page detected");
            const inputFields = document.querySelectorAll("input");

            inputFields.forEach((field) => {
                if (field.type.includes("email") || field.name === "username") {
                    // createSuggestionBox(field);
                    field.value = "username";
                }
                if (field.type === "password") {
                    // createSuggestionBox(field);
                    field.value = "password";
                }
            });
        }

        const handleUserInteraction = (event: any) => {
            console.log("User interaction detected", event);

            const fieldInfo = {
                type: event.target.tagName,
                value: event.target.value,
                action: event.type,
            };

            if (
                fieldInfo.type === "BUTTON" &&
                ["Login", "Submit"].includes(event.target.innerHTML as never) &&
                fieldInfo.action === "click"
            ) {
                console.log("Login button clicked", fieldInfo);
                console.log(event.target.innerHTML);

                setShowPopup(true);
                console.log("login payload", {
                    url: window.location.href,
                    fieldInfo,
                });

                browser.runtime
                    .sendMessage({
                        action: "login",
                        payload: {
                            fieldInfo,
                            url: window.location.href,
                        },
                    })
                    .then((response) => {
                        console.log("Response from background script:", response);
                    });
            }

            browser.runtime.sendMessage({
                action: "form_interaction",
                payload: event,
            });
            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                const fieldInfo = {
                    type: event.target.tagName,
                    value: event.target.value,
                    action: event.type, // 'keydown', 'k2eyup', 'click', 'focus', 'change', etc.
                };

                console.log("Field information:", fieldInfo);
                browser.runtime
                    .sendMessage({
                        action: "form_interaction",
                        payload: fieldInfo,
                    })
                    .then((response) => {
                        console.log("Response from background script:", response);
                    });
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

    // Demo credentials
    const credentials = {
        username: "demo@example.com",
        password: "password123",
        url: "https://example.com",
    };

    const handleSave = () => {
        console.log("Saving credentials...");
        // Add your save logic here
    };

    const handleCancel = () => {
        console.log("Cancelled saving credentials");
        setShowPopup(false);
        // Add your cancel logic here
    };

    const { showSuggestions, inputRect, handleSelect, closeSuggestions } = useSuggestionBox();

    // Demo stored credentials
    const storedCredentials = [
        {
            username: "demo@example.com",
            password: "password123",
            url: "https://example.com",
        },
        {
            username: "user@test.com",
            password: "test456",
            url: "https://test.com",
        },
    ];
    // return <>{showConfirmation && <Confirmation handleConfirm={() => setShowConfirmation(false)} />}</>;
    return (
        <>
            <div style={{}}>
                {showPopup && (
                    <div
                        style={{
                            position: "fixed",
                            top: "16px",
                            right: "16px",
                            zIndex: 9999,
                        }}
                    >
                        <SaveCredentialsPopup
                            username={credentials.username}
                            password={credentials.password}
                            url={credentials.url}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    </div>
                )}

                {showSuggestions && inputRect && (
                    <SuggestionBox
                        credentials={storedCredentials}
                        inputRect={inputRect}
                        onSelect={handleSelect}
                        onClose={closeSuggestions}
                    />
                )}
            </div>
        </>
    );
}

export default App;
