import React from 'react'
import Checkbox from "@/components/c_checkbox/Checkbox";
import C_Image from "@/components/c_image/C_Image";

export default function Table() {
    return (
        <table className="w-full">
            <thead className="bg-cgreen bg-opacity-70 text-lg text-white">
                <tr>
                    <th className="w-10 border py-3"><Checkbox /></th>
                    <th className="border w-24 max-w-32">Avatar</th>
                    <th className="border text-left px-1">Name</th>
                    <th className="border text-left px-1">Email</th>
                    <th className="border w-24 text-center px-1">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Checkbox /></td>
                    <td>
                        <div className="flex items-center justify-center">
                            <C_Image src='/images/1729444859045_RiverNetworkMedium.jpg' />
                        </div>
                    </td>
                    <td>1961</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                </tr>
            </tbody>
        </table>
    )
}
