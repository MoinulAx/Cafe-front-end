import React, { useState, useEffect } from "react";
import './products.scss';
import ProductCard from "../../Components/ProductsCard/ProductsCard";

const API_URL = `${import.meta.env.VITE_BASE_URL}/products`;

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(API_URL)
        
        fetch(API_URL)
        .then( res => {
            console.log(res)
            return res.json()
        })
        .then( res => setProducts(res))
        .catch( err => console.error(err) )
    }, []);

    return (
        <div className="products-page">
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </ul>
        </div>
    );
}

export default ProductsPage;
