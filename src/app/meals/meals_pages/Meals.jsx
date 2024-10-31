import UsrTitle from '@/components/title/UsrTitle';
import React from 'react';
import MealAction from '../components/MealAction';

export default async function Users() {
    try {
        const d = await fetch("http://localhost:3000/api/user");
        const { data } = await d.json();
        // console.log(data);
        return (
            <div className="space-y-2">
                <UsrTitle title="Meals Management" />
                <MealAction />
                <div className="flex items-center text-sm px-2">
                    <h2>Meals:</h2>
                    <div className="flex items-center font-semibold">
                        <p className="px-2 border-r-2 border-cgreen">All ({data?.totalDocs || 0})</p>
                        <p className="px-2 border-r-2 border-cgreen whitespace-nowrap">Active (7)</p>
                        <p className="px-2  whitespace-nowrap">Inactive (4)</p>
                    </div>
                </div>
                <div className="py-5 px-2">
                    {/* <UsrTbl data={data} /> */}
                </div>
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return <div>Error loading users</div>;
    }

}