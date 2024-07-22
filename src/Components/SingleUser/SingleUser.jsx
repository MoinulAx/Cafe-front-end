import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotos } from '../../utils/fetchPhoto';
import Owner from '../../Page/Owner/Owner';
import UserProductCard from '../CartItems/UserProductCard';
const SingleUser = () => {
    const { id } = useParams();
    const [userCart, setUserCart] = useState([]);
    const [userCartProducts, setUserCartProducts] = useState([]);
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

            setUserCartProducts(uniqueProducts);
        };

        if (userCart.length > 0) {
            fetchProducts();
        }
    }, [userCart]);

    useEffect(() => {
        const updateProductsWithPhotos = async () => {
            try {
                const photos = await fetchPhotos(userCartProducts);

                // Map through the products and add photo URLs
                const updatedProducts = userCartProducts.map((product, index) => {
                    const photo = photos[index];
                    return {
                        ...product,
                        product_image: photo ? photo.urls.small : null, // Add photo URL to each product
                    };
                });

                setUserCartProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching multiple items:', error);
            }
        };

        if (userCartProducts.length > 0) {
            updateProductsWithPhotos();
        }
    }, [userCartProducts]);

    if(id == 1) {
        return <Owner/>
    }

    return (
        <div className="products-page">
            <h1>Products</h1>
            <ul>
                {Array.isArray(userCartProducts) && (
                    <>
                        {userCartProducts.map((product) => {
                            return (
                                <UserProductCard
                                    key={product.product_id}
                                    product={product}
                                />
                            );
                        })}
                    </>
                )}
            </ul>
        </div>
    );
};

export default SingleUser;
