import React, { useEffect, useState, } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import { DataProvider } from './Components/DataContext'
import AddProductDetail from './Components/child-components/AddProductDetail'
import ProductDetail from './Components/child-components/ProductDetail'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SignupForm from './Components/SignupForm'
import Login from './Components/Login'
import Cart from './Components/child-components/Cart'
import Wishlist from './Components/child-components/Wishlist'


function App() {
  return (
    <>
       <DataProvider> 
        <div className='space'>
        <Navbar/>
        </div>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/product' element={<Products />} />
            <Route path='/product/addProductDetail' element={<AddProductDetail/>} ></Route>
            <Route path='/product/:id' element={<ProductDetail/>}></Route>
            <Route path='/product/addProdctDetail/:id' element={<AddProductDetail/>}></Route>
            <Route path='/signupPage' element={<SignupForm/>}></Route>
            <Route path='/loginPage' element={<Login/>}></Route>
            <Route path='/product/cart' element={<Cart/>} ></Route>
            <Route path='/product/wishlist' element={<Wishlist/>}></Route>
          </Routes>
          </DataProvider> 
    </>
    
  )
}

export default App