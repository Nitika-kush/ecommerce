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
      const updatedCart=[...cart,product];
      setCart(updatedCart);
      localStorage.setItem("cart",JSON.stringify(updatedCart));
    }else{
      console.log("Please Sign up to add product in cart")
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
      value={{ data, newProductList, user, signupUser, loginUser, logoutUser,addToCart }}
    >
      {children}
    </DataContext.Provider>
  );
};
