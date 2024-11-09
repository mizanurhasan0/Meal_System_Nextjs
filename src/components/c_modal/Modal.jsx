import React from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function Modal({ show = true, onClose = () => { }, children }) {
    return (
        <div className={`modal absolute dark:text-info ${show ? '' : 'scale-0'}`}>
            <div className="fixed z-[999] top-0 bottom-0 left-0 right-0 bg-[#0000008c]">
                <div className={`fixed flex w-full h-full items-center justify-center duration-300 ${show ? '-top-[0px]' : '-top-[50px]'}`}>
                    <div className="relative bg-white dark:bg-darkSideBar rounded-lg p-6 min-w-[95vw] lg:min-w-[30vw]">
                        <div className="flex justify-end">
                            <Cross1Icon onClick={onClose} className="fill-primary dark:stroke-info cursor-pointer h-5 w-5 m-[0.625rem]" />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
