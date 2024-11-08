import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);  //  no user logged in
  const navigate = useNavigate();
  
  // Fetch the product data
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

  // Add new product to the list
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
      (user) => user.email === credentials.email && user.password === credentials.password
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

  // Logout the user
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/"); 
  };
  
  const addToCart=(product)=>{
    if(user && user.id){

    }
  }

  useEffect(() => {
    getData();  
  }, []);  

  return (
    <DataContext.Provider
      value={{ data, newProductList, user, signupUser, loginUser, logoutUser }}
    >
      {children}
    </DataContext.Provider>
  );
};
