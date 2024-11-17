'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import Details from './components/Details';
import DayCard from './components/DayCard';
import UsrTitle from '@/components/title/UsrTitle';
import Button from '@/components/c_button/Button';

export default function Meal_Details() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [listHistory, setListHistory] = useState([]);

    const getDetails = async () => {
        const d = await fetch(`http://localhost:3000/api/meal_history?id=${id}`);
        return await d.json();
    }
    const onAutoUpdate = async () => {
        try {
            const d = await fetch(`http://localhost:3000/api/meal_history/${id}`, { method: "POST" });
            const data = await d.json();
            if (data.error) console.log(data.error);
            else setListHistory((prev) => ([...prev, ...data]));
        } catch (error) {
            console.log({ error });
        }

    }
    useEffect(() => {
        getDetails().then(({ data }) => setListHistory(data));
    }, []);
    return (
        <div className="">
            <UsrTitle title="Meal details" />
            <div className="flex items-center text-sm px-2 pt-4">
                <h2>Meals:</h2>
                <div className="flex items-center justify-between w-full font-semibold">
                    <p className="px-2 ">All ({listHistory?.length || 0})</p>
                    <Button Icon='update' type='button' onClick={onAutoUpdate}>
                        Auto generate
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 mx-auto py-5">
                {listHistory?.map((d) => (
                    <div className="m-1" key={d.id}>
                        <DayCard history={d} setListHistory={setListHistory} />
                    </div>
                ))}
            </div>
        </div>
    )
}
