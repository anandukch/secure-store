import { useState, useEffect } from "react";
import { StoredCredential } from "../content-script/components/suggestions/CredentialsSuggestion";

const credentialMatchesInput = (credential: StoredCredential, input: HTMLInputElement) => {
    return credential.some((field) => {
        const selector = field.label.selector;
        const label = field.label.label;

        return (
            (selector === "id" && input.id === label) ||
            (selector === "name" && input.name === label) ||
            (selector === "placeholder" && input.placeholder === label) ||
            (selector === "class" && input.className.includes(label)) ||
            (selector === "tag" && input.tagName.toLowerCase() === label) ||
            (selector === "title" && input.title === label)
        );
    });
};
export function useSuggestionBox(credentials: StoredCredential[]) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputRect, setInputRect] = useState<DOMRect | null>(null);
    const [activeInput, setActiveInput] = useState<HTMLInputElement | null>(null);
    const [filteredCredentials, setFilteredCredentials] = useState<StoredCredential[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        function handleInputFocus(event: Event) {
            if (!(event.target instanceof HTMLInputElement)) return;
            const input = event.target;
            setActiveInput(input);
            setInputRect(input.getBoundingClientRect());

            // Match credentials based on all possible selectors
            const matchingCredentials = credentials.filter((credential) => credentialMatchesInput(credential, input));

            setFilteredCredentials(matchingCredentials);
            setShowSuggestions(matchingCredentials.length > 0);
        }

        function handleInputBlur(event: Event) {
            setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click selection
        }

        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

        inputs.forEach((input) => {
            input.addEventListener("focus", handleInputFocus);
            input.addEventListener("blur", handleInputBlur);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", handleInputFocus);
                input.removeEventListener("blur", handleInputBlur);
            });
        };
    }, [credentials]);

    const handleSelect = (credential: StoredCredential) => {
        if (!activeInput) return;

        // Find the corresponding value (username or password) for the active input
        const field = credential.find((field) => credentialMatchesInput([field], activeInput));
        if (field) {
            activeInput.value = field.value;

            // Trigger React-controlled input updates
            ["input", "change", "keyup"].forEach((eventType) => {
                const event = new Event(eventType, { bubbles: true });
                activeInput.dispatchEvent(event);
            });
        }

        setShowSuggestions(false);
    };

    return {
        showSuggestions,
        inputRect,
        filteredCredentials,
        handleSelect,
        closeSuggestions: () => setShowSuggestions(false),
    };
}
