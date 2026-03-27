import ReactMarkdown from 'react-markdown';
import SectionHeader from '@/components/SectionHeader';
import BackToHome from '@/components/BackToHome';
import styles from './Changelog.module.scss';
import '@/styles/markdown-content.scss';

interface ReleaseItem {
    version: string;
    date: string;
    content: string;
}

interface ChangelogProps {
    source: string;
}

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

const parseChangelog = (markdown: string): ReleaseItem[] => {
    const versions = markdown.split(/^## \[/m);
    versions.shift();

    return versions.map((block) => {
        const lines = block.split('\n');
        const header = lines[0];
        const content = lines.slice(1).join('\n').trim();
        const [versionPart, datePart] = header.split('] - ');

        return {
            version: versionPart,
            date: formatDate(datePart),
            content,
        };
    });
};

const Changelog = ({ source }: ChangelogProps) => {
    const releases = parseChangelog(source);

    const isLatest = (index: number): boolean => index === 0;

    const changelogHeader = (
        <header className={styles.Changelog__Header}>
            <SectionHeader
                title="Changelog"
                description="Track all updates and improvements to Zush"
                level="h1"
            />
        </header>
    );

    if (releases.length === 0) {
        return (
            <section className={styles.Changelog}>
                <div className={styles.Changelog__Container}>
                    {changelogHeader}
                    <div className={styles.Changelog__Error}>
                        Failed to parse changelog content.
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.Changelog}>
            <div className={styles.Changelog__Container}>
                {changelogHeader}

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

                <BackToHome className={styles.Changelog__BackLink} />
            </div>
        </section>
    );
};

export default Changelog;
