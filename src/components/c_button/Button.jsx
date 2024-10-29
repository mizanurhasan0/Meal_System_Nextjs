
import React from 'react'
import { PlusIcon, DownloadIcon, FileIcon, Cross1Icon } from "@radix-ui/react-icons";

const choiceIcon = { "plus": <PlusIcon />, "download": <DownloadIcon />, "save": <FileIcon />, "cross": <Cross1Icon /> }

export default function Button({ children, type = "button", className = "", Icon = "", ...props }) {
    return (
        <button type={type} className={`flex items-center space-x-2 border border-cgreen rounded-full px-4 py-1 transition-all duration-200 ${className}`} {...props}>
            <p>{children}</p>
            {choiceIcon[Icon]}
        </button>
    )
}
