import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

const DEFAULT_PROGRESS = {
  completedModules: [],
  modulesStarted: [],
  currentCardIndex: {},
  quizScores: {},
  chatHistory: [],
  totalTimeSpent: 0,
};

export function ProgressProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  // Load progress from localStorage when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const saved = localStorage.getItem('electiq_progress');
      if (saved) {
        try {
          setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(saved) });
        } catch {
          setProgress(DEFAULT_PROGRESS);
        }
      }
    } else {
      setProgress(DEFAULT_PROGRESS);
    }
  }, [isAuthenticated]);

  // Persist to localStorage on change
  const persist = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('electiq_progress', JSON.stringify(newProgress));
  };

  const markModuleStarted = (moduleId) => {
    if (progress.modulesStarted.includes(moduleId)) return;
    persist({
      ...progress,
      modulesStarted: [...progress.modulesStarted, moduleId],
    });
  };

  const markModuleCompleted = (moduleId) => {
    if (progress.completedModules.includes(moduleId)) return;
    const updated = {
      ...progress,
      completedModules: [...progress.completedModules, moduleId],
      modulesStarted: progress.modulesStarted.filter(id => id !== moduleId),
    };
    persist(updated);
  };

  const saveCardIndex = (moduleId, index) => {
    persist({
      ...progress,
      currentCardIndex: { ...progress.currentCardIndex, [moduleId]: index },
    });
  };

  const saveQuizScore = (moduleId, score, total) => {
    persist({
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [moduleId]: { score, total, completedAt: new Date().toISOString() },
      },
    });
  };

  const addChatMessage = (msg) => {
    const updated = {
      ...progress,
      chatHistory: [...progress.chatHistory, { ...msg, timestamp: new Date().toISOString() }],
    };
    persist(updated);
  };

  const clearChatHistory = () => {
    persist({ ...progress, chatHistory: [] });
  };

  const clearProgress = () => {
    persist(DEFAULT_PROGRESS);
  };

  const getModuleStatus = (moduleId) => {
    if (progress.completedModules.includes(moduleId)) return 'completed';
    if (progress.modulesStarted.includes(moduleId)) return 'in-progress';
    return 'not-started';
  };

  const getNextIncompleteModule = () => {
    for (let i = 1; i <= 8; i++) {
      if (!progress.completedModules.includes(i)) return i;
    }
    return 1; // All complete, go back to first
  };

  const getLevel = () => Math.floor(progress.completedModules.length / 2) + 1;

  const getAverageScore = () => {
    const scores = Object.values(progress.quizScores);
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, s) => sum + (s.score / s.total) * 100, 0);
    return Math.round(total / scores.length);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      markModuleStarted,
      markModuleCompleted,
      saveCardIndex,
      saveQuizScore,
      addChatMessage,
      clearChatHistory,
      clearProgress,
      getModuleStatus,
      getNextIncompleteModule,
      getLevel,
      getAverageScore,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
