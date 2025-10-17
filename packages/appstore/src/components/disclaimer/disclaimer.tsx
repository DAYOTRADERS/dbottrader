import React, { useState, useRef, useEffect } from 'react';
import { Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { useDevice } from '@deriv-com/ui';
import './disclaimer.scss';

const Disclaimer = () => {
    const { isDesktop, isMobile } = useDevice();
    const [isExpanded, setIsExpanded] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleDisclaimer = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDesktop) return;

        e.preventDefault();
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !isDesktop) return;

        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Ensure the container stays within viewport bounds
        if (!containerRef.current) return;
        const maxX = window.innerWidth - containerRef.current.offsetWidth;
        const maxY = window.innerHeight - containerRef.current.offsetHeight;

        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isMobile) return;

        const touch = e.touches[0];
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setDragOffset({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        });
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !isMobile) return;

        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;

        // Ensure the container stays within viewport bounds
        if (!containerRef.current) return;
        const maxX = window.innerWidth - containerRef.current.offsetWidth;
        const maxY = window.innerHeight - containerRef.current.offsetHeight;

        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Initialize position
    useEffect(() => {
        if (containerRef.current) {
            if (isMobile) {
                const containerWidth = containerRef.current.offsetWidth;
                setPosition({
                    x: window.innerWidth - containerWidth - 10,
                    y: window.innerHeight * 0.3
                });
            } else if (isDesktop) {
                // Position at bottom right on desktop
                const containerWidth = containerRef.current.offsetWidth;
                setPosition({
                    x: window.innerWidth - containerWidth - 10,
                    y: window.innerHeight - 80
                });
            }
        }
    }, [isMobile, isDesktop]);

    // Add/remove mouse event listeners for desktop dragging
    useEffect(() => {
        if (isDesktop) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDesktop, isDragging, dragOffset]);

    return (
        <div
            ref={containerRef}
            className={`disclaimer-container ${isMobile ? 'disclaimer-container--mobile' : 'disclaimer-container--desktop'} ${isDragging ? 'disclaimer-container--dragging' : ''}`}
            style={(isMobile || isDesktop) ? {
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease'
            } : {}}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className={`disclaimer-header ${isMobile ? 'disclaimer-header--mobile' : 'disclaimer-header--desktop'}`}
                onClick={toggleDisclaimer}
                onMouseDown={isDesktop ? handleMouseDown : undefined}
                data-testid='dt_disclaimer_header'
            >
                <Text size={isMobile ? 'xxxs' : 'xxs'} weight='bold'>
                    <Localize i18n_default_text='Risk Disclaimer' />
                </Text>
                {(isMobile || isDesktop) && (
                    <div className="disclaimer-drag-handle">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 6C15.5523 6 16 5.55228 16 5C16 4.44772 15.5523 4 15 4C14.4477 4 14 4.44772 14 5C14 5.55228 14.4477 6 15 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 20C15.5523 20 16 19.5523 16 19C16 18.4477 15.5523 18 15 18C14.4477 18 14 18.4477 14 19C14 19.5523 14.4477 20 15 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}
            </div>

            {isExpanded && (
                <div
                    data-testid='dt_traders_hub_disclaimer'
                    className={`disclaimer-content ${isMobile ? 'disclaimer-content--mobile' : 'disclaimer-content--desktop'}`}
                >
                    <Text align='left' className='disclaimer-text' size={isMobile ? 'xxxs' : 'xxs'}>
                        <Localize i18n_default_text='Deriv offers complex derivatives, such as options and contracts for difference ("CFDs"). These products may not be suitable for all clients, and trading them puts you at risk. Please make sure that you understand the following risks before trading Deriv products: a) you may lose some or all of the money you invest in the trade, b) if your trade involves currency conversion, exchange rates will affect your profit and loss. You should never trade with borrowed money or with money that you cannot afford to lose.' />
                    </Text>
                    {(isMobile || isDesktop) && (
                        <div className="disclaimer-close" onClick={() => setIsExpanded(false)}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Disclaimer;