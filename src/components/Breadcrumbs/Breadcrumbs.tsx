import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav className={styles.Breadcrumbs} aria-label="Breadcrumb">
    <ol className={styles.Breadcrumbs__List}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className={styles.Breadcrumbs__Item}>
            {!isLast && item.href ? (
              <a href={item.href} className={styles.Breadcrumbs__Link}>
                {item.label}
              </a>
            ) : (
              <span className={styles.Breadcrumbs__Current} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className={styles.Breadcrumbs__Separator} aria-hidden="true">/</span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
