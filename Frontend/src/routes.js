import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";
import Home from "./components/Home/home";
import Post from "./components/Post/post";
import MyBlogs from "./Pages/myBlogs";

const getRoutes = (token) => {
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Post/>}/>
        <Route path="/my_blogs" element={<MyBlogs/>}/>
      </Routes>
    );
  }  else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }
  return routes;
};

export default getRoutes;
