import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setCart } from '../../redux/slice/cartSlice'; 
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  
  //const currentUser = JSON.parse(localStorage.getItem('user'));  
console.log(cart,"cart")
  useEffect(() => {
    console.log("here")
    console.log(cart.length);
    if (cart.length > 0) { 
      updateUserCartInDB( cart);  
    }
  }, [cart]);

  const updateUserCartInDB = (cartItems) => {
    fetch(`http://localhost:3000/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: cartItems }), 
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error updating cart in db.json:', error);
    });
  };

  
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    dispatch(removeFromCart(productId));  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log(currentUser)
    if (currentUser) {
      updateUserCartInDB(currentUser.id, updatedCart); 
    }
  };

  return (
    <>
      <div className="space"></div>
      <div>
        <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
        <ul>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your cart is empty.</p>
          ) : (
            <div className="card1" style={{ padding: "5px" }}>
              {cart.map((product) => (
                <div key={product.id} className="product-description1 cart-item">
                  <h3>{product.title.slice(0, 20) + ".."}</h3>
                  <div className="img-container">
                    <img className="product-image" src={product.image} alt={product.title} />
                  </div>
                  <p>{product.description.slice(0, 80) + "..."}</p>
                  <h3 className="product-rating">Rating: {product.rating.rate}</h3>
                  <div className="btn-group">
                    <h3 className="product-price">${product.price}</h3>
                    <div className="btn-group">
                      <button
                        title="remove from Cart"
                        className="product-button"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        <MdRemoveShoppingCart />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Cart;
