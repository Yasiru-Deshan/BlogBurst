import React, { useEffect, useContext } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./cards.css";
import { NavBtnLink, DangerButton } from "../NavBar/navbarElements";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Cards = (props) => {

  const auth = useContext(AuthContext); 

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

    const deleteBlog = async (id) => {
      let deletion;

      const config = {
      headers: {
        "x-auth-token": auth.token,
        "Content-Type": "application/json",
      },
    };

      if (window.confirm("Are you sure about deleting this blog?")) {
        deletion = await axios.delete(`http://localhost:8071/api/posts/${id}`, config);
      }
      if (deletion) {
        window.alert("Your blog has been deleted");
        window.location.reload();
      } else {
        window.alert("Something went wrong, Please try again !");
      }
    };

//   const removeItem = async (itemId) => {

//     const blog = {
//       itemIdToRemove: itemId,
//     };

//     const config = {
//       headers: {
//         "x-auth-token": auth.token,
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const update = await axios.put(
//         "http://localhost:8071/api/posts/",
//         JSON.stringify(blog),
//         config
//       );

//       if (update) {
//         window.alert("Item removed from the cart");

//         window.location.reload();
//       } else {
//         console.error("Item removal failed. Server response:", update.data);
//       }
//     } catch (error) {
//       console.error(
//         "An error occurred:",
//         error.response ? error.response.data : error
//       );
//     }
//   };

  return (
    <div>
      <Link to={`/blog/${props.id}`} style={{ textDecoration: "none" }}>
        <div data-aos="fade-up" className="exImage">
          <img className="eimg" alt="" src={props.image}></img>
          <div className="overlay">
            <div className="cardText">
              <div></div>
              <div></div>
              {props.title} -{props.author}
              <img className="authorImg" src={props.authorImg} alt=""></img>
            </div>
          </div>
        </div>
        {props.editable && (
          <div className="ownArea">
            <NavBtnLink to={`/edit/${props.id}`}>Edit</NavBtnLink>
            <DangerButton onClick={() => deleteBlog(props.id)}>
              Delete
            </DangerButton>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Cards;
