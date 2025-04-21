import React from 'react';
import '../styles/Login.css';
import loginImage from '../assets/book.png';
import logo from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  return (
    <div className="login-wrapper">
      {/* Left section */}
      <div className="login-left">
        <form className="login-form">

          {/* Logo at the top */}
          <div className="login-logo">
            <img src={logo} alt="Academix Logo" />
          </div>

          <input type="text" placeholder="Username" className="login-input" required />
          <input type="password" placeholder="Password" className="login-input" required />
          
          <button className="login-btn">Login</button>

          <div className="register-section">
            <p>Create an account?</p>
            <button className="register-btn" onClick={handleRegisterClick}>Register</button>
          </div>
        </form>
      </div>

      {/* Right section */}
      <div className="login-right">
        <img src={loginImage} alt="Stack of books" className="login-img" />
      </div>
    </div>
  );
}

export default Login;
