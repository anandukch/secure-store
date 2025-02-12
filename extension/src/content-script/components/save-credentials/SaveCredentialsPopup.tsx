import React, { useEffect, useState } from "react";

interface SaveCredentialsPopupProps {
    url: string;
    onSave: (data: any) => void;
    onCancel: (data: any) => void;
}

export function SaveCredentialsPopup({ onSave, onCancel }: SaveCredentialsPopupProps) {
    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 2, 0));
        }, 140);

        const timeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onCancel, 500);
        }, 7000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onCancel]);

    return (
        <div
            style={{
                position: "fixed",
                top: "1rem",
                right: "1rem",
                backgroundColor: "#1e1e1e",
                borderRadius: "6px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "12px",
                zIndex: 1000,
                color: "#ffffff",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.5s ease-out",
                gap: "0.5rem",
            }}
        >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                <p style={{ margin: "0", fontWeight: "500", color: "white" }}>Save credentials?</p>
                <button
                    type="button"
                    onClick={onSave}
                    style={{
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Yes
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        background: "none",
                        border: "1px solid #555",
                        color: "#bbbbbb",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    No
                </button>
            </div>
            <div
                style={{
                    height: "3px",
                    width: "100%",
                    backgroundColor: "#444",
                    borderRadius: "2px",
                    overflow: "hidden",
                    position: "relative",
                    marginTop: "4px",
                }}
            >
                <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#007bff", transition: "width 0.14s linear" }}></div>
            </div>
        </div>
    );
}
