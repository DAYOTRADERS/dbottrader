import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import './GlobalLoading.scss';

const DBotTraderLoading = () => {
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();
    const [marketData, setMarketData] = useState({
        btc: `$${(Math.random() * 2000 + 60000).toFixed(0)}`,
        eth: `$${(Math.random() * 200 + 3000).toFixed(0)}`,
        volume: `${(Math.random() * 5 + 2).toFixed(1)}B`,
    });

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 5;
            });
        }, 200);

        const marketInterval = setInterval(() => {
            setMarketData({
                btc: `$${(Math.random() * 2000 + 60000).toFixed(0)}`,
                eth: `$${(Math.random() * 200 + 3000).toFixed(0)}`,
                volume: `${(Math.random() * 5 + 2).toFixed(1)}B`,
            });
        }, 1000);

        controls.start('visible');

        return () => {
            clearInterval(progressInterval);
            clearInterval(marketInterval);
        };
    }, []);

    return (
        <div className='dbot-trader-loading'>
            {/* Main compact container */}
            <motion.div 
                className='loading-container'
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered 
                        ? '0 0 30px rgba(0, 255, 157, 0.3), 0 0 60px rgba(0, 200, 255, 0.2)'
                        : '0 0 20px rgba(0, 255, 157, 0.1)',
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated border glow */}
                <div className='border-glow'></div>
                
                {/* Header with logo and title */}
                <motion.div 
                    className='header'
                    initial={{ opacity: 0, y: -10 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 }
                        }
                    }}
                >
                    <div className='logo-container'>
                        <div className='logo-glow'></div>
                        <span className='logo-text'>🤖</span>
                    </div>
                    <div className='title-section'>
                        <h1 className='title'>dbottrader.com</h1>
                        <p className='subtitle'>AI Trading Platform</p>
                    </div>
                </motion.div>

                {/* Mini market data ticker */}
                <motion.div 
                    className='mini-ticker'
                    animate={{
                        background: isHovered 
                            ? 'linear-gradient(45deg, rgba(0,255,157,0.1), rgba(0,200,255,0.1))'
                            : 'rgba(255,255,255,0.05)',
                    }}
                >
                    {['BTC', 'ETH', 'VOL'].map((symbol, index) => (
                        <motion.div 
                            key={symbol}
                            className='ticker-item'
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <span className='symbol'>{symbol}</span>
                            <motion.span 
                                className='value'
                                key={marketData[symbol.toLowerCase()]}
                                initial={{ color: '#00ff9d' }}
                                animate={{ color: '#ffffff' }}
                                transition={{ duration: 0.5 }}
                            >
                                {marketData[symbol.toLowerCase()]}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Compact progress section */}
                <div className='compact-progress'>
                    <div className='progress-info'>
                        <span className='progress-text'>System Initialization</span>
                        <span className='progress-percent'>{Math.min(100, Math.round(progress))}%</span>
                    </div>
                    <div className='progress-track'>
                        <motion.div 
                            className='progress-fill'
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div 
                                className='progress-glow'
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* AI Bot Status Indicators */}
                <div className='bot-status'>
                    {['Analysis', 'Execution', 'Risk Mgmt', 'Data Feed'].map((module, index) => (
                        <motion.div 
                            key={module}
                            className='status-item'
                            animate={{
                                opacity: progress > (index * 25) ? 1 : 0.3,
                                scale: progress > (index * 25) ? 1.1 : 0.9,
                            }}
                            whileHover={{
                                scale: 1.2,
                                color: '#00ff9d',
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className='status-dot'></div>
                            <span>{module}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Floating AI particles */}
                <div className='ai-particles'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className='particle'
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Connection quality indicator */}
            <motion.div 
                className='connection-quality'
                animate={{
                    opacity: isHovered ? 1 : 0.7,
                }}
            >
                <div className='quality-bar'>
                    <motion.div 
                        className='quality-level'
                        animate={{
                            width: '85%',
                            background: 'linear-gradient(90deg, #00ff9d, #00c8ff)',
                        }}
                        whileHover={{
                            scaleX: 1.1,
                            transition: { duration: 0.3 }
                        }}
                    />
                </div>
                <span>AI Connection Quality</span>
            </motion.div>
        </div>
    );
};

export default DBotTraderLoading;