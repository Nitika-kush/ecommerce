import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const initialUserData = {
      id: '',
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      cart: [],
      wishlist: []
  };
 
  const [usersData, setUsersData] = useState(()=>{
    const storedUserData = localStorage.getItem('usersData');
    return storedUserData ? JSON.parse(storedUserData) : initialUserData;
});
const [allUsersData, setAllUsersData] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
        await getUser();
    };
    fetchUsers();
}, []);
useEffect(()=>{
    localStorage.setItem('usersData',JSON.stringify(usersData))
},[usersData])

const [data, setData] = useState([]);

const getData = async () => {
  await fetch("http://localhost:3000/products", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => setData(response));
};

useEffect(() => {
  if (data.length === 0) {
    getData();
    console.log("...fetching data");
  }
}, [data]);

const getUser = async () => {
  try {
      const response = await fetch("http://localhost:3000/users", {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (response.ok) {
          const users = await response.json();
          setAllUsersData(users); 
          users.forEach(user => {
              if (!Array.isArray(user.cart)) {
                  user.cart = [];
              }
          });
          return users; 
      } else {
          console.log("Failed to get data");
          return [];
      }
  } catch (error) {
      console.log("Error:", error);
      return [];
  }
};
  const signupUser = async (newUser) => {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            const createdUser = await response.json();
            setUsersData(createdUser);
            setAllUsersData((prevUsers) => [...prevUsers, createdUser]);
            console.log(`New user ${createdUser.name.toUpperCase()} is created Successfully`);
            navigate('/loginPage'); 
            
        } else {
            console.error('Failed to sign up');
        }
    } catch (error) {
        console.error('Error during signup:', error);
    }
};


   const logoutUser = () => {
        localStorage.removeItem('token','usersData');
        console.log("User is Log Out Now")
        setUsersData(initialUserData); 
        navigate('/');
    };
  return (
    <DataContext.Provider
      value={{ usersData,data,setData, allUsersData, signupUser, /* loginUser, */ logoutUser, getUser, setUsersData/* , addToCart,removeFromCart,removeFromWishlist,toggleWishlist */ }}
    >
      {children}
    </DataContext.Provider>
  );
};
