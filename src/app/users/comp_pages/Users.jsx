import React from 'react';
import UsrTbl from "../components/UsrTbl";
import UsrAction from "../components/UsrAction";
import UsrTitle from "../components/UsrTitle";

export default async function Users() {
    try {
        const d = await fetch("http://localhost:3000/api/user");
        const { data } = await d.json();
        // console.log(data);
        return (
            <div>
                <UsrTitle title="Users Management" />
                <UsrAction />
                <div className="flex items-center text-sm px-2">
                    <h2>Users:</h2>
                    <div className="flex items-center font-semibold">
                        <p className="px-2 border-r-2 border-cgreen">All (16)</p>
                        <p className="px-2 border-r-2 border-cgreen whitespace-nowrap">Active (7)</p>
                        <p className="px-2  whitespace-nowrap">Inactive (4)</p>
                    </div>
                </div>
                <div className="py-5 px-2">
                    <UsrTbl data={data} />
                </div>
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return <div>Error loading users</div>;
    }

}
