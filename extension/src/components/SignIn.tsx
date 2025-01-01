import { LogIn, X } from "lucide-react";
import "../index.css";
import { LoadingSpinner } from "./LoadingSpinner";
import { FormEvent, useState } from "react";
interface LoginPopupProps {
    authType: "login" | "signup";
    onSubmit: (email: string, password: string) => void;
    onCancel: () => void;
    onSignupClick: (type: "login" | "signup") => void;
    loading?: boolean;
}

export function AuthPopup({ authType, onSubmit, onCancel, onSignupClick, loading }: LoginPopupProps) {
    const title = authType === "login" ? "Sign In" : "Sign Up";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (authType === "signup" && password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        onSubmit(email, password);
    };

    return (
        <div>
            <div className="bg-white shadow-xl w-96 overflow-hidden animate-slideIn">
                <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <LogIn className="w-5 h-5 text-white" />
                        <h2 className="text-white font-semibold">{title}</h2>
                    </div>
                    <button onClick={onCancel} className="text-white hover:bg-indigo-700 rounded p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            name="password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {authType == "signup" && (
                        <div className="space-y-2">
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                id="confirm_password"
                                type="confirm_password"
                                name="confirm_password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-75 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-75 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <LoadingSpinner />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <span>{authType === "login" ? "Sign In" : "Sign Up"}</span>
                            )}
                        </button>
                    </div>
                </form>

                {authType == "login" ? (
                    <div className="px-4 py-3 bg-gray-50 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <button onClick={() => onSignupClick("signup")} className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Sign up
                            </button>
                        </p>
                    </div>
                ) : (
                    <div className="px-4 py-3 bg-gray-50 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button onClick={() => onSignupClick("login")} className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Sign in
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
