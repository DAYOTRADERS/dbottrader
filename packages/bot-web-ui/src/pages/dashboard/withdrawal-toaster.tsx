import React from 'react';
import classNames from 'classnames';
import './withdrawal-toaster.scss';

const NAMES = [
    'Ava', 'Liam', 'Noah', 'Emma', 'Olivia', 'Ethan', 'Mia', 'Sophia', 'Lucas', 'Amelia',
    'Elijah', 'Isabella', 'Mason', 'Charlotte', 'James', 'Harper', 'Benjamin', 'Evelyn', 'Henry', 'Luna',
];

const STRATEGIES = [
    'Breakout Pro',
    'Mean Reversion',
    'Momentum Edge',
    'Grid Alpha',
    'Scalper X',
    'Trend Rider',
    'Volatility Vault',
    'Range Sniper',
];

const randomFloat = (min: number, max: number, decimals = 2) => {
    const v = Math.random() * (max - min) + min;
    return parseFloat(v.toFixed(decimals));
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const useInterval = (cb: () => void, ms: number) => {
    const saved = React.useRef(cb);
    React.useEffect(() => { saved.current = cb; }, [cb]);
    React.useEffect(() => {
        const id = setInterval(() => saved.current(), ms);
        return () => clearInterval(id);
    }, [ms]);
};

const WithdrawalToaster: React.FC<{ className?: string }>= ({ className }) => {
    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const trigger = React.useCallback(() => {
        const name = pick(NAMES);
        const amount = randomFloat(50, 2500, 2);
        const strategy = pick(STRATEGIES);
        const msg = `${name} has withdrawn $${amount.toLocaleString()} using ${strategy}.`;
        setMessage(msg);
        setVisible(true);
        const t = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(t);
    }, []);

    // First appear soon after mount, then every 20s
    React.useEffect(() => {
        const cleanup = trigger();
        return cleanup;
    }, [trigger]);

    useInterval(() => {
        trigger();
    }, 10000);

    return (
        <div className={classNames('db-withdrawal-toaster', className, { 'db-withdrawal-toaster--visible': visible })} role="status" aria-live="polite">
            <div className='db-withdrawal-toaster__card' aria-hidden>
                <div className='db-withdrawal-toaster__glow' aria-hidden />
                <div className='db-withdrawal-toaster__icon' aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 7l-10 5 10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
                    </svg>
                </div>
                <div className='db-withdrawal-toaster__text'>{message}</div>
            </div>
        </div>
    );
};

export default WithdrawalToaster;
