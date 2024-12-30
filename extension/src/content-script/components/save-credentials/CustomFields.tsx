import { Plus } from "lucide-react";
import { CustomField } from "./CustomField";

interface CustomFieldsProps {
    fields: Record<string, { key: string; value: string }>;
    onAdd: () => void;
    onChange: (id: string, key: string, value: string) => void;
    onRemove: (id: string) => void;
}

export function CustomFields({ fields, onAdd, onChange, onRemove }: CustomFieldsProps) {
    const containerStyles = {
        marginBottom: "1rem", // Equivalent to 'space-y-3'
    };

    const labelContainerStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.75rem", // Space between label and list of fields
    };

    const labelStyles = {
        fontSize: "0.875rem", // Equivalent to 'text-sm'
        fontWeight: "500", // Equivalent to 'font-medium'
        color: "#374151", // Equivalent to 'text-gray-700'
    };

    const buttonStyles = {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem", // Space between icon and text
        fontSize: "0.875rem", // Equivalent to 'text-sm'
        color: "#4F46E5", // Equivalent to 'text-indigo-600'
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: "0",
    };

    const buttonHoverStyles = {
        color: "#4338CA", // Equivalent to 'hover:text-indigo-700'
    };

    const fieldContainerStyles = {
        marginBottom: "0.5rem", // Space between fields
    };

    return (
        <div style={containerStyles}>
            <div style={labelContainerStyles}>
                <label style={labelStyles}>Custom Fields</label>
                <button
                    onClick={onAdd}
                    style={buttonStyles}
                    onMouseOver={(e) => (e.currentTarget.style.color = buttonHoverStyles.color)}
                    onMouseOut={(e) => (e.currentTarget.style.color = buttonStyles.color)}
                >
                    <Plus style={{ width: "1rem", height: "1rem" }} />
                    <span>Add Field</span>
                </button>
            </div>

            <div style={fieldContainerStyles}>
                {Object.entries(fields).map(([id, field]) => (
                    <CustomField key={id} id={id} field={field} onChange={onChange} onRemove={onRemove} />
                ))}
            </div>
        </div>
    );
}
