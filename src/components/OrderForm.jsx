
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, func } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import axios from "axios";

const OrderForm = ({ selectedorder, onorderUpdated }) => {
    const [order, setorder] = useState({id:0, date: "", customer_id: ""});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedorder) {
            setorder(selectedorder);
        } else if (id) {
            axios.get(`http://127.0.0.1:5000/order/${id}`)
                .then(response => {
                    setorder(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id, selectedorder]);

    const validateForm = () => {
                let errors = {};
                if (!order.customer_id) errors.customer_id = 'order customer_id is required';
                if (!order.price || order.price <= 0) errors.price = 'Price must be a positive number';
                setErrors(errors);
                return Object.keys(errors).length === 0;
            };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/order/${id}`, order);
            } else {
                await axios.post('http://127.0.0.1:5000/orders', order);
            }
            setShowSuccessModal(true);
            if (onorderUpdated) {
                onorderUpdated(order);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { customer_id, value } = event.target;
        setorder(prevorder => ({
            ...prevorder,
            [customer_id]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setorder({ customer_id: '', email: '', Date: '' });
        setSubmitting(false);
        navigate('/orders');
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>{id ? 'Edit' : 'Add'} order</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="ordercustomer_id">
                    <Form.Label>customer_id:</Form.Label>
                    <Form.Control
                        type='nubmer'
                        Customer='Customer id'
                        value={order.customer_id}
                        onChange={handleChange}
                        isInvalid={!!errors.customer_id}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.customer_id}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="orderDate">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type='Date'
                        Date='Date'
                        value={order.Date}
                        onChange={handleChange}
                        isInvalid={!!errors.Date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as='span' animation='border' size='sm' /> : 'Submit'}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>order has been successfully {id ? 'Updated' : 'Added'}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

OrderForm.propTypes = {
    selectedorder: object,
    onorderUpdated: func
};

export default OrderForm;