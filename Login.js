import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import facebookLogo from '../assets/facebook-logo.png';
import twitterLogo from '../assets/twitter-logo.png';
import googleLogo from '../assets/google-logo.png';
import { useAuth } from './AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch user details:', errorData.message);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed. Please try again.');
        return;
      }

      const data = await response.json();
      const userDetails = await fetchUserDetails(data.token);

      if (userDetails) {
        login({
          username: userDetails.username,
          token: data.token,
          email: userDetails.email
        });

        navigate('/');
      } else {
        alert('Failed to fetch user details');
      }
    } catch (error) {
      alert('Error during login');
      console.error('Login error:', error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginUser(formData);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="login-page-body">
      <div className="login-page">
        <div className="login-container">
          <div className="login-left">
            <div className="login-left-header">
              <h1 className="cursive-font">Welcome user!</h1>
              <div className="login-3d-graphic">
                <dotlottie-player
                  src="https://lottie.host/7bb77d97-eda0-4b0d-b41f-8726dec1caf5/zJlppzEAJR.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  style={{ width: '300px', height: '300px' }}
                ></dotlottie-player>
              </div>
            </div>
          </div>
          <div className="login-right">
            <form className="login-form" onSubmit={handleLogin}>
              <h2 className="cursive-font">Login</h2>
              <div className="login-form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="login-form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Login</button>
              <p>Don't have an account? <Link to="/register">Register</Link></p>
              <div className="login-divider">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="social-login-container">
                <button className="facebook-login">
                  <img src={facebookLogo} alt="Facebook" />
                  Facebook
                </button>
                <button className="twitter-login">
                  <img src={twitterLogo} alt="Twitter" />
                  Twitter
                </button>
                <button className="google-login">
                  <img src={googleLogo} alt="Google" />
                  Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
