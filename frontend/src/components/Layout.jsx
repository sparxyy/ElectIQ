import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Show sidebar on learn and quiz routes (only when authenticated)
  const showSidebar = isAuthenticated && (
    location.pathname.startsWith('/learn') || 
    location.pathname.startsWith('/quiz')
  );

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <div className="flex">
        {showSidebar && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}
        <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
