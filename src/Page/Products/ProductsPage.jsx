import React, { useState, useEffect } from "react";
import './products.scss';
import ProductCard from "../../Components/ProductsCard/ProductsCard";
import { fetchPhotos } from "../../utils/fetchPhoto";

const API_URL = `${import.meta.env.VITE_BASE_URL}/products`;

function ProductsPage({userId}) {
    const [products, setProducts] = useState([]);
    // Handle the new new product form input
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
    // Handle the product being edited
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(res => setProducts(res))
            .catch(err => console.error(err))
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
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    }

    // Create: Add a new product
    const handleCreateProduct = (e) => {
        e.preventDefault();
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(product => {
                setProducts([...products, product]);
                setNewProduct({ name: '', price: '', description: '' });
            })
            .catch(err => console.log(err))
    };

    // Set product to be edited
    const handleEditedProduct = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

    // Update : Update an existing product
    const handleUpdateProduct = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/${editingProduct.product_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(updatedProduct => {
                setProducts(products.map(product =>
                    product.product_id === updatedProduct.product_id ? updatedProduct : product
                ));
                setNewProduct({ name: '', price: '', description: '' });
                setEditingProduct(null);
            })
            .catch(err => console.error(err));
    }

    // Delete: Delete an existing product
    const handleDeleteProduct = (product_id) => {
        fetch(`${API_URL}/${product_id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setProducts(products.filter(product => product.product_id !== product_id));
            })
            .catch(err => console.error(err));
    };


    return (
        <div className="products-page">
            <h1>Products</h1>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                />
                <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
            </form>
            <ul>
                {products.map(product => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        userId={userId}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ProductsPage;
