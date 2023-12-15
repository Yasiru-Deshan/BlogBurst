import React, { useRef, useContext} from "react";
import "./blog.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Blog = () =>{

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const title = useRef();
    const image = useRef();
    const content = useRef();
    
    const submitHandler = async (e) => {
      e.preventDefault();
      let newUpload;

        const config = {
        headers: {
            "x-auth-token": `${auth.token}`,
            "Content-Type": "application/json",
        },
        };

      const newBlog = {
        title: title.current.value,
        image: image.current.value,
        content: content.current.value,
        author: auth.userId,
      };

      try {
        newUpload = await axios.post(
          "http://localhost:8071/api/posts/new",
          newBlog,
          config,
        );
        if (newUpload) {
          window.alert("Blog uploaded successfully");
          navigate("/my_blogs");
        } else {
          window.alert("something went wrong. please try again", true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div className="container">
        <h1
          style={{
            fontSize: "4rem",
            color: "#101522",
            margin: "20px 0 20px 20px",
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          New Blog
        </h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" ref={title} name="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" ref={image} name="image" required />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea id="content" ref={content} name="content" required />
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
}

export default Blog;