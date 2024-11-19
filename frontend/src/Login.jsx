import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named export for jwtDecode

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Login Response: ", data);

      if (data.message === "Invalid Username!") {
        setErrorMessage("Invalid Username!");
        return;
      } else if (data.message === "Invalid Password!") {
        setErrorMessage("Invalid Password!");
        return;
      }

      localStorage.setItem("token", data.token);

      const user = jwtDecode(data.token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("profession", user.profession);

      if (user.profession === "Librarian" || user.profession === "Student") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error: ", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center text-danger">Login Page</h1>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            {errorMessage && (
              <div className="alert alert-danger text-center">{errorMessage}</div>
            )}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Your Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Your Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
