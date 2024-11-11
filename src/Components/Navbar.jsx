import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataContext";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";




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
        <Link to="/"><FaHome style={{fontSize: '30px' }}/></Link>

        {user ? (
          <>
            <Link to="/product"><AiFillProduct style={{fontSize: '30px' }} /></Link>
            <Link to="/cart"><BsCart style={{fontSize: '30px' }}/>({cart ? cart.length : 0})</Link>
            <Link to="/wishlist">
            <IoIosHeart style={{fill:"red" ,fontSize: '30px' }} /> ({wishlist ? wishlist.length : 0})
{/*            <IoIosHeart style={{fontSize:"30px" ,color: wishlist ? wishlist.length : 0? "red":'gray'}}/>
 */}            </Link>
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
