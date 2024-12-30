import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import browser from "webextension-polyfill";
import { AuthPopup } from "./components/SignIn";
import { CredentialStats } from "./components/CredentialStats";
import { RecoveryKeyPopup } from "./components/RecoveryKeyPop";
import { OTPVerificationPopup } from "./components/OTPVerificationPopup";
import { authService } from "./services/auth";

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
        browser.runtime.onMessage.addListener((msg) => {
            console.log(msg);
        });
        return () => {
            console.log("App unmounted");
        };
    }, []);

    const handleSubmit = (email: string, password: string) => {
        console.log("Logging in...", { email, password });

        setIsLoading(true);
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
