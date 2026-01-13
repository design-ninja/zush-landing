import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import styles from './Changelog.module.scss';
import changelogPath from '@/content/changelog.md?url';

interface ReleaseItem {
    version: string;
    date: string;
    content: string;
}

const Changelog = () => {
    const [releases, setReleases] = useState<ReleaseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChangelog = async () => {
            try {
                const response = await fetch(changelogPath);
                if (!response.ok) {
                    throw new Error('Failed to fetch changelog');
                }
                const text = await response.text();
                const parsed = parseChangelog(text);
                setReleases(parsed);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchChangelog();
    }, []);

    const parseChangelog = (markdown: string): ReleaseItem[] => {
        // Split by version headers (## [X.X.X] - YYYY-MM-DD)
        const versions = markdown.split(/^## \[/m);
        // Remove the first part (header before first version)
        versions.shift();

        return versions.map(block => {
            const lines = block.split('\n');
            const header = lines[0]; // "0.2.0] - 2025-12-31"
            const content = lines.slice(1).join('\n').trim();

            const [versionPart, datePart] = header.split('] - ');
            
            return {
                version: versionPart,
                date: formatDate(datePart),
                content: content
            };
        });
    };

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
                    <SectionHeader
                        title="Changelog"
                        description="Track all updates and improvements to Zush"
                        level="h1"
                    />
                </header>

                <div className={styles.Changelog__Timeline}>
                    {releases.map((release, index) => (
                        <article key={release.version} className={styles.Changelog__Item}>
                            <div className={styles.Changelog__ItemHeader}>
                                <h2 className={styles.Changelog__Version}>
                                    v{release.version}
                                </h2>
                                {isLatest(index) && (
                                    <span className={styles.Changelog__Badge}>Latest</span>
                                )}
                                <time className={styles.Changelog__Date}>{release.date}</time>
                            </div>
                            <div className={styles.Changelog__Content}>
                                <ReactMarkdown>{release.content}</ReactMarkdown>
                            </div>
                        </article>
                    ))}
                </div>

                <Button as={Link} to="/" variant="ghost" className={styles.Changelog__BackLink}>
                    ← Back to Home
                </Button>
            </div>
        </section>
    );
};

export default Changelog;
