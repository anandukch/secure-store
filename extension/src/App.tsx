import { useEffect } from "react";
import "./App.css";
import browser from "webextension-polyfill";

function App() {
    useEffect(() => {
        console.log("App mounted");
        browser.runtime.onMessage.addListener((msg) => {
            console.log(msg);
        });
        return () => {
            console.log("App unmounted");
        };
    }, []);

    return <></>;
}

export default App;
