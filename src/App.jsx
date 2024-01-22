import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchange from "./components/Exchange";
import Messenger from "./components/Messenger";
import ErrorHandling from "./components/ErrorHandling";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Footer from "./components/Footer";
import RequestLink from "./components/RequestLink";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main className="h-100">
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
              path="/posts"
              element={<Posts />}
            />
            <Route
              path="/*"
              element={<ErrorHandling />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/request-link"
              element={<RequestLink />}
            />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}
