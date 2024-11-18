import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
 // const [data, setData] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cart,setCart]=useState([]);
  const [wishlist,setWishlist]=useState([]);
 
/* 
  useEffect(() => {
    fetch("http://localhost:3000/products")
    .then((response)=>(response.json()))
    .then((data)=>setData(data))
    .catch((error)=>console.error("product fetching error",error));
  },[]);
 */
  const navigate = useNavigate();

  const signupUser=(newUser)=>{
    const userWithEmptyCartWishlist={
      ...newUser,
      cart:[],
      wishlist:[],
    }
   /*  setUser((prevUser) => {
      const users = Array.isArray(prevUser) ? prevUser : [];
      return [...users,userWithEmptyCartWishlist];
    }); */
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWithEmptyCartWishlist),
    }).then(() => {
      navigate("/loginPage");
    });

  }

  const loginUser = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );

      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setCart(user.cart || []);
        setWishlist(user.wishlist || []);
        navigate("/");
        return true;
      } else {
        console.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };


  const addToCart = (product) => {
    if (user) {
      const exists = cart.some((cartItem) => cartItem.id === product.id);
      if (exists) {
        console.log("Product is already in the Cart.");
        return;
      }
  
     
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
     
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      }).catch((error) => console.error("Error updating cart in backend:", error));
    } else {
      console.log("Please sign up or log in to add products to the cart.");
    }
  };
  

  const removeFromCart=(productId)=>{
    if(user){
      const updatedCart = cart.filter((product) => product.id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
     
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }), 
      }).catch((error) => console.error("Error updating cart in backend:", error));
    } else {
      console.log("Please Sign up to remove products from the wishlist.");
    }
   
  }


  
  const removeFromWishlist = (productId) => {
    if (user) {
      const updatedWishlist = wishlist.filter((product) => product.id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  
     
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wishlist: updatedWishlist }), 
      }).catch((error) => console.error("Error updating wishlist in backend:", error));
    } else {
      console.log("Please Sign up to remove products from the wishlist.");
    }
  };
  

  const toggleWishlist = (product) => {
    if (user) {
      const exists = wishlist.some((wishlistProduct) => wishlistProduct.id === product.id);
      
      if (exists) {
        const updatedWishlist = wishlist.filter((wishlistProduct) => wishlistProduct.id !== product.id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wishlist: updatedWishlist }),
        }).catch((error) => console.error("Error updating wishlist in backend:", error));
  
      } else {
        const updatedWishlist = [...wishlist, product];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  
        fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wishlist: updatedWishlist }),
        }).catch((error) => console.error("Error updating wishlist in backend:", error));
      }
    } else {
      console.log("Please sign up or log in to manage your wishlist.");
    }
  };
  
 
  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setUser(null);
    setCart([]);
    setWishlist([]);
    navigate("/");
  };

  useEffect(() => {
    if (user) {
    
      fetch(`http://localhost:3000/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          
          setCart(userData.cart || []);
          setWishlist(userData.wishlist || []);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
     
      setCart([]);
      setWishlist([]);
    }
  }, [user]); 
  

  return (
    <DataContext.Provider
      value={{  user, signupUser, 
        loginUser, logoutUser,cart,addToCart,wishlist,toggleWishlist,removeFromCart,removeFromWishlist}}
    >
      {children}
    </DataContext.Provider>
  );
};
