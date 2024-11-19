import React from 'react';
import Table from '@/components/c_table/Table'

export default function Summary({ usrHistory, bazars = 0, meals = 0 }) {
    return (
        <div>
            <div>
                <p className="text-2xl text-center pb-4 font-semibold text-cgreen underline underline-offset-4">Summary</p>
            </div>
            <Table header="summary">
                {usrHistory.map((u) => (
                    <tr key={u.id}>
                        <td>{u.name}</td>
                        <td className="text-center">{u.balance}/-</td>
                        <td className="text-center">{u.totalMeal}</td>
                        <td className="text-center">{String(u?.totalMeal) * (bazars / meals).toFixed(2)} /-</td>
                        <td className="text-center">{((u?.totalMeal * (bazars / meals)) - u.balance).toFixed(2)} /-</td>
                        <td></td>
                    </tr>
                ))}
            </Table>
            <div className="py-2">
                <div className="flex space-x-2 border border-cgreen rounded-md p-2">
                    <p className="bg-cgreen text-white px-2 py-1 rounded-md">Meal Rate:{(bazars / meals).toFixed(1)}</p>
                    <p className="bg-cgreen text-white px-2 py-1 rounded-md">Bazar Costs:{bazars}/-</p>
                    <p className="bg-cgreen text-white px-2 py-1 rounded-md">Meals: {meals}</p>
                </div>
            </div>
        </div>
    )
}
