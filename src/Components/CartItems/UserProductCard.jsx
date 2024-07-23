import React, { useEffect, useState } from 'react';

const UserProductCard = ({ product, userCart }) => {
    const [quantity, setQuantity] = useState(userCart.products_quantity);
    const [cartProducts, setCartProducts] = useState([])
    const [singleCartProduct, setSingleCartProduct] = useState({})
    const API = `${import.meta.env.VITE_BASE_URL}/cart_products`
    const updatedProduct = {
        carts_id: userCart.cart_id,
        products_id: product.product_id,
        products_quantity: quantity
    }
    
    useEffect(() => {
        fetch(`${API}/${userCart.cart_id}`)
        .then(res => res.json())
        .then( res => setCartProducts(res))
    }, [])

    useEffect(() => {
        const cartProduct = cartProducts.find(cP => cP.products_id === product.product_id)
        setSingleCartProduct(cartProduct)
    },[cartProducts])

    const incrementQuantity = () => {
        setQuantity(quantity + 1)

        fetch(`${API}/${singleCartProduct.cart_product_id}`, {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers:{
                "Content-type": "application/json"
            }
        })
        .then( res => res.json())
        .then( res => console.log(res))
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            fetch(`${API}/${singleCartProduct.cart_product_id}`, {
                method: "PUT",
                body: JSON.stringify(updatedProduct),
                headers:{
                    "Content-type": "application/json"
                }
            })
            .then( res => res.json())
            .then( res => console.log(res))
        }else if(quantity == 0) {
            fetch(`${API}/${singleCartProduct.cart_product_id}`, {
                method: "DELETE"
            })
            .then( res => res.json())
            .then( res => console.log(res))
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
