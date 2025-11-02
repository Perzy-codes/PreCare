import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-block bg-teal-100 text-teal-800 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
        </svg>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-4">
        PreCare
      </h1>
      <p className="text-slate-600 mt-2">
        Your Digital Intake Assistant
      </p>
    </header>
  );
};

export default Header;