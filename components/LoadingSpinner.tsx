import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-t-4 border-t-teal-500 border-slate-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
