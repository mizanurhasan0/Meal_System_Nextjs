import React from 'react';
import Table from "@/components/c_table/Table";
import C_Image from "@/components/c_image/C_Image";
import Button from "@/components/c_button/Button";
import { Pencil2Icon, InfoCircledIcon, TrashIcon } from "@radix-ui/react-icons";


export default function UsrTbl({ data = {} }) {

    return (
        <div>
            <Table header="usrs">
                {data.docs.map((d) => (
                    <tr key={d.id}>
                        {/* <td><Checkbox /></td> */}
                        <td>
                            <div className="flex items-center justify-center">
                                <C_Image src={`/images/${d.avatar}`} />
                            </div>
                        </td>
                        <td className='text-center'>{d.name}</td>
                        <td className='text-center'>{d.email}</td>
                        <td className='text-center'>{d?.phone || '-'}</td>
                        <td>
                            <div className="flex items-center space-x-2 justify-center py-2">
                                <Button className="hover:bg-cgreen hover:text-white" >
                                    <Pencil2Icon />
                                </Button>
                                <Button className="hover:bg-cgreen hover:text-white" >
                                    <InfoCircledIcon />
                                </Button>
                                <Button className="relative group hover:bg-cgreen hover:text-white"
                                >
                                    <TrashIcon />
                                    <span className="absolute text-xs left-0 text-cgreen hidden group-hover:block mt-2 z-50">Delete</span>
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}
