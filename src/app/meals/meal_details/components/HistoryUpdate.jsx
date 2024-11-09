import Button from '@/components/c_button/Button';
import Lbl_Input from '@/components/c_input/Lbl_Input';
import React, { useEffect, useState } from 'react';
import UserList from '../../components/UserList';

export default function HistoryUpdate({ data }) {
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
        // const dd = data.docs.map((u) => {
        //     const a = data?.record.filter((d) => d.userId.id === u.id);
        //     if (a) return ({ id: u.id, name: u.name, meal: a.count })
        //     else return ({ id: u.id, name: u.name, meal: 0 });
        // })
        console.log(dd);
        setUsrs(() => {
            return data.docs;
        })
    }
    // console.log(data);
    useEffect(() => {
        getUsrs();
    }, [data]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="flex space-x-4">
                    <input />
                    <div className="space-y-2 xl:w-96">
                        <Lbl_Input lbl="Data" name="date" placeholder="Today Date" type="date" defaultValue={data?.date} />
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
