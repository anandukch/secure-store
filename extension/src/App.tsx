import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import browser from "webextension-polyfill";
import { AuthPopup } from "./components/SignIn";
import { CredentialStats } from "./components/CredentialStats";

function App() {
    const [authType, setAuthType] = useState<"login" | "signup">("login");
    const [openAuthPopup, setOpenAuthPopup] = useState(true);
    const [openCredentialsStat, setOpenCredentialsStat] = useState(false);
    useEffect(() => {
        console.log("App mounted");
        browser.runtime.onMessage.addListener((msg) => {
            console.log(msg);
        });
        return () => {
            console.log("App unmounted");
        };
    }, []);

    const handleSubmit = (email: string, password: string) => {
        console.log("Logging in...", { email, password });
        setOpenAuthPopup(false);
        setOpenCredentialsStat(true);
    };
    const handleAuthClick = (type: "login" | "signup") => {
        setAuthType(type);
    };

    const handleManageClick = () => {
        console.log("Manage clicked");
    };

    const handleSettingsClick = () => {
        console.log("Settings clicked");
    };

    const handleAddClick = () => {
        console.log("Add clicked");
    };

    return (
        <>
            <div>
                {openAuthPopup && (
                    <AuthPopup
                        authType={authType}
                        onSubmit={handleSubmit}
                        onCancel={() => console.log("canaveled")}
                        onSignupClick={handleAuthClick}
                    />
                )}
                {openCredentialsStat && (
                    <CredentialStats
                        totalCredentials={42}
                        onManageClick={handleManageClick}
                        onSettingsClick={handleSettingsClick}
                        onAddClick={handleAddClick}
                    />
                )}
            </div>
        </>
    );
}

export default App;
