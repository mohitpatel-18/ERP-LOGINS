import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
 
);
