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

    const [, forceUpdate] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return; // Skip SSR

        // Add a small delay before querying the DOM
        const timeoutId = setTimeout(() => {
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
            console.log("inputs with delay:", inputs); // Log inputs

            if (inputs.length === 0) {
                console.log("No inputs found yet.");
            }

            function handleInputFocus(event: Event) {
                const input = event.target as HTMLInputElement;
                if (input.type === "text" || input.type === "email" || input.type === "password") {
                    setActiveInput(input);
                    setInputRect(input.getBoundingClientRect());
                    setShowSuggestions(true);
                }
            }

            if (inputs.length > 0) {
                inputs.forEach((input) => {
                    input.addEventListener("focus", handleInputFocus);
                });
            }
        }, 50);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const handleSelect = (credential: StoredCredential) => {
        if (activeInput) {
            console.log("Selected credential:", credential);
            console.log("Active input:", activeInput);

            if (activeInput.type === "password") {
                activeInput.value = credential.password;
            } else {
                activeInput.value = credential.username;
            }
            const inputEvent = new Event("input", { bubbles: true });
            const changeEvent = new Event("change", { bubbles: true });
            activeInput.dispatchEvent(inputEvent);
            activeInput.dispatchEvent(changeEvent);
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
