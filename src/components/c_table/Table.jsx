import React from 'react'
import Checkbox from "@/components/c_checkbox/Checkbox";
import C_Image from "@/components/c_image/C_Image";
import TblHeader from "./TblHeader";

export default function Table({ children, header = "usrs" }) {
    return (
        <table className="w-full">
            <thead className="bg-cgreen bg-opacity-70 text-lg text-white">
                <tr>
                    <th className="w-10 border py-3"><Checkbox /></th>
                    {TblHeader[header].map((h) => (
                        <th className="border w-24 max-w-32" key={h}>{h}</th>
                    ))}
                    <th className="border w-12 text-center px-1">Action</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
