import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import Navbar from './customer/components/navbar/Navbar';
import customtheme from './customtheme/customtheme';
import Home from './customer/pages/home/Home';
import Product from './customer/pages/product/Product';

function App() {
  return (
    <ThemeProvider theme={customtheme}>
        <div className="">
            <Navbar />
            {/* <Home /> */}
            <Product/>
        </div>
    </ThemeProvider>
    
  );
}

export default App;
