import React, { useState, FormEvent } from 'react';

interface ComplaintInputProps {
  onSubmit: (complaint: string) => void;
}

const ComplaintInput: React.FC<ComplaintInputProps> = ({ onSubmit }) => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (complaint.trim()) {
      onSubmit(complaint.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-slate-700 mb-4 text-center">
        Main Issue
      </h2>
       <p className="text-center text-slate-600 mb-6">Please describe the main issue you’re visiting for today.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="e.g., stomach ache, back pain, sore throat..."
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
        />
        <div className="pt-4 mt-2">
            <button
            type="submit"
            disabled={!complaint.trim()}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
            Continue
            </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintInput;