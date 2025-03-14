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
    const [storedCredentials, setStoredCredentials] = useState<Credential[][]>([]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const hostname = url.hostname;
        setDomain(hostname);

        browserService
            .sendGetSecretMessage(hostname)
            .then((response) => {
                console.log("Fetched vaults:", response);
                if (response?.length) {
                    setStoredCredentials(response);
                }
            })
            .catch((err) => console.error("Error fetching vaults:", err));

        const storedShowPopup = sessionStorage.getItem("showPopup");
        if (storedShowPopup) setShowPopup(true);

        browserService
            .sendMessage({ action: "check_credentials", payload: { url: window.location.href } })
            .then((response) => console.log("Response message:", response));

        const handleUserInteraction = (event: any) => {
            if (
                event.target.tagName === "BUTTON" &&
                ["Login", "Submit"].includes(event.target.innerHTML as never) &&
                event.type === "click"
            ) {
                setShowPopup(true);
                sessionStorage.setItem("showPopup", "true");
            }
            if (!event.target || !(event.target instanceof HTMLInputElement)) return;

            let label: LabelType = { selector: "tag", label: "" };

            if (event.target.id) {
                label = { selector: "id", label: event.target.id };
            } else if (event.target.name) {
                label = { selector: "name", label: event.target.name };
            } else if (event.target.className) {
                label = { selector: "class", label: event.target.className };
            } else if (event.target.placeholder) {
                label = { selector: "placeholder", label: event.target.placeholder };
            } else if (event.target.title) {
                label = { selector: "title", label: event.target.title };
            } else {
                throw Error("Error identifying input field");
            }

            const fieldInfo = {
                type: event.target.type,
                value: event.target.value,
                label,
                action: event.type,
            };

            setCredentials((prev) => {
                const newCredentials = [...prev];
                const index = newCredentials.findIndex(
                    (cred) => cred.label && cred.label.selector === label.selector && cred.label.label === label.label,
                );

                if (index > -1) {
                    newCredentials[index] = { ...newCredentials[index], value: fieldInfo.value };
                } else {
                    newCredentials.push({
                        key: fieldInfo.label.label,
                        value: fieldInfo.value,
                        type: fieldInfo.type.includes("password") ? "password" : "text",
                        label: fieldInfo.label,
                    });
                }

                // we are managing this session for credential because we are not
                // able to get the value of credential from the credential state
                //  if the site reloads after a success login for example
                sessionStorage.setItem("credentials", JSON.stringify(newCredentials));

                return newCredentials;
            });
        };

        document.addEventListener("keydown", handleUserInteraction);
        document.addEventListener("keyup", handleUserInteraction);
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("focus", handleUserInteraction);
        document.addEventListener("change", handleUserInteraction);

        return () => {
            sessionStorage.removeItem("showPopup");
            document.removeEventListener("keydown", handleUserInteraction);
            document.removeEventListener("keyup", handleUserInteraction);
            document.removeEventListener("click", handleUserInteraction);
            document.removeEventListener("focus", handleUserInteraction);
            document.removeEventListener("change", handleUserInteraction);
        };
    }, []);

    const handleSave = () => {
        let credential = credentials;
        if (credential.length === 0) {
            credential = sessionStorage.getItem("credentials") ? JSON.parse(sessionStorage.getItem("credentials")!) : [];
        }

        browserService
            .sendVaultCreationMessage({
                projectId: "123",
                siteUrl: domain,
                secrets: credential as Credential[],
            })
            .then((res) => {
                // console.log("Credentials saved", res);
                setShowPopup(false);
            })
            .catch((err) => console.error("Error saving credentials", err))
            .finally(() => {
                sessionStorage.removeItem("showPopup");
                setCredentials([]);
            });
    };

    const handleCancel = () => {
        sessionStorage.removeItem("showPopup");
        console.log("Cancelled saving credentials");
        setShowPopup(false);
        setCredentials([]);
    };

    const { showSuggestions, inputRect, filteredCredentials, handleSelect, closeSuggestions } = useSuggestionBox(storedCredentials);

    return (
        <>
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
                <SuggestionBox credentials={filteredCredentials} inputRect={inputRect} onSelect={handleSelect} onClose={closeSuggestions} />
            )}
        </>
    );
}

export default App;
