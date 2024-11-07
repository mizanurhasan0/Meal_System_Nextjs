'use client';
import React from 'react'
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Button from '@/components/c_button/Button';
import UserList from "../components/UserList";
import { useSearchParams } from 'next/navigation';
import UsrTitle from '@/components/title/UsrTitle';

export default function page() {
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

    return (
        <div>
            <UsrTitle title="Meals Updated" />
            <div className="py-5 flex justify-center">
                <form onSubmit={onSubmit}>
                    <div className="flex space-x-4">
                        <div className="space-y-2 xl:w-96">
                            <Lbl_Input lbl="Data" name="date" placeholder="Today Date" type="date" />
                            <UserList />
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
