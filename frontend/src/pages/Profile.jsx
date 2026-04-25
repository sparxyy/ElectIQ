import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../components/Toast';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const { progress, clearProgress, getLevel, getAverageScore } = useProgress();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getInitials = (n) => {
    if (!n) return '?';
    return n.split(' ').map(c => c[0]).join('').toUpperCase().slice(0, 2);
  };

  const getInitialColor = (n) => {
    if (!n) return '#7C6FCD';
    const hash = n.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const colors = ['#7C6FCD', '#A8D5BA', '#F4A7B9', '#F9C784', '#A8C8E8'];
    return colors[hash % colors.length];
  };

  const handleNameSave = () => {
    if (name.trim() && name.trim() !== user?.name) {
      updateUser({ name: name.trim() });
      showToast('Name updated!', 'success');
    }
  };

  const handleClearProgress = () => {
    clearProgress();
    setShowClearConfirm(false);
    showToast('All progress has been cleared', 'info');
  };

  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem('electiq_users') || '[]');
    const filtered = users.filter(u => u.id !== user?.id);
    localStorage.setItem('electiq_users', JSON.stringify(filtered));
    logout();
    showToast('Account deleted', 'info');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 font-lexend">Your Profile</h1>

      {/* Avatar and name */}
      <div className="pressable-card p-8 flex flex-col items-center text-center mb-6">
        <div 
          className="w-28 h-28 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-tactile border-4 border-white mb-6"
          style={{ backgroundColor: getInitialColor(user?.name) }}
        >
          {getInitials(user?.name)}
        </div>

        <div className="w-full max-w-xs">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 text-left">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={handleNameSave}
            className="w-full px-4 py-3 rounded-xl border-2 border-border-tactile dark:border-dark-border bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200 font-medium text-center focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</span>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">Local Account</span>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
          Member since {formatDate(user?.createdAt)}
        </p>
      </div>

      {/* Progress summary */}
      <div className="pressable-card p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">trending_up</span>
          Progress Summary
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-slate-50 dark:bg-dark-border/50 rounded-xl">
            <p className="text-2xl font-black text-primary">{progress.completedModules.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Modules</p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-dark-border/50 rounded-xl">
            <p className="text-2xl font-black text-primary">{getAverageScore()}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Avg Score</p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-dark-border/50 rounded-xl">
            <p className="text-2xl font-black text-primary">{getLevel()}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Level</p>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="pressable-card p-6 border-red-200 dark:border-red-800">
        <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">warning</span>
          Danger Zone
        </h2>
        <div className="flex flex-col gap-3">
          {!showClearConfirm ? (
            <button 
              onClick={() => setShowClearConfirm(true)}
              className="w-full text-left px-4 py-3 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
            >
              Clear all progress
            </button>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border-2 border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-400 mb-3">This will reset all module progress and quiz scores. Are you sure?</p>
              <div className="flex gap-2">
                <button onClick={handleClearProgress} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">Yes, clear</button>
                <button onClick={() => setShowClearConfirm(false)} className="px-4 py-2 bg-white dark:bg-dark-bg text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold border-2 border-border-tactile dark:border-dark-border hover:bg-slate-50 transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full text-left px-4 py-3 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
            >
              Delete account permanently
            </button>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border-2 border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-400 mb-3">This will permanently delete your account and all data. This cannot be undone!</p>
              <div className="flex gap-2">
                <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">Delete forever</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-white dark:bg-dark-bg text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold border-2 border-border-tactile dark:border-dark-border hover:bg-slate-50 transition-colors">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
