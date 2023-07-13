import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Update from "./Update"
import App from "./App";

const AppRoutes = () => {
  return (
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<App />} />
  <Route path="/Update/:id" element={<Update />} />
  </Routes>
  </BrowserRouter>
  );
  };
  
  export default AppRoutes;