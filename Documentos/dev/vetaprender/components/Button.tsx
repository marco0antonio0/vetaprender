import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200",
    outline: "border-2 border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 bg-white",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-200"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${width} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;