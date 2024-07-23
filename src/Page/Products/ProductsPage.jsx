import React, { useState, useEffect } from "react";
import './products.scss';
import ProductCard from "../../Components/ProductsCard/ProductsCard";
import { fetchPhotos } from "../../utils/fetchPhoto";

const API_URL = `${import.meta.env.VITE_BASE_URL}/products`;

function ProductsPage({ userId }) {
    const [products, setProducts] = useState([]);
    const [productsWithPhotos, setProductsWithPhotos] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch products from the server
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(res => setProducts(res))
            .catch(err => console.error(err));
    }, []);

    // Fetch photos and update productsWithPhotos only once products are loaded
    useEffect(() => {
        const updateProductsWithPhotos = async () => {
            try {
                console.log('Fetching photos for products:', products); // Log products being processed
                const photos = await fetchPhotos(products);

                const updatedProducts = products.map((product, index) => {
                    const photo = photos[index];
                    return {
                        ...product,
                        product_image: photo ? photo.urls.small : null,
                    };
                });

                setProductsWithPhotos(updatedProducts);
            } catch (error) {
                console.error('Error fetching multiple items:', error);
            }
        };

        // Check if products are loaded and not yet updated with photos
        if (products.length > 0 && productsWithPhotos.length === 0) {
            updateProductsWithPhotos();
        }
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

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
                setNewProduct({ name: '', price: '', quantity: '' });
                setProductsWithPhotos([]); // Reset to trigger fetching photos again
            })
            .catch(err => console.log(err));
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

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
                setNewProduct({ name: '', price: '', quantity: '' });
                setEditingProduct(null);
                setProductsWithPhotos([]); // Reset to trigger fetching photos again
            })
            .catch(err => console.error(err));
    };

    const handleDeleteProduct = (product_id) => {
        fetch(`${API_URL}/${product_id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setProducts(products.filter(product => product.product_id !== product_id));
                setProductsWithPhotos([]); // Reset to trigger fetching photos again
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="products-page">
            <h1>Products</h1>
            {userId == 1 && <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="product-form">
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
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    required
                />
                <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
            </form>}
            <ul>
                {productsWithPhotos.map(product => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        userId={userId}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ProductsPage;
