// src/pages/Register/Register.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../api/api";
import "../../styles/auth/Register.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    if (!formData.agree) {
      toast.warning("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success(response.data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });

      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {

      setLoading(false);

      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Server Error");
      }
    }
  };

  return (
    <motion.section
      className="register-page"
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
        className="register-card"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.15,
          duration: 0.4,
        }}
      >
        <div className="card-shine"></div>

        <h1>Create Account</h1>

        <p>Store and access your files securely.</p>

        <form onSubmit={handleSubmit}>
                    <div className="input-box">
            <FaUser className="input-icon" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <div className="terms">
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />

              <span>
                I agree to the Terms & Conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login">
          <button type="button" disabled>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />

            Continue with Google

            <span>Coming Soon</span>
          </button>
        </div>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </motion.div>
    </motion.section>
  );
}

export default Register;