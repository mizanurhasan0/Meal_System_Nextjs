
import React from 'react'
import Users from './comp_pages/Users';

export default function User() {

    // const onHandle = async (e) => {
    //     e.preventDefault();
    //     const fd = new FormData(e.target);
    //     fetch("/api/user", { method: "POST", body: fd }).then((res) => res.json()).then(data => {
    //         console.log(data);
    //         e.target.reset();
    //     }).catch((e) => console.log(e));
    // }

    return (
        <div>
            <Users />

        </div>
    )
}
