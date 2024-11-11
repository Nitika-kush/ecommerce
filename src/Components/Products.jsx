import React,{useEffect,useState,useContext} from 'react'
import {Link,Routes,Route} from 'react-router-dom'
import ProductDetail from './child-components/ProductDetail';
import { DataContext } from './DataContext'
import { IoIosHeart } from "react-icons/io";
import { BsCart } from "react-icons/bs";

function Products() {
  const { user,addToCart,data ,toggleWishlist,wishlist} = useContext(DataContext);
 if(user){
  console.log("data in Products Component", data);
 }

 const handleAddToCart=(product)=>{
    if(user){
      addToCart(product);
    }else{
      console.log('please Sign up to add product in cart')
    }
  }
const handleWishlist=(product)=>{
  if(user){
    toggleWishlist(product);
  }else{
    console.log('please Sign up to add product in wishlist')
  }
}

  if (!data) {
    alert("Loading products...");
  }
  return (
    <div className='card'>
    {data && data.map((product,index) => (
      <div key={index} className='product-description'>
        <Link to={`/product/${product.id}`}>
          <h2 className='product-name'>{product.title}</h2>
          <img className='product-image' src={product.image} alt={product.title} />
          <ul key={product.id}>
            <li>
            <p>{product.description}</p>
            </li>
          </ul>
         
          <h3 className='product-price'>${product.price}</h3>
          <h3>Rating :{product.rating.rate}</h3>
          
        </Link>

        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <button className='product-button'>Buy now</button>
        <IoIosHeart onClick={()=>handleWishlist(product)}
        style={{fontSize:"30px" ,color: wishlist.some((item)=>item.id===product.id)?"red":'gray'}} />

       {/*  <button className='product-button' onClick={() => handleWishlist(product)}
        style={{
                backgroundColor: wishlist.some((item) => item.id === product.id) ? 'green' : 'gray',
                color: 'white'
              }}
            >
              {wishlist.some((item) => item.id === product.id) ? <IoIosHeart/> : <IoIosHeart/>}</button> */}
        <BsCart onClick={() => handleAddToCart(product)} style={{fontSize: '30px' }}/>
        </div>
      </div>
    ))}
  </div>
);
}

export default Products