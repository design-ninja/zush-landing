import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const getScrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';

const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const nav = document.querySelector('nav');
    const navOffset = nav instanceof HTMLElement ? nav.offsetHeight : 0;
    const top = element.getBoundingClientRect().top + window.scrollY - navOffset - 8;

    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: getScrollBehavior() });
};

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            scrollToElement(decodeURIComponent(hash.slice(1)));
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: getScrollBehavior() });
        }
    }, [pathname, hash]);

    // Handle repeated clicks on the same hash.
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as Element).closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;

            const targetHash = href.slice(hashIndex);
            if (targetHash === window.location.hash) {
                e.preventDefault();
                scrollToElement(decodeURIComponent(targetHash.slice(1)));
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return null;
};

export default ScrollToTop;
