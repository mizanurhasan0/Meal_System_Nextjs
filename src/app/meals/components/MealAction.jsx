"use client"
import React from 'react'
import Button from '@/components/c_button/Button';
import Src_Input from '@/components/c_input/Src_Input';
import { useRouter } from 'next/navigation';
import { CSVLink } from 'react-csv';
import { useExcelDownloder } from 'react-xls';

export default function MealAction({ data }) {
    const router = useRouter();
    const { ExcelDownloder, Type } = useExcelDownloder();

    return (
        <div className="py-4 flex justify-between items-center px-2">
            <div className="flex items-center space-x-2">
                <Button Icon='plus' className="bg-cgreen text-white" onClick={() => router.push("/meals/mealFrm")}>Start new month</Button>
                <Button Icon='download' className="text-cgreen">
                    <ExcelDownloder
                        data={{ data }}
                        filename={'book'}
                        type={Type.Button} // or type={'button'}
                    >
                        Export excel
                    </ExcelDownloder>
                </Button>

            </div>
            <div>
                <Src_Input />
            </div>
        </div>
    )
}
