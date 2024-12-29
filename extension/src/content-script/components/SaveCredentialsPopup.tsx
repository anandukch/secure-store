import { useState } from "react";
// import { Save, X, ChevronDown, Lock } from 'lucide-react';

interface SaveCredentialsPopupProps {
    username: string;
    password: string;
    url: string;
    onSave: () => void;
    onCancel: () => void;
}

const projects = ["Personal", "Work", "Social Media", "Banking", "Shopping"];

export function SaveCredentialsPopup({ username, password, url, onSave, onCancel }: SaveCredentialsPopupProps) {
    const [selectedProject, setSelectedProject] = useState(projects[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={onCancel}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "384px",
                    overflow: "hidden",
                    animation: "slideIn 0.3s",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: "#4F46E5",
                        padding: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <Lock style={{ width: '20px', height: '20px', color: 'white' }} /> */}
                        <h2 style={{ color: "white", fontWeight: "600", marginLeft: "8px" }}>Save Password</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        style={{
                            color: "white",
                            padding: "4px",
                            borderRadius: "4px",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {/* <X style={{ width: '20px', height: '20px' }} /> */}
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500", color: "#4B5563" }}>Project</label>
                        <div style={{ position: "relative" }}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                style={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                            >
                                <span>{selectedProject}</span>
                                {/* <ChevronDown style={{ width: '16px', height: '16px', color: '#9CA3AF' }} /> */}
                            </button>

                            {isDropdownOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        zIndex: 10,
                                        marginTop: "4px",
                                        width: "100%",
                                        backgroundColor: "white",
                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "4px",
                                        border: "1px solid #E5E7EB",
                                    }}
                                >
                                    {projects.map((project) => (
                                        <button
                                            key={project}
                                            onClick={() => {
                                                setSelectedProject(project);
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                textAlign: "left",
                                                fontSize: "14px",
                                                backgroundColor: "transparent",
                                                cursor: "pointer",
                                                color: "#4B5563",
                                                transition: "background-color 0.2s",
                                            }}
                                        >
                                            {project}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500", color: "#4B5563" }}>Website</label>
                        <input
                            type="text"
                            value={url}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "4px",
                                backgroundColor: "#F9FAFB",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500", color: "#4B5563" }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "4px",
                                backgroundColor: "#F9FAFB",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500", color: "#4B5563" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "4px",
                                backgroundColor: "#F9FAFB",
                            }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        backgroundColor: "#F9FAFB",
                        padding: "16px",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "16px",
                    }}
                >
                    <button
                        onClick={onCancel}
                        style={{
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#4B5563",
                            backgroundColor: "transparent",
                            borderRadius: "4px",
                            cursor: "pointer",
                            border: "1px solid #D1D5DB",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        style={{
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "white",
                            backgroundColor: "#4F46E5",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            border: "none",
                        }}
                    >
                        {/* <Save style={{ width: '16px', height: '16px' }} /> */}
                        <span>Save Password</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
