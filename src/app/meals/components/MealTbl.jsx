import React from 'react';
import Table from "@/components/c_table/Table";
import Checkbox from "@/components/c_checkbox/Checkbox";
import C_Image from "@/components/c_image/C_Image";

export default function MealTbl({ data = {} }) {
    return (
        <div>
            <Table header="usrs">
                {data.docs.map((d) => (
                    <tr key={d.id}>
                        <td><Checkbox /></td>
                        <td>
                            <div className="flex items-center justify-center">
                                <C_Image src={`/images/${d.avatar}`} />
                            </div>
                        </td>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>1961</td>
                    </tr>
                ))}

            </Table>
        </div>
    )
}
