import React from 'react';
import { useState } from 'react';
import styles from './riskManagementCalculator.module.scss';

const RiskManagementCalculator = () => {
    const [capital, setCapital] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);

    const calculateResults = () => {
        if (!capital || isNaN(Number(capital)) || Number(capital) <= 0) return;
        setIsCalculated(true);
    };

    const resetCalculator = () => {
        setCapital('');
        setIsCalculated(false);
    };

    const appendNumber = (num: number | string) => {
        setCapital((prev) => (prev === '0' ? num.toString() : (prev || '') + num.toString()));
    };

    const deleteLast = () => {
        setCapital((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
    };

    return (
        <div className={styles.container}>
            {/* Background elements */}
            <div className={styles.backgroundCircle1}></div>
            <div className={styles.backgroundCircle2}></div>

            <div className={styles.mainContent}>
                <h1 className={styles.title}>
                    Risk Management Calculator
                    <div className={styles.titleUnderline}></div>
                </h1>

                <div className={styles.contentWrapper}>
                    {/* Input Column */}
                    <div className={styles.inputColumn}>
                        <label className={styles.label}>
                            Enter Your Capital ($)
                        </label>
                        <div className={styles.display}>
                            {capital ? `$${capital}` : '$0'}
                        </div>

                        {/* Keypad */}
                        <div className={styles.keypad}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => (item === '⌫' ? deleteLast() : appendNumber(item))}
                                    className={`${styles.keypadButton} ${typeof item === 'number' || item === '.'
                                        ? styles.numberButton
                                        : styles.deleteButton
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                onClick={calculateResults}
                                className={styles.calculateButton}
                            >
                                Calculate Risk
                            </button>
                            <button
                                onClick={resetCalculator}
                                className={styles.resetButton}
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className={styles.resultsColumn}>
                        <h2 className={styles.resultsTitle}>
                            Risk Management Plan
                        </h2>

                        <div className={styles.resultsGrid}>
                            <ResultCard
                                title="Stake Amount"
                                value={isCalculated ? `$${(Number(capital) * 0.1).toFixed(2)}` : '$0.00'}
                                color="#4A5FB3"
                                icon="💰"
                            />
                            <ResultCard
                                title="Take Profit"
                                value={isCalculated ? `$${(Number(capital) * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#4BB4B3"
                                icon="🎯"
                            />
                            <ResultCard
                                title="Stop Loss"
                                value={isCalculated ? `$${(Number(capital) * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#FF444F"
                                icon="🛑"
                            />
                            <ResultCard
                                title="Loss Protection"
                                value="3 Trades"
                                color="#A18CD1"
                                icon="🛡️"
                            />
                        </div>

                        <div className={styles.warningBox}>
                            <div className={styles.warningTitle}>
                                <span>⚠️</span> Martingale Sequence (x2)
                            </div>
                            <div className={styles.warningContent}>
                                {isCalculated
                                    ? `${(Number(capital) * 0.02).toFixed(2)} → ${(Number(capital) * 0.04).toFixed(2)} → ${(Number(capital) * 0.08).toFixed(2)}`
                                    : 'Enter amount to calculate'}
                            </div>
                        </div>

                        <div className={styles.infoBox}>
                            <div className={styles.infoTitle}>
                                <span>💼</span> Required Capital Buffer
                            </div>
                            <div className={styles.infoValue}>
                                {isCalculated ? `$${(Number(capital) * 0.02 * 7).toFixed(2)}` : '$0.00'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type ResultCardProps = {
    title: string;
    value: string;
    color: string;
    icon: React.ReactNode;
};

const ResultCard = ({ title, value, color, icon }: ResultCardProps) => {
    const rgb = hexToRgb(color);
    return (
        <div style={{
            backgroundColor: `rgba(${rgb},0.1)`,
            padding: '1rem',
            borderRadius: '10px',
            borderLeft: `4px solid ${color}`,
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                color: '#E2E8F0',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
            }}>
                <span>{icon}</span> {title}
            </div>
            <div style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#FFFFFF'
            }}>
                {value}
            </div>
        </div>
    );
};

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

export default RiskManagementCalculator;