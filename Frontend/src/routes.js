import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/Signup/signup";
import Home from "./components/Home/home";
import Post from "./components/Post/post";
import MyBlogs from "./Pages/myBlogs";
import Blog from "./Pages/blog";
import EditBlog from "./Pages/editPost";

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
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/edit/:id" element={<EditBlog/>}/>
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
