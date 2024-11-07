'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Cross1Icon } from "@radix-ui/react-icons";

export default function MultiSelectDrop({ lbl = "Multi Select", placeholder = "Select..", options = [], setUsr = () => { } }) {

    const refMenu = useRef();
    const arrowRef = useRef();

    const [selectOpt, setSelectOpt] = useState([]);

    const onOpen = () => {
        const check = refMenu.current.className.includes('invisible');
        ["translate-y-3", "visible"].forEach((c) => refMenu.current.classList.toggle(c, check));
        ["translate-y-0", "invisible"].forEach((c) => refMenu.current.classList.toggle(c, !check));
        arrowRef.current.classList.toggle("rotate-180", !check);
    }

    const onSelectOpt = (opt) => {
        setSelectOpt((prev) => {
            const valid = prev.some((d) => d.id === opt.id);
            return valid ? prev : ([opt, ...prev]);
        });
        onOpen();
    }

    const onDelete = (event, id) => {
        event.stopPropagation();
        setSelectOpt((prev) => prev.filter((d) => d.id !== id));
    }
    useEffect(() => {
        setUsr(selectOpt?.map((u) => u?.id));
    }, [selectOpt]);
    return (
        <div>
            <label className="text-cgray text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{lbl}</label>
            <div className="relative">
                <div className="rounded-md text-cgray">
                    <div className="min-h-9 flex items-center border focus-within:border-cgreen rounded-lg overflow-hidden" onClick={onOpen}>
                        <div className="flex-1 px-2 h-full w-full outline-0 leading-6 capitalize cursor-pointer"
                        >
                            <div className="flex flex-wrap gap-2">
                                {selectOpt.length === 0 && (<p className="text-sm">Select options...</p>)}
                                {selectOpt.map((d) => (
                                    <div key={d.id} className="bg-cgreen rounded-full px-2 text-white text-sm h-6 flex items-center space-x-1">
                                        <p>{d.name}</p>
                                        <Cross1Icon className="z-50" onClick={(e) => onDelete(e, d.id)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Image ref={arrowRef} src='/icons/down_arrow.svg' alt='upload icon' width={20} height={20} className="mr-2 rotate-180 transition-all" />
                    </div>

                    <div ref={refMenu} className="absolute invisible translate-y-0 shadow-2xl bg-white w-full border transition-all duration-200">
                        {options.map((u) => (
                            <button key={u.id} type='button'
                                className="capitalize text-left my-1 py-1 text-[0.7rem] w-full px-3 leading-6 font-medium"
                                onClick={() => onSelectOpt(u)}
                            >
                                <p className="capitalize">{u?.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
