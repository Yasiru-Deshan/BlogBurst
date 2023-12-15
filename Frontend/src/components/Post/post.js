import React, { useEffect, useRef, useState, useContext } from "react";
import "./post.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./post.css"

function Post() {
  const auth = useContext(AuthContext);
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const config = {
          headers: {
            "x-auth-token": `${auth.token}`,
            "Content-Type": "application/json",
          },
        };
    async function fetchData() {
      const response = (
        await axios.get(
          `http://localhost:8071/api/posts/${id}`, config
        )
      ).data;
      setTitle(response.post.title);
      setAuthor(response.post.author.firstName);
      setContent(response.post.content);
      setImage(response.post.image);
      setProfile(response.post.author.image);
      console.log(response)
    }
    fetchData();
  }, [auth.token]);


 

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     let newc;

//     const newComment = {
//       userId: "611b74dd16f8353848675308",
//       uname: "Liam Livingstone",
//       movieId: ids,
//       //movieId:'6145eb2e19467e39980d27e7',
//       desc: desc.current.value,
//     };

//     try {
//       newc = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/comments`,
//         newComment
//       );
//       if (newc) {
//         window.alert("Comment has been posted");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };




  return (
    <div className="postContainer">
      <div className="heading">
        {title}
      </div>
      <img
        className="postImage"
        src={image}
        alt=""
      ></img>
      <div className="content">
        {content}
      </div>

      <img
        className="ownerImg"
        src={profile}
        alt=""
      ></img>
      <div className="owner">Written By : {author}</div>
    </div>
  );
}

export default Post;
