import React, { useEffect } from 'react';

const Search = () => {
  useEffect(() => {
    // Add the Google Custom Search script only once
    const scriptId = 'google-cse-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cse.google.com/cse.js?cx=e5574e623e4434205';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-primary mb-2 font-lexend flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-4xl">travel_explore</span>
          Civic Search
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Search trusted sources for election and civic information
        </p>
      </div>

      <div className="pressable-card p-6 min-h-[400px]">
        {/* The Google Custom Search element will render here */}
        <div className="gcse-search"></div>
      </div>
    </div>
  );
};

export default Search;
