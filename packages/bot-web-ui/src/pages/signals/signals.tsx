import React from 'react';
import styles from './signals.module.scss';

const AiPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <iframe
                src="https://www.smartanalysistool.com/signal-center/"
                title="AiPage"
                className={styles.iframe}
                loading="lazy"
            />
        </div>
    );
};

export default AiPage;
