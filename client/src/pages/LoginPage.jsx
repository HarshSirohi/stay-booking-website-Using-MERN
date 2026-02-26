import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/Login.scss"
import "../styles/LoginEnhanced.css"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* Get data after fetching */
      const loggedIn = await response.json()

      if (response.ok && loggedIn.user) {
        toast.success("Login successful! Welcome back!");
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(loggedIn.message || "Login failed! Please try again.");
      }

    } catch (err) {
      console.log("Login failed", err.message);
      toast.error("Connection error. Please check your internet and try again.");
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
