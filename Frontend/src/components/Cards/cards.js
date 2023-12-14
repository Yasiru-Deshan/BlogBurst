import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Cards = (props) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <div>
      <div data-aos="fade-up" className="exImage">
        <img className="eimg" alt="" src={props.image}></img>
        <div className="overlay">
          <div className="cardText">{props.title}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
