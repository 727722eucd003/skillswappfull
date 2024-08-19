import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    profileImage: localStorage.getItem('profileImage') || 'https://via.placeholder.com/150',
  });

  const login = (userData) => {
    setUser({
      username: userData.username || '',
      token: userData.token || '',
      email: userData.email || '',
      profileImage: userData.profileImage || 'https://via.placeholder.com/150',
    });
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('profileImage', userData.profileImage);
  };

  const logout = () => {
    setUser({ username: '', token: '', email: '', profileImage: 'https://via.placeholder.com/150' });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('profileImage');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
