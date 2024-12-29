import { X } from "lucide-react";

interface CustomFieldProps {
    id: string;
    field: {
        key: string;
        value: string;
    };
    onChange: (id: string, key: string, value: string) => void;
    onRemove: (id: string) => void;
}

export function CustomField({ id, field, onChange, onRemove }: CustomFieldProps) {
    const containerStyles = {
        display: "flex",
        gap: "0.5rem", // Equivalent to 'gap-2'
        alignItems: "flex-start",
    };

    const inputStyles = {
        width: "100%",
        padding: "0.5rem", // Equivalent to 'px-3 py-2'
        border: "1px solid #D1D5DB", // Equivalent to 'border-gray-300'
        borderRadius: "0.375rem", // Equivalent to 'rounded-md'
        fontSize: "0.875rem", // Equivalent to 'text-sm'
    };

    const inputFocusStyles = {
        outline: "none",
        boxShadow: "0 0 0 2px #6366F1", // Equivalent to 'focus:ring-2 focus:ring-indigo-500'
        borderColor: "#6366F1", // Equivalent to 'focus:border-indigo-500'
    };

    const buttonStyles = {
        padding: "0.5rem",
        color: "#9CA3AF", // Equivalent to 'text-gray-400'
        background: "none",
        border: "none",
        cursor: "pointer",
    };

    const buttonHoverStyles = {
        color: "#4B5563", // Equivalent to 'hover:text-gray-600'
    };

    return (
        <div style={containerStyles}>
            <div style={{ flex: "1" }}>
                <input
                    type="text"
                    value={field.key}
                    onChange={(e) => onChange(id, e.target.value, field.value)}
                    placeholder="Key"
                    style={inputStyles}
                    onFocus={(e) => {
                        e.currentTarget.style.boxShadow = inputFocusStyles.boxShadow;
                        e.currentTarget.style.borderColor = inputFocusStyles.borderColor;
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.borderColor = "#D1D5DB"; // Reset border color
                    }}
                />
            </div>
            <div style={{ flex: "1" }}>
                <input
                    type="text"
                    value={field.value}
                    onChange={(e) => onChange(id, field.key, e.target.value)}
                    placeholder="Value"
                    style={inputStyles}
                    onFocus={(e) => {
                        e.currentTarget.style.boxShadow = inputFocusStyles.boxShadow;
                        e.currentTarget.style.borderColor = inputFocusStyles.borderColor;
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.borderColor = "#D1D5DB"; // Reset border color
                    }}
                />
            </div>
            <button
                onClick={() => onRemove(id)}
                style={buttonStyles}
                title="Remove field"
                onMouseOver={(e) => (e.currentTarget.style.color = buttonHoverStyles.color)}
                onMouseOut={(e) => (e.currentTarget.style.color = buttonStyles.color)}
            >
                <X style={{ width: "1rem", height: "1rem" }} />
            </button>
        </div>
    );
}
