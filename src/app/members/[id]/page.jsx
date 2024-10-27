'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function Details() {
    const params = useParams();
    const [usr, setUsr] = useState({});

    const getUsr = () => {
        fetch(`http://localhost:3000/api/user/${params.id}`).then((r) => r.json()).then(({ data }) => setUsr(data))
    }
    useEffect(() => {
        getUsr();
    }, []);
    // console.log(usr);
    return (
        <div>
            <Image src={`/images/${usr.avatar}`} alt='image' width={100} height={100} />
            <div>
                {usr.email}
            </div>
        </div>
    )

}
