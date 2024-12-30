// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// interface ProjectSelectorProps {
//     selected: string;
//     onChange: (project: string) => void;
// }

// const projects = ["Personal", "Work", "Social Media", "Banking", "Shopping"];

// export function ProjectSelector({ selected, onChange }: ProjectSelectorProps) {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div style={{ marginBottom: "1rem" }}>
//             <label
//                 style={{
//                     display: "block",
//                     fontSize: "0.875rem", // Equivalent to 'text-sm'
//                     fontWeight: "500", // Equivalent to 'font-medium'
//                     color: "#374151", // Equivalent to 'text-gray-700'
//                     marginBottom: "0.5rem",
//                 }}
//             >
//                 Project
//             </label>
//             <div style={{ position: "relative" }}>
//                 <button
//                     type="button"
//                     style={{
//                         width: "100%",
//                         backgroundColor: "white",
//                         border: "1px solid #D1D5DB", // Equivalent to 'border-gray-300'
//                         borderRadius: "0.375rem", // Equivalent to 'rounded-md'
//                         padding: "0.5rem 0.75rem", // Equivalent to 'px-3 py-2'
//                         textAlign: "left",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         transition: "border-color 0.2s, box-shadow 0.2s",
//                     }}
//                     onClick={() => setIsOpen(!isOpen)}
//                     onFocus={(e) => {
//                         e.currentTarget.style.borderColor = "#6366F1"; // Equivalent to 'hover:border-indigo-500'
//                         e.currentTarget.style.boxShadow = "0 0 0 2px #C7D2FE"; // Equivalent to 'focus:ring-2 focus:ring-indigo-500'
//                     }}
//                     onBlur={(e) => {
//                         e.currentTarget.style.borderColor = "#D1D5DB";
//                         e.currentTarget.style.boxShadow = "none";
//                     }}
//                 >
//                     <span>{selected}</span>
//                     <ChevronDown style={{ width: "1rem", height: "1rem", color: "#9CA3AF" }} />
//                 </button>

//                 {isOpen && (
//                     <div
//                         style={{
//                             position: "absolute",
//                             zIndex: 10,
//                             marginTop: "0.25rem", // Equivalent to 'mt-1'
//                             width: "100%",
//                             backgroundColor: "white",
//                             boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Equivalent to 'shadow-lg'
//                             borderRadius: "0.375rem", // Equivalent to 'rounded-md'
//                             padding: "0.25rem 0", // Equivalent to 'py-1'
//                             border: "1px solid #E5E7EB", // Equivalent to 'border-gray-200'
//                         }}
//                     >
//                         {projects.map((project) => (
//                             <button
//                                 key={project}
//                                 style={{
//                                     width: "100%",
//                                     padding: "8px",
//                                     textAlign: "left",
//                                     fontSize: "14px",
//                                     backgroundColor: "transparent",
//                                     cursor: "pointer",
//                                     color: "#4B5563",
//                                     transition: "background-color 0.2s",
//                                 }}
//                                 onMouseEnter={
//                                     (e) => (e.currentTarget.style.backgroundColor = "#EEF2FF") // Equivalent to 'hover:bg-indigo-50'
//                                 }
//                                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
//                                 onClick={() => {
//                                     onChange(project);
//                                     setIsOpen(false);
//                                 }}
//                             >
//                                 {project}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

interface ProjectSelectorProps {
    selected: string;
    onChange: (project: string) => void;
}

const projects = ["Personal", "Work", "Social Media", "Banking", "Shopping"];

export function ProjectSelector({ selected, onChange }: ProjectSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [newProject, setNewProject] = useState("");

    const handleAddProject = () => {
        if (newProject.trim()) {
            projects.push(newProject.trim());
            onChange(newProject.trim());
            setNewProject("");
            setIsAddingProject(false);
            setIsOpen(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
                style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                }}
            >
                Project
            </label>
            <div style={{ position: "relative" }}>
                <button
                    type="button"
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        padding: "8px 12px",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{selected}</span>
                    <ChevronDown style={{ width: "1rem", height: "1rem", color: "#9CA3AF" }} />
                </button>

                {isOpen && (
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 10,
                            marginTop: "4px",
                            width: "100%",
                            backgroundColor: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "0.375rem",
                            border: "1px solid #E5E7EB",
                            padding: "4px 0",
                        }}
                    >
                        {projects.map((project) => (
                            <button
                                key={project}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    textAlign: "left",
                                    fontSize: "14px",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    color: "#4B5563",
                                    transition: "background-color 0.2s",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0E7FF")} // Indigo-50 equivalent
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                                onClick={() => {
                                    onChange(project);
                                    setIsOpen(false);
                                }}
                            >
                                {project}
                            </button>
                        ))}

                        {isAddingProject ? (
                            <div
                                style={{
                                    padding: "8px 12px",
                                    borderTop: "1px solid #F3F4F6",
                                    display: "flex",
                                    gap: "8px",
                                }}
                            >
                                <input
                                    type="text"
                                    value={newProject}
                                    onChange={(e) => setNewProject(e.target.value)}
                                    placeholder="Project name"
                                    style={{
                                        flex: 1,
                                        padding: "4px 8px",
                                        fontSize: "0.875rem",
                                        border: "1px solid #D1D5DB",
                                        borderRadius: "0.375rem",
                                    }}
                                />
                                <button
                                    onClick={handleAddProject}
                                    style={{
                                        padding: "4px 12px",
                                        fontSize: "0.875rem",
                                        color: "white",
                                        backgroundColor: "#4F46E5",
                                        borderRadius: "0.375rem",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338CA")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4F46E5")}
                                >
                                    Add
                                </button>
                            </div>
                        ) : (
                            <button
                                style={{
                                    width: "100%",
                                    padding: "8px 16px",
                                    fontSize: "0.875rem",
                                    color: "#4F46E5",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    backgroundColor: "white",
                                    borderTop: "1px solid #F3F4F6",
                                    cursor: "pointer",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0E7FF")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                                onClick={() => setIsAddingProject(true)}
                            >
                                <Plus style={{ width: "1rem", height: "1rem" }} />
                                Add Project
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
