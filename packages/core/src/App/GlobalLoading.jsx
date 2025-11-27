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
        sol: `$${(Math.random() * 10 + 100).toFixed(0)}`,
        ada: `$${(Math.random() * 0.2 + 0.4).toFixed(2)}`,
    });

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 3;
            });
        }, 150);

        const marketInterval = setInterval(() => {
            setMarketData({
                btc: `$${(Math.random() * 2000 + 60000).toFixed(0)}`,
                eth: `$${(Math.random() * 200 + 3000).toFixed(0)}`,
                volume: `${(Math.random() * 5 + 2).toFixed(1)}B`,
                sol: `$${(Math.random() * 10 + 100).toFixed(0)}`,
                ada: `$${(Math.random() * 0.2 + 0.4).toFixed(2)}`,
            });
        }, 800);

        controls.start('visible');

        return () => {
            clearInterval(progressInterval);
            clearInterval(marketInterval);
        };
    }, []);

    // Generate stars for background
    const generateStars = (count) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.8 + 0.2,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4
        }));
    };

    const stars = generateStars(150);

    return (
        <div className='dbot-trader-loading-fullscreen'>
            {/* Animated Blue Stars Background */}
            <div className='stars-background'>
                {stars.map(star => (
                    <motion.div
                        key={star.id}
                        className='star'
                        style={{
                            width: star.size,
                            height: star.size,
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            opacity: star.opacity,
                        }}
                        animate={{
                            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                
                {/* Shooting stars */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={`shooting-${i}`}
                        className='shooting-star'
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 30}%`,
                        }}
                        animate={{
                            x: ['0vw', '100vw'],
                            y: ['0vh', '100vh'],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Galactic Nebula Overlay */}
            <div className='nebula-overlay'>
                <div className='nebula-1'></div>
                <div className='nebula-2'></div>
                <div className='nebula-3'></div>
            </div>

            {/* Main Content Container */}
            <motion.div 
                className='main-container'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {/* Header Section */}
                <motion.div 
                    className='header-section'
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <motion.div 
                        className='logo-main'
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className='logo-core'>🤖</div>
                        <div className='logo-orbits'>
                            <div className='orbit-1'></div>
                            <div className='orbit-2'></div>
                            <div className='orbit-3'></div>
                        </div>
                    </motion.div>
                    
                    <div className='title-main'>
                        <h1 className='main-title'>DBOTTRADER.COM</h1>
                        <p className='main-subtitle'>Advanced AI Trading Platform</p>
                    </div>
                </motion.div>

                {/* Central Dashboard */}
                <div className='dashboard-grid'>
                    {/* Left Panel - Market Data */}
                    <motion.div 
                        className='panel market-panel'
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 0 40px rgba(0, 200, 255, 0.3)"
                        }}
                    >
                        <div className='panel-header'>
                            <h3>Live Market Data</h3>
                            <div className='live-indicator'></div>
                        </div>
                        <div className='market-grid'>
                            {[
                                { symbol: 'BTC/USD', value: marketData.btc, change: '+2.3%' },
                                { symbol: 'ETH/USD', value: marketData.eth, change: '+1.7%' },
                                { symbol: 'SOL/USD', value: marketData.sol, change: '+5.2%' },
                                { symbol: 'ADA/USD', value: marketData.ada, change: '+0.8%' },
                                { symbol: '24H Volume', value: marketData.volume, change: '' },
                            ].map((item, index) => (
                                <motion.div 
                                    key={item.symbol}
                                    className='market-item'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + index * 0.1 }}
                                    whileHover={{ 
                                        backgroundColor: 'rgba(0, 255, 157, 0.1)',
                                        borderColor: 'rgba(0, 255, 157, 0.3)'
                                    }}
                                >
                                    <span className='symbol'>{item.symbol}</span>
                                    <div className='value-group'>
                                        <motion.span 
                                            className='value'
                                            key={item.value}
                                            initial={{ color: '#00ff9d' }}
                                            animate={{ color: '#ffffff' }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {item.value}
                                        </motion.span>
                                        {item.change && (
                                            <span className='change positive'>{item.change}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Center Panel - Progress & AI Status */}
                    <motion.div 
                        className='panel center-panel'
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 0 50px rgba(0, 255, 157, 0.4)"
                        }}
                    >
                        <div className='progress-main'>
                            <div className='progress-header'>
                                <h3>AI System Initialization</h3>
                                <span className='progress-percent'>{Math.min(100, Math.round(progress))}%</span>
                            </div>
                            
                            <div className='progress-track-main'>
                                <motion.div 
                                    className='progress-fill-main'
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className='progress-glow-main'></div>
                                </motion.div>
                            </div>

                            <div className='ai-modules'>
                                {[
                                    { name: 'Neural Analysis', icon: '🧠', progress: progress > 25 },
                                    { name: 'Risk Engine', icon: '🛡️', progress: progress > 50 },
                                    { name: 'Execution Core', icon: '⚡', progress: progress > 75 },
                                    { name: 'Data Stream', icon: '📡', progress: progress > 90 },
                                ].map((module, index) => (
                                    <motion.div 
                                        key={module.name}
                                        className='module-item'
                                        animate={{
                                            opacity: module.progress ? 1 : 0.3,
                                            scale: module.progress ? 1.1 : 0.9,
                                        }}
                                        whileHover={{
                                            scale: 1.2,
                                            color: '#00ff9d',
                                        }}
                                    >
                                        <span className='module-icon'>{module.icon}</span>
                                        <span className='module-name'>{module.name}</span>
                                        <motion.div 
                                            className='module-status'
                                            animate={{ 
                                                backgroundColor: module.progress ? '#00ff9d' : '#666',
                                                boxShadow: module.progress ? '0 0 15px #00ff9d' : 'none'
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Panel - Trading Bots */}
                    <motion.div 
                        className='panel bots-panel'
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 0 40px rgba(100, 150, 255, 0.3)"
                        }}
                    >
                        <div className='panel-header'>
                            <h3>Active Trading Bots</h3>
                            <div className='bots-count'>5/8</div>
                        </div>
                        <div className='bots-grid'>
                            {[
                                { name: 'Scalper Pro', status: 'Active', profit: '+2.4%' },
                                { name: 'Trend Hunter', status: 'Active', profit: '+1.8%' },
                                { name: 'Arbitrage AI', status: 'Analyzing', profit: '+0.6%' },
                                { name: 'Market Maker', status: 'Active', profit: '+1.2%' },
                                { name: 'Sentiment AI', status: 'Learning', profit: '+0.3%' },
                            ].map((bot, index) => (
                                <motion.div 
                                    key={bot.name}
                                    className='bot-card'
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2 + index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 10px 25px rgba(0, 255, 157, 0.2)"
                                    }}
                                >
                                    <div className='bot-header'>
                                        <span className='bot-name'>{bot.name}</span>
                                        <div className={`status ${bot.status.toLowerCase()}`}>
                                            {bot.status}
                                        </div>
                                    </div>
                                    <div className='bot-profit'>{bot.profit}</div>
                                    <div className='bot-graph'>
                                        <div className='graph-line'></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Status Bar */}
                <motion.div 
                    className='status-bar'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <div className='status-items'>
                        <div className='status-item'>
                            <div className='status-dot connected'></div>
                            <span>AI Network Connected</span>
                        </div>
                        <div className='status-item'>
                            <div className='status-dot secure'></div>
                            <span>Encryption Active</span>
                        </div>
                        <div className='status-item'>
                            <div className='status-dot data'></div>
                            <span>Real-time Data Feed</span>
                        </div>
                        <div className='status-item'>
                            <motion.div 
                                className='connection-strength'
                                animate={{
                                    background: `linear-gradient(90deg, #00ff9d ${progress}%, #333 ${progress}%)`
                                }}
                            />
                            <span>System Integrity: {Math.round(progress)}%</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating Particles */}
            <div className='floating-particles'>
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className='floating-particle'
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default DBotTraderLoading;