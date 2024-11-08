import React,{useEffect,useState,useContext} from 'react'
import {Link,Routes,Route} from 'react-router-dom'
import ProductDetail from './child-components/ProductDetail';
import { DataContext } from './DataContext'

function Products() {
  const { user,addToCart,data } = useContext(DataContext);
  console.log("data in Products Component", data);

 const handleAddToCart=(product)=>{
    if(user){
      addToCart(product);
    }else{
      console.log('please Sign up to add product in cart')
    }
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
         {/*  <h3>Rating :${product.rating.rate}</h3> */}
          <button className='product-button'>Buy now</button>
        </Link>
        <div>
        <button>Wishlist</button>
        <button onClick={handleAddToCart}>Add-to cart</button>
        </div>
      </div>
    ))}
  </div>
);
}

export default Products