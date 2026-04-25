import { ROADMAP_STEPS } from '../lib/data';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-20">
        <h1 className="text-5xl md:text-6xl font-black text-primary mb-6 leading-tight">
          Understand your vote.<br />
          <span className="text-secondary">Own your democracy.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium">
          The ultimate interactive guide for the next generation of voters. 
          Gamified, non-partisan, and powered by AI.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={isAuthenticated ? '/dashboard' : '/register'} className="px-10 py-4 pressable-button text-lg">
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </Link>
          <Link to={isAuthenticated ? '/assistant' : '/login'} className="px-10 py-4 pressable-button-secondary text-lg">
            {isAuthenticated ? 'Ask ElectIQ' : 'Sign In'}
          </Link>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-bold text-sm tracking-widest">ROADMAP</span>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Your Path to Impact</h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border-tactile dark:bg-dark-border -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {ROADMAP_STEPS.map((step) => (
              <Link 
                key={step.id} 
                to={isAuthenticated ? step.link : '/register'}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className={`w-20 h-20 rounded-3xl mb-6 flex items-center justify-center border-4 border-white shadow-tactile transition-transform group-hover:scale-105 group-active:scale-95 ${
                  step.color === 'pastel-blue' ? 'bg-pastel-blue' :
                  step.color === 'pastel-mint' ? 'bg-pastel-mint' :
                  step.color === 'pastel-yellow' ? 'bg-pastel-yellow' :
                  'bg-pastel-pink'
                }`}>
                  <span className="material-symbols-outlined text-white text-4xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
        <FeatureCard 
          to={isAuthenticated ? '/assistant' : '/register'}
          icon="auto_awesome" 
          title="AI Civic Assistant" 
          desc="Get instant, non-partisan answers to your most complex election questions."
          color="bg-pastel-blue"
        />
        <FeatureCard 
          to={isAuthenticated ? '/quiz/1' : '/register'}
          icon="quiz" 
          title="Gamified Quizzes" 
          desc="Test your knowledge and earn badges as you master the election process."
          color="bg-pastel-mint"
        />
        <FeatureCard 
          to={isAuthenticated ? '/learn' : '/register'}
          icon="security" 
          title="Privacy First" 
          desc="Your data stays yours. Learn anonymously and securely with local persistence."
          color="bg-pastel-pink"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ to, icon, title, desc, color }) => (
  <Link to={to} className="pressable-card p-8 flex flex-col items-start text-left group">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-6 border-2 border-white shadow-sm transition-transform group-hover:scale-110`}>
      <span className="material-symbols-outlined text-white">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
  </Link>
);

export default Home;
