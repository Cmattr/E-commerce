import { number } from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ orderId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

      
        fetchProducts();
    }, [orderId]);

    return (
        <div className='product-list'>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} 
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProductList.propTypes = {
    orderId: number.isRequired,
};

export default ProductList;