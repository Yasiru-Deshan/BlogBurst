import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer/footer";
import getRoutes from "./routes";
import NavBar from "./components/NavBar/navBar";

function App() {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();

  const reloadUser = useCallback((user) => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    localStorage.setItem(
      "authData",
      JSON.stringify({
        token: storedData.token,
        name: storedData.name,
        id: storedData.id,
        user,
      })
    );

    setUser(user);
  }, []);
  const authenticate = useCallback((token, name, id, role, user) => {
    setToken(token);
    setName(name);
    setUserId(id);
    setUser(user);
    localStorage.setItem(
      "authData",
      JSON.stringify({
        token,
        name,
        id,
        role,
        user,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setName(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem("authData");
    localStorage.clear();
    return <Navigate to="/login" replace={true} />;
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData && storedData.token) {
      authenticate(
        storedData.token,
        storedData.name,
        storedData.id,
        storedData.user
      );
    }
  }, [authenticate]);

  let routes = getRoutes(token);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        fullName: name,
        userId: userId,
        user,
        authenticate,
        logout: logout,
        reloadUser,
      }}
    >
        <BrowserRouter>
          <div className="app">
            <NavBar />
            <div>{routes}</div>
            <Footer/>
          </div>
        </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
