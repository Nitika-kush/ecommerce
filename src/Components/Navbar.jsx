import React, { useContext,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { DataContext } from "./DataContext";

function Navbar() {
  const token = localStorage.getItem('token');
  const [cartCount,setCartCount]=useState(0);
  const [wishlistCount,setwishlistCount]=useState(0);
  const cartData = useSelector((state) => state.users.cart);
  const wishlistData = useSelector((state) => state.users.wishlist);
  const { logoutUser} = useContext(DataContext);

useEffect(()=>{
  setCartCount(cartData.length);
},[cartData]);

useEffect(()=>{
  setwishlistCount(wishlistData.length);
},[wishlistData]);

  return (
    <div className="navbar">
      <div>
        <img className="iconimage" src="../../public/navBarLogo.jpg" alt="logo" />
      </div>

      <div className="tablink">
        <div className="nav-single-btn">
          <Link to="/">
            <FaHome title="Home" style={{ fontSize: "21px" }} />
            <span>Home</span>
          </Link>
        </div>

        {token ? (
          <>
            <div className="nav-single-btn">
              <Link to="/product">
                <AiFillProduct title="Products" style={{ fontSize: "21px" }} />
                <span>Products</span>
              </Link>
            </div>
            <div className="nav-single-btn">
              <Link to="/cart">
                <div style={{ position: "relative" }}>
                  <BsCart title="Cart" style={{ fontSize: "21px" }} />
                  <sup
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "-15px",
                      color: "black",
                      borderRadius: "50%",
                      padding: "0px 3px",
                    }}
                  >
                    {cartCount}
                  </sup>
                </div>
                <span>Cart</span>
              </Link>
            </div>
            <div className="nav-single-btn">
              <Link to="/wishlist">
                <div style={{ position: "relative" }}>
                  <IoIosHeart title="Wishlist" style={{ fill: 'red', fontSize: "21px" }} />
                  <sup
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "-15px",
                      color: "black",
                      borderRadius: "50%",
                      padding: "0px 3px",
                    }}
                  >
                     {wishlistCount}
                  </sup>
                </div>
                <span>Wishlist</span>
              </Link>
            </div>
            <button className="logout-button" onClick={() => logoutUser()}>Logout</button>
          </>
        ) : (
          <Link to="/loginPage">
            <button className="login-button">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
