import React, { useState, FormEvent } from 'react';

interface DoctorLoginProps {
  onLogin: (success: boolean, doctorName?: string) => void;
  error: string | null;
  onBackToHome: () => void;
}

const DOCTOR_CREDENTIALS: { [email: string]: { password: string, name: string } } = {
  'drcarter@clinic.com': { password: 'password123', name: 'Dr. Emily Carter' },
  'dradams@clinic.com': { password: 'password123', name: 'Dr. Ben Adams' },
  'drdavis@clinic.com': { password: 'password123', name: 'Dr. Chloe Davis' },
};

const DoctorLogin: React.FC<DoctorLoginProps> = ({ onLogin, error, onBackToHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const doctor = DOCTOR_CREDENTIALS[email.toLowerCase()];
        if (doctor && doctor.password === password) {
            onLogin(true, doctor.name);
        } else {
            onLogin(false);
        }
    };

    const isFormValid = email && password;

    return (
        <div className="animate-fade-in text-center">
            <div className="inline-block bg-slate-100 text-slate-800 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mt-4">Doctor Sign In</h1>
            <p className="text-slate-600 mt-2 mb-8">Please enter your credentials to access the dashboard.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto text-left">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-600">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
                        placeholder="e.g., drcarter@clinic.com"
                    />
                </div>
                 <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-600">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
                        placeholder="password123"
                    />
                </div>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <div className="pt-4 space-y-3">
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={onBackToHome}
                        className="w-full flex justify-center py-2 px-4 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorLogin;