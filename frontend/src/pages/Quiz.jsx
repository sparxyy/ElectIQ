import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { QUIZ_DATA } from '../lib/quizData';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../components/Toast';

const Quiz = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore } = useProgress();
  const { showToast } = useToast();

  const mId = parseInt(moduleId) || 1;
  const quizModule = QUIZ_DATA[mId];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (!quizModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="material-symbols-outlined text-6xl text-slate-300">error</span>
        <h2 className="text-xl font-bold text-slate-600 dark:text-slate-300">Quiz not found</h2>
        <Link to="/dashboard" className="pressable-button px-6 py-3">Back to Dashboard</Link>
      </div>
    );
  }

  const questions = quizModule.questions;
  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const nextModuleId = mId < 8 ? mId + 1 : null;

  const handleSelect = (optionLetter) => {
    if (answered) return;
    setSelected(optionLetter);
  };

  const handleConfirm = () => {
    if (!selected) return;
    const isCorrect = selected === question.correct;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setAnswered(true);
    setAnswers([...answers, { questionId: question.id, selected, correct: question.correct, isCorrect }]);
  };

  const handleNext = () => {
    if (isLast) {
      // Finish quiz
      const finalScore = score;
      saveQuizScore(mId, finalScore, questions.length);
      setFinished(true);
      if (finalScore >= questions.length * 0.8) {
        showToast(`Outstanding! You scored ${finalScore}/${questions.length} 🌟`, 'success');
      } else if (finalScore >= questions.length * 0.5) {
        showToast(`Good effort! ${finalScore}/${questions.length} 📚`, 'info');
      } else {
        showToast(`Keep studying! ${finalScore}/${questions.length}`, 'info');
      }
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  // Results screen
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="pressable-card p-12 flex flex-col items-center gap-6">
          <div className="w-28 h-28 relative mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-slate-600" />
              <circle 
                cx="50" cy="50" r="42" fill="none" 
                stroke={percentage >= 80 ? '#A8D5BA' : percentage >= 50 ? '#F9C784' : '#F4A7B9'} 
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 264} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{percentage}%</span>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">
            {percentage >= 80 ? '🎉 Excellent!' : percentage >= 50 ? '👍 Good Effort!' : '📖 Keep Learning!'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{questions.length}</span> on <span className="font-bold">{quizModule.moduleTitle}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <button onClick={handleRetry} className="pressable-button-secondary flex-1 py-4 font-bold">
              Retry Quiz 🔄
            </button>
            {nextModuleId ? (
              <Link to={`/learn/${nextModuleId}`} className="pressable-button flex-1 py-4 text-center font-bold">
                Next Module →
              </Link>
            ) : (
              <Link to="/dashboard" className="pressable-button flex-1 py-4 text-center font-bold">
                Back to Dashboard
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
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest">QUIZ</span>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Module {mId}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-lexend">{quizModule.moduleTitle}</h1>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2 bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Q{currentQ + 1}/{questions.length}</span>
      </div>

      {/* Question card */}
      <div className="pressable-card p-8 mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-snug">{question.question}</h2>

        <div className="flex flex-col gap-3">
          {question.options.map((opt) => {
            const letter = opt.charAt(0);
            const isSelected = selected === letter;
            const isCorrect = answered && letter === question.correct;
            const isWrong = answered && isSelected && letter !== question.correct;

            return (
              <button
                key={letter}
                onClick={() => handleSelect(letter)}
                disabled={answered}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-800 dark:text-green-300'
                    : isWrong
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-800 dark:text-red-300'
                    : isSelected
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-white dark:bg-dark-bg border-border-tactile dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-border'
                } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border-2 flex-shrink-0 ${
                    isCorrect ? 'bg-green-400 text-white border-green-500' :
                    isWrong ? 'bg-red-400 text-white border-red-500' :
                    isSelected ? 'bg-primary text-white border-primary' :
                    'bg-slate-100 dark:bg-dark-border text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
                  }`}>
                    {isCorrect ? '✓' : isWrong ? '✗' : letter}
                  </span>
                  <span>{opt.substring(3)}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className={`mt-6 p-4 rounded-xl border-2 ${
            selected === question.correct 
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
              : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
          }`}>
            <p className="text-sm font-bold mb-1 text-slate-700 dark:text-slate-300">
              {selected === question.correct ? '✅ Correct!' : '📖 Explanation:'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Score: <span className="font-bold text-primary">{score}</span>/{currentQ + (answered ? 1 : 0)}
        </div>
        {!answered ? (
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="pressable-button px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button onClick={handleNext} className="pressable-button px-6 py-3 flex items-center gap-2">
            {isLast ? 'See Results' : 'Next Question'}
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
