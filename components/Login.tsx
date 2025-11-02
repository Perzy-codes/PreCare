import React from 'react';

interface LoginProps {
  onLogin: (role: 'PATIENT' | 'DOCTOR') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="animate-fade-in text-center">
      <div className="inline-block bg-teal-100 text-teal-800 p-4 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
        </svg>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-4">
        Welcome to PreCare
      </h1>
      <p className="text-slate-600 mt-2 mb-8">
        Your appointment starts here.
      </p>
      <div className="space-y-4 max-w-xs mx-auto">
        <button
          onClick={() => onLogin('PATIENT')}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          I am a Patient
        </button>
        <button
          onClick={() => onLogin('DOCTOR')}
          className="w-full flex justify-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm text-base font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          I am a Doctor
        </button>
      </div>
    </div>
  );
};

export default Login;