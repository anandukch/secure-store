import { useEffect, useRef } from "react";
import { CredentialSuggestion } from "./CredentialsSuggestion";

interface StoredCredential {
    username: string;
    password: string;
    url: string;
}

interface SuggestionBoxProps {
    credentials: StoredCredential[];
    inputRect: DOMRect;
    onSelect: (credential: StoredCredential) => void;
    onClose: () => void;
}

export function SuggestionBox({ credentials, inputRect, onSelect, onClose }: SuggestionBoxProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    console.log("inputRect", inputRect);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={boxRef}
            style={{
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #E5E7EB", // Equivalent to Tailwind's `border-gray-200`
                overflow: "hidden",
                zIndex: 50,
                position: "absolute",
                width: inputRect.width,
                top: inputRect.bottom + 4,
                left: inputRect.left,
            }}
        >
            <div
                style={{
                    maxHeight: "12rem", // Equivalent to Tailwind's `max-h-48`
                    overflowY: "auto", // Equivalent to Tailwind's `overflow-y-auto`
                }}
            >
                {credentials.map((credential, index) => (
                    <CredentialSuggestion key={index} credential={credential} onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
}
