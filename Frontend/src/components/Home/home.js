import React, {useEffect, useContext, useState} from "react";
import "./home.css";
import Cards from "../Cards/cards";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {

      const auth = useContext(AuthContext);
      const [posts, setPosts] = useState([]);

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
      <center>
        <h1
          style={{
            fontSize: "4rem",
            color: "#101522",
            margin: "20px 0 0 20px",
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          Featured Blogs
        </h1>
      </center>

        <div className="cardContainer" style={{ marginTop: "20px" }}>
          {posts.map((post) => {
            return (
              <Cards
                key={post.title}
                id={post._id}
                image={post.image}
                title={post.title}
                author={post.author.firstName}
                content={post.content}
                authorImg={post.author.image}
              />
            );
          })}
        </div>
    </div>
  );
};

export default Home;
