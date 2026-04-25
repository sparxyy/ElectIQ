import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MODULES } from '../lib/modules';
import { useProgress } from '../context/ProgressContext';

const Learn = () => {
  const { moduleId } = useParams();
    const { progress, markModuleStarted, markModuleCompleted, saveCardIndex, getNextIncompleteModule } = useProgress();

  // Resolve module
  const mId = moduleId ? parseInt(moduleId) : getNextIncompleteModule();
  const module = MODULES.find(m => m.id === mId);

  const [currentCard, setCurrentCard] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Load saved card index on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (module) {
      markModuleStarted(module.id);
      const savedIndex = progress.currentCardIndex[module.id];
      if (savedIndex !== undefined && savedIndex < module.cards.length) {
        setTimeout(() => setCurrentCard(savedIndex), 0);
      } else {
        setTimeout(() => setCurrentCard(0), 0);
      }
      setTimeout(() => setCompleted(progress.completedModules.includes(module.id)), 0);
    }
  }, [mId]);

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="material-symbols-outlined text-6xl text-slate-300">error</span>
        <h2 className="text-xl font-bold text-slate-600 dark:text-slate-300">Module not found</h2>
        <Link to="/learn/1" className="pressable-button px-6 py-3">Go to Module 1</Link>
      </div>
    );
  }

  const card = module.cards[currentCard];
  const isLastCard = currentCard === module.cards.length - 1;
  const nextModuleId = module.id < MODULES.length ? module.id + 1 : null;

  const handleNext = () => {
    if (isLastCard) {
      markModuleCompleted(module.id);
      setCompleted(true);
    } else {
      const next = currentCard + 1;
      setCurrentCard(next);
      saveCardIndex(module.id, next);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      const prev = currentCard - 1;
      setCurrentCard(prev);
      saveCardIndex(module.id, prev);
    }
  };

  if (completed && isLastCard) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="pressable-card p-12 flex flex-col items-center gap-6">
          <div className="w-24 h-24 bg-pastel-mint rounded-3xl flex items-center justify-center border-4 border-white shadow-tactile">
            <span className="text-5xl">🎉</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Module Complete!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            You've finished <span className="font-bold text-primary">{module.title}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <Link 
              to={`/quiz/${module.id}`} 
              className="pressable-button flex-1 py-4 text-center font-bold"
            >
              Take the Quiz 📝
            </Link>
            {nextModuleId && (
              <Link 
                to={`/learn/${nextModuleId}`} 
                onClick={() => { setCompleted(false); setTimeout(() => setCurrentCard(0), 0); }}
                className="pressable-button-secondary flex-1 py-4 text-center font-bold"
              >
                Next Module →
              </Link>
            )}
          </div>
          <Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Module header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span 
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: module.accentColor }}
          >
            MODULE {module.id}
          </span>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{module.difficulty} · {module.estimatedMinutes} min</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 font-lexend">{module.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{module.description}</p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2 bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentCard + 1) / module.cards.length) * 100}%`, backgroundColor: module.accentColor }}
          ></div>
        </div>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{currentCard + 1}/{module.cards.length}</span>
      </div>

      {/* Flashcard */}
      <div className="pressable-card p-8 mb-8 min-h-[280px] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{card.icon}</span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{card.title}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg flex-1">{card.content}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={handlePrev} 
          disabled={currentCard === 0}
          className="pressable-button-secondary px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span> Previous
        </button>
        <button 
          onClick={handleNext}
          className="pressable-button px-6 py-3 flex items-center gap-2"
        >
          {isLastCard ? 'Complete Module ✓' : 'Next'} 
          {!isLastCard && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
        </button>
      </div>

      {/* Key Terms */}
      {module.keyTerms && module.keyTerms.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">book</span>
            Key Terms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {module.keyTerms.map((term, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-dark-border/50 rounded-xl p-4 border-2 border-slate-100 dark:border-dark-border">
                <span className="font-bold text-primary text-sm">{term.term}</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask assistant CTA */}
      <Link 
        to="/assistant" 
        className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 hover:bg-primary/10 transition-colors group"
      >
        <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
        <div>
          <p className="text-sm font-bold text-primary group-hover:underline">Have questions about this topic?</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Ask the ElectIQ assistant for a deeper explanation</p>
        </div>
      </Link>
    </div>
  );
};

export default Learn;
