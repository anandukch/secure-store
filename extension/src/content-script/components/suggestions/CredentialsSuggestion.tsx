import { Key } from "lucide-react";

interface StoredCredential {
    username: string;
    password: string;
    url: string;
}

interface CredentialSuggestionProps {
    credential: StoredCredential;
    onSelect: (credential: StoredCredential) => void;
}

export function CredentialSuggestion({ credential, onSelect }: CredentialSuggestionProps) {
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
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}> {credential.username}</p>
                <p style={{ fontSize: "0.75rem", color: "#6B7280" }}> {credential.url}</p>
            </div>
        </button>
    );
}
