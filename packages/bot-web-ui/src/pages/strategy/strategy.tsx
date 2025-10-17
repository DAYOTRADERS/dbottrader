'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './strategy.module.scss';

const Strategy = () => {
    const [activeTab, setActiveTab] = useState('over-under');
    const [isAnimating, setIsAnimating] = useState(false);
    const [particlePositions, setParticlePositions] = useState<{ x: number, y: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create floating particles
        const particles = Array.from({ length: 15 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100
        }));
        setParticlePositions(particles);
    }, []);

    const handleTabChange = (tab: string) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveTab(tab);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {/* Animated background elements */}
            <div className={styles.animatedBackground}>
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className={styles.floatingParticle}
                        initial={{ x: `${pos.x}%`, y: `${pos.y}%`, opacity: 0 }}
                        animate={{
                            y: [`${pos.y}%`, `${pos.y - 10}%`, `${pos.y}%`],
                            opacity: [0, 0.7, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}

                <motion.div
                    className={styles.floatingOrb1}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className={styles.floatingOrb2}
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -15, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className={styles.contentWrapper}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={styles.titleContainer}
                >
                    <motion.h1
                        className={styles.title}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className={styles.titleGradient}>Deriv Trading Strategies</span>
                        <motion.div
                            className={styles.titleUnderline}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        Advanced techniques for successful trading
                    </motion.p>
                </motion.div>

                <motion.div
                    className={styles.tabContainer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {[
                        { id: 'over-under', label: 'Over/Under', icon: '📈' },
                        { id: 'even-odd', label: 'Even/Odd', icon: '🔢' },
                        { id: 'trends', label: 'Trend Analysis', icon: '📊' },
                        { id: 'matches', label: 'Matches', icon: '🎯' },
                        { id: 'high-low', label: 'High/Low', icon: '↕️' }
                    ].map((tab) => (
                        <motion.button
                            key={tab.id}
                            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => handleTabChange(tab.id)}
                            whileHover={{ y: -3, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={styles.tabIcon}>{tab.icon}</span>
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    className={styles.activeTabIndicator}
                                    layoutId="activeTabIndicator"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={styles.strategyContent}
                    >
                        {activeTab === 'over-under' && <OverUnderStrategy />}
                        {activeTab === 'even-odd' && <EvenOddStrategy />}
                        {activeTab === 'trends' && <TrendAnalysisStrategy />}
                        {activeTab === 'matches' && <MatchesStrategy />}
                        {activeTab === 'high-low' && <HighLowStrategy />}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    className={styles.disclaimer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className={styles.warningIcon}>
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                        >
                            ⚠️
                        </motion.div>
                    </div>
                    <p>
                        <strong>RISK DISCLAIMER:</strong> Trading financial derivatives involves significant risk. You can lose your entire investment. These strategies are based on statistical observations and historical patterns. There is no guarantee of future success. Always practice with a Demo Account first and never invest more than you can afford to lose.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

// Strategy Components
const OverUnderStrategy = () => {
    return (
        <div className={styles.strategySection}>
            <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Over/Under Trading Strategies
            </motion.h2>

            <div className={styles.strategyGrid}>
                <StrategyCard
                    title="Under 5 Strategy"
                    type="under"
                    conditions={[
                        "Digit 0 should be the most appearing number with green bar",
                        "Red bar to be either in digit 3 or 4",
                        "Digits above 5 to be below 10%",
                        "Wait for pointer to point at 2 or 3 digit above 5 then click under"
                    ]}
                    example="Example: If digits 7, 8, 9 appear less than 10%, and pointer hits 7 or 8, click UNDER"
                />

                <StrategyCard
                    title="Under 7 Strategy"
                    type="under"
                    conditions={[
                        "Red bar to be between 7 and 9",
                        "Green bar to be 0 and 4",
                        "Set number of ticks to be 1",
                        "Digits with 10% to be more than 3 but to be below 7",
                        "Wait for pointer to point digit with red bar then click under"
                    ]}
                />

                <StrategyCard
                    title="Over 6 Strategy"
                    type="over"
                    conditions={[
                        "Digit 0 should be 12% and above",
                        "Digit 0 should also have green bar",
                        "Digit 4 to have the red bar",
                        "Digit 1 and 2 to be less than 10%",
                        "Digit 3 to be above 10.5%",
                        "Wait for the pointer to point at digit with green bar then click over immediately"
                    ]}
                />

                <StrategyCard
                    title="Over 0 Strategy"
                    type="over"
                    conditions={[
                        "Digit 0 to be less than 10%",
                        "Both green and red bar to in digit above 0",
                        "Digit 0 should not be increasing or decreasing",
                        "Green bar to be at an even number",
                        "Red bar to be below green bar",
                        "Wait for pointer to point at digit 0 and make sure it is constant then click over"
                    ]}
                />
            </div>

            <motion.div
                className={styles.technicalSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h3>Technical Analysis for Over/Under</h3>
                <div className={styles.technicalGrid}>
                    <TechnicalCard
                        title="Strategy 1 (Short-Term)"
                        items={[
                            "Timeframe: 2 minutes",
                            "Indicators: Donchian Channel, CCI, MACD",
                            "Over 3: Look for red momentum candle/green retesting candle",
                            "Under 6: Look for green momentum candle/red retesting candle",
                            "Enter with 2:1 ratio (e.g., two over digits consecutively)"
                        ]}
                    />

                    <TechnicalCard
                        title="Strategy 2 (Long-Term)"
                        items={[
                            "Analyze on 15min timeframe, enter on 5min",
                            "No indicators - identify trends and support/resistance",
                            "Over trades in uptrend, Under trades in downtrend",
                            "Enter on momentum candle retracement"
                        ]}
                    />
                </div>
            </motion.div>
        </div>
    );
};

const EvenOddStrategy = () => {
    return (
        <div className={styles.strategySection}>
            <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Even/Odd Trading Strategies
            </motion.h2>

            <div className={styles.strategyGrid}>
                <StrategyCard
                    title="Strategy 1"
                    type="even"
                    conditions={[
                        "Use EMAs (20, 80, 100) to determine trend",
                        "Uptrend = Odd, Downtrend = Even",
                        "Use 2:1 digit ratio for entry",
                        "Even: Use red momentum or green retesting candle",
                        "Odd: Use green momentum or red retesting candle"
                    ]}
                />

                <StrategyCard
                    title="Strategy 2"
                    type="odd"
                    conditions={[
                        "Identify clear trend on 15min timeframe",
                        "Confirm with digit dominance on 5min chart",
                        "Enter after candle retests and makes three movements",
                        "For Even: Wait for candle to retest, then pull down thrice",
                        "For Odd: Wait for candle to retest, then pull up thrice"
                    ]}
                />
            </div>

            <div className={styles.importantNote}>
                <div className={styles.warningIcon}>ℹ️</div>
                <div>
                    <strong>IMPORTANT:</strong> Don't use extreme retesting candles (with long wicks). For risk management, stop after 3 consecutive losses.
                </div>
            </div>
        </div>
    );
};

const TrendAnalysisStrategy = () => {
    return (
        <div className={styles.strategySection}>
            <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Trend Analysis & Indicators
            </motion.h2>

            <div className={styles.indicatorGrid}>
                <IndicatorCard
                    title="Donchian Channel (DC)"
                    description="Used to determine the trend in the market"
                    items={[
                        "Candles above moving average = Uptrend = Consider Under trades",
                        "Candles below moving average = Downtrend = Consider Over trades"
                    ]}
                />

                <IndicatorCard
                    title="Commodity Channel Index (CCI)"
                    description="Used to check market stability"
                    items={[
                        "CCI on multiple bends = Unstable market",
                        "CCI on minimal bends = Good for trading",
                        "CCI pointing in one direction = Stable market"
                    ]}
                />

                <IndicatorCard
                    title="MACD"
                    description="Used to determine candle strength"
                    items={[
                        "Look for strong colored candles (not faded)",
                        "Should align with the candle forming on the chart",
                        "Green candle = Strong green MACD",
                        "Red candle = Strong red MACD"
                    ]}
                />
            </div>

            <motion.div
                className={styles.entrySection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h3>Entry Techniques</h3>
                <div className={styles.entryGrid}>
                    <EntryCard
                        title="Scale Entry"
                        content="Use 2:1 ratio - two winning digits consecutively or over-under-over pattern"
                    />

                    <EntryCard
                        title="Candle Movement Entry"
                        content="For momentum candles: Wait for slight retest, then enter when back on momentum. For retesting candles: Wait for momentum, then enter when back on retest"
                    />
                </div>
            </motion.div>
        </div>
    );
};

const MatchesStrategy = () => {
    return (
        <div className={styles.strategySection}>
            <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Matches Trading Strategy
            </motion.h2>

            <div className={styles.riskWarning}>
                <div className={styles.warningIcon}>⚠️</div>
                <p>This is the riskiest trade type but with the highest payout</p>
            </div>

            <div className={styles.strategyGrid}>
                <StrategyCard
                    title="Basic Strategy"
                    type="matches"
                    conditions={[
                        "Use a digit that appears in short intervals (max 3 digits between appearances)",
                        "Use 2:1 ratio once digit confirms short interval appearance at least thrice"
                    ]}
                />

                <StrategyCard
                    title="Sequence Strategy"
                    type="matches"
                    conditions={[
                        "Confirm prediction when digit appears with 2:3 ratio",
                        "Confirm appearance with 3 pairs",
                        "Run when first digit after decimal pairs with your prediction",
                        "Pair must appear as second digit within 3 ticks"
                    ]}
                />
            </div>
        </div>
    );
};

const HighLowStrategy = () => {
    return (
        <div className={styles.strategySection}>
            <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                High/Low Tick Strategy
            </motion.h2>

            <div className={styles.strategyGrid}>
                <StrategyCard
                    title="Low Tick Conditions"
                    type="low"
                    conditions={[
                        "Green momentum candle (max 2 wins)",
                        "Red retesting candle (max 1 win)",
                        "Enter on slight retest then rebound to momentum",
                        "For retesting: slight momentum thrice then rebound to retest"
                    ]}
                />

                <StrategyCard
                    title="High Tick Conditions"
                    type="high"
                    conditions={[
                        "Red momentum candle (max 2 wins)",
                        "Green retesting candle (max 1 win)",
                        "Enter on slight retest then rebound to momentum",
                        "For retesting: slight momentum thrice then rebound to retest"
                    ]}
                />

                <StrategyCard
                    title="Scale Entries"
                    type="scale"
                    conditions={[
                        "Low Tick: Use three consecutive under numbers (0-3)",
                        "High Tick: Use three consecutive over numbers (6-9)",
                        "Apply risk management - max 3 runs if all losses"
                    ]}
                />
            </div>
        </div>
    );
};

// Helper Components
type StrategyCardProps = {
    title: string;
    type: string;
    conditions: string[];
    example?: string;
};

const StrategyCard: React.FC<StrategyCardProps> = ({ title, type, conditions, example }) => {
    return (
        <motion.div
            className={`${styles.strategyCard} ${styles[type + 'Card']}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <motion.div
                    className={styles.cardIcon}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    {type === 'over' ? '⬆️' : type === 'under' ? '⬇️' : '📊'}
                </motion.div>
            </div>

            <div className={styles.conditions}>
                <h4>Conditions:</h4>
                <ul>
                    {conditions.map((condition, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            {condition}
                        </motion.li>
                    ))}
                </ul>
            </div>

            {example && (
                <motion.div
                    className={styles.example}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <h4>Example:</h4>
                    <p>{example}</p>
                </motion.div>
            )}
        </motion.div>
    );
};

const TechnicalCard: React.FC<{ title: string, items: string[] }> = ({ title, items }) => {
    return (
        <motion.div
            className={styles.technicalCard}
            whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
        >
            <h4>{title}</h4>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </motion.div>
    );
};

const IndicatorCard: React.FC<{ title: string, description: string, items: string[] }> = ({ title, description, items }) => {
    return (
        <motion.div
            className={styles.indicatorCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -3 }}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </motion.div>
    );
};

const EntryCard: React.FC<{ title: string, content: string }> = ({ title, content }) => {
    return (
        <motion.div
            className={styles.entryCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -3 }}
        >
            <h4>{title}</h4>
            <p>{content}</p>
        </motion.div>
    );
};

export default Strategy;