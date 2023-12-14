import React, { useEffect, useContext, useState } from "react";
import "./../components/Home/home.css";
import Cards from "./../components/Cards/cards";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyBlogs = () => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const editable = true;

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };

    const getPosts = () => {
      axios.get("http://localhost:8071/api/posts", config).then((res) => {
        setPosts(res.data.posts.reverse());
      });
    };

    getPosts();
  }, [auth.token]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "20px",
        paddingTop: "50px",
        backgroundColor: "#fff",
      }}
      id="scope"
    >
      <h1
        style={{
          fontSize: "4rem",
          color: "#101522",
          margin: "20px 0 0 20px",
          fontWeight: "800",
        }}
      >
        My Blogs
      </h1>

      <div className="cardContainer" style={{ marginTop: "20px" }}>
        {posts.map((post) => {
          return (
            <Cards
              key={post.title}
              image={post.img}
              title={post.title}
              author={post.author.firstName}
              content={post.content}
              authorImg={post.author.image}
              editable={editable}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyBlogs;
