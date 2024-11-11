import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null); 
  const { loginUser } = useContext(DataContext);
  const navigate =useNavigate();
    
  function generateRandomToken() {
    return Math.random().toString(36); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let userIsValid = true,
      newErrors = {};

    Object.keys(input).forEach((key) => {
      if (input[key].trim().length === 0) {
        newErrors[key] = `${key} is required`;
        userIsValid = false;
      }
    });
    setErrors(newErrors);
   
    if (userIsValid) {
      const success = loginUser(input);
      
      if (!success) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          invalidCred: "Invalid email or password",
        }));
      } else {
        const newToken = generateRandomToken();
        setToken(newToken); 
        localStorage.setItem("token",newToken);
        navigate('/');

        setInput({
          email: "",
          password: "",
        });
        setErrors({});
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value),
      setInput((prevInput) => ({ ...prevInput, [name]: value }));

    if (value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <>
    <div className="space"></div>
    <div className="login-form">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <button className="button2" type="submit">
            Login
          </button>
          <p>
            Don't have an account?
            <button className="span">
              <Link to="/signupPage"> Signup</Link>
            </button>
          </p>
        </div>
      </form>
    </div> 
    </>
   
  );
};

export default Login;
