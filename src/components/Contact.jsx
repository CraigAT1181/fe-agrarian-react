import React, { useState } from "react";
import { contactForm } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let name = formData.name;
      let email = formData.email;
      let message = formData.message;

      await contactForm(name, email, message);
      alert("Message sent successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Oops, something went wrong!");
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
