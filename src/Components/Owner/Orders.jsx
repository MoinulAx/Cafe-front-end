import React, { useEffect, useState } from 'react';

const Orders = () => {

    const API_URL = `${import.meta.env.VITE_BASE_URL}/orders`
    const [orders, setOrders] = useState([])

    useEffect(() => {

        fetch(API_URL)
        .then( res => res.json() )
        .then( res => setOrders( res ) )
        .catch( err => console.error( err ) )

    }, [])

    return (
        <div>

        </div>
    );
};

export default Orders;