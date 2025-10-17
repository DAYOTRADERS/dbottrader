import React from 'react';
import styles from './CopyTradingPage.module.scss';

const AiPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <iframe
                src="https://copytradingdemoreal.netlify.app/"
                title="AiPage"
                className={styles.iframe}
                loading="lazy"
            />
        </div>
    );
};

export default AiPage;