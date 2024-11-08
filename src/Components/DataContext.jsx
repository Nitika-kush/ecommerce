import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  }); // koi user pahle se login ho tb
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedwishlist = localStorage.getItem("wishlist");
    return savedwishlist ? JSON.parse(savedwishlist) : [];
  });

  useEffect(() => {
    fetch("http://localhost:3000/products")
    .then((response)=>(response.json()))
    .then((data)=>setData(data))
    .catch((error)=>console.error("product fetching error",error));
  },[]);

  const navigate = useNavigate();



  const getData = () => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        console.log("Fetched data:", responseData);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

 
  const newProductList = (newData) => {
    setData((prevData) => [...prevData, newData]);

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  const signupUser = (newUser) => {
    setUser((prevUser) => {
      const users = Array.isArray(prevUser) ? prevUser : [];
      return [...users, newUser];
    });

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };

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
      })
      /*   .then((response) => response.json())
        .then((updatedUser) => {
          console.log("Cart updated on the server:", updatedUser);
        })
        .catch((error) => {
          console.error("Error updating cart on the server:", error);
        }); */
    } else {
      console.log("Please Sign up to add products to the cart.");
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
      })
    } else {
      console.log("Please Sign up to remove products from the wishlist.");
    }
   
  }


  const addToWishlist = (product) => {
    if (user) {
      const exists = wishlist.some((wishlistProduct) => wishlistProduct.id === product.id);
      if (exists) {
        console.log("Product is already in the wishlist.");
        return;
      }
      
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  

      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ whislist: updatedWishlist }),
      })
    } else {
      console.log("Please Sign up to remove products from the cart.");
    }
  };
  
  
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
        body: JSON.stringify({ whislist: updatedWishlist }), 
      })
    } else {
      console.log("Please Sign up to remove products from the wishlist.");
    }
  };
  

  // Logout the user
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DataContext.Provider
      value={{ data, newProductList, user, signupUser, 
        loginUser, logoutUser,cart,addToCart,wishlist,addToWishlist ,removeFromWishlist,removeFromCart}}
    >
      {children}
    </DataContext.Provider>
  );
};
