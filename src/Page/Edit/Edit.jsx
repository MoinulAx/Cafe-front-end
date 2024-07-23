import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {

    const ORDERS_API = `${import.meta.env.VITE_BASE_URL}/orders`
    const { id } = useParams()

    useEffect(() => {
        fetch(`${ORDERS_API}/${id}`)
        .then( res => res.json())
        .then( res => console.log(res))
    }, [])

    return (

        <div>

        </div>

    );
};

export default Edit;