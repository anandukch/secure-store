import { Save } from "lucide-react";

interface PopupFooterProps {
    onSave: () => void;
    onCancel: () => void;
}

export function PopupFooter({ onSave, onCancel }: PopupFooterProps) {
    const containerStyles = {
        backgroundColor: "#F9FAFB", // Equivalent to 'bg-gray-50'
        padding: "0.75rem 1rem", // Equivalent to 'px-4 py-3'
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.75rem", // Equivalent to 'space-x-3'
    };

    const cancelButtonStyles = {
        padding: "0.5rem 1rem", // Equivalent to 'px-4 py-2'
        fontSize: "0.875rem", // Equivalent to 'text-sm'
        fontWeight: 500, // Equivalent to 'font-medium'
        color: "#374151", // Equivalent to 'text-gray-700'
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "0.375rem", // Equivalent to 'rounded-md'
        cursor: "pointer",
    };

    const cancelButtonHoverStyles = {
        backgroundColor: "#F3F4F6", // Equivalent to 'hover:bg-gray-100'
    };

    const saveButtonStyles = {
        padding: "0.5rem 1rem", // Equivalent to 'px-4 py-2'
        fontSize: "0.875rem", // Equivalent to 'text-sm'
        fontWeight: 500, // Equivalent to 'font-medium'
        color: "#FFFFFF", // Equivalent to 'text-white'
        backgroundColor: "#4F46E5", // Equivalent to 'bg-indigo-600'
        border: "none",
        borderRadius: "0.375rem", // Equivalent to 'rounded-md'
        display: "flex",
        alignItems: "center",
        gap: "0.5rem", // Equivalent to 'space-x-2'
        cursor: "pointer",
    };

    const saveButtonHoverStyles = {
        backgroundColor: "#4338CA", // Equivalent to 'hover:bg-indigo-700'
    };

    return (
        <div style={containerStyles}>
            <button
                onClick={onCancel}
                style={cancelButtonStyles}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = cancelButtonHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                style={saveButtonStyles}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = saveButtonHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = saveButtonStyles.backgroundColor)}
            >
                <Save style={{ width: "1rem", height: "1rem" }} />
                <span>Save Password</span>
            </button>
        </div>
    );
}
