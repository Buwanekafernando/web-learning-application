import React from 'react';
import '../styles/Login.css';
import loginImage from '../assets/book.png';
import logo from '../assets/logo.png';

function Login() {
  const handleGoogleLogin = () => {
    // Redirect to your Spring Boot backend's Google OAuth2 endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="login-wrapper">
      {/* Left section */}
      <div className="login-left">
        <div className="login-form">
          {/* Logo at the top */}
          <div className="login-logo">
            <img src={logo} alt="Academix Logo" />
          </div>

          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Sign in with Google
          </button>
        </div>
      </div>

      {/* Right section */}
      <div className="login-right">
        <img src={loginImage} alt="Stack of books" className="login-img" />
      </div>
    </div>
  );
}

export default Login;
