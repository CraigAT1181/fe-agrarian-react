import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <AuthProvider>
      <Header
        loggedIn={loggedIn}
        loggedUser={loggedUser}
        setLoggedIn={setLoggedIn}
        setLoggedUser={setLoggedUser}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home loggedUser={loggedUser} />}
          />
          <Route
            path="/home"
            element={<Home loggedUser={loggedUser} />}
          />
          <Route
            path="/exchange"
            element={<Exchange />}
          />
          <Route
            path="/messenger"
            element={<Messenger loggedUser={loggedUser} />}
          />
          <Route
            path="/*"
            element={<ErrorHandling />}
          />
          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setLoggedUser={setLoggedUser}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </main>
      </AuthProvider>
    </>
  );
}
