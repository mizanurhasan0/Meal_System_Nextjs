"use client";
import React, { useState } from 'react'
import C_Image from '../c_image/C_Image'

export default function Upload({ ...props }) {
    const [preview, setPreview] = useState(null);


    const onPreview = (e) => {
        e.preventDefault();
        // setPreview(e.target.files)
        const img = URL.createObjectURL(e.target.files[0]);
        setPreview(img);
        console.log(e.target.files);
    }
    return (
        <div className="space-y-2">
            <div className="md:flex">
                <div className="w-full">
                    <div className="relative border-dotted h-48 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                        <div className="absolute">
                            <div className="flex flex-col items-center">
                                <C_Image src='/icons/upload.svg' alt='upload icon' width={100} height={100} />
                                <span className="block text-gray-400 font-normal">Attach you files here</span>
                            </div>
                        </div>
                        <input type="file" className="h-full w-full opacity-0" onChange={onPreview} {...props} />
                    </div>
                </div>
            </div>
            {preview !== null ? (
                <div>
                    <div className="border w-14 h-14 bg-cgray bg-opacity-20 overflow-hidden flex items-center justify-center">
                        <C_Image src={preview ?? "/images/default.jpg"} alt="preview" />
                    </div>
                </div>
            ) : ''}

        </div>
    )
}
