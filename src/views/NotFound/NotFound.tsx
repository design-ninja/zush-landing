import React from 'react';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import BackToHome from '@/components/BackToHome';
import { DEFAULT_LOCALE, getLocalizedPath, type Locale } from '@/i18n/config';
import { getServicePageCopy, type NotFoundCopy } from '@/i18n/servicePages';
import styles from './NotFound.module.scss';

interface NotFoundProps {
    locale?: Locale;
    copy?: NotFoundCopy;
    backToHomeLabel?: string;
    homeHref?: string;
}

const defaultServiceCopy = getServicePageCopy(DEFAULT_LOCALE);

const NotFound: React.FC<NotFoundProps> = ({
    locale = DEFAULT_LOCALE,
    copy = defaultServiceCopy.notFound,
    backToHomeLabel = defaultServiceCopy.backToHome,
    homeHref,
}) => {
    const resolvedHomeHref = homeHref ?? getLocalizedPath('/', locale);

    return (
        <div className={styles.NotFound}>
            
            <div className={styles.NotFound__Content}>
                <div className={styles.NotFound__Scanner}></div>
                <Heading as="h1" align="center" className={styles.NotFound__Title}>404</Heading>
                <Heading as="h2" align="center" className={styles.NotFound__Subtitle}>{copy.title}</Heading>
                <Text as="p" size="lg" color="subtle" align="center" className={styles.NotFound__Text}>
                    {copy.text}
                </Text>
                <BackToHome href={resolvedHomeHref} label={backToHomeLabel} className={styles.NotFound__BackLink} />
            </div>
        </div>
    );
};

export default NotFound;
