import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Exchange from "./components/Exchange";
import Home from "./components/Home";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
        </Routes>
      </main>
    </>
  );
}
