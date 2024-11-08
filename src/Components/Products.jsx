import React,{useEffect,useState,useContext} from 'react'
import {Link,Routes,Route} from 'react-router-dom'
import ProductDetail from './child-components/ProductDetail';
import { DataContext } from './DataContext'

function Products() {
  const { user,addToCart,data ,addToWishlist} = useContext(DataContext);
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
const handleAddToWishlist=(product)=>{
  if(user){
    addToWishlist(product);
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
          <button className='product-button'>Buy now</button>
        </Link>
        <div className=''>
        <button onClick={() => handleAddToWishlist(product)}>Wishlist</button>
        <button className='cart-button' onClick={() => handleAddToCart(product)}>Add-to cart</button>
        </div>
      </div>
    ))}
  </div>
);
}

export default Products