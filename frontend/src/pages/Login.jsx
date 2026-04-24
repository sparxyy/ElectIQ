import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        showToast('Welcome back! 👋', 'success');
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  };

  const handleForgotPassword = () => {
    showToast('Check your email for a reset link (demo)', 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-primary mb-2 font-lexend">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400">Sign in to continue your civic education journey</p>
        </div>

        <form onSubmit={handleSubmit} className="pressable-card p-8 flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border-tactile dark:border-dark-border bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium transition-colors focus:outline-none focus:border-primary"
              placeholder="jane@example.com"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-xs text-primary font-bold hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border-tactile dark:border-dark-border bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium pr-12 transition-colors focus:outline-none focus:border-primary"
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="pressable-button w-full py-4 text-lg font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin material-symbols-outlined text-lg">progress_activity</span> Signing in...</>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Demo hint */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-primary">Note:</span> this is login incase udw use normal : user1@abc.xyz password : user1
            </p>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">Sign up →</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
