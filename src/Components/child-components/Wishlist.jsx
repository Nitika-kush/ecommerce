import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import { MdRemoveShoppingCart } from "react-icons/md";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(DataContext);

  return (
    <>
      <div className="space"></div>
      <div>
        <h3 style={{ textAlign: "center" }}>Wishlist</h3>
        {/* <div className="flex-start"> */}
        <ul >
        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your Wishlist is empty.</p>
        ) : (
          <div className="card1">
            {wishlist.map((product) => (
              <div key={product.id} className="product-description1 cart-item">
                <h3>{product.title.slice(0,20)+"..."}</h3>
                <div className="img-container">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <p>{product.description.slice(0, 80) + "..."}</p>
                <h3 style={{marginTop:"5px"}}>Rating :{product.rating.rate}</h3>
                <div className="btn-group">
                  <h3 className="product-price">${product.price}</h3>

                  <div className="but-group">
                    <button
                      title="remove from Whislist"
                      className="product-button"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <MdRemoveShoppingCart />
                      <span>remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
         </ul>
        {/* </div> */}
      </div>
    </>
  );
};

export default Wishlist;
