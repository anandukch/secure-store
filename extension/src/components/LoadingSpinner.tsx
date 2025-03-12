import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
}

export function LoadingSpinner({ size = 16, className = "" }: LoadingSpinnerProps) {
    return <Loader2 className={`animate-spin ${className}`} size={size} />;
}

// {
//     "key": "HuFfccRHrkCUk4UeEnEUeFNo7w/nZ4hyGfzFlldYjfM=",
//     "opsLimit": 4,
//     "memLimit": 1073741824
// }
