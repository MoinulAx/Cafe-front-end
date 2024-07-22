import React, { useState, useEffect } from "react";
import './cartpage.scss';
import UserProductCard from "../../Components/CartItems/UserProductCard";
import { useParams } from "react-router-dom";
import { fetchPhotos } from "../../utils/fetchPhoto";
const API_URL = `${import.meta.env.VITE_BASE_URL}/cart_products`;

function CartPage() {
    const [cart, setCart] = useState([]);
    const [userCart, setUserCart] = useState([])
    const { id } = useParams()
    const CART_API = `${import.meta.env.VITE_BASE_URL}/carts/${id}`;
    const PRODUCTS_API = `${import.meta.env.VITE_BASE_URL}/products`;

    useEffect(() => {
        fetch(CART_API)
            .then((res) => res.json())
            .then((res) => setUserCart(res))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await Promise.all(
                userCart.map(({ products_id }) =>
                    fetch(`${PRODUCTS_API}/${products_id}`)
                        .then((res) => res.json())
                        .catch((err) => {
                            console.error(err);
                            return null; // Return null for failed fetches to filter them out later
                        })
                )
            );

            // Remove nulls and duplicates
            const uniqueProducts = Array.from(
                new Set(products.filter((product) => product !== null))
            );

            setCart(uniqueProducts);
        };

        if (userCart.length > 0) {
            fetchProducts();
        }
    }, [userCart]);

    useEffect(() => {
        const updateProductsWithPhotos = async () => {
            try {
                const photos = await fetchPhotos(cart);

                // Map through the products and add photo URLs
                const updatedProducts = cart.map((product, index) => {
                    const photo = photos[index];
                    return {
                        ...product,
                        product_image: photo ? photo.urls.small : null, // Add photo URL to each product
                    };
                });

                setCart(updatedProducts);
            } catch (error) {
                console.error('Error fetching multiple items:', error);
            }
        };

        if (cart.length > 0) {
            updateProductsWithPhotos();
        }
    }, [cart]);

    return (
        <div className="products-page">
            <h1>Products</h1>
            <ul>
                {cart.map((cartItem) => (
                    <UserProductCard key={cartItem.cart_product_id} product={cartItem} />
                ))}
            </ul>
        </div>
    );
}

export default CartPage;
