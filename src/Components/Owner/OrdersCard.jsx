import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersCard = ({order, orders, setOrders}) => {

    const USERS_API = `${import.meta.env.VITE_BASE_URL}/users`
    const ORDERS_API = `${import.meta.env.VITE_BASE_URL}/orders`
    const [user, setUser] = useState({})
    const [editedOrder, setEditedOrder] = useState({
      order_user: "",
      order_cart: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
      fetch(`${USERS_API}/${order.cart_owner}`)
      .then( res => res.json())
      .then( res => setUser(res)) 
    }, [])

    

    const handleDelete = () => {
      fetch(`${ORDERS_API}/${order.id}`, {
        method: "DELETE"
      })
      .then( res => res.json() )
      .then( res => setOrders((prevState) => {
        orders.splice(orders.indexOf(res), 1)
        return [...orders]
      }))
    }

    return (
        <li key={order.order_id}>
          <h3>Order ID: {order.order_id}</h3>
          <p>User ID: {user.user_full_name}</p>
          <h4>Cart Products:</h4>
          <ul>
            {order.cartProducts.length > 0 ? (
              order.cartProducts.map((product) => (
                <li key={product.product_id}>
                  {product.product_name} - {product.quantity}
                </li>
              ))
            ) : (
              <li>No products in cart</li>
            )}
          </ul>
          <button onClick={() => navigate(`/user/${}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default OrdersCard;