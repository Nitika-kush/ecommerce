import React, { useContext } from 'react'
import { DataContext } from '../DataContext'

const Wishlist = () => {
 const {wishlist,removeFromWishlist}=useContext(DataContext);

  return (
    <>
 
    <div className='space'></div>
    <div>
      <h2 style={{textAlign:"center"}}>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p style={{textAlign:"center"}}>Your Wishlist is empty.</p>
      ) : (
        <div className= 'card'>
          {wishlist.map((product) => (
            <div key={product.id} className="product-description cart-item" >
              <h3>{product.title}</h3>
              <img className='product-image' src={product.image} alt={product.title} style={{}} />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button className='product-button' onClick={()=>removeFromWishlist(product.id)} >Remove</button>
            </div>
          ))}
         
        </div>
      )}
    </div>
    </>
  )
}



export default Wishlist