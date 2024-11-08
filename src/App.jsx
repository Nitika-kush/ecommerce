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


function App() {
//   const [data,setData]=useState([]);

//   const getData = () => {
//     fetch('https://dummyjson.com/products')
//       .then((response) => response.json()) // Handling the promise correctly
//       .then((responseData) => {
//         setData(responseData.products); // Assuming you want the products array
//         console.log(responseData.products); // Logging the products
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// useEffect(()=>{
//  getData();
// },[])
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
          </Routes>
          </DataProvider> 
    </>
    
  )
}

export default App