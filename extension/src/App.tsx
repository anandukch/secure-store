import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import browser from "webextension-polyfill";
import { AuthPopup } from "./components/SignIn";
import { CredentialStats } from "./components/CredentialStats";
import { RecoveryKeyPopup } from "./components/RecoveryKeyPop";
import { OTPVerificationPopup } from "./components/OTPVerificationPopup";
import { authService } from "./services/auth";
import { browserService } from "./services/browser";
import { StorageEnum } from "./common/enum";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [authType, setAuthType] = useState<"login" | "signup">("login");
    const [openAuthPopup, setOpenAuthPopup] = useState(true);
    const [openCredentialsStat, setOpenCredentialsStat] = useState(false);

    const [showRecoveryKey, setShowRecoveryKey] = useState(false);
    const [recoveryKey, setRecoveryKey] = useState("");

    const [showOTPVerification, setShowOTPVerification] = useState(false);

    useEffect(() => {
        console.log("App mounted");
        // chrome.runtime.onMessage.addListener((msg) => {
        //     console.log(msg);
        // });
        // browserService.sendMessage({ action: "fetch" });
        browserService.getData("token", StorageEnum.LOCAL).then((res) => {
            console.log("Token", res);

            if (res?.token) {
                console.log("Token found", res.token);

                browserService.getData("masterKey", StorageEnum.LOCAL).then((res) => {
                    console.log("User attributes", res);

                    if (res?.masterKey) {
                        setOpenAuthPopup(false);
                        setOpenCredentialsStat(true);
                    } else {
                        browserService.removeData("token", StorageEnum.LOCAL);
                        browserService.removeData("masterKey", StorageEnum.LOCAL);
                        setOpenAuthPopup(true);
                    }
                });
            }
        });
        return () => {
            console.log("App unmounted");
        };
    }, []);

    const handleSubmit = (email: string, password: string) => {
        console.log("Logging in...", { email, password });

        setIsLoading(true);
        console.log(authType);

        if (authType === "login") {
            authService
                .loginUser({ email, password })
                .then((res) => {
                    console.log("response login", res);
                    browserService.sendLoginMessage(res).then((response) => {
                        console.log("response", response);
                        setIsLoading(false);
                        setOpenAuthPopup(false);
                        setOpenCredentialsStat(true);
                    });
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                });
            return;
        }
        authService
            .register("name", email, password, password)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                setOpenAuthPopup(false);
                setShowOTPVerification(true);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };
    const handleRecoveryKeyDownload = () => {
        setShowRecoveryKey(false);
        setOpenCredentialsStat(true);
        // Additional logic after key download if needed
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
        browserService.removeAllData(StorageEnum.LOCAL);
        console.log("Add clicked");
    };

    const handleOTPVerify = (otp: string) => {
        // In production, verify OTP with backend
        console.log("Verifying OTP:", otp);
        setShowOTPVerification(false);

        if (authType === "login") {
            setOpenCredentialsStat(true);
        } else {
            const key = crypto.randomUUID() + "-" + Date.now().toString(36);
            setRecoveryKey(key);
            setShowRecoveryKey(true);
        }
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
                        loading={isLoading}
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

                {showRecoveryKey && (
                    <RecoveryKeyPopup
                        recoveryKey={recoveryKey}
                        onDownload={handleRecoveryKeyDownload}
                        onClose={() => setShowRecoveryKey(false)}
                    />
                )}

                {showOTPVerification && <OTPVerificationPopup onVerify={handleOTPVerify} onCancel={() => setShowOTPVerification(false)} />}
            </div>
        </>
    );
}

export default App;
