import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Members() {
    const d = await fetch('http://localhost:3000/api/user');
    let { data } = await d.json();
    console.log(data);
    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Pass</th>
                        <th>avatar</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.docs?.map((d) => (
                        <tr key={d.id}>
                            <td>{d.email}</td>
                            <td>{d.pass}</td>
                            <td>
                                <div>
                                    <Image src={`/images/${d.avatar}`} width={100} height={100} alt='img' />
                                </div>
                            </td>
                            <td>
                                <Link href={`/members/${d.email}`}> Edit</Link>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}
