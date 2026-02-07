import React from 'react';

const Input = ({ label, id, error, className = '', containerClassName = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-bold text-slate-700 tracking-wide ml-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 bg-white/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner
          ${error
            ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50/50'
            : 'border-slate-200 focus:ring-[#2C5364] focus:border-[#203A43]/50 hover:bg-white/80'
          }
          disabled:bg-slate-100/50 disabled:text-slate-400
          placeholder:text-slate-400 placeholder:font-light
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs font-bold text-red-500 ml-1 animate-pulse">{error}</span>}
    </div>
  );
};

export default Input;
