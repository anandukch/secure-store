// import { KeyRound, Settings, ExternalLink } from "lucide-react";

// interface CredentialStatsProps {
//     totalCredentials: number;
//     onManageClick: () => void;
//     onSettingsClick: () => void;
// }

// export function CredentialStats({ totalCredentials, onManageClick, onSettingsClick }: CredentialStatsProps) {
//     return (
//         <div className=" bg-white shadow-lg p-4 w-96 animate-slideIn">
//             <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center space-x-2">
//                     <KeyRound className="w-5 h-5 text-indigo-600" />
//                     <h3 className="font-medium">Saved Passwords</h3>
//                 </div>
//                 <button onClick={onSettingsClick} className="text-gray-500 hover:text-gray-700" title="Settings">
//                     <Settings className="w-5 h-5" />
//                 </button>
//             </div>

//             <div className="bg-indigo-50 rounded-md p-3 mb-3">
//                 <div className="text-2xl font-bold text-indigo-600">{totalCredentials}</div>
//                 <div className="text-sm text-indigo-600">Credentials Stored</div>
//             </div>

//             <button
//                 onClick={onManageClick}
//                 className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md border border-indigo-200"
//             >
//                 <span>Manage Passwords</span>
//                 <ExternalLink className="w-4 h-4" />
//             </button>
//         </div>
//     );
// }

import { KeyRound, Settings, ExternalLink, Plus } from "lucide-react";

interface CredentialStatsProps {
    totalCredentials: number;
    onManageClick: () => void;
    onSettingsClick: () => void;
    onAddClick: () => void;
}

export function CredentialStats({ totalCredentials, onManageClick, onSettingsClick, onAddClick }: CredentialStatsProps) {
    return (
        <div className=" bg-white shadow-lg p-4 w-96 animate-slideIn">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <KeyRound className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium">Saved Passwords</h3>
                </div>
                <button onClick={onSettingsClick} className="text-gray-500 hover:text-gray-700" title="Settings">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <div className="bg-indigo-50 rounded-md p-3 mb-3">
                <div className="text-2xl font-bold text-indigo-600">{totalCredentials}</div>
                <div className="text-sm text-indigo-600">Credentials Stored</div>
            </div>

            <div className="space-y-2">
                <button
                    onClick={onAddClick}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Credentials</span>
                </button>

                <button
                    onClick={onManageClick}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md border border-indigo-200"
                >
                    <span>Manage Passwords</span>
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
