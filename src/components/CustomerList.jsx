import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const CustomerList = ({ customerId }) => {
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/customers`);
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };

        fetchCustomers();
    }, []);

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
            fetchCustomers(); 
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };
    
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Customers</h3>
                    <ListGroup>
                        {customers.map((customer) => (
                            <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                                <div>
                                    <Link to={`/edit-customer/${customer.id}`} className='text-primary'>{customer.name}</Link>
                                    <Button variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
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

export default CustomerList;