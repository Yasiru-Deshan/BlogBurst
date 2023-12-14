import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./cards.css";

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
    </div>
  );
};

export default Cards;
