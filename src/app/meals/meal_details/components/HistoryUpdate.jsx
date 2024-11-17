import Button from '@/components/c_button/Button';
import Lbl_Input from '@/components/c_input/Lbl_Input';
import React, { useEffect, useState } from 'react';
import UserList from '../../components/UserList';

export default function HistoryUpdate({ obj = {}, onUpdate = () => { } }) {

    const [usrs, setUsrs] = useState([]);
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
    const convertDateFormat = (dateString) => {
        if (!dateString) return new Date().toISOString().split("T")[0];
        const [month, day, year] = dateString.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    return Object.keys(obj).length === 0 ? ("") : (
        <div>
            <form onSubmit={(e) => onUpdate(e)}>
                <div className="flex space-x-4">
                    <input />
                    <div className="space-y-2 xl:w-96">
                        <Lbl_Input lbl="Data" name="date" placeholder="Today Date" type="date" defaultValue={convertDateFormat(obj?.date)} />
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
