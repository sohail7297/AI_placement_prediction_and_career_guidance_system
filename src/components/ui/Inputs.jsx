import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-slate-300 font-medium font-heading text-xs tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-white font-sans text-sm
          placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20
          transition-all duration-200
          ${error ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' : ''}
        `}
        {...props}
      />
      {error && <span className="text-red-400 text-xs mt-0.5">{error}</span>}
    </div>
  );
};

export const Select = ({
  label,
  id,
  options = [], // [{value, label}] or strings
  value,
  onChange,
  placeholder = 'Select option',
  error,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-slate-300 font-medium font-heading text-xs tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-white font-sans text-sm
            appearance-none cursor-pointer focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20
            transition-all duration-200
            ${error ? 'border-red-500/70 focus:border-red-500' : ''}
          `}
          {...props}
        >
          {placeholder && <option value="" disabled className="bg-slate-900 text-slate-500">{placeholder}</option>}
          {options.map((opt, idx) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={val} className="bg-slate-950 text-white">
                {text}
              </option>
            );
          })}
        </select>
        
        {/* Dropdown Chevron Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="text-red-400 text-xs mt-0.5">{error}</span>}
    </div>
  );
};

export const Checkbox = ({
  label,
  id,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none text-sm text-slate-300 font-sans ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
      />
      <div className="w-5 h-5 rounded border border-slate-800 bg-slate-900/50 flex items-center justify-center peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all focus-within:ring-2 focus-within:ring-cyan-500/20">
        <svg className="w-3.5 h-3.5 text-black font-bold hidden peer-checked:block" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {label}
    </label>
  );
};
