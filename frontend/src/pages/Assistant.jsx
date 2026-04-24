import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../lib/api';
import { useProgress } from '../context/ProgressContext';

const SUGGESTED_QUESTIONS = [
  "How do I register to vote?",
  "What is the Electoral College?",
  "How does ranked choice voting work?",
  "What's on my ballot besides candidates?",
  "What happens if I make a mistake on my ballot?",
  "When is the next election?",
];

const Assistant = () => {
  const { progress, addChatMessage, clearChatHistory } = useProgress();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    if (progress.chatHistory && progress.chatHistory.length > 0) {
      setMessages(progress.chatHistory);
    }
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMsg = { role: 'user', content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    addChatMessage(userMsg);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const data = await sendChatMessage(messageText, history);
      const assistantMsg = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, assistantMsg]);
      addChatMessage(assistantMsg);
    } catch (err) {
      const errMsg = { role: 'assistant', content: `I'm having trouble connecting right now. Please make sure the backend server is running on port 8080. Error: ${err.message}` };
      setMessages(prev => [...prev, errMsg]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  const handleClearChat = () => {
    setMessages([]);
    clearChatHistory();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-lexend flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            ElectIQ Assistant
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your non-partisan civic education guide</p>
        </div>
        {messages.length > 0 && (
          <button 
            onClick={handleClearChat}
            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Clear
          </button>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-white dark:bg-dark-surface border-2 border-border-tactile dark:border-dark-border p-4 mb-4 flex flex-col gap-4">
        {messages.length === 0 && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Ask me anything about elections!</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">I'm here to help you understand voting, registration, ballots, and more.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-4 py-2 bg-primary/5 dark:bg-primary/10 text-primary text-sm font-medium rounded-xl border border-primary/20 hover:bg-primary/15 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary text-white rounded-br-md'
                : 'bg-slate-100 dark:bg-dark-border text-slate-800 dark:text-slate-200 rounded-bl-md'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                  __html: msg.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/^[-•]\s/gm, '• ')
                }} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-dark-border px-5 py-4 rounded-2xl rounded-bl-md">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex gap-3 items-end">
        <button
          onClick={handleVoiceInput}
          className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all flex-shrink-0 ${
            listening 
              ? 'bg-red-100 border-red-300 text-red-600 animate-pulse' 
              : 'bg-white dark:bg-dark-surface border-border-tactile dark:border-dark-border text-slate-500 hover:text-primary hover:border-primary'
          }`}
          title="Voice input (Web Speech API)"
        >
          <span className="material-symbols-outlined">{listening ? 'mic' : 'mic_none'}</span>
        </button>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about elections, voting, registration..."
            rows={1}
            className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-tactile dark:border-dark-border bg-white dark:bg-dark-surface text-slate-800 dark:text-slate-200 font-medium resize-none focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="pressable-button w-12 h-12 !p-0 flex items-center justify-center flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-xl">send</span>
        </button>
      </div>
    </div>
  );
};

export default Assistant;
