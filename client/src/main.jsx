import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./Context/AuthContext.jsx";
import MenuProvider from "./Context/MenuContext.jsx";
import CategoriesProvider from "./Context/CategoriesContext.jsx";

import { OrderProvider } from "./Context/OrderContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>  // ← علق هذا السطر
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <MenuProvider>
            <CartProvider>
              <OrderProvider>
                <CssBaseline />
                <App />
              </OrderProvider>
            </CartProvider>
          </MenuProvider>
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>  // ← وعلق هذا السطر
);