import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext.jsx";


import { ThemeProvider } from "@mui/material/styles";

import  MenuProvider from './Context/MenuContext.jsx';
import CategoriesProvider from './Context/CategoriesContext.jsx';
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  
      <BrowserRouter>
        <AuthProvider>
          <CategoriesProvider>
            <MenuProvider>
              <CssBaseline />
              <App />
            </MenuProvider>
          </CategoriesProvider>
        </AuthProvider>
      </BrowserRouter>
   
  </React.StrictMode>
);