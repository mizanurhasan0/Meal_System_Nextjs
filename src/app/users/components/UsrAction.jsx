"use client"
import React from 'react'
import Button from '@/components/c_button/Button';
import Src_Input from '@/components/c_input/Src_Input';
import { useRouter } from 'next/navigation';

export default function UsrAction() {
    const router = useRouter();
    return (
        <div className="py-4 flex justify-between items-center px-2">
            <div className="flex items-center space-x-2">
                <Button Icon='plus' className="bg-cgreen text-white" onClick={() => router.push("/users/usrFrm")}>Add new user</Button>
                <Button Icon='download' className="text-cgreen">Export CSV</Button>
            </div>
            <div>
                <Src_Input />
            </div>
        </div>
    )
}
