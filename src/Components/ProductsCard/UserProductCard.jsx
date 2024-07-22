import React from 'react';
import './productscard.scss'

const UserProductCard = ({ product }) => {

    return (
        <li className="product-card">
            <img src={product.product_image} alt="" />
            <h2>{product.product_name}</h2>
            <p>Price:${product.product_price}</p>
            <p>Quantity: {product.product_quantity}</p>
        </li>
    );

};

export default UserProductCard;