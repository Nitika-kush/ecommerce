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
    <div className='product-detail-card '>
      {data.map((product)=>{
        if(id==product.id){
          return(
            <div key={product.id} className='product-container' style={{width:"600px", borderRadius:"5px"}}>
              <h2 className='product-name'>{product.title}</h2>
              <div style={{ textAlign: "center",marginTop:"10px",marginBottom:"10px"}}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
              <p>{product.description}</p>
              <h3 className='product-rating'>Rating :{product.rating.rate}</h3>
              <p className='product-price'>${product.price}</p>
              <button className='product-button'> Buy Now</button>

            </div>
          )
        }
      })}
    </div>
    </>
  )
}

export default ProductDetail