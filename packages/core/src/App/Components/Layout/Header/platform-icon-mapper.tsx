import React from 'react';
import { 
    CustomDerivTraderIcon, 
    CustomDerivBotIcon,
    CustomDerivTraderIconCompact,
    CustomDerivBotIconCompact 
} from './custom-platform-icons';

// New minimal glyphs for container-less switcher (elegant, lightweight)
const TraderGlyph: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 18, height = 18, className = '' }) => (
    <svg width={width} height={height} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden='true'>
        <polyline points='3,15 8,10 12,13 17,7 21,10' fill='none' stroke='#60a5fa' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
        <circle cx='3' cy='15' r='1.6' fill='#60a5fa'/>
        <circle cx='8' cy='10' r='1.6' fill='#60a5fa'/>
        <circle cx='12' cy='13' r='1.6' fill='#60a5fa'/>
        <circle cx='17' cy='7' r='1.6' fill='#60a5fa'/>
        <circle cx='21' cy='10' r='1.4' fill='#93c5fd'/>
    </svg>
);

const BotGlyph: React.FC<{ width?: number; height?: number; className?: string }> = ({ width = 18, height = 18, className = '' }) => (
    <svg width={width} height={height} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden='true'>
        <rect x='6' y='9' width='12' height='8' rx='2' fill='none' stroke='#60a5fa' strokeWidth='2'/>
        <circle cx='10' cy='13' r='1.5' fill='#22d3ee'/>
        <circle cx='14' cy='13' r='1.5' fill='#22d3ee'/>
        <line x1='12' y1='6' x2='12' y2='9' stroke='#60a5fa' strokeWidth='2' strokeLinecap='round'/>
        <circle cx='12' cy='5' r='1.5' fill='#93c5fd'/>
    </svg>
);

type PlatformIconProps = {
    icon: string;
    width?: number;
    height?: number;
    className?: string;
    description?: string;
    compact?: boolean;
};

export const PlatformIconMapper: React.FC<PlatformIconProps> = ({ 
    icon, 
    width = 120, 
    height = 25, 
    className = '',
    compact = false 
}) => {
    // Map icon names to custom icons
    const iconMap: { [key: string]: React.ReactElement } = {
        'IcRebrandingDerivTrader': compact ? (
            <CustomDerivTraderIconCompact width={width} height={height} className={className} />
        ) : (
            <CustomDerivTraderIcon width={width} height={height} className={className} />
        ),
        'IcRebrandingDerivBot': compact ? (
            <CustomDerivBotIconCompact width={width} height={height} className={className} />
        ) : (
            <CustomDerivBotIcon width={width} height={height} className={className} />
        ),
        // Minimal glyph alternatives (use when opting for sleeker icons)
        'GlyphDerivTrader': <TraderGlyph width={18} height={18} className={className} />,
        'GlyphDerivBot': <BotGlyph width={18} height={18} className={className} />,
    };

    // Return mapped icon or a minimal fallback
    return iconMap[icon] || (<span className={className}>{icon}</span>);
};

// Helper function to check if icon should use custom component
export const shouldUseCustomIcon = (iconName: string): boolean => {
    return iconName === 'IcRebrandingDerivTrader' || iconName === 'IcRebrandingDerivBot' || iconName === 'GlyphDerivTrader' || iconName === 'GlyphDerivBot';
};

export default PlatformIconMapper;

