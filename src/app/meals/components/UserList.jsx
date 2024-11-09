'use client';
import Lbl_Input from '@/components/c_input/Lbl_Input';
import React, { useEffect, useState } from 'react';


export default function UserList({ usrs = [] }) {

    return (
        <div>
            {usrs.map((u) => (
                <div key={u.id} className=''>
                    <Lbl_Input lbl={`${u.name}`} name={`usr_${u.id}`} placeholder="meals" />
                </div>
            ))}
        </div>
    )
}
