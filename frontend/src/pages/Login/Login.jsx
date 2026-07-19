// src/pages/Login/Login.jsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../../api/api";
import "../../styles/auth/Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state.success);

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/login", {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      if (rememberMe) {
        localStorage.setItem(
          "rememberEmail",
          loginData.email
        );
      } else {
        localStorage.removeItem(
          "rememberEmail"
        );
      }

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.detail ||
            "Invalid Email or Password"
        );
      } else {
        toast.error("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const remembered =
      localStorage.getItem("rememberEmail");

    if (remembered) {
      setRememberMe(true);

      setLoginData((prev) => ({
        ...prev,
        email: remembered,
      }));
    }
  }, []);

  return (
    <motion.section
      className="login-page"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      <div className="bg-circle circle-one"></div>
      <div className="bg-circle circle-two"></div>

      <motion.div
        className="login-card"
        initial={{
          scale: 0.92,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.15,
          duration: 0.4,
        }}
      >
        <div className="card-shine"></div>

        <h1>Welcome Back</h1>

        <p>
          Continue to your secure cloud
          storage.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <div className="login-options">

            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
              />

              <span>
                Remember Me
              </span>
            </label>

          </div>
                    <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login">
          <button
            type="button"
            disabled
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />

            Continue with Google

            <span>Coming Soon</span>
          </button>
        </div>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </motion.div>
    </motion.section>
  );
}

export default Login;