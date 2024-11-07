'use client';
import React, { useEffect, useState } from 'react';
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Button from '@/components/c_button/Button'
import UsrTitle from '@/components/title/UsrTitle';
import MultiSelectDrop from '@/components/c_dropdown/MultiSelectDrop';

export default function page() {
    const [usrs, setUsrs] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        fd.append('users_id', JSON.stringify(selectUser));
        fetch("/api/meals", { method: "POST", body: fd }).then((res) => res.json()).then((data) => {
            console.log(data);
            e.target.reset();
        }).catch((e) => console.log(e));
    }
    const onClean = () => console.log("clean");

    const getUsers = async () => {
        return await fetch(`http://localhost:3000/api/user?all=true`).then((res) => res.json()).then(({ data }) => setUsrs(data)).catch(() => setUsrs([]));
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div>
            <UsrTitle title="Creating new meal" />
            <div className="flex justify-center w-full py-10">
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="flex space-x-4">
                            <div className="space-y-2 xl:w-96">
                                <Lbl_Input lbl="Title" name="name" placeholder="Title ..." />
                                <Lbl_Input lbl="Start Date" name="start" placeholder="Type starting date" type="date" />
                                <Lbl_Input lbl="End Date" name="end" placeholder="Type end date" type="date" />
                                <MultiSelectDrop options={usrs} setUsr={setSelectUser} />
                                <div className="flex items-center space-x-2">
                                    <Button type='submit' className="bg-cgreen text-white" Icon="save">Save</Button>
                                    <Button Icon='cross' onClick={onClean}>Clear</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
