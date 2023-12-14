import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `http://localhost:8071/api/auth/login`,
        body,
        {
          ContentType: "application/json",
        }
      );

      if (response.data.token != null) {
        auth.authenticate(
          response.data.token,
          response.data.firstName + " " + response.data.lastName,
          response.data.id,
          response.data.user
        );
        navigate("/home");
      } else {
        window.alert("please check your credentials", true);
      }
    } catch (error) {
      window.alert("Server error please reload", true);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...user,
      [e.target.name]: e.target.value,
    });
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
            boxShadow: "30px 20px 30px 10px rgba(56, 125, 255, 0.17)",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{ fontWeight: "bold", fontSize: "2rem", padding: "1rem" }}
            >
              Sign In
            </Card.Title>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="john@gmail.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary w-100">Sign In</button>
              </div>
            </form>
          </Card.Body>
          <Card.Footer>
            Need an account?<Link to="/signup">Sign Up</Link>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Login;
