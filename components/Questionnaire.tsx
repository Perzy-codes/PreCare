import React, { useState, FormEvent, useEffect, useRef } from 'react';

interface QuestionnaireProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answer: string) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Reset answer and focus input when question changes
    setAnswer('');
    inputRef.current?.focus();
  }, [question]);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="text-sm text-slate-500 text-center mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>
      <p className="text-xl text-slate-800 font-medium mb-6 text-center">{question}</p>
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <textarea
          ref={inputRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm flex-grow text-slate-900"
          placeholder="Your answer here..."
        />
        <div className="pt-4 mt-4">
            <button
            type="submit"
            disabled={!answer.trim()}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
            Next Question
            </button>
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;