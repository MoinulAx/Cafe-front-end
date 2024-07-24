import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {

    const ORDERS_API = `${import.meta.env.VITE_BASE_URL}/orders`
    const { id } = useParams()

    const handleEdit = () => {
        fetch(`${ORDERS_API}/${order.id}`, {
          method: "PUT",
          body: JSON.stringify(),
          headers: {
            "Content-type": "application/json"
          }
        })
    }

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