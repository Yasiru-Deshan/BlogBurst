import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./navbarElements.js";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggle }) => {
  const auth = useContext(AuthContext);
  const [scrollNav, setScrollNav] = useState(false);
  const navigate = useNavigate();

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

    const signOut = () => {
      auth.logout();
      navigate("/login");
      window.location.reload();
    };


  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              BLOG BURST
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
              <NavMenu>
              {auth.isLoggedIn &&
                <NavItem>
                  <NavLinks
                    to="/home"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Home
                  </NavLinks>
                </NavItem>
              }
              {auth.isLoggedIn && 
                <NavItem>
                  <NavLinks
                    to="scope"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    My Blogs
                  </NavLinks>
                </NavItem>
              }
                {auth.isLoggedIn && (
                  <NavBtnLink
                    onClick={signOut}
                  >
                    Logout
                  </NavBtnLink>
                )}
                {!auth.isLoggedIn && (
                  <NavBtnLink to="/login">Sign In</NavBtnLink>
                )}
              </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
