import React,{useContext,useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../DataContext';

const ProductDetail = () => {
  const {id}=useParams();
  //console.log(product);
 const {data}=useContext(DataContext);
  //console.log(data);
  
console.log("Product Data:", data);
console.log("Product ID from URL:", id);

  return (
    <>
    <div style={{height:"600px"}} className='product-detail-container '>
      {data.map((product)=>{
        if(id==product.id){
          return(
            <div key={product.id} className='product-detail'>
              <h1>{product.title}</h1>
              <img className='product-image' src={product.image} alt={product.title} width="300px" height="300px"/>
              <p>{product.description}</p>
              <p className='product-price'>${product.price}</p>
              <button className='product-detail-button'> Buy Now</button>

            </div>
          )
        }
      })}
    </div>
    </>
  )
}

export default ProductDetail