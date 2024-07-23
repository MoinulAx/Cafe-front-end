import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './productscard.scss';

const ProductCard = ({ product, userId }) => {

    const [quantity, setQuantity] = useState(product.product_quantity)
    const API_URL = `${import.meta.env.VITE_BASE_URL}/cart_products`;
    const CART_API = `${import.meta.env.VITE_BASE_URL}/cart`
    const PRODUCTS_API = `${import.meta.env.VITE_BASE_URL}/products`;
    const [newProduct , setNewProduct] = useState({
        carts_id: userId,
        products_id: product.product_id,
        products_quantity: quantity
    })
    

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
        handleDecrement()
    }

    const handleDecrement = () => {
        if(quantity > 0){
            setQuantity(quantity - 1)

            fetch(`${PRODUCTS_API}/${product.product_id}`, {
                method: "PUT",
                body: JSON.stringify(product),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(res => res.json())
            .catch(err => console.error(err))
        }
        if(quantity == 0){
            fetch(`${PRODUCTS_API}/${product.product_id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .catch(err => console.error(err))
        }
    }

    return (
        <li className="product-card">
            <img src={product.product_image} className='product-card__image' />
            <h2 className='product-card__name'>{product.product_name}</h2>
            <p className='product-card__price'>Price: ${product.product_price}</p>
            <p className='product-card__quantity'>Quantity: {quantity}</p>
            {quantity > 0 ? <button className='product-card__button' onClick={handleClick}>Add to Cart</button> : <div>out of stock </div>}
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
