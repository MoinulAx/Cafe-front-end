import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './productscard.scss';

const ProductCard = ({ product, userId }) => {

    const API_URL = `${import.meta.env.VITE_BASE_URL}/cart_products`;
    const newProduct = {
        carts_id: userId,
        products_id: product.product_id,
        products_quantity: 0
    }

    const handleClick = (e) => {

        fetch(API_URL, {
            method: "POST",
            body : JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
    }

    return (
        <li className="product-card">
            <img src={product.product_image} className='product-card__image' />
            <h2 className='product-card__name'>{product.product_name}</h2>
            <p className='product-card__price'>Price: ${product.product_price}</p>
            <p className='product-card__quantity'>Quantity: {product.product_quantity}</p>
            <button className='product-card__button' onClick={handleClick}>Add to Cart</button>
        </li>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        product_id: PropTypes.number.isRequired,
        product_name: PropTypes.string.isRequired,
        product_price: PropTypes.string.isRequired,
        product_quantity: PropTypes.number.isRequired,
        product_details: PropTypes.string,
        product_image: PropTypes.string,
        instock: PropTypes.bool.isRequired,
    }).isRequired
};

export default ProductCard;
