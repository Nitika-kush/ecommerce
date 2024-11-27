import React, { useContext,useEffect } from "react";
//import { DataContext } from "../DataContext";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../redux/slice/usersSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.users.cart);
  const userId = useSelector((state) => state.users.id);
  const user =  useSelector((state)=>state.users)
  const dispatch = useDispatch();


  const handleRemove = async (id) => {
    dispatch(removeItemFromCart(id));
    try {
      let updatedCart;
      updatedCart = cartData.filter((item) => item.id !== id);
      const updateResponse = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            cart: updatedCart,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update Cart");
      }
      console.log("cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  if (!cartData) {
    return <div>Please log in to see your cart.</div>;
  }

  return (
    <>
      <div className="space"></div>
      <div>
      <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
        <ul style={{ padding: "8px" }}>
          {cartData && cartData.length > 0 ? (
            <div className="card1" style={{ padding: "5px" }}>
              {cartData.map((product) => (
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
                        onClick={() => handleRemove(product.id)}
                      >
                        <MdRemoveShoppingCart />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ):(
            <p style={{ textAlign: "center" }}>Your cart is empty.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Cart;