import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email address';
    if (form.password.length < 4) errs.password = 'Password must be at least 4 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!agreed) errs.agreed = 'You must agree to continue';
    return errs;
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (p.length === 0) return 0;
    let score = 0;
    if (p.length >= 4) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9!@#$%^&*]/.test(p)) score++;
    return score;
  };

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const result = register(form.email, form.password, form.name);
      if (result.success) {
        showToast('Account created! Welcome to ElectIQ 🎉', 'success');
        navigate('/dashboard');
      } else {
        setErrors({ email: result.error });
        showToast(result.error, 'error');
      }
      setLoading(false);
    }, 600);
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-primary mb-2 font-lexend">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400">Join ElectIQ and master your civic knowledge</p>
        </div>

        <form onSubmit={handleSubmit} className="pressable-card p-8 flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium transition-colors focus:outline-none focus:border-primary ${errors.name ? 'border-red-400' : 'border-border-tactile dark:border-dark-border'}`}
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium transition-colors focus:outline-none focus:border-primary ${errors.email ? 'border-red-400' : 'border-border-tactile dark:border-dark-border'}`}
              placeholder="jane@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium pr-12 transition-colors focus:outline-none focus:border-primary ${errors.password ? 'border-red-400' : 'border-border-tactile dark:border-dark-border'}`}
                placeholder="Enter password"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
            {form.password.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i <= strength ? strengthColors[strength] : '#e2e8f0' }}></div>
                ))}
                <span className="text-xs font-bold ml-2" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium pr-12 transition-colors focus:outline-none focus:border-primary ${errors.confirm ? 'border-red-400' : form.confirm && form.password === form.confirm ? 'border-green-400' : 'border-border-tactile dark:border-dark-border'}`}
                placeholder="Confirm password"
              />
              {form.confirm && form.password === form.confirm && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">✓</span>
              )}
            </div>
            {errors.confirm && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirm}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary"
            />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>
            </span>
          </div>
          {errors.agreed && <p className="text-red-500 text-xs font-medium -mt-3">{errors.agreed}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="pressable-button w-full py-4 text-lg font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin material-symbols-outlined text-lg">progress_activity</span> Creating account...</>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Sign in →</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
