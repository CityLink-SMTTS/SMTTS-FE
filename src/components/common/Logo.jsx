import React from 'react';
import SMTTSLogo from '../../assets/SMTTS_Logo_High_Resolution.png';

const Logo = ({ className = "h-20 w-auto", showText = true }) => {
    // Extract height/width classes to apply specifically to the image
    // This helps prevent conflicts where the container gets the height and clips the content
    const sizeClasses = className.match(/[hw]-\w+/g)?.join(' ') || "h-20 w-auto";
    const containerClasses = className.replace(/[hw]-\w+/g, '').trim();

    return (
        <div className={`flex items-center gap-4 ${containerClasses}`}>
            <img
                src={SMTTSLogo}
                alt="SMTTS Logo"
                className={`${sizeClasses} object-contain`}
            />

            {showText && (
                <div className="flex flex-col justify-center text-left">
                    <h1 className="text-4xl font-black tracking-tighter text-[#1E293B] leading-none">
                        SMTTS
                    </h1>
                    <div className="text-[10px] font-bold tracking-widest text-[#64748B] mt-1 leading-none uppercase">
                        Smart Multi-Modal
                        <br />
                        Transport System
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logo;
