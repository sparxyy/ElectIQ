import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Learn', path: '/learn' },
        { name: 'Quizzes', path: '/quiz/1' },
        { name: 'Assistant', path: '/assistant' },
        { name: 'Search', path: '/search' },
      ]
    : [
        { name: 'Home', path: '/' },
      ];

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getInitialColor = (name) => {
    if (!name) return '#7C6FCD';
    const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const colors = ['#7C6FCD', '#A8D5BA', '#F4A7B9', '#F9C784', '#A8C8E8'];
    return colors[hash % colors.length];
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 w-full bg-background/90 dark:bg-dark-bg/90 backdrop-blur-md border-b-4 border-border-tactile dark:border-dark-border shadow-tactile">
      <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
        <span className="text-2xl font-black text-primary tracking-tight font-lexend">ElectIQ</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`font-lexend font-medium transition-all duration-200 ${
              location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                ? 'text-primary border-b-2 border-primary' 
                : 'text-slate-600 dark:text-slate-400 hover:text-primary'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 transition-all"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <span className="material-symbols-outlined text-xl">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white transition-transform hover:scale-105 border-2 border-white shadow-sm"
              style={{ backgroundColor: getInitialColor(user?.name) }}
            >
              {getInitials(user?.name)}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-surface rounded-2xl shadow-lg border-2 border-border-tactile dark:border-dark-border overflow-hidden z-50">
                <div className="px-4 py-3 border-b-2 border-border-tactile dark:border-dark-border">
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{user?.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{user?.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-primary/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">person</span>
                  Profile
                </Link>
                <Link 
                  to="/dashboard" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-primary/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">dashboard</span>
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t-2 border-border-tactile dark:border-dark-border"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link 
            to="/login" 
            className="px-5 py-2 pressable-button text-sm"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
