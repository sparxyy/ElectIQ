/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Pre-seed dummy user on first load
const DUMMY_USER = {
  id: 'dummy-001',
  name: 'Demo User',
  email: 'user1@abc.xyz',
  password: 'user1',
  createdAt: new Date('2025-01-15').toISOString(),
  level: 1,
  completedModules: [],
  quizScores: {}
};

function seedDummyUser() {
  const users = JSON.parse(localStorage.getItem('electiq_users') || '[]');
  if (!users.find(u => u.email === DUMMY_USER.email)) {
    users.push(DUMMY_USER);
    localStorage.setItem('electiq_users', JSON.stringify(users));
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Seed dummy user and check existing session on mount
  useEffect(() => {
    seedDummyUser();
    const token = localStorage.getItem('electiq_token');
    const savedUser = localStorage.getItem('electiq_user');
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setTimeout(() => {
          setUser(parsed);
          setIsAuthenticated(true);
        }, 0);
      } catch {
        localStorage.removeItem('electiq_token');
        localStorage.removeItem('electiq_user');
      }
    }
    // Simulate brief loading for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('electiq_users') || '[]');
    const found = users.find(u => u.email === email);
    if (!found) {
      return { success: false, error: 'No account found with this email' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }
    const token = crypto.randomUUID();
    const userObj = { ...found, lastLogin: new Date().toISOString() };
    delete userObj.password; // Don't store password in session
    localStorage.setItem('electiq_token', token);
    localStorage.setItem('electiq_user', JSON.stringify(userObj));
    setUser(userObj);
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('electiq_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      level: 1,
      completedModules: [],
      quizScores: {}
    };
    users.push(newUser);
    localStorage.setItem('electiq_users', JSON.stringify(users));

    const token = crypto.randomUUID();
    const userObj = { ...newUser };
    delete userObj.password;
    localStorage.setItem('electiq_token', token);
    localStorage.setItem('electiq_user', JSON.stringify(userObj));
    setUser(userObj);
    setIsAuthenticated(true);
    return { success: true, user: userObj };
  };

  const logout = () => {
    localStorage.removeItem('electiq_token');
    localStorage.removeItem('electiq_user');
    localStorage.removeItem('electiq_progress');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('electiq_user', JSON.stringify(updated));
    // Also update in users list
    const users = JSON.parse(localStorage.getItem('electiq_users') || '[]');
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('electiq_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
