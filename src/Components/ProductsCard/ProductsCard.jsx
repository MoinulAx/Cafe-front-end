import React from 'react';
import PropTypes from 'prop-types';
import './productscard.scss'

const ProductCard = ({ product }) => {
    return (
        <li className="product-card">
            <h2>{product.product_name}</h2>
            <p>Price:${product.product_price}</p>
            <p>Quantity: {product.product_quantity}</p>
            <button>Add to Cart</button>
        </li>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        product_id: PropTypes.number.isRequired,
        product_name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        product_quantity: PropTypes.number.isRequired,
        product_details: PropTypes.string,
        product_image: PropTypes.string,
        instock: PropTypes.bool.isRequired,
    }).isRequired,
};

export default ProductCard;
