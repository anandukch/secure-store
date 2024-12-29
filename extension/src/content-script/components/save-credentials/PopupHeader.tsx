import { Lock, X } from "lucide-react";

interface PopupHeaderProps {
    title: string;
    onClose: () => void;
}

export function PopupHeader({ title, onClose }: PopupHeaderProps) {
    return (
        <div
            style={{
                backgroundColor: "#4f46e5", // Equivalent to 'bg-indigo-600'
                padding: "0.75rem 1rem", // Equivalent to 'px-4 py-3'
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                {/* <Lock style={{ width: "1.25rem", height: "1.25rem", color: "white" }} /> */}
                <h2
                    style={{
                        color: "white",
                        fontWeight: 600, // Equivalent to 'font-semibold'
                    }}
                >
                    {title}
                </h2>
            </div>
            <button
                onClick={onClose}
                style={{
                    color: "white",
                    backgroundColor: "transparent",
                    borderRadius: "0.25rem", // Equivalent to 'rounded'
                    padding: "0.25rem", // Equivalent to 'p-1'
                    transition: "background-color 0.2s ease",
                }}
                onMouseEnter={
                    (e) => (e.currentTarget.style.backgroundColor = "#4338ca") // Equivalent to 'hover:bg-indigo-700'
                }
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
                <X style={{ width: "1.25rem", height: "1.25rem" }} />
            </button>
        </div>
    );
}
