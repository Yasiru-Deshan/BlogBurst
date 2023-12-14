import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const fname = useRef();
  const lname = useRef();
  const password = useRef();
  const email = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    let newCustomer;

    const newUser = {
      firstName: fname.current.value,
      lastName: lname.current.value,
      password: password.current.value,
      email: email.current.value,
    };

    try {
      newCustomer = await axios.post(
        "http://localhost:8071/api/auth/",
        newUser
      );
      if (newCustomer) {
        window.alert("Signed up Successfully!");
        navigate("/login");
      } else {
        window.alert("something went wrong. please try again", true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <Card
          className="text-center"
          style={{
            width: "28rem",
            marginTop: "6rem",
            marginBottom: "5rem",
            borderRadius: "20px",
            padding: "10px",
            height: "100%",
            "box-shadow": "30px 20px 30px 10px rgba(56, 125, 255, 0.17)",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{ fontWeight: "bold", fontSize: "2rem", padding: "1rem" }}
            >
              Sign Up
            </Card.Title>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  ref={email}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fname">First Name</label>
                <input
                  name="fname"
                  className="form-control"
                  id="fname"
                  ref={fname}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lname">Last Name</label>
                <input
                  name="lname"
                  className="form-control"
                  id="lname"
                  ref={lname}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  ref={password}
                  required
                />
              </div>
              
              <div className="mb-3">
                <button className="btn btn-primary w-100">
                  Create Account
                </button>
              </div>
            </form>
          </Card.Body>
          <Card.Footer>
            Already have an account?<Link to="/login">Signin</Link>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
