import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import Lenis from "lenis"; 

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  smoothWheel: true,
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Make Lenis globally available
window.lenis = lenis;

// Render React ONLY ONCE
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);