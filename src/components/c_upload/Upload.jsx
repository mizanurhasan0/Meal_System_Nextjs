import Image from 'next/image'
import React from 'react'

export default function Upload({ ...props }) {
    return (
        <div>
            <div className="md:flex">
                <div className="w-full p-3">
                    <div className="relative border-dotted h-48 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                        <div className="absolute">
                            <div className="flex flex-col items-center">
                                <Image src='./icons/upload.svg' alt='upload icon' width={100} height={100} />
                                <span className="block text-gray-400 font-normal">Attach you files here</span>
                            </div>
                        </div>
                        <input type="file" className="h-full w-full opacity-0" {...props} />
                    </div>
                </div>
            </div>
        </div>
    )
}
