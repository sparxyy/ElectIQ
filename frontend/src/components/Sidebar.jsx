import { Link, useLocation } from 'react-router-dom';
import { MODULES } from '../lib/modules';
import { useProgress } from '../context/ProgressContext';

const Sidebar = () => {
  const location = useLocation();
  const { progress, getModuleStatus, getLevel } = useProgress();

  const completedCount = progress.completedModules.length;
  const totalModules = MODULES.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  return (
    <aside className="w-72 min-h-screen bg-white dark:bg-dark-surface border-r-4 border-border-tactile dark:border-dark-border p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Progress overview */}
      <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-4 border-2 border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-primary">Level {getLevel()}</span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{completedCount}/{totalModules} modules</span>
        </div>
        <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Module list */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-2">Modules</h3>
        {MODULES.map((mod) => {
          const status = getModuleStatus(mod.id);
          const isActive = location.pathname === `/learn/${mod.id}`;
          return (
            <Link
              key={mod.id}
              to={`/learn/${mod.id}`}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm ${
                isActive 
                  ? 'bg-primary/10 text-primary border-2 border-primary/30 font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-border border-2 border-transparent'
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm flex-shrink-0 ${
                  status === 'completed' ? 'bg-pastel-mint text-white' :
                  status === 'in-progress' ? 'bg-pastel-yellow text-yellow-800' :
                  'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300'
                }`}
                style={status === 'completed' || status === 'in-progress' ? {} : {}}
              >
                {status === 'completed' ? '✓' : mod.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`truncate font-medium ${isActive ? 'text-primary' : ''}`}>{mod.title}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{mod.estimatedMinutes} min</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="mt-auto flex flex-col gap-2 pt-4 border-t-2 border-border-tactile dark:border-dark-border">
        <Link to="/assistant" className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors px-2 py-2">
          <span className="material-symbols-outlined text-lg">auto_awesome</span>
          Ask the Assistant
        </Link>
        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors px-2 py-2">
          <span className="material-symbols-outlined text-lg">dashboard</span>
          Dashboard
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
