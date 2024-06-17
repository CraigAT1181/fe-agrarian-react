import React from "react";
import { Link } from "react-router-dom";

export default function NavbarFooter() {
  return (
    <nav>
        <Link
          to="/about"
          className="nav-item">
          About
        </Link>
        <Link
          to="/privacy"
          className="nav-item">
          Privacy Policy
        </Link>
        <Link
          to="/cookies"
          className="nav-item">
          Cookie Policy
        </Link>
        <Link
          to="/offer-support"
          className="nav-item">
          Offer Support
        </Link>
        <Link
          to="/contact"
          className="nav-item">
          Contact Us
        </Link>
        <Link
          to="#"
          className="nav-item">
          News
        </Link>
    </nav>
  );
}
