import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
    return (
        <div className={styles.NotFound}>
            
            <div className={styles.NotFound__Content}>
                <div className={styles.NotFound__Scanner}></div>
                <Heading as="h1" align="center" className={styles.NotFound__Title}>404</Heading>
                <Heading as="h2" align="center" className={styles.NotFound__Subtitle}>Scan Error</Heading>
                <Text as="p" size="lg" color="subtle" align="center" className={styles.NotFound__Text}>
                    Our AI couldn't find the page you're looking for. <br />
                    It might have been moved, renamed, or never existed in the first place.
                </Text>
                <Button as={Link} to="/" variant="ghost" className={styles.NotFound__BackLink}>
                    ← Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;

