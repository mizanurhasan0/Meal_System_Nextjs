import React from 'react';
import Input from "./Input";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Src_Input({ ...props }) {
    return (
        <div className="flex border rounded-xl items-center">
            <Input className='border-none' placeholder="Search ..." {...props} />
            <MagnifyingGlassIcon className="mr-2 w-8 h-8 text-cgreen" />
        </div>
    )
}

