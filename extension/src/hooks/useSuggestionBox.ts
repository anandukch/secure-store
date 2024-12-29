import { useState, useEffect } from "react";

interface StoredCredential {
    username: string;
    password: string;
    url: string;
}

export function useSuggestionBox() {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputRect, setInputRect] = useState<DOMRect | null>(null);
    const [activeInput, setActiveInput] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleInputFocus(event: Event) {
            const input = event.target as HTMLInputElement;
            if (input.type === "text" || input.type === "email" || input.type === "password") {
                setActiveInput(input);
                setInputRect(input.getBoundingClientRect());
                setShowSuggestions(true);
            }
        }

        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        inputs.forEach((input) => {
            input.addEventListener("focus", handleInputFocus);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", handleInputFocus);
            });
        };
    }, []);

    const handleSelect = (credential: StoredCredential) => {
        if (activeInput) {
            if (activeInput.type === "password") {
                activeInput.value = credential.password;
            } else {
                activeInput.value = credential.username;
            }
            setShowSuggestions(false);
        }
    };

    return {
        showSuggestions,
        inputRect,
        handleSelect,
        closeSuggestions: () => setShowSuggestions(false),
    };
}
