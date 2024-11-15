import C_Image from '@/components/c_image/C_Image';
import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
    return (
        <div className="fixed xl:relative
        inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200  bg-white border-0 shadow-xl  max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 -translate-x-full xl:translate-x-0">
            <div>
                <h1 className="text-2xl font-semibold px-5 py-2 text-cgreen">Dashboard</h1>
                <div className="w-full border border-cgreen border-opacity-40" />
                <div className='py-5'>
                    <Link href={"/meals"} className="py-2 font-semibold flex items-center px-4 space-x-2">
                        <C_Image src='/icons/dish.svg' className="w-8 h-8" />
                        <p>Meals</p>
                    </Link>
                    <Link href={"/users"} className="py-2 font-semibold flex items-center px-4 space-x-2">
                        <C_Image src='/icons/users.svg' className="w-8 h-8 fill-cgreen" />
                        <p>Members</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
