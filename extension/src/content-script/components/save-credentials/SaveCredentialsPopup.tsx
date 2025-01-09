import { useState } from "react";
import { PopupHeader } from "./PopupHeader";
import { ProjectSelector } from "./ProjectSelector";
import { CredentialDisplay } from "./CredentialDisplay";
import { CustomFields } from "./CustomFields";
import { PopupFooter } from "./PopupFooter";

export interface Credential {
    id: string;
    key: string;
    value: string;
    type?: "password" | "text";
    label?: string;
}
interface SaveCredentialsPopupProps {
    credentials: Credential[];
    url: string;
    onSave: (data: any) => void;
    onCancel: () => void;
}

export function SaveCredentialsPopup({ credentials, url, onCancel, onSave }: SaveCredentialsPopupProps) {
    const [selectedProject, setSelectedProject] = useState("Personal");
    // const [usernameToSave, setUsername] = useState(username);
    // const [passwordToSave, setPassword] = useState(password);
    const [credentialsToSave, setCredentialsToSave] = useState<Credential[]>(credentials);
    const [customFields, setCustomFields] = useState<Record<string, { key: string; value: string }>>({});

    const handleChangeCredentials = (index: string, key: string, value: string) => {
        setCredentialsToSave((prev) => {
            const newCredentials = [...prev];
            const indexToChange = newCredentials.findIndex((cred) => cred.id === index);
            newCredentials[indexToChange] = { ...newCredentials[indexToChange], value };
            return newCredentials;
        });
    };
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
            secrets: credentialsToSave,
        });
        console.log(selectedProject, customFields);
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

                    {/* <CredentialDisplay
                        username={usernameToSave}
                        password={passwordToSave}
                        url={url}
                        onUsernameChange={setUsername}
                        onPasswordChange={setPassword}
                    /> */}
                    <div style={{ marginBottom: "8px" }}>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#4a4a4a" }}>Website</label>
                        <input
                            type="text"
                            value={url}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "4px",
                                backgroundColor: "#f9fafb",
                            }}
                        />
                    </div>

                    {credentialsToSave.map((cred) => (
                        <div key={cred.id} style={{ marginBottom: "8px" }}>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#4a4a4a" }}>
                                {cred.label || cred.key}
                            </label>
                            <input
                                type={cred.type || "text"}
                                value={cred.value}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    backgroundColor: "#f9fafb",
                                }}
                                onChange={(e) => handleChangeCredentials(cred.id, cred.key, e.target.value)}
                            />
                        </div>
                    ))}

                    <CustomFields fields={customFields} onAdd={handleAddField} onChange={handleChangeField} onRemove={handleRemoveField} />
                </div>

                <PopupFooter onSave={handleSave} onCancel={onCancel} />
            </div>
        </div>
    );
}
