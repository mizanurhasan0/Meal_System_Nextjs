import React from 'react';
import Table from "@/components/c_table/Table";
import UsrAction from "../components/UsrAction";
import UsrTitle from "../components/UsrTitle";

export default function Users() {
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
                <Table />
            </div>
        </div>
    )
}
