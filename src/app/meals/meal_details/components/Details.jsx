import React, { useEffect } from 'react';

export default function Details({ data = [] }) {
    return (
        <div>
            {data?.map((r) => (
                <div className="flex items-center space-x-2">
                    <p> name:{r?.userId?.name}</p>
                    <p>meal:{r?.count}</p>
                </div>
            ))}

        </div>
    )
}
