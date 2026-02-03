import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (hash) {
            // Delay to ensure DOM is rendered (especially with framer-motion)
            const timeout = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    });
                }
            }, 100);
            return () => clearTimeout(timeout);
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
