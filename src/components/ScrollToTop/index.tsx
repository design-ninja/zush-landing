import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Delay to ensure DOM is rendered (especially with framer-motion)
            const timeout = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timeout);
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
