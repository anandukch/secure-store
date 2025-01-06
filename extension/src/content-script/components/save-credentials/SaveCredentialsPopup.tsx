import { useState } from "react";
import { PopupHeader } from "./PopupHeader";
import { ProjectSelector } from "./ProjectSelector";
import { CredentialDisplay } from "./CredentialDisplay";
import { CustomFields } from "./CustomFields";
import { PopupFooter } from "./PopupFooter";

interface SaveCredentialsPopupProps {
    username: string;
    password: string;
    url: string;
    onSave: (data: any) => void;
    onCancel: () => void;
}

export function SaveCredentialsPopup({ username, password, url, onCancel, onSave }: SaveCredentialsPopupProps) {
    const [selectedProject, setSelectedProject] = useState("Personal");
    const [usernameToSave, setUsername] = useState(username);
    const [passwordToSave, setPassword] = useState(password);
    const [customFields, setCustomFields] = useState<Record<string, { key: string; value: string }>>({});

    const handleAddField = () => {
        const id = crypto.randomUUID();
        setCustomFields((prev) => ({
            ...prev,
            [id]: { key: "", value: "" },
        }));
    };

    const handleChangeField = (id: string, key: string, value: string) => {
        setCustomFields((prev) => ({
            ...prev,
            [id]: { key, value },
        }));
    };

    const handleRemoveField = (id: string) => {
        setCustomFields((prev) => {
            const newFields = { ...prev };
            delete newFields[id];
            return newFields;
        });
    };

    const handleSave = () => {
        onSave({
            siteUrl: url,
            projectId: selectedProject,
            secrets: { email: usernameToSave, password: passwordToSave, customFields },
        });
        console.log(usernameToSave, passwordToSave, selectedProject, customFields);
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                    width: "30rem",
                    overflow: "hidden",
                    animation: "slideIn 0.3s ease-out",
                }}
            >
                <PopupHeader title="Save Password" onClose={onCancel} />

                <div
                    style={{
                        padding: "1rem", // Equivalent to `p-4`
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem", // Equivalent to `space-y-4`
                    }}
                >
                    <ProjectSelector selected={selectedProject} onChange={setSelectedProject} />

                    <CredentialDisplay
                        username={usernameToSave}
                        password={passwordToSave}
                        url={url}
                        onUsernameChange={setUsername}
                        onPasswordChange={setPassword}
                    />

                    <CustomFields fields={customFields} onAdd={handleAddField} onChange={handleChangeField} onRemove={handleRemoveField} />
                </div>

                <PopupFooter onSave={handleSave} onCancel={onCancel} />
            </div>
        </div>
    );
}
