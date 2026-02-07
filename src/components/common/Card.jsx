import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.15)] ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/50">
                    {title && <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0F2027] to-[#2C5364]">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
