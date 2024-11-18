import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { DataContext } from "./DataContext";
import { FaHome } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { useSelector } from "react-redux";

function Navbar() {
const {cart} =useSelector(state=>state.cart);
  const { user, logoutUser, wishlist } = useContext(DataContext);
  return (
    <div className="navbar">
      <div>
        <img
          className="iconimage"
          src="../../public/navBarLogo.jpg"
          alt="logo"
        />
      </div>

      <div className="tablink">
        <div className="nav-single-btn">
        <Link to="/">
          <FaHome title="Home" style={{ fontSize: "21px" }} />
          <span>Home</span>
        </Link>
        </div>

        {user ? (
          <>
           <div className="nav-single-btn">
           <Link to="/product">
              <AiFillProduct title="Products" style={{ fontSize: "21px" }} />
              <span>Products</span>
            </Link>
           </div>
            <div className="nav-single-btn">
            <Link to="/cart"
             >
              <div style={{ position: "relative" }}>
                <BsCart
                  title="Cart"
                  style={{ fontSize: "21px" }}
                />
                <sup
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "-10px",
                    color: "black",
                    borderRadius: "50%",
                    padding: "0px 3px",
                  }}
                >
                  {cart ? cart.length : 0}
                </sup>
              </div>
              <span >Cart</span>
            </Link>
            </div>
            <div className="nav-single-btn">
            <Link to="/wishlist">
              <div style={{ position: "relative" }}>
                <IoIosHeart
                  title="Wishlist"
                  style={{  fill: 'red', fontSize: "21px" }}
                />
                <sup
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "-10px",
                    color: "black",
                    borderRadius: "50%",
                    padding: "0px 3px",
                  }}
                >
                  {wishlist ? wishlist.length : 0}
                </sup>
              </div>
              <span>Wishlist</span>
            </Link>
            </div>
            <button className="logout-button" onClick={logoutUser}>
              Logout
            </button>
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
