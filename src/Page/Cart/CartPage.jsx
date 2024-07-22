import React, { useState, useEffect } from "react";
import './products.scss';
import ProductCard from "../../Components/ProductsCard/ProductsCard";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

function ProductsPage() {
    const [cart, setCart] = useState([]);

        
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };


    return (
        <div className="products-page">
            <h1>Products</h1>
            <ul>
                {cart.map(cartItem => (
                ))}
            </ul>
        </div>
    );
}

export default ProductsPage;
