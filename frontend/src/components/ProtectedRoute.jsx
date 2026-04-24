import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-dark-bg">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-tactile-primary border-4 border-white">
            <span className="material-symbols-outlined text-white text-4xl">how_to_vote</span>
          </div>
          <span className="text-2xl font-black text-primary tracking-tight font-lexend">ElectIQ</span>
          <div className="w-32 h-1 bg-primary/30 rounded-full overflow-hidden mt-2">
            <div className="w-full h-full bg-primary rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
