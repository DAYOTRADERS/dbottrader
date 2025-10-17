import React from 'react';
import classNames from 'classnames';
import './news-panel.scss';

// Simple rotating news panel with 5s interval and subtle animations
// In a real app, replace the static list with API-driven content.
const DEFAULT_NEWS: Array<{ id: string; title: string; summary: string; tag?: string; time?: string }> = [
    {
        id: 'n1',
        title: 'Stocks edge higher as earnings beat forecasts',
        summary: 'Equities climbed after several blue-chips topped expectations, lifting overall risk sentiment.',
        tag: 'Equities',
        time: 'Just now',
    },
    {
        id: 'n2',
        title: 'Oil steadies near weekly highs',
        summary: 'Crude prices held gains amid supply concerns and upbeat demand projections.',
        tag: 'Commodities',
        time: '2 min ago',
    },
    {
        id: 'n3',
        title: 'Dollar softens as yields dip',
        summary: 'Greenback eased with Treasury yields pulling back; traders await key data prints.',
        tag: 'FX',
        time: '5 min ago',
    },
    {
        id: 'n4',
        title: 'Gold holds above key support',
        summary: 'Safe-haven demand and weaker USD kept bullion supported near pivotal levels.',
        tag: 'Metals',
        time: '8 min ago',
    },
];

const useRotatingIndex = (length: number, intervalMs = 5000) => {
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        if (!length) return;
        const t = setInterval(() => {
            setIndex(prev => (prev + 1) % length);
        }, intervalMs);
        return () => clearInterval(t);
    }, [length, intervalMs]);
    return index;
};

const NewsPanel: React.FC<{
    items?: typeof DEFAULT_NEWS;
    className?: string;
}> = ({ items = DEFAULT_NEWS, className }) => {
    const active = useRotatingIndex(items.length, 5000);

    // Compute the latest 5 items window (newest first)
    const windowSize = Math.min(5, items.length);
    const windowItems = React.useMemo(() => {
        const arr: typeof items = [] as any;
        for (let k = windowSize - 1; k >= 0; k--) {
            const idx = (active - k + items.length) % items.length;
            arr.push(items[idx]);
        }
        return arr;
    }, [active, items, windowSize]);

    // Rerender key to retrigger list entrance animations
    const [seed, setSeed] = React.useState(0);
    React.useEffect(() => { setSeed(prev => prev + 1); }, [active]);

    return (
        <section className={classNames('db-news', className)} aria-label="Market news">
            <div className='db-news__header'>
                <div className='db-news__pulse' aria-hidden />
                <h3 className='db-news__title'>Market news</h3>
                <span className='db-news__hint'>Auto-updates every 5s</span>
            </div>

            <ul className='db-news__list' key={seed} role='list'>
                {windowItems.map((it, idx) => (
                    <li
                        key={it.id}
                        className='db-news__item'
                        style={{ ['--stagger' as any]: `${idx * 70}ms` }}
                        aria-label={`News ${idx + 1}: ${it.title}`}
                    >
                        <div className='db-news__card'>
                            <div className='db-news__badge'>{it.tag || 'Market'}</div>
                            <div className='db-news__content'>
                                <h4 className='db-news__headline'>{it.title}</h4>
                                <p className='db-news__summary'>{it.summary}</p>
                            </div>
                            <div className='db-news__meta'>{it.time}</div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className='db-news__dots' role='tablist' aria-label='News items'>
                {items.map((_, i) => (
                    <button
                        key={i}
                        className={classNames('db-news__dot', { 'db-news__dot--active': i === active })}
                        aria-selected={i === active}
                        aria-label={`Show news ${i + 1}`}
                        onClick={() => { /* placeholder for manual selection */ }}
                    />
                ))}
            </div>
        </section>
    );
};

export default NewsPanel;
