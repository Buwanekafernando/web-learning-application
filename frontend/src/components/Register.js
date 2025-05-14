import React, { useState } from 'react';
import '../styles/Register.css';
import RegImage from '../assets/book.png';
import logo from '../assets/logo.png'; // Place your logo image in the assets folder

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setServerError('');
    setSuccessMessage('');
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name should contain only letters, spaces, apostrophes, or hyphens';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const params = new URLSearchParams();
        params.append('name', formData.name);
        params.append('username', formData.username);
        params.append('email', formData.email);
        params.append('password', formData.password);

        const response = await fetch('http://localhost:8080/api/users/register?' + params.toString(), {
          method: 'POST',
        });

        if (!response.ok) {
          const errorText = await response.text();
          setServerError(errorText || 'Registration failed');
          setSuccessMessage('');
          return;
        }

        setSuccessMessage('Registration successful! You can now login.');
        setServerError('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        setServerError('Server error. Please try again later.');
        setSuccessMessage('');
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
          {serverError && <div className="error-msg">{serverError}</div>}
          {successMessage && <div className="success-msg">{successMessage}</div>}
        </form>
      </div>
      <div className="register-right">
        <img src={RegImage} alt="Books" className="side-img" />
      </div>
    </div>
  );
};

export default Register;
