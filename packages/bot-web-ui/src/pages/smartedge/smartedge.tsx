import React from 'react';
import styles from './smartedge.module.scss';

const AiPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <iframe
                src="https://unrivaled-boba-44b870.netlify.app/"
                title="AiPage"
                className={styles.iframe}
                loading="lazy"
            />
        </div>
    );
};

export default AiPage;
