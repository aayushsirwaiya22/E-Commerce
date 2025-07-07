import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// import App from './App';
// import StateMgt from "./adminviews/StateMgt"
// import CityMgt from './adminviews/CityMgt';
// import City from './adminviews/City'
// import VendorReg from './Vendor/VendorReg';
// import Product from "./Product/Product"
import reportWebVitals from './reportWebVitals';
// import CustomerReg from './Customer/CustomerReg';
// import CustomerLogin from './Customer/CustomerLogin';
// import AdminHome from './adminviews/AdminHome';
// import BillByID from './Bill/BillbyId';
// import Bill from "./Bill/Bill";
// import ProductList from './Product/ProductList';
// import ProductCatg from './adminviews/Productcatg';
import MainPage from './MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/* <ProductCatg/> */}
    {/* <VendorReg/> */}
    {/* <Product/> */}
    {/* <ProductList/> */}
    {/* <CustomerReg/> */}
    {/* <CustomerLogin/> */}
    {/* <BillByID/> */}
    {/* <Bill/> */}
    {/* <StateMgt/> */}
    {/* <City/>  */}
    {/* <AdminHome/> */}
    <MainPage/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
