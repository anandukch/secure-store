interface CredentialDisplayProps {
    username: string;
    password: string;
    url: string;
    onUsernameChange: (username: string) => void;
    onPasswordChange: (password: string) => void;
}

export function CredentialDisplay({ username, password, url, onUsernameChange, onPasswordChange }: CredentialDisplayProps) {
    const inputStyles = {
        width: "100%",
        padding: "0.5rem 0.75rem",
        border: "1px solid #D1D5DB",
        borderRadius: "0.375rem",
        backgroundColor: "#F9FAFB",
        fontSize: "1rem",
    };

    const labelStyles = {
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.5rem",
    };

    const containerStyles = {
        marginBottom: "1rem",
    };

    return (
        <>
            <div style={containerStyles}>
                <label style={labelStyles}>Website</label>
                <input type="text" value={url} style={inputStyles} />
            </div>

            <div style={containerStyles}>
                <label style={labelStyles}>Username</label>
                <input type="text" value={username} style={inputStyles} onChange={(e) => onUsernameChange(e.target.value)} />
            </div>

            <div style={containerStyles}>
                <label style={labelStyles}>Password</label>
                <input type="password" value={password} style={inputStyles} onChange={(e) => onPasswordChange(e.target.value)} />
            </div>
        </>
    );
}
