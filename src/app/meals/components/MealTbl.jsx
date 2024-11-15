'use client'
import React from 'react';
import Table from "@/components/c_table/Table";
import Checkbox from "@/components/c_checkbox/Checkbox";
import Button from '@/components/c_button/Button';
import { useRouter } from 'next/navigation';
import { Pencil2Icon, InfoCircledIcon, ArchiveIcon } from "@radix-ui/react-icons";

export default function MealTbl({ data = {} }) {
    const router = useRouter();
    return (
        <div>
            <Table header="meals">
                {data.map((d) => (
                    <tr key={d.id} className="text-center">
                        {/* <td><Checkbox /></td> */}
                        <td>{d.name}</td>
                        <td>{d.start}</td>
                        <td>{d.end || '-'}</td>
                        <td>{d?.usersid?.length || 0}
                        </td>
                        <td>
                            <div className="flex items-center space-x-2 justify-center py-2">
                                <Button className="hover:bg-cgreen hover:text-white" onClick={() => router.push(`/meals/meals_history?id=${d.id}`)}>
                                    <Pencil2Icon />
                                </Button>
                                <Button className="hover:bg-cgreen hover:text-white" onClick={() => router.push(`/meals/meal_details?id=${d.id}`)}>
                                    <InfoCircledIcon />
                                </Button>
                                <Button className="relative group hover:bg-cgreen hover:text-white" onClick={() => router.push(`/meals/balance?id=${d.id}`)}>
                                    <ArchiveIcon />
                                    <span className="absolute text-xs left-0 text-cgreen hidden group-hover:block mt-2 z-50">Balance Sheet</span>
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </div >
    )
}
