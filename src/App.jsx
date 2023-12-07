import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchange from "./components/Exchange";
import Messenger from "./components/Messenger";
import ErrorHandling from "./components/ErrorHandling";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    user_id: 0,
    user_name: "",
    email: "",
    postcode: "",
    produce: [],
  });

  return (
    <>
      <Header
        loggedIn={loggedIn}
        loggedUser={loggedUser}
        setLoggedIn={setLoggedIn}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/exchange"
            element={<Exchange />}
          />
          <Route
            path="/messenger"
            element={<Messenger />}
          />
          <Route
            path="/*"
            element={<ErrorHandling />}
          />
          <Route
            path="/login"
            element={
              <Login
                setLoggedUser={setLoggedUser}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </main>
    </>
  );
}
