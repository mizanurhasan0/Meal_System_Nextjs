
import { Pencil1Icon } from '@radix-ui/react-icons'
import React, { useState } from 'react';
import GetMonth from '@/utils/Months';
import Modal from '@/components/c_modal/Modal';
import HistoryUpdate from "./HistoryUpdate";

export default function DayCard({ history = {}, setListHistory }) {

    const [selectDate, setSelectData] = useState({ show: false, data: {} });

    const getTotalMeal = (record) => {
        const num = record?.reduce((sum, { count }) => sum += Number(count), 0)
        return String(num).padStart(2, '0');
    }

    const onSelectData = () => setSelectData(() => ({ show: true, data: history }));

    const onUpdateMeal = async (e) => {
        e.preventDefault();
        try {
            const { id } = selectDate.data;
            const fd = new FormData(e.target);
            const res = await fetch(`/api/meal_history?id=${id}`, { method: "PUT", body: fd });
            const data = await res.json();
            setListHistory((list) => list.map((item) => (item.id === id ? data : item)));
            setSelectData({ show: false, data: {} });
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="relative border border-cgreen rounded-md p-2">
                <Pencil1Icon onClick={onSelectData} className="text-cgreen w-8 h-8 absolute right-3 cursor-pointer" />
                <h3 className="text-center text-5xl">{GetMonth(history?.date, "day")}</h3>
                <p className="text-xs font-semibold text-center">/{GetMonth(history?.date)}</p>

                <div className="shadow-2xl pt-4">
                    <div className="flex gap-2 flex-wrap justify-center">
                        {history?.record.map((u, i) => (
                            <div key={i} className="bg-cgreen rounded-lg flex justify-between px-2 shadow-xl text-white space-x-2">
                                <p className="capitalize">{u?.userId.name}</p>
                                <p>-{u.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border border-cgreen mt-2 text-cgreen text-center capitalize rounded-lg">
                    total:{getTotalMeal(history.record)}
                </div>
            </div>
            {/* Modal */}
            <Modal show={selectDate.show} onClose={() => setSelectData({ show: false, data: {} })}>
                <HistoryUpdate obj={selectDate.data} onUpdate={onUpdateMeal} />
            </Modal>
        </>
    )
}
