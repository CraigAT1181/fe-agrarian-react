import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Exchange from "./components/Exchange";
import Messenger from "./components/Messenger";

export default function App() {
  return (
    <>
      <Header />
    
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
        </Routes>
      </main>
    </>
  );
}
