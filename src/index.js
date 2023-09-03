import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./Components/Login/LoginProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginProvider>
);
