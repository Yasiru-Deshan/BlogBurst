import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";
import Home from "./components/Home/home";

const getRoutes = (token) => {
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }  else {
    routes = (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    );
  }
  return routes;
};

export default getRoutes;
