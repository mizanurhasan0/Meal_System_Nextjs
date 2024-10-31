import C_Image from '@/components/c_image/C_Image'
import React from 'react'
import { EnvelopeOpenIcon, BellIcon } from "@radix-ui/react-icons";

export default function Header() {
    return (
        <nav className="relative flex items-center justify-between py-2 mx-6 my-6 transition-all ease-in shadow-none duration-250 rounded-2xl bg-white px-2">
            <div></div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <EnvelopeOpenIcon className="w-6 h-6 text-cgreen" />
                    <BellIcon className="w-6 h-6 text-cgreen" />
                </div>
                <div className="w-10 h-10 rounded-full border border-cgreen overflow-hidden">
                    <C_Image src='/avatar.jpg' />
                </div>
            </div>
        </nav>
    )
}
