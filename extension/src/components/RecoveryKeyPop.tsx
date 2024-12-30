import React from "react";
import { Key, Download, X } from "lucide-react";

interface RecoveryKeyPopupProps {
    recoveryKey: string;
    onDownload: () => void;
    onClose: () => void;
}

export function RecoveryKeyPopup({ recoveryKey, onDownload, onClose }: RecoveryKeyPopupProps) {
    const handleDownload = () => {
        // Create blob and trigger download
        const blob = new Blob([recoveryKey], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "passkey-recovery.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        onDownload();
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden animate-slideIn">
                <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Key className="w-5 h-5 text-white" />
                        <h2 className="text-white font-semibold">Download Recovery Key</h2>
                    </div>
                    <button onClick={onClose} className="text-white hover:bg-indigo-700 rounded p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 text-center">
                        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                            <p className="text-yellow-800 text-sm">
                                Please download your recovery key and keep it in a safe place. You'll need this key to recover your account
                                if you lose access.
                            </p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md font-mono text-sm break-all">{recoveryKey}</div>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center justify-center space-x-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download Recovery Key</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
