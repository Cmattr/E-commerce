import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const productList = ({ productId }) => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchproducts();
    }, []);

    const deleteproduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchproducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    return (
        <Container>
            <Row>
                <Col>
                    <h3>products</h3>
                    <ListGroup>
                        {products.map((product) => (
                            <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                <div>
                                    <Link to={`/product/${product.id}`} className='text-primary'>{product.name}</Link>
                                    <Button variant="danger" onClick={() => deleteproduct(product.id)}>Delete</Button>
                                </div>
                                <div>
                                    
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default productList;