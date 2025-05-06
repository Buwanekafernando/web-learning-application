import React, { useState } from 'react';
import '../styles/Login.css';
import loginImage from '../assets/book.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Frontend validation
    if (!username || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // if using cookies/session
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.message || 'Login failed.');
        return;
      }

      // Optional: Save token or user info
      const data = await response.json();
      console.log('Login success:', data);
      // Redirect to homepage/dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Server error. Please try again later.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-form">
          <div className="login-logo">
            <img src={logo} alt="Academix Logo" />
          </div>

          <form onSubmit={handleLocalLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            <button type="submit" className="local-login-btn">Login</button>
          </form>

          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Sign in with Google
          </button>

          <div className="register-prompt">
            Don’t have an account?{' '}
            <button className="register-btn" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="login-right">
        <img src={loginImage} alt="Stack of books" className="login-img" />
      </div>
    </div>
  );
}

export default Login;
