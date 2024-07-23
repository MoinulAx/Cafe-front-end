import React from 'react';
import PropTypes from 'prop-types';
import './productscard.scss';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <li className="product-card">
            <img src={product.product_image} className='product-card__image' />
            <h2 className='product-card__name'>{product.product_name}</h2>
            <p className='product-card__price'>Price: ${product.product_price}</p>
            <p className='product-card__quantity'>Quantity: {product.product_quantity}</p>
            <button className='product-card__button' onClick={onEdit}>Edit</button>
            <button className='product-card__button' onClick={onDelete}>Delete</button>
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
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ProductCard;
