import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center bg-background dark:bg-dark-bg">
      <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 border-4 border-white shadow-tactile-primary">
        <span className="material-symbols-outlined text-primary text-6xl">travel_explore</span>
      </div>
      
      <h1 className="text-6xl font-black text-slate-800 dark:text-slate-100 mb-4 font-lexend">404</h1>
      <h2 className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-6 font-lexend">Page Not Found</h2>
      
      <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md font-medium">
        Oops! Looks like you've wandered off the trail. The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/" className="px-8 py-4 pressable-button text-lg flex items-center gap-2">
        <span className="material-symbols-outlined">home</span>
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
