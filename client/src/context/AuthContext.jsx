import React, { createContext, useContext, useState } from 'react';
import { MOCK_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Registered Accounts DB stored in localStorage
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('globetrotter_registered_accounts');
    if (savedAccounts) {
      try {
        return JSON.parse(savedAccounts);
      } catch (e) {
        return [MOCK_USER];
      }
    }
    return [MOCK_USER];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('globetrotter_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_USER;
      }
    }
    return MOCK_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('globetrotter_user');
  });

  // Login Handler: Checks if email is registered first
  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // Check if account exists in registered accounts or matches demo user
    const foundAccount = registeredAccounts.find(
      (acc) => acc.email?.toLowerCase() === cleanEmail
    );

    if (!foundAccount && cleanEmail !== MOCK_USER.email.toLowerCase()) {
      throw new Error('No account found with this email. Please create an account first!');
    }

    const loggedInUser = foundAccount || {
      ...MOCK_USER,
      email: cleanEmail
    };

    setIsAuthenticated(true);
    setUser(loggedInUser);
    localStorage.setItem('globetrotter_user', JSON.stringify(loggedInUser));
    return { success: true };
  };

  const googleLogin = () => {
    setIsAuthenticated(true);
    setUser(MOCK_USER);
    localStorage.setItem('globetrotter_user', JSON.stringify(MOCK_USER));
    return { success: true };
  };

  // Register Handler: Creates new account and logs in
  const register = async (name, email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim() || 'Explorer';

    const newUser = {
      ...MOCK_USER,
      name: cleanName,
      email: cleanEmail,
      createdAt: new Date().toISOString()
    };

    // Save to registered accounts list
    const updatedAccounts = [newUser, ...registeredAccounts.filter(a => a.email?.toLowerCase() !== cleanEmail)];
    setRegisteredAccounts(updatedAccounts);
    localStorage.setItem('globetrotter_registered_accounts', JSON.stringify(updatedAccounts));

    // Log user in
    setIsAuthenticated(true);
    setUser(newUser);
    localStorage.setItem('globetrotter_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('globetrotter_user');
  };

  const updateProfile = (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('globetrotter_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, registeredAccounts, login, googleLogin, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
