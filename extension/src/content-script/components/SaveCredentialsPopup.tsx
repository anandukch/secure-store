import React, { useState } from "react";
// import { Save, X, ChevronDown, Lock } from "lucide-react";

interface SaveCredentialsPopupProps {
    username: string;
    password: string;
    url: string;
    onSave: () => void;
    onCancel: () => void;
}

const projects = ["Personal", "Work", "Social Media", "Banking", "Shopping"];

export function SaveCredentialsPopup({ username, password, url, onSave, onCancel }: SaveCredentialsPopupProps) {
    const [selectedProject, setSelectedProject] = useState(projects[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden animate-slideIn">
                {/* Header */}
                <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {/* <Lock className="w-5 h-5 text-white" /> */}
                        <h2 className="text-white font-semibold">Save Password</h2>
                    </div>
                    <button onClick={onCancel} className="text-white hover:bg-indigo-700 rounded p-1">
                        {/* <X className="w-5 h-5" /> */}
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Project</label>
                        <div className="relative">
                            <button
                                type="button"
                                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left flex items-center justify-between hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{selectedProject}</span>
                                {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
                                    {projects.map((project) => (
                                        <button
                                            key={project}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
                                            onClick={() => {
                                                setSelectedProject(project);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {project}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <input type="text" value={url} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
                    <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center space-x-2"
                    >
                        {/* <Save className="w-4 h-4" /> */}
                        <span>Save Password</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
