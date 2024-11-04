'use client'
import React, { useEffect, useState } from 'react'
import Lbl_Input from "@/components/c_input/Lbl_Input";
import { useSearchParams } from 'next/navigation';
import Button from '@/components/c_button/Button';

export default function Balance() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [usrs, setUsrs] = useState([]);
    const [balance, setBalance] = useState([]);

    const fetchData = async (url, setter) => {
        const res = await fetch(url);
        const { data } = await res.json();
        setter(data.docs || data);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const fmValue = Object.fromEntries(fd.entries());
        const fl = Object.entries(fmValue).map(([key, value]) => ({ userId: key.replace("usr_", ""), amount: value }));
        const acc = fl.filter((d) => d.amount !== "");
        // fd.append("data", { account: acc, mealId: id });
        await fetch(`/api/balance?id=${id}`, { method: "POST", body: JSON.stringify({ account: acc, mealId: id }) }).then((res) => res.json()).then((d) => console.log(d))

    }
    useEffect(() => {
        fetchData("http://localhost:3000/api/user", setUsrs);
        fetchData(`http://localhost:3000/api/balance?id=${id}`, setBalance);
    }, [id])
    // console.log(balance);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    {usrs.map((u) => (
                        <div key={u.id} className=''>
                            <Lbl_Input lbl={`${u.name}`} name={`usr_${u.id}`} placeholder="amount..." />
                        </div>
                    ))}
                    <Button type="submit">Save</Button>
                </div>
            </form>
            <div>

            </div>
        </div>
    )
}
