import React from 'react'

export default function UsrTitle({ title = "Default title" }) {
    return (
        <div className="flex justify-between px-2 py-2 border shadow-lg rounded-t-xl border-b border-cgreen">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="bg-cgray p-2 px-4 bg-opacity-10 rounded-md">
                <p>{new Date().toLocaleDateString()}</p>
            </div>
        </div>
    )
}
