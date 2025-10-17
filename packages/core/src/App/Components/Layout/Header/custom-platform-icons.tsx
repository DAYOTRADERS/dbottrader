import React from 'react';
import './custom-platform-icons.scss';

export const CustomDerivTraderIcon = ({ width = 120, height = 25, className = '' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 120 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`custom-trader-icon ${className}`}
        >
            <defs>
                <linearGradient id="traderBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="traderAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="traderText" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <filter id="traderGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <radialGradient id="traderSparkle">
                    <stop offset="0%" stopColor="#ffffff" opacity="0.9"/>
                    <stop offset="100%" stopColor="#3b82f6" opacity="0"/>
                </radialGradient>
            </defs>
            
            {/* Background glow */}
            <ellipse cx="8" cy="12.5" rx="14" ry="8" fill="url(#traderSparkle)" opacity="0.2"/>
            
            {/* Modern chart icon with blue gradient */}
            <path
                d="M2 18L6 14L10 17L14 11L16 13"
                stroke="url(#traderBlue)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#traderGlow)"
            />
            
            {/* Chart nodes with blue gradient */}
            <circle cx="2" cy="18" r="2" fill="url(#traderAccent)" filter="url(#traderGlow)"/>
            <circle cx="6" cy="14" r="2" fill="url(#traderAccent)" filter="url(#traderGlow)"/>
            <circle cx="10" cy="17" r="2" fill="url(#traderAccent)" filter="url(#traderGlow)"/>
            <circle cx="14" cy="11" r="2" fill="url(#traderAccent)" filter="url(#traderGlow)"/>
            <circle cx="16" cy="13" r="1.5" fill="#ffffff" opacity="0.9"/>
            
            {/* Modern sparkles */}
            <path d="M15 7 L15.5 8.5 L17 9 L15.5 9.5 L15 11 L14.5 9.5 L13 9 L14.5 8.5 Z" 
                  fill="url(#traderAccent)" opacity="0.8"/>
            <path d="M4 9 L4.3 9.8 L5 10 L4.3 10.2 L4 11 L3.7 10.2 L3 10 L3.7 9.8 Z" 
                  fill="#60a5fa" opacity="0.7"/>
            
            {/* Modern text with blue gradient */}
            <text x="22" y="17" className="platform-text trader-text" style={{ opacity: 1, visibility: 'visible' }}>
                D TRADER
            </text>
        </svg>
    );
};

export const CustomDerivBotIcon = ({ width = 120, height = 25, className = '' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 120 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`custom-bot-icon ${className}`}
        >
            <defs>
                <linearGradient id="botBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="botAccent" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="botText" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <filter id="botGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <radialGradient id="botSparkle">
                    <stop offset="0%" stopColor="#ffffff" opacity="0.9"/>
                    <stop offset="100%" stopColor="#3b82f6" opacity="0"/>
                </radialGradient>
            </defs>
            
            {/* Background glow */}
            <ellipse cx="8" cy="13" rx="12" ry="7" fill="url(#botSparkle)" opacity="0.2"/>
            
            {/* Robot antenna with blue gradient */}
            <line x1="8" y1="6" x2="8" y2="9" stroke="url(#botBlue)" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="5" r="2" fill="url(#botAccent)" filter="url(#botGlow)"/>
            <path d="M8 4 L8.5 5 L9.5 5 L8.5 5.5 L9 6.5 L8 5.5 L7 6.5 L7.5 5.5 L6.5 5 L7.5 5 Z" 
                  fill="#ffffff" opacity="0.9"/>
            
            {/* Robot head with blue gradient */}
            <rect x="3" y="9" width="10" height="9" rx="2" fill="url(#botBlue)" filter="url(#botGlow)"/>
            
            {/* Modern shine on robot */}
            <rect x="4" y="10" width="8" height="1.5" rx="0.75" fill="url(#botAccent)" opacity="0.4"/>
            
            {/* Glowing eyes */}
            <circle cx="6" cy="13" r="1.8" fill="#00d4ff" opacity="0.95" filter="url(#botGlow)"/>
            <circle cx="10" cy="13" r="1.8" fill="#00d4ff" opacity="0.95" filter="url(#botGlow)"/>
            <circle cx="6" cy="13" r="0.8" fill="#ffffff"/>
            <circle cx="10" cy="13" r="0.8" fill="#ffffff"/>
            
            {/* Robot smile */}
            <rect x="5.5" y="15.5" width="5" height="1.5" rx="0.75" fill="url(#botAccent)" opacity="0.8"/>
            
            {/* Circuit lines */}
            <path d="M13 11 L15 11 M13 15 L15 15" 
                  stroke="url(#botBlue)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
            <circle cx="15" cy="11" r="0.8" fill="#3b82f6"/>
            <circle cx="15" cy="15" r="0.8" fill="#3b82f6"/>
            
            {/* Modern sparkle */}
            <path d="M14 7 L14.4 8 L15.4 8.3 L14.4 8.6 L14 9.6 L13.6 8.6 L12.6 8.3 L13.6 8 Z" 
                  fill="url(#botAccent)" opacity="0.8"/>
            
            {/* Modern text */}
            <text x="22" y="17" className="platform-text bot-text" style={{ opacity: 1, visibility: 'visible' }}>
                D BOT
            </text>
        </svg>
    );
};

// Compact versions for dropdown
export const CustomDerivTraderIconCompact = ({ width = 80, height = 24, className = '' }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`custom-trader-icon-compact ${className}`}>
            <defs>
                <linearGradient id="traderBlueC" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
            </defs>
            <path d="M2 16L6 12L10 15L14 9" stroke="url(#traderBlueC)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="2" cy="16" r="2" fill="#60a5fa"/>
            <circle cx="14" cy="9" r="2" fill="#60a5fa"/>
            <text x="20" y="16" className="platform-text-compact trader-text" fill="url(#traderBlueC)">TRADER</text>
        </svg>
    );
};

export const CustomDerivBotIconCompact = ({ width = 80, height = 24, className = '' }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`custom-bot-icon-compact ${className}`}>
            <defs>
                <linearGradient id="botBlueC" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
            </defs>
            <rect x="3" y="8" width="10" height="10" rx="2" fill="url(#botBlueC)"/>
            <circle cx="6" cy="12" r="1.5" fill="#00d4ff"/>
            <circle cx="10" cy="12" r="1.5" fill="#00d4ff"/>
            <rect x="5" y="15" width="6" height="1.5" rx="0.75" fill="#60a5fa" opacity="0.8"/>
            <circle cx="8" cy="6" r="1.5" fill="#3b82f6"/>
            <line x1="8" y1="7.5" x2="8" y2="8" stroke="url(#botBlueC)" strokeWidth="1.5"/>
            <text x="18" y="16" className="platform-text-compact bot-text" fill="url(#botBlueC)">BOT</text>
        </svg>
    );
};
