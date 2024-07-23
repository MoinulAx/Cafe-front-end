import React from 'react';
import PropTypes from 'prop-types';
import './productscard.scss';

const ProductCard = ({ product }) => {

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
        <li className="product-card">
            <img src={product.product_image}  className='product-card__image'/>
            <h2 className='product-card__name'>{product.product_name}</h2>
            <p className='product-card__price'>Price: ${product.product_price}</p>
            <p className='product-card__quantity'>Quantity: {product.product_quantity}</p>
            <button className='product-card__button'>Add to Cart</button>
        </li>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        product_id: PropTypes.number.isRequired,
        product_name: PropTypes.string.isRequired,
        product_price: PropTypes.number.isRequired,
        product_quantity: PropTypes.number.isRequired,
        product_details: PropTypes.string,
        product_image: PropTypes.string,
        instock: PropTypes.bool.isRequired,
    }).isRequired,
};

export default ProductCard;
