import React, { createContext, useContext, useState } from 'react';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser({
      ...MOCK_USER,
      email: email || MOCK_USER.email,
    });
    return { success: true };
  };

  const googleLogin = () => {
    setIsAuthenticated(true);
    setUser(MOCK_USER);
    return { success: true };
  };

  const register = (name, email, password) => {
    setIsAuthenticated(true);
    setUser({
      ...MOCK_USER,
      name,
      email,
    });
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfile = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, googleLogin, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
