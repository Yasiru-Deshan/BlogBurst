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
      axios.get("http://localhost:8071/api/auth/my_blogs", config).then((res) => {
        setPosts(res.data.user.posts.reverse());
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
          textAlign: "center",
        }}
      >
        My Blogs
      </h1>
      {posts.length>0 ?

      <div className="cardContainer" style={{ marginTop: "20px" }}>
        {posts.map((post) => {
          return (
            <Cards
              key={post.title}
              id={post._id}
              image={post.image}
              title={post.title}
              author={auth.fullName}
              content={post.content}
              authorImg={post.image}
              editable={editable}
            />
          );
        })}
      </div>
      : <div style={{padding: "150px 0px 150px 0px",}}>
        <h2>You haven't written anything yet.</h2>
      </div>}
    </div>
  );
};

export default MyBlogs;
