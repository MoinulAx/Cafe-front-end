import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../ProductsCard/ProductsCard';

const SingleUser = () => {

    const { id } = useParams()
    const CART_API = `${import.meta.env.VITE_BASE_URL}/carts/${id}`
    const PRODUCTS_API = `${import.meta.env.VITE_BASE_URL}/products`
    const [userCart, setUserCart] = useState([])
    const [userCartProducts, setUserCartProducts] = useState([])

    useEffect(() => {
        fetch(CART_API)
        .then( res => res.json() )
        .then( res => setUserCart(res))
        .catch( err => console.error(err))
    }, [])

    useEffect(() => {
        for(let i = 0; i < userCart.length; i++) {
            const {products_id} = userCart[i]
            fetch(`${PRODUCTS_API}/${products_id}`)
            .then(res => res.json())
            .then(res => setUserCartProducts((prevState) => {
                return [...prevState, res]
            }))
            .catch(err => console.error(err))
        }
    }, [userCart])
    
    return (
        <div className="products-page">
            <h1>Products</h1>
            <ul>
                {Array.isArray(userCartProducts) &&
                <>
                {userCartProducts.map(product => {
                    return <ProductCard key={product.product_id} product={product} />
                    })}
                </>
                }
            </ul>
        </div>
    );
};

export default SingleUser;