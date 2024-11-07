'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import Details from './components/Details';
import DayCard from './components/DayCard';

export default function Meal_Details() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [data, setData] = useState([]);

    const getDetails = async () => {
        const d = await fetch(`http://localhost:3000/api/meal_history?id=${id}`);
        return await d.json();
    }

    useEffect(() => {
        getDetails().then(({ data }) => setData(data));
    }, []);

    return (
        <div className="grid grid-cols-4 mx-auto">
            {data?.map((d) => (
                <div className="m-1">
                    <DayCard data={d} />
                    {/* <div className="flex items-center justify-between">
                        <p>{d.date}</p>
                        <p>Total:{d.record.reduce((prv, cur) => prv += cur.count, 0)}</p>
                    </div>
                    <div>
                        <Details data={d.record} />
                    </div> */}
                </div>
            ))}
        </div>
    )
}
