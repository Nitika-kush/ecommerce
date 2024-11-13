import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const { cart, removeFromCart } = useContext(DataContext);
  return (
    <>
      <div className="space"></div>
      <div>
        <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
        <ul style={{ padding: "8px" }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your cart is empty.</p>
          ) : (
            <div className="card1" style={{ padding: "5px" }}>
              {cart.map((product) => (
                <div key={product.id} className="product-description1 cart-item">
                  <h3>{product.title.slice(0,20)+".."}</h3>
                  <div className="img-container" >
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                  <p>{product.description.slice(0, 100) + "..."}</p>

                  <h3 style={{marginTop:"5px"}}>Rating :{product.rating.rate}</h3>
                  <div className="btn-group">
                    <h3 className="product-price">${product.price}</h3>
                    <div className="btn-group">
                      <button
                        title="remove from Cart"
                        className="product-button"
                        onClick={() => removeFromCart(product.id)}
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
