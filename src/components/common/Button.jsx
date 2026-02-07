import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:-translate-y-0.5 active:translate-y-0";

  const variants = {
    primary: "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white focus:ring-[#2C5364]", // Metro Prime
    secondary: "bg-white/80 backdrop-blur text-slate-700 hover:bg-white border border-white/50 focus:ring-slate-400",
    outline: "border-2 border-slate-300 text-slate-600 hover:border-[#134E5E] hover:text-[#134E5E] bg-transparent focus:ring-slate-400",
    eco: "bg-gradient-to-br from-[#134E5E] to-[#71B280] text-white focus:ring-[#71B280]", // Sustainable City
    tech: "bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white focus:ring-[#00f2fe]", // NFC Pulse
    danger: "bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] text-white focus:ring-[#ff4b2b]", // Alert
    ghost: "hover:bg-white/20 text-slate-600 hover:text-slate-900 shadow-none hover:shadow-none",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs uppercase",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
