import React, { useState, useEffect } from "react";
import './products.scss';
import ProductCard from "../../Components/ProductsCard/ProductsCard";
import { fetchPhotos } from "../../utils/fetchPhoto";

const API_URL = `${import.meta.env.VITE_BASE_URL}/products`;

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(API_URL)
<<<<<<< HEAD
        .then( res => {
            console.log(res)
            return res.json()
        })
        .then( res => setProducts(res))
        .catch( err => console.error(err))
=======
        .then( res => res.json() )
        .then( res => setProducts(res) )
        .catch( err => console.error(err) )
>>>>>>> refs/remotes/origin/test
    }, []);

    useEffect(() => {
        const updateProductsWithPhotos = async () => {
            try {
                const photos = await fetchPhotos(products);

                // Map through the products and add photo URLs
                const updatedProducts = products.map((product, index) => {
                    const photo = photos[index];
                    return {
                        ...product,
                        product_image: photo ? photo.urls.small : null, // Add photo URL to each product
                    };
                });

                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching multiple items:', error);
            }
        };

        if (products.length > 0) {
            updateProductsWithPhotos();
        }
    },[ products ])


    
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
