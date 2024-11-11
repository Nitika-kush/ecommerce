import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from './DataContext';

const SignupForm= () => {
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  });
  const [errors, setErrors] = useState({});
  const {user,signupUser}=useContext(DataContext);
  const navigate=useNavigate();


  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUserData((prevData)=>({...prevData,[name]:value}));

    if(value.trim()){
      setErrors((prevErrors)=>({
        ...prevErrors,
        [name]:"",
      }))
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = {};
    console.log(userData);
  

    Object.keys(userData).forEach((key) => {
      if (userData[key].trim().length === 0) {
        newErrors[key] = `${key} is required`;
        formIsValid = false;
      }
    });
  
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }
  
    setErrors(newErrors);
  
    if (formIsValid) {
      try {
        const response = await fetch('http://localhost:3000/users');
        const existingUsers = await response.json();

        const duplicateUser = existingUsers.find(
          (userItem) => userItem.email === userData.email
        );

        if (duplicateUser) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email already exists',
          }));
          setUserData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          signupUser(userData);

        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };
  
  
  return (
    <div className="sign-up">
      <h2 style={{textAlign:"center"}}>Sign-Up</h2>

      <form onSubmit={handleSubmit}>

      <div className="input-field" >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name='name'
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
           {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>} 
        </div>

        <div className="input-field" >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name='email'
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
           {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} 
        </div>
        
        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name='password'
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
           {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>} 
        </div>

        <div className="input-field">
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            name='confirmPassword'
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your password"
          />
           {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>} 
        </div>

        <div>
          <button className='button2' type="submit">Signup</button>
          <p>already have an account?<button className='span'><Link to='/loginPage'>  Login</Link></button></p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
