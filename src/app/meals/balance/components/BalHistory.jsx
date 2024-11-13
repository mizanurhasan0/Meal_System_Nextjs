import React from 'react'
import { Pencil1Icon } from "@radix-ui/react-icons";
import Table from '@/components/c_table/Table';

export default function BalHistory({ account = [] }) {
    const totalAmount = account?.reduce((sum, { amount }) => sum + amount, 0);
    const totalCount = account?.reduce((sum, { totalCount }) => sum + totalCount, 0);
    const mealRate = (totalAmount / totalCount).toFixed(2);

    return (
        <div className="">
            <h2 className="text-xl underline-offset-4 py-2 text-cgreen underline">Account table</h2>
            <div>
                <Table header="balance" checkBox={false}>
                    {account?.map((bal, i) => (
                        <tr key={i}>
                            <td className="border border-cgreen p-2 capitalize text-center">{bal.userId.name}</td>
                            <td className="border border-cgreen text-center">{bal.amount}/-</td>
                            <td className="border border-cgreen text-center">{bal.totalCount}</td>
                            <td className="border border-cgreen ">
                                <Pencil1Icon className="text-center w-full" />
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
            <p className="bg-cgreen text-white px-2 flex justify-between mt-2 rounded-md py-1">
                <span className="font-semibold ">In Total:</span>
                <span>{totalAmount || 0}/-</span>
            </p>
            <p className="bg-cgreen text-white px-2 flex justify-between mt-2 rounded-md py-1">
                <span className="font-semibold ">Meal Rate:</span>
                <span>{mealRate || 0}</span>
            </p>
        </div>
    )
}
