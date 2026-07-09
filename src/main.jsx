import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>,
);
