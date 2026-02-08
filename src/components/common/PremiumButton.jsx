import React from 'react';

const PremiumButton = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
    disabled = false,
    icon,
    fullWidth = false
}) => {
    const variants = {
        primary: 'bg-grad-primary text-white shadow-lg hover:shadow-xl',
        eco: 'bg-grad-eco text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30',
        tech: 'bg-grad-tech text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30',
        gold: 'bg-grad-gold text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30',
        alert: 'bg-grad-alert text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30',
        glass: 'bg-white/70 backdrop-blur-glass border border-white/50 text-slate-800 shadow-glass hover:shadow-glass-hover',
        outline: 'bg-transparent border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3 text-base'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl
        font-semibold
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
};

export default PremiumButton;
