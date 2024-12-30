import React, { useState } from "react";
import { Shield, X } from "lucide-react";

interface OTPVerificationPopupProps {
    onVerify: (otp: string) => void;
    onCancel: () => void;
}

export function OTPVerificationPopup({ onVerify, onCancel }: OTPVerificationPopupProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = Array(6)
        .fill(0)
        .map(() => React.createRef<HTMLInputElement>());

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }

        // Submit if all digits are filled
        if (value && index === 5) {
            handleSubmit();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleSubmit = () => {
        const otpString = otp.join("");
        if (otpString.length === 6) {
            onVerify(otpString);
        }
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden animate-slideIn">
                <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-white" />
                        <h2 className="text-white font-semibold">Verify OTP</h2>
                    </div>
                    <button onClick={onCancel} className="text-white hover:bg-indigo-700 rounded p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 text-sm">Please enter the 6-digit code sent to your email</p>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={otp.some((digit) => !digit)}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
}
