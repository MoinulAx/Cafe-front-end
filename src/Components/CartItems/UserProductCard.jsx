import React, { useState } from 'react';

const UserProductCard = ({ product,userId }) => {
    const [quantity, setQuantity] = useState(product.product_quantity);

    const incrementQuantity = () => {
        fetch(API, {
            method: "PUT",
            body: JSON.stringify(),
            headers:{
                "Content-type": "application/json"
            }
        })
        .then( res => res.json())
        .then( res => setQuantity(quantity + 1))
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <li className="product-card">
            <img src={product.product_image} className='product-card__image' alt={product.product_name} />
            <h2>{product.product_name}</h2>
            <p>Price: ${product.product_price}</p>
            <p>Quantity: {quantity}</p>
            <div className="product-card__controls">
                <span 
                    onClick={decrementQuantity} 
                    className="product-card__control product-card__control--decrement">
                    -
                </span>
                <span 
                    onClick={incrementQuantity} 
                    className="product-card__control product-card__control--increment">
                    +
                </span>
            </div>
        </li>
    );
};

export default UserProductCard;
