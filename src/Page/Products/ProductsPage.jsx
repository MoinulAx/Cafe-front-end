import React, { useState, useEffect } from "react";

import './products.scss'
import ProductCard from "../../Componets /ProductsCard/ProductsCard";

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //Simulated fetched products
        const fetchedProducts = [
            { id: 1, name: 'Coffee', price: 5, description: 'Delicious coffee' },
            { id: 2, name: 'Tea', price: 3, description: 'Refreshing tea' },
            { id: 3, name: 'Pastry', price: 4, description: 'Tasty pastry' },
        ];
        setProducts(fetchedProducts);
    }, []);
    return (
        <div className="products-page">
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
}

export default ProductsPage;