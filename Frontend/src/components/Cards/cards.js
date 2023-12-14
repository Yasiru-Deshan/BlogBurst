import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./cards.css";
import { NavBtnLink, DangerButton } from "../NavBar/navbarElements";

const Cards = (props) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <div>
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
          <NavBtnLink>Edit</NavBtnLink>
          <DangerButton>Delete</DangerButton>
        </div>
      )}
    </div>
  );
};

export default Cards;
