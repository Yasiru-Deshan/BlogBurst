import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/Signup";

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
