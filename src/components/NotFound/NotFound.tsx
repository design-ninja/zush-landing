import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
    return (
        <div className={styles.NotFound}>
            <div className={styles.NotFound__Background}>
                <img src="/images/cat.jpg" alt="Scan element" className={styles.NotFound__Image} />
                <img src="/images/city.jpg" alt="Scan element" className={styles.NotFound__Image} />
                <img src="/images/mountain.jpg" alt="Scan element" className={styles.NotFound__Image} />
                <img src="/images/coffee.jpg" alt="Scan element" className={styles.NotFound__Image} />
            </div>
            
            <div className={styles.NotFound__Content}>
                <div className={styles.NotFound__Scanner}></div>
                <h1 className={styles.NotFound__Title}>404</h1>
                <h2 className={styles.NotFound__Subtitle}>Scan Error</h2>
                <p className={styles.NotFound__Text}>
                    Our AI couldn't find the page you're looking for. <br />
                    It might have been moved, renamed, or never existed in the first place.
                </p>
                <Button as={Link} to="/" variant="ghost" className={styles.NotFound__BackLink}>
                    ← Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
