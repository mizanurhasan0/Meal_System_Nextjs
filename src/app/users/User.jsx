'use client';

import React from 'react'

export default function User() {

    const onHandle = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        fetch("/api/user", { method: "POST", body: fd }).then((res) => res.json()).then(data => {
            console.log(data);
            e.target.reset();
        }).catch((e) => console.log(e));
    }

    return (
        <div>
            <form onSubmit={onHandle}>
                <input type='file' name='file' />
                <input type='text' name='email' placeholder='email' />
                <input type='password' name='pass' placeholder='password' />
                <button type='submit' className='bg-blue-300'>submit</button>
            </form>
        </div>
    )
}
