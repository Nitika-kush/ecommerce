import React, { useContext } from "react";
import { DataContext } from "../DataContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(DataContext);
  return (
    <>
      <div className="space"></div>
      <div>
        <h2 style={{ textAlign: "center"}}>My Cart</h2>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty.</p>
        ) : (
          <div className="card">
            {cart.map((product) => (
              <div key={product.id} className="product-description cart-item">
                <h3>{product.title}</h3>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
                <ul key={product.id}>
                  <li>
                    <p>{product.description}</p>
                  </li>
                </ul>

                <h3 className="product-price">${product.price}</h3>
                <h3>Rating :{product.rating.rate}</h3>
                <button
                  className="product-button"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
