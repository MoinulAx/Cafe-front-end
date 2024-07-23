import React, { useEffect, useState } from 'react';
import "./Orders.scss"
import OrdersCard from './OrdersCard';

const Orders = () => {
  const API_URL = `${import.meta.env.VITE_BASE_URL}/orders`;
  const CART_PRODUCTS_URL = `${import.meta.env.VITE_BASE_URL}/cart_products`;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_URL);
        const ordersData = await res.json();

        const ordersWithCartProducts = await Promise.all(
          ordersData.map(async (order) => {
            try {
              const cartProductsRes = await fetch(`${CART_PRODUCTS_URL}/${order.order_cart}`);
              const cartProductsData = await cartProductsRes.json();
              
              const cartProducts = await Promise.all(
                cartProductsData.map(async (cartProduct) => {
                  const productRes = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${cartProduct.products_id}`);
                  const productData = await productRes.json();
                  return { ...productData, quantity: cartProduct.products_quantity };
                })
              );

              return { ...order, cartProducts };
            } catch (cartError) {
              console.error(`Failed to fetch cart products for order ${order.order_id}`, cartError);
              return { ...order, cartProducts: [] };
            }
          })
        );

        setOrders(ordersWithCartProducts);
      } catch (err) {
        console.error('Failed to fetch orders', err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => {
            return <OrdersCard order={order} key={order.order_id}/>
        })}
      </ul>
    </div>
  );
};

export default Orders;
