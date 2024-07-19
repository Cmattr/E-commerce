import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, func } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import axios from "axios";

const ProductForm = ({ selectedProduct, onProductUpdated }) => {
    const [Product, setProduct] = useState({id:0, name: "", price: ""});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else if (id) {
            axios.get(`http://127.0.0.1:5000/product/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id, selectedProduct]);

    const validateForm = () => {
                let errors = {};
                if (!Product.name) errors.name = 'Product name is required';
                if (!Product.price || Product.price <= 0) errors.price = 'Price must be a positive number';
                setErrors(errors);
                return Object.keys(errors).length === 0;
            };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/products/${id}`, Product);
            } else {
                await axios.post('http://127.0.0.1:5000/products', Product);
            }
            setShowSuccessModal(true);
            if (onProductUpdated) {
                onProductUpdated(Product);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setProduct({ name: '', email: '', phone: '' });
        setSubmitting(false);
        navigate('/Products');
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>{id ? 'Edit' : 'Add'} Product</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="ProductName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={Product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="ProductPhone">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='Number'
                        name='Price'
                        value={Product.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
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
                <Modal.Body>Product has been successfully {id ? 'Updated' : 'Added'}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

ProductForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
};

export default ProductForm;