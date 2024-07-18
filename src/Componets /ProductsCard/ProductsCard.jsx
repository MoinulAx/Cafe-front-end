import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <li className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button>Add to Cart</button>
        </li>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
    }).isRequired,
};

export default ProductCard;
