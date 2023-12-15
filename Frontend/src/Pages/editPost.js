import React, { useContext, useState, useEffect } from "react";
import "./blog.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const auth = useContext(AuthContext);
  const [blogId, setBlogId] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const id = useParams().id;

      useEffect(() => {
        const config = {
          headers: {
            "x-auth-token": `${auth.token}`,
            "Content-Type": "application/json",
          },
        };
        async function fetchData() {
          const response = (
            await axios.get(`http://localhost:8071/api/posts/${id}`, config)
          ).data;
          setBlogId(response.post._id);
          setTitle(response.post.title);
          setContent(response.post.content);
          setImage(response.post.image);
        }
        fetchData();
      }, [auth.token]);


  const editHandler = async (e, id) => {
    let update;

    e.preventDefault();
    const updatePost = {
      title: title,
      content: content,
      image: image,
    };

    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      update = await axios.put(
        `http://localhost:8071/api/posts/${id}`,
        updatePost,
        config
      );

      if (update) {
        window.alert("Your blog has been updated");
        navigate("/my_blogs");
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
        Edit Blog
      </h1>
      <form onSubmit={(e) => editHandler(e, blogId)}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            defaultValue={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            name="image"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            defaultValue={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            name="content"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
