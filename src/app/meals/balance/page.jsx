'use client'
import React, { useEffect, useState } from 'react'
import Lbl_Input from "@/components/c_input/Lbl_Input";
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/c_button/Button';
import BalHistory from "./components/BalHistory";
import UsrTitle from '@/components/title/UsrTitle';

export default function Balance() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [usrs, setUsrs] = useState([]);
    const [balance, setBalance] = useState([]);

    const fetchData = async (url, setter) => {
        const res = await fetch(url, { cache: 'no-store' });
        const { data } = await res.json();
        // console.log(data);
        setter(data?.docs || data[0]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const fmValue = Object.fromEntries(fd.entries());
        const fl = Object.entries(fmValue).map(([key, value]) => ({ userId: key.replace("usr_", ""), amount: value }));
        const acc = fl.filter((d) => d.amount !== "");
        await fetch('/api/balance', { method: "POST", body: JSON.stringify({ account: acc, mealId: id }) }).then((res) => res.json()).then(({ data }) => {
            data.forEach((d) => setBalance((bal) => ({ ...bal, record: bal.record.map((r) => r.userId._id === d.userId ? ({ ...r, amount: d.amount }) : r) })));
            e.target.reset()
        })

    }
    console.log(balance);
    useEffect(() => {
        fetchData("http://localhost:3000/api/user", setUsrs);
        fetchData(`http://localhost:3000/api/meal_history/${id}`, setBalance);
    }, [])

    return (
        <div>
            <UsrTitle title="Account Management" />
            <div className="flex justify-center space-x-5 py-10">
                <div>
                    <BalHistory account={balance?.record} />
                </div>
                <div className="border border-cgreen rounded-md">
                    <h2 className="text-xl text-cgreen underline underline-offset-4 p-2" >Balance Form</h2>
                    <form onSubmit={onSubmit} className="px-2 pb-5">
                        <div className="space-y-2">
                            {usrs.map((u) => (
                                <div key={u.id} className=''>
                                    <Lbl_Input lbl={`${u.name}`} name={`usr_${u.id}`} placeholder="amount..." />
                                </div>
                            ))}
                            <Button type="submit" className="bg-cgreen text-white">Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
