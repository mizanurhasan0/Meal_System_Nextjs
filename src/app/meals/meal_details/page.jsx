'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Details from './components/Details';

export default function Meal_Details() {
    const searchParams = useSearchParams();
    const query = searchParams.get('id');

    const [data, setData] = useState([]);

    const getDetails = async () => {
        const d = await fetch(`http://localhost:3000/api/meal_history?id=${query}`);
        return await d.json();
    }

    useEffect(() => {
        getDetails().then(({ data }) => setData(data));
    }, []);

    return (
        <div>
            {data?.map((d) => (
                <div className="border border-cgreen m-1">
                    <div className="flex items-center justify-between">
                        <p>{d.date}</p>
                        <p>Total:{d.record.reduce((prv, cur) => prv += cur.count, 0)}</p>
                    </div>
                    <div>
                        <Details data={d.record} />
                    </div>
                </div>
            ))}
        </div>
    )
}
