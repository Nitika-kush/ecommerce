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
   
