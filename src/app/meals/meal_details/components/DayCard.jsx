
import { Pencil1Icon } from '@radix-ui/react-icons'
import React, { useState } from 'react';
import GetMonth from '@/utils/Months';
import Modal from '@/components/c_modal/Modal';
import HistoryUpdate from "./HistoryUpdate";

export default function DayCard({ data }) {
    const [selectDate, setSelectData] = useState({ show: false, data: {} });
    const getTotalMeal = (record) => {
        const num = record?.reduce((sum, { count }) => sum += Number(count), 0)
        return String(num).padStart(2, '0');
    }
    const onSelectData = () => {
        setSelectData(() => ({ show: true, data: data }));
    }
    return (
        <>
            <div className="relative border border-cgreen rounded-md p-2">
                <Pencil1Icon onClick={onSelectData} className="text-cgreen w-8 h-8 absolute right-3 cursor-pointer" />
                <h3 className="text-center text-5xl">{GetMonth(data?.date, "day")}</h3>
                <p className="text-xs font-semibold text-center">/{GetMonth(data?.date)}</p>

                <div className="shadow-2xl pt-4">
                    <div className="flex gap-2 flex-wrap justify-center">
                        {data?.record.map((u) => (
                            <div className="bg-cgreen rounded-lg flex justify-between px-2 shadow-xl text-white space-x-2">
                                <p className="capitalize">{u?.userId.name}</p>
                                <p>-{u.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border border-cgreen mt-2 text-cgreen text-center capitalize rounded-lg">
                    total:{getTotalMeal(data.record)}
                </div>
            </div>
            {/* Modal */}
            {/* <Modal show={selectDate.show} onClose={() => setSelectData({ show: false, data: {} })}>
                <HistoryUpdate data={selectDate.data} />
            </Modal> */}
        </>
    )
}
