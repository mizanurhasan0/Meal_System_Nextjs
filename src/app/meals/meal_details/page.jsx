'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import Details from './components/Details';
import DayCard from './components/DayCard';
import UsrTitle from '@/components/title/UsrTitle';
import DetailHeader from "./components/DetailHeader";

export default function Meal_Details() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [listHistory, setListHistory] = useState([]);
    const [balance, setBalance] = useState([]);

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
    const fetchData = async (url, setter) => {
        const res = await fetch(url, { cache: 'no-store' });
        const { data } = await res.json();
        // console.log(data);
        setter(data?.docs || data);
    }
    useEffect(() => {
        getDetails().then(({ data }) => setListHistory(data));
        fetchData(`http://localhost:3000/api/balance?id=${id}`, setBalance);
    }, []);

    return (
        <div className="">
            <UsrTitle title="Meal details" />
            <DetailHeader onAutoUpdate={onAutoUpdate} listHistory={listHistory} balance={balance?.account} />
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
