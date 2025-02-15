import { Key } from "lucide-react";

// interface StoredCredential {
//     username: string;
//     password: string;
//     url: string;
// }

interface CredentialField {
    key: string; // "username" or "password"
    value: string;
    type: string;
    label: {
        selector: string; // e.g., "id", "name"
        label: string; // actual label like "username" or "password"
    };
}

export type StoredCredential = CredentialField[];
export function CredentialSuggestion({
    credential,
    onSelect,
}: {
    credential: StoredCredential;
    onSelect: (credential: StoredCredential) => void;
}) {
    const usernameField = credential.find((field) => field.key === "username");
    const passwordField = credential.find((field) => field.key === "password");

    return (
        <button
            onClick={() => onSelect(credential)}
            style={{
                width: "100%",
                padding: "0.5rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
            <Key style={{ width: "1rem", height: "1rem", color: "#9CA3AF" }} />
            <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>{usernameField?.value || "Unknown Username"}</p>
                <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>{passwordField?.value ? "●●●●●●●●" : "No Password"}</p>
            </div>
        </button>
    );
}
