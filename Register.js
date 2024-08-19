import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Ensure that the dotlottie player script is loaded
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }

    console.log('Form data:', formData); // Log form data for debugging

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status); // Log response status for debugging

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData); // Log error response for debugging
        alert(errorData.message);
        return;
      }

      const data = await response.json();
      console.log('Success response:', data); // Log success response for debugging
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error); // Log error during registration
      alert('Error during registration');
    }
  };

  return (
    <div className="register-page-body">
      <div className="register-page">
        <div className="register-container">
          <div className="register-left">
            <div className="register-left-content">
              <div className="register-left-header">
                <h1 className="cursive-font">Join Us</h1>
              </div>
              <div className="register-3d-graphic">
                <dotlottie-player
                  src="https://lottie.host/8d943822-a031-4fb3-9917-8964ef3ea582/Xpcewk01Tx.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '300px', height: '300px' }}
                  loop
                  autoplay
                ></dotlottie-player>
              </div>
            </div>
          </div>
          <div className="register-right">
            <form className="register-form" onSubmit={handleRegister}>
              <h2 className="cursive-font">Register</h2>
              <div className="register-form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Register</button>
              <p>Already have an account? <Link to="/login">Login</Link></p>
              <div className="register-divider"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
