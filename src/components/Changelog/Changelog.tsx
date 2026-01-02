import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import styles from './Changelog.module.scss';

interface ReleaseItem {
    version: string;
    shortVersion: string;
    date: string;
    description: string;
}

const Changelog = () => {
    const [releases, setReleases] = useState<ReleaseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppcast = async () => {
            try {
                const response = await fetch('/appcast.xml');
                if (!response.ok) {
                    throw new Error('Failed to fetch appcast');
                }
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                const items = xmlDoc.querySelectorAll('item');
                const parsedReleases: ReleaseItem[] = [];

                items.forEach((item) => {
                    const title = item.querySelector('title')?.textContent || '';
                    const description = item.querySelector('description')?.textContent || '';
                    const pubDate = item.querySelector('pubDate')?.textContent || '';
                    const shortVersion = item.querySelector('shortVersionString')?.textContent || 
                        title.replace('Version ', '');

                    parsedReleases.push({
                        version: title,
                        shortVersion,
                        date: formatDate(pubDate),
                        description: cleanDescription(description),
                    });
                });

                setReleases(parsedReleases);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchAppcast();
    }, []);

    const formatDate = (dateStr: string): string => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    const cleanDescription = (html: string): string => {
        return html.trim();
    };

    const isLatest = (index: number): boolean => index === 0;

    if (loading) {
        return (
            <section className={styles.Changelog}>
                <div className={styles.Changelog__Container}>
                    <div className={styles.Changelog__Loading}>Loading changelog...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.Changelog}>
                <div className={styles.Changelog__Container}>
                    <div className={styles.Changelog__Error}>
                        Failed to load changelog: {error}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.Changelog}>
            <div className={styles.Changelog__Container}>
                <header className={styles.Changelog__Header}>
                    <h1 className={styles.Changelog__Title}>Changelog</h1>
                    <p className={styles.Changelog__Subtitle}>
                        Track all updates and improvements to Zush
                    </p>
                </header>

                <div className={styles.Changelog__Timeline}>
                    {releases.map((release, index) => (
                        <article key={release.shortVersion} className={styles.Changelog__Item}>
                            <div className={styles.Changelog__ItemHeader}>
                                <h2 className={styles.Changelog__Version}>
                                    v{release.shortVersion}
                                </h2>
                                {isLatest(index) && (
                                    <span className={styles.Changelog__Badge}>Latest</span>
                                )}
                                <time className={styles.Changelog__Date}>{release.date}</time>
                            </div>
                            <div
                                className={styles.Changelog__Content}
                                dangerouslySetInnerHTML={{ __html: release.description }}
                            />
                        </article>
                    ))}
                </div>

                <div className={styles.Changelog__BackLink}>
                    <Link to="/">
                        <Button variant="secondary">Back to Home</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Changelog;
