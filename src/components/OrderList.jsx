import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const OrderList = ({ orderId }) => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/orders`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
            fetchOrders(); 
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };
    
    return (
        <Container>
            <Row>
                <Col>
                    <h3>orders</h3>
                    <ListGroup>
                        {orders.map((order) => (
                            <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                <div>
                                <p><Link to={`/edit-order/${order.id}`} className='text-primary'>{order.customer_id}</Link></p>dsfgsadf
                                    <Button variant="danger" onClick={() => deleteOrder(order.id)}>Delete</Button>
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

export default OrderList;