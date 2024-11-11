import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataContext";

function Navbar() {
  const { user, logoutUser, cart, wishlist } = useContext(DataContext);
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
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/product">Products</Link>
            <Link to="/cart">Cart ({cart ? cart.length : 0})</Link>
            <Link to="/wishlist">
              Wishlist ({wishlist ? wishlist.length : 0})
            </Link>
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
