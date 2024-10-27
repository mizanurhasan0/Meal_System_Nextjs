import React from 'react'
import Input from "./Input"

export default function Lbl_Input({ lbl = "Field name", htmlFor = "field", ...props }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="text-cgray text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{lbl}</label>
            <Input name={htmlFor} {...props} />
        </div>
    )
}
