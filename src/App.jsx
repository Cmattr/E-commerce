
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import CustomerFormWrapper from './components/CustomerFormWrapper';
import ProductFormWrapper from './components/ProductFormWrapper';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import Homepage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderForm from './components/OrderForm';


function App() {
  return (
    <div className='app-container'>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/add-customers' element={<CustomerFormWrapper />} />
        <Route path='/edit-customer/:id' element={<CustomerFormWrapper />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/orders/' element={<OrderList />} />
        <Route path='/add-orders/' element={<OrderForm />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductFormWrapper />} />
        <Route path='/add-products' element={<ProductFormWrapper />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;