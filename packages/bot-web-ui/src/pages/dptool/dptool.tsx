import React from 'react';
import styles from './dptool.module.scss';

const AiPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <iframe
                src="https://serene-marzipan-19f3d1.netlify.app/"
                title="AiPage"
                className={styles.iframe}
                loading="lazy"
            />
        </div>
    );
};

export default AiPage;
