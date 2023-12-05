import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center border-bottom border-success-subtle mb-5">
      <NavBar />
      <h1 className="display-2 text-success p-4">Agrarian</h1>
    </header>
  );
}
