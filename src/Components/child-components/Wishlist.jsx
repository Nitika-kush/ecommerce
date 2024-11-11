import React, { useContext } from "react";
import { DataContext } from "../DataContext";

const Wishlist = () => {
  const { wishlist} = useContext(DataContext);
  

  return (
    <>
      <div className="space"></div>
      <div>
        <h2 style={{ textAlign: "center"}}>Wishlist</h2>
        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your Wishlist is empty.</p>
        ) : (
          <div className="card">
            {wishlist.map((product) => (
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
                 /*  onClick={() => removeFromWishlist(product.id)} */
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
