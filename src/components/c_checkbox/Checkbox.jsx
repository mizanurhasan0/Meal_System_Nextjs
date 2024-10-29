'use client'
import React, { useState } from 'react';
import style from './checkbox.module.css';

export default function Checkbox({
    // setChecked = () => { },
    checked = true,
    htmlFor = '',
    className = '',
    labelTitle = false,
}) {
    const [chk, setChk] = useState(false);
    return (
        <div className="flex items-center justify-center">
            <label className={style.container}>
                <input id={htmlFor} type="checkbox" checked={chk} onChange={() => setChk(!chk)} />
                <div className={`${style.checkmark}`} />
            </label>
            {labelTitle ? <label htmlFor={htmlFor} className={`pl-[0.738rem] whitespace-nowrap cursor-pointer ${className}`}>{labelTitle}</label> : ''}
        </div>
    );
}
