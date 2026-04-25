import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { MODULES } from '../lib/modules';

const Dashboard = () => {
  const { user } = useAuth();
  const { progress, getModuleStatus, getLevel, getAverageScore, getNextIncompleteModule } = useProgress();

  const completedCount = progress.completedModules.length;
  const totalModules = MODULES.length;
  const level = getLevel();
  const avgScore = getAverageScore();
  const nextModuleId = getNextIncompleteModule();

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

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 font-lexend">
        Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'Learner'}</span> 👋
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — User Card */}
        <div className="pressable-card p-8 flex flex-col items-center text-center">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-tactile border-4 border-white mb-4"
            style={{ backgroundColor: getInitialColor(user?.name) }}
          >
            {getInitials(user?.name)}
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{user?.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          
          <div className="mt-4 bg-primary/10 px-4 py-2 rounded-xl">
            <span className="text-sm font-bold text-primary">Level {level} Citizen</span>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            Member since {formatDate(user?.createdAt)}
          </p>

          <Link to="/profile" className="mt-4 w-full pressable-button-secondary py-2 text-sm text-center block">
            Edit Profile
          </Link>
        </div>

        {/* Center Column — Module Progress */}
        <div className="lg:col-span-1 pressable-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest">MODULES</span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Progress</h2>
          </div>

          <div className="flex flex-col gap-3">
            {MODULES.map((mod) => {
              const status = getModuleStatus(mod.id);
              const quizScore = progress.quizScores[mod.id];
              return (
                <div key={mod.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-border/50 border-2 border-slate-100 dark:border-dark-border">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm flex-shrink-0 ${
                      status === 'completed' ? 'bg-pastel-mint text-white' :
                      status === 'in-progress' ? 'bg-pastel-yellow text-yellow-800' :
                      'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    {status === 'completed' ? '✓' : mod.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{mod.title}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {status === 'completed' ? (quizScore ? `Quiz: ${quizScore.score}/${quizScore.total}` : 'Completed') :
                       status === 'in-progress' ? 'In progress' : 'Not started'}
                    </p>
                  </div>
                  <Link 
                    to={`/learn/${mod.id}`} 
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                      status === 'completed' 
                        ? 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary' 
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    {status === 'completed' ? 'Review' : status === 'in-progress' ? 'Continue →' : 'Start →'}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column — Stats */}
        <div className="flex flex-col gap-6">
          {/* Level indicator */}
          <div className="pressable-card p-8 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-slate-600" />
                <circle 
                  cx="50" cy="50" r="42" fill="none" stroke="#7C6FCD" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(completedCount / totalModules) * 264} 264`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-primary">{level}</span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Level</span>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{completedCount} of {totalModules} modules completed</p>
          </div>

          {/* Stats cards */}
          <div className="pressable-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pastel-blue rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">quiz</span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{avgScore}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Avg. Quiz Score</p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <Link to={`/learn/${nextModuleId}`} className="pressable-button py-4 text-center text-sm font-bold block">
            Continue Learning →
          </Link>
          <Link to="/assistant" className="pressable-button-secondary py-4 text-center text-sm font-bold block">
            Ask the Assistant 💬
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
