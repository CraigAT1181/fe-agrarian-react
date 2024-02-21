import React, { useState } from 'react';
import { contactForm } from '../api/api';

export default function Contact () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let name = formData.name;
        let email = formData.email;
        let message = formData.message;

      await contactForm(name, email, message);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Oops, something went wrong!');
    }
  };

  return (
    <div className='container w-50'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group mt-2'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className='form-control mb-2'
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
            className='form-control mb-2'
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
            className='form-control mb-2'
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className='btn btn-success' type="submit">Submit</button>
      </form>
    </div>
  );
};