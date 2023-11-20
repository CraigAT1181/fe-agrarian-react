import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Exchange from "./components/Exchange";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Exchange />}
          />
          <Route
            path="/home"
            element={<Exchange />}
          />
        </Routes>
      </main>
    </>
  );
}
