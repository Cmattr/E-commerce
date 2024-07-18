import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, func } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import axios from "axios";

const CustomerForm = ({ selectedcustomer, oncustomerUpdated }) => {
    const [customer, setCustomer] = useState({id:0, name: "", email: "", phone: "" });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedcustomer) {
            setCustomer(selectedcustomer);
        } else if (id) {
            axios.get(`http://127.0.0.1:5000/customer/${id}`)
                .then(response => {
                    setCustomer(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id, selectedcustomer]);

    const validateForm = () => {
        let errors = {};
        if (!customer.name) errors.name = 'Customer name is required';
        if (!customer.phone) errors.phone = 'Phone is required';
        if (!customer.email) errors.email = 'Customer email is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/edit-customers/${id}`, customer);
            } else {
                await axios.post('http://127.0.0.1:5000/customers', customer);
            }
            setShowSuccessModal(true);
            if (oncustomerUpdated) {
                oncustomerUpdated(customer);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevcustomer => ({
            ...prevcustomer,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomer({ name: '', email: '', phone: '' });
        setSubmitting(false);
        navigate('/customers');
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>{id ? 'Edit' : 'Add'} customer</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="customerName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={customer.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="customerPhone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type='text'
                        name='phone'
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="customerEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type='text'
                        name='email'
                        value={customer.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
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
                <Modal.Body>Customer has been successfully {id ? 'Updated' : 'Added'}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

CustomerForm.propTypes = {
    selectedcustomer: object,
    oncustomerUpdated: func
};

export default CustomerForm;