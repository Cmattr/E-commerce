import React, { Component } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { Link } from "react-router-dom";
import { func } from 'prop-types'
import {Form, Button, Alert, Container, Modal } from 'react-bootstrap'

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
            error: null,
        };
    }

    componentDidMount() {
        // Fetching data from an API call
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Error Fetching Data:', error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedCustomerId !== this.state.selectedCustomerId) {
            console.log(`New customer selected: ID ${this.state.selectedCustomerId}`);
        }
    }

    componentWillUnmount() {
        console.log('CustomerList component is being unmounted');
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
    }

    render() {
        const { customers } = this.state;
        return (
            <div className="customer-list">
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} >
                            <Link to={`/edit-customer/${customer.id}`}>{customer.name}</Link>
                           
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

CustomerList.propTypes = {
    onCustomerSelect: PropTypes.func.isRequired,
};

export default CustomerList;