// import React, { Component } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import CustomerList from './components/CustomerList';
// import OrderList from './components/OrderList';
// import ProductList from './components/ProductList'
// import CustomerForm from './components/CustomerForm'
// import ProductForm from './components/ProductForm';



// // class App extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       selectedCustomerId: null,
// //       selectedOrderId: null,
// //     };
// //   }

// //   handleCustomerSelect = (customerId) => {
// //     this.setState({ selectedCustomerId: customerId });
// //   }

// //   handleOrderSelect = (orderId) => {
// //     this.setState({ selectedOrderId: orderId});
// //   }

// //   render() {
// //     const { selectedCustomerId, selectedOrderId } = this.state;

// //     return (
// //       <div className="app-container">
// //         <h1>Our Customers</h1>
// //         <CustomerForm/>
// //         <ProductForm/>
// //         <CustomerList onCustomerSelect={this.handleCustomerSelect} />
// //         {selectedCustomerId && (
// //           <OrderList 
// //             customerId = {selectedCustomerId}
// //             onOrderSelect = {this.handleOrderSelect}
// //             />
// //         )}
// //         {selectedOrderId && (
// //           <ProductList orderId = {selectedOrderId}/>
// //         )}
// //       </div>
// //     );
// //   }
// // }

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import CustomerFormWrapper from './components/CustomerFormWrapper';
import ProductForm from './components/ProductForm';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import Homepage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='app-container'>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/add-customers' element={<CustomerFormWrapper />} />
        <Route path='/edit-customer/:id' element={<CustomerFormWrapper />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/orders/:customerId' element={<OrderList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/add-product' element={<ProductForm />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;