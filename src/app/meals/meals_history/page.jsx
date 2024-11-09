'use client';
import React, { useEffect, useState } from 'react'
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Button from '@/components/c_button/Button';
import UserList from "../components/UserList";
import { useSearchParams } from 'next/navigation';
import UsrTitle from '@/components/title/UsrTitle';

export default function page() {
    const [usrs, setUsrs] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('id');

    const onSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        fetch(`/api/meal_history?id=${query}`, { method: "POST", body: fd }).then((res) => res.json()).then(data => {
            console.log(data);
            e.target.reset();
        }).catch((e) => console.log(e));
    }
    const onClean = () => console.log("clean");

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
            <UsrTitle title="Meals Updated" />
            <div className="py-5 flex justify-center">
                <form onSubmit={onSubmit}>
                    <div className="flex space-x-4">
                        <div className="space-y-2 xl:w-96">
                            <Lbl_Input lbl="Data" name="date" placeholder="Today Date" type="date" />
                            <UserList usrs={usrs} />
                            <div className="flex items-center space-x-2">
                                <Button type='submit' className="bg-cgreen text-white" Icon="save">Save</Button>
                                <Button Icon='cross' onClick={onClean}>Clear</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
