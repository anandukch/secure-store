import { useEffect } from "react";
import "./index.css";
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

    return (
        <>
            <div className="bg-red-800 p-4">Secure store</div>
        </>
    );
}

export default App;
