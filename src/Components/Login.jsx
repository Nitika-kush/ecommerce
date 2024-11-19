import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { DataContext } from "./DataContext";
import { useDispatch } from "react-redux";
import { loggedUser } from "../redux/slice/usersSlice";


const Login = () => {
  const [usersData, setUsersData] = useState([]);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsersData(data);
  };
    
  const generateToken = () => {
    return Math.random().toString(8);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userIsValid = true;
    const newErrors = {};

    Object.keys(input).forEach((key) => {
      if (!input[key].trim()) {
        newErrors[key] = "This field is required";
        userIsValid = false;
      }
    });

    if (!userIsValid) {
      setErrors(newErrors);
      return;
    }

    const foundUser = usersData.find(
      (user) => user.email === input.email && user.password === input.password
    );

    if (foundUser) {
      dispatch(loggedUser(foundUser));
      const token = generateToken();
     // console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("usersData", JSON.stringify(foundUser));
      navigate("/");
    } else {
      setErrors({ invalidCred: "Invalid email or password" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

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
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchUsersData } from "../redux/slice/usersSlice";  
// import { setUser } from "../redux/slice/usersSlice";

// const Login = () => {
//   const [input, setInput] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { users, status, error } = useSelector(state => state.users);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsersData()); 
//     }
//   }, [dispatch, status]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let userIsValid = true;
//     let newErrors = {};

//     Object.keys(input).forEach((key) => {
//       if (input[key].trim().length === 0) {
//         newErrors[key] = `${key} is required`;
//         userIsValid = false;
//       }
//     });

//     setErrors(newErrors);

//     if (userIsValid) {
//       const user = users.find(
//         (user) => user.email === input.email && user.password === input.password
//       );

//       if (user) {
//         dispatch(setUser(user)); 
//         localStorage.setItem("user", JSON.stringify(user)); 
//         navigate("/");
//       } else {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           invalidCred: "Invalid email or password",
//         }));
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput((prevInput) => ({ ...prevInput, [name]: value }));

//     if (value.trim()) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>
//       {status === 'loading' && <p>Loading users...</p>}
//       {status === 'failed' && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-field">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={input.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//           />
//           {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//         </div>

//         <div className="input-field">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={input.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//           />
//           {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
//         </div>

//         <button className="button2" type="submit">
//           Login
//         </button>

//         <p>
//           Don't have an account?{" "}
//           <button className="span">
//             <Link to="/signupPage">Signup</Link>
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
   
