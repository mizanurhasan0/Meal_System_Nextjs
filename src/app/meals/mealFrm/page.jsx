'use client';
import React from 'react';
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Button from '@/components/c_button/Button'

export default function page() {

    const onSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        fetch("/api/meals", { method: "POST", body: fd }).then((res) => res.json()).then((data) => {
            console.log(data);
            e.target.reset();
        }).catch((e) => console.log(e));
    }
    const onClean = () => console.log("clean");
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="flex space-x-4">
                    <div className="space-y-2 xl:w-96">
                        <Lbl_Input lbl="Title" name="name" placeholder="Title ..." />
                        <Lbl_Input lbl="Start Date" name="start" placeholder="Type starting date" type="date" />
                        <Lbl_Input lbl="End Date" name="end" placeholder="Type end date" type="date" />
                        <div className="flex items-center space-x-2">
                            <Button type='submit' className="bg-cgreen text-white" Icon="save">Save</Button>
                            <Button Icon='cross' onClick={onClean}>Clear</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
