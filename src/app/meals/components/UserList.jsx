'use client';
import Lbl_Input from '@/components/c_input/Lbl_Input';
import React, { useEffect, useState } from 'react';


export default function UserList() {
    const [usrs, setUsrs] = useState([]);

    const getUsrs = async () => {
        const d = await fetch("http://localhost:3000/api/user");
        const { data } = await d.json();
        setUsrs(data.docs)
    }
    useEffect(() => {
        getUsrs();
    }, [])

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
