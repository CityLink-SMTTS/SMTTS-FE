import React from 'react';

const GlassCard = ({
    children,
    className = '',
    hover = true,
    onClick,
    gradient = false,
    gradientType = 'eco'
}) => {
    const gradients = {
        eco: 'bg-grad-eco',
        tech: 'bg-grad-tech',
        gold: 'bg-grad-gold',
        primary: 'bg-grad-primary',
        alert: 'bg-grad-alert'
    };

    const baseClasses = gradient
        ? `${gradients[gradientType]} text-white`
        : 'bg-white/70 backdrop-blur-glass';

    const hoverClasses = hover
        ? 'hover:-translate-y-1 hover:shadow-glass-hover transition-all duration-300'
        : '';

    return (
        <div
            onClick={onClick}
            className={`
        ${baseClasses}
        rounded-2xl
        border border-white/50
        shadow-glass
        ${hoverClasses}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default GlassCard;
