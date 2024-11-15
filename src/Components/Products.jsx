import React,{useEffect,useState,useContext} from 'react'
import {Link,Routes,Route} from 'react-router-dom'
import { DataContext } from './DataContext'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/productSlice'; 
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

function Products(){
  const dispatch= useDispatch();
const {products,status,error}= useSelector((state)=>state.products);

useEffect(() => {
  if (status === 'idle') {
    dispatch(fetchProducts());
  }
}, [dispatch, status]);

  const { user,addToCart ,toggleWishlist,wishlist} = useContext(DataContext);
 if(user){
  console.log("data in Products Component", products);
 }

 const handleAddToCart=(product)=>{
    if(user){
      addToCart(product);
    }else{
      console.log('please Sign up to add product in cart')
    }
  }
  return (
    <div className='card'>
    {products && products.map((product,index) => (
      <div key={index} className='product-description'>
        <Link to={`/product/${product.id}`}>
          <h2 className='product-name'>{product.title.slice(0,15)+"..."}</h2>
          <div style={{textAlign:'center'}}>
 <img className='product-image' src={product.image} alt={product.title} />
          </div>
         
          <div className='btn-group'>
          <h3 className='product-price'>${product.price}</h3>
          <h3>Rating :{product.rating.rate}</h3>
          
          </div>
         
        </Link>

        <div className='btn-group'>
        <button className='wish-list' onClick={()=>toggleWishlist(product)}>
        {wishlist.some((item)=>item.id===product.id)? <FaHeart fill='red' style={{ fontSize: "18px" }}/>:
        <FaRegHeart style={{ fontSize: "18px" }} />}
        WishList
        </button>

        <button className='add-to-cart' onClick={()=>handleAddToCart(product)}>
        <TiShoppingCart />
        </button>

        </div>
      </div>
    ))}
  </div>
);
}

export default Products

