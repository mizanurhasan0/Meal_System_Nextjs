import Button from '@/components/c_button/Button';
import Lbl_Input from '@/components/c_input/Lbl_Input';
import React, { useEffect, useState } from 'react';
import UserList from '../../components/UserList';

export default function HistoryUpdate({ obj }) {
    const [usrs, setUsrs] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        fetch("/api/meals", { method: "PUT", body: fd }).then((res) => res.json()).then((data) => {
            console.log(data);
            e.target.reset();
        }).catch((e) => console.log(e));
    };

    const onClean = () => console.log("clean");

    const getUsrs = async () => {
        const d = await fetch("http://localhost:3000/api/user");
        const { data } = await d.json();
        const updatedUsrs = data.docs.map((u) => {
            const find = obj?.record.find((r) => r.userId.id === u.id);
            return ({ id: u.id, name: u.name, count: find ? find.count : 0 })
        });
        setUsrs(updatedUsrs);
    }

    useEffect(() => {
        if (Object.keys(obj).length !== 0) getUsrs();
    }, [obj]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="flex space-x-4">
                    <input />
                    <div className="space-y-2 xl:w-96">
                        <Lbl_Input lbl="Data" name="date" placeholder="Today Date" type="date" defaultValue={obj?.date} />
                        <UserList usrs={usrs} />
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
