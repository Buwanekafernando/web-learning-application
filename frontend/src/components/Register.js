// Register.js
import React, { useState } from 'react';
import '../styles/Register.css';
import RegImage from '../assets/book.png';
import logo from '../assets/logo.png'; // Place your logo image in the assets folder
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\d+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#.,]).{6,}$/;

    if (!nameRegex.test(formData.name)) newErrors.name = 'Name should contain only letters';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Email must be a valid @gmail.com address';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must contain only numbers';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!passwordRegex.test(formData.password)) newErrors.password = 'Password must contain upper, lower case letters, and @,#,.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:8096/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.text();
        alert(result === "Success" ? "Registration successful!" : result);
        navigate('/');
      } catch (error) {
        alert("Error connecting to server."+error);
      }
    }
  };
  

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <img src={logo} alt="Academix Logo" className="logo" />
        <form className="register-form" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          {errors.name && <span className="error">{errors.name}</span>}

          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          {errors.email && <span className="error">{errors.email}</span>}

          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          {errors.username && <span className="error">{errors.username}</span>}

          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          {errors.password && <span className="error">{errors.password}</span>}

          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-Password" />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          <button type="submit">Register</button>
        </form>
      </div>
      <div className="register-right">
        <img src={RegImage} alt="Books" className="side-img" />
      </div>
    </div>
  );
};

export default Register;
