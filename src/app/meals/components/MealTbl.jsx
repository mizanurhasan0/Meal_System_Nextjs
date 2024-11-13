'use client'
import React from 'react';
import Table from "@/components/c_table/Table";
import Checkbox from "@/components/c_checkbox/Checkbox";
import Button from '@/components/c_button/Button';
import { useRouter } from 'next/navigation';

export default function MealTbl({ data = {} }) {
    const router = useRouter();
    return (
        <div>
            <Table header="meals">
                {data.map((d) => (
                    <tr key={d.id} className="text-center">
                        <td><Checkbox /></td>
                        <td>{d.name}</td>
                        <td>{d.start}</td>
                        <td>{d.end || '-'}</td>
                        <td>{d?.usersid?.length || 0}
                        </td>
                        <td>
                            <div className="flex items-center space-x-1 py-2 w-48">
                                <Button onClick={() => router.push(`/meals/meals_history?id=${d.id}`)}>Add</Button>
                                <Button onClick={() => router.push(`/meals/meal_details?id=${d.id}`)}>details</Button>
                                <Button onClick={() => router.push(`/meals/balance?id=${d.id}`)}>balance</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </div >
    )
}
