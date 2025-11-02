import React, { useState } from 'react';

interface SummaryDisplayProps {
  selfCareTips: string;
  onQuestionSubmit: (question: string) => void;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({
  selfCareTips,
  onQuestionSubmit,
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuestionSubmit(question);
  }

  return (
    <div className="animate-fade-in space-y-8">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-700">Thank You!</h2>
            <p className="text-slate-600 mt-2">Your summary is ready for the doctor. Here are some tips while you wait for your appointment.</p>
        </div>

      <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
        <h3 className="text-xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
          <span role="img" aria-label="leaf">🌿</span> Pre-Appointment Self-Care Tips
        </h3>
        <p className="text-teal-900 whitespace-pre-wrap text-sm leading-relaxed">{selfCareTips}</p>
      </div>

       <div className="bg-slate-100 p-6 rounded-lg border border-slate-200">
         <h3 className="text-xl font-semibold text-slate-800 mb-3">Ask a Question (Optional)</h3>
         <p className="text-slate-600 text-sm mb-4">If you have a specific question for the doctor, you can add it here.</p>
        <form onSubmit={handleSubmit}>
           <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
          />
          <div className="pt-4 mt-2">
              <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
              Submit and Finish Intake
              </button>
          </div>
        </form>
       </div>
    </div>
  );
};

export default SummaryDisplay;