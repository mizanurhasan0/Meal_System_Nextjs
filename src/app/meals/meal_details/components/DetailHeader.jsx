import React from 'react'
import Button from '@/components/c_button/Button';

export default function DetailHeader({ onAutoUpdate = () => { }, listHistory = [], balance = [] }) {

    const totalMeals = listHistory?.reduce((sum, prev) => sum += prev.record.reduce((s, c) => s += c.count, 0), 0);
    const totalBazar = balance.reduce((sum, cur) => sum += cur.amount, 0);

    const result = Object.values(
        listHistory.reduce((acc, item) => {
            item.record.forEach(({ userId: { id, name }, count }) => {
                if (!acc[id]) {
                    acc[id] = { Id: id, name, totalMeal: 0 };
                }
                acc[id].totalMeal += count;
            });
            return acc;
        }, {})
    );

    return (
        <div className="flex items-center text-sm px-2 pt-4">
            <h2>Details:</h2>
            <div className="flex items-center justify-between w-full font-semibold">
                <div className="flex ">
                    <p className="px-2 border-r-2">All ({listHistory?.length || 0})</p>
                    <p className="px-2  border-r-2">Total Meals ({totalMeals | 0})</p>
                    <p className="px-2 border-r-2">Bazars ({totalBazar || 0})</p>
                    <p className="px-2 ">Meal Rate ({(totalBazar / totalMeals).toFixed(1) || 0})</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button Icon='update' type='button' >
                        Summary
                    </Button>
                    <Button Icon='update' type='button' onClick={onAutoUpdate}>
                        Auto generate
                    </Button>
                </div>
            </div>
        </div>
    )
}
