import { useEffect, useState } from "react";
import { SaveCredentialsPopup } from "./components/save-credentials/SaveCredentialsPopup";
import { useSuggestionBox } from "../hooks/useSuggestionBox";
import { SuggestionBox } from "./components/suggestions/SuggestionBox";
import { browserService } from "../services/browser";
import { Credential, LabelType } from "../types";

function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [domain, setDomain] = useState("");
    const [credentials, setCredentials] = useState<Credential[]>([]);
    useEffect(() => {
        const url = new URL(window.location.href);
        const urlParts = url.hostname.split("/");
        setDomain(urlParts[0]);
        // setCurrentUrl(window.location.href);
        browserService
            .sendGetSecretMessage(urlParts[0])
            .then((response) => {
                console.log("fetched vaults ", response);
            })
            .catch((err) => {
                console.log("Error sending message to background script:", err);
            });
        const storedShowPopup = sessionStorage.getItem("showPopup");
        if (storedShowPopup) {
            setShowPopup(true);
        }

        browserService.sendMessage({
            action: "mount",
            payload: {
                url: window.location.href,
            },
        });

        browserService.sendMessage({ action: "check_credentials", payload: { url: window.location.href } }).then((response) => {
            console.log("response message ", response);
        });

        if (window.location.href.includes("login")) {
            // const usernameField = document.querySelector('input[name="username"]') as HTMLInputElement;
            // const passwordField = document.querySelector('input[name="password"]') as HTMLInputElement;
            // inert the username and password into the fields
            // document.querySelector('input[name="username"]')?.setAttribute("value", "username");
            // document.querySelector('input[name="password"]')?.setAttribute("value", "password");
            // browser.runtime.sendMessage({ action: "fetch" }).then((response) => {
            // });
            // const inputFields = document.querySelectorAll("input");
            // inputFields.forEach((field) => {
            //     if (field.type.includes("email") || field.name === "username") {
            //         // createSuggestionBox(field);
            //         field.value = "username";
            //     }
            //     if (field.type === "password") {
            //         // createSuggestionBox(field);
            //         field.value = "password";
            //     }
            // });
        }

        const handleUserInteraction = (event: any) => {
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
                setShowPopup(true);
                sessionStorage.setItem("showPopup", "true");
            }

            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                let label: LabelType = { selector: "tag", label: "" };
                if (event.target.id) {
                    label = { selector: "id", label: event.target.id };
                } else if (event.target.className) {
                    label = { selector: "class", label: event.target.className };
                } else if (event.target.name) {
                    label = { selector: "name", label: event.target.name };
                } else if (event.target.tagName) {
                    label = { selector: "tag", label: event.target.tagName };
                } else if (event.target.placeholder) {
                    label = { selector: "placeholder", label: event.target.placeholder };
                } else if (event.target.title) {
                    label = { selector: "title", label: event.target.title };
                } else {
                    throw Error("Error saving credentials");
                }
                const fieldInfo = {
                    type: event.target.tagName,
                    value: event.target.value,
                    label,
                    action: event.type, // 'keydown', 'k2eyup', 'click', 'focus', 'change', etc.
                };
                setCredentials((prev) => {
                    const newCredentials = [...prev];
                    const index = newCredentials.findIndex((cred) => cred.key === fieldInfo.label.label);
                    if (index > -1) {
                        newCredentials[index] = { ...newCredentials[index], value: fieldInfo.value };
                    } else {
                        const newCredential: Credential = {
                            // id: crypto.randomUUID(),
                            key: fieldInfo.label.label,
                            value: fieldInfo.value,
                            type: fieldInfo.type === "INPUT" ? "text" : "password",
                            label: fieldInfo.label,
                        };
                        newCredentials.push(newCredential);
                    }
                    return newCredentials;
                });

                browserService
                    .sendMessage({
                        action: "form_interaction",
                        payload: fieldInfo,
                    })
                    .then((response) => {
                        console.log("Response from background script:", response);
                    })
                    .catch((err) => {
                        console.log("Error sending message to background script:", err);
                    });
            }
        };

        document.addEventListener("keydown", handleUserInteraction);
        document.addEventListener("keyup", handleUserInteraction);
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("focus", handleUserInteraction);
        document.addEventListener("change", handleUserInteraction);

        return () => {
            sessionStorage.removeItem("showPopup");
        };
    }, []);

    const handleSave = (data: any) => {
        console.log("Saving credentials...", credentials);
        browserService
            .sendVaultCreationMessage({
                projectId: "123",
                siteUrl: domain,
                secrets: credentials,
            })
            .then((res) => {
                console.log("Credentials saved", res);
                setShowPopup(false);
            })
            .catch((err) => {
                console.log("Error saving credentials", err);
            })
            .finally(() => {
                sessionStorage.removeItem("showPopup");
                // remove credentials from state
                setCredentials([]);
            });
    };

    const handleCancel = () => {
        sessionStorage.removeItem("showPopup");
        console.log("Cancelled saving credentials");
        setShowPopup(false);
        setCredentials([]);
    };

    const { showSuggestions, inputRect, handleSelect, closeSuggestions } = useSuggestionBox();

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
    // const credentials: Credential[] = [
    //     { id: crypto.randomUUID(), key: "username", value: "demo@example.com", label: "Username", type: "text" },
    //     { id: crypto.randomUUID(), key: "password", value: "password123", label: "Password", type: "password" },
    //     { id: crypto.randomUUID(), key: "apiKey", value: "abc123xyz", label: "API Key", type: "text" },
    // ];
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
                        <SaveCredentialsPopup url={domain} onSave={handleSave} onCancel={handleCancel} />
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
