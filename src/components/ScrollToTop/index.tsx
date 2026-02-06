import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const getHashTarget = () => {
            if (!hash.startsWith('#')) {
                return null;
            }

            const id = decodeURIComponent(hash.slice(1));
            return document.getElementById(id);
        };

        const scrollToHashTarget = (behavior: ScrollBehavior): boolean => {
            const element = getHashTarget();
            if (!element) {
                return false;
            }

            const nav = document.querySelector('nav');
            const navOffset = nav instanceof HTMLElement ? nav.offsetHeight : 0;
            const top = element.getBoundingClientRect().top + window.scrollY - navOffset - 8;

            window.scrollTo({
                top: Math.max(0, top),
                left: 0,
                behavior,
            });

            return true;
        };

        if (hash) {
            let attempts = 0;
            let retryTimer: number | null = null;
            let correctionTimer: number | null = null;

            const scrollAndCorrect = () => {
                const didScroll = scrollToHashTarget(
                    prefersReducedMotion ? 'auto' : 'smooth'
                );

                if (didScroll) {
                    // One extra correction after layout settles (lazy sections / images).
                    correctionTimer = window.setTimeout(() => {
                        scrollToHashTarget('auto');
                    }, 450);

                    return;
                }

                retryTimer = window.setTimeout(() => {
                    attempts += 1;
                    if (attempts < 30) {
                        scrollAndCorrect();
                    }
                }, 80);
            };

            scrollAndCorrect();

            return () => {
                if (retryTimer !== null) {
                    window.clearTimeout(retryTimer);
                }
                if (correctionTimer !== null) {
                    window.clearTimeout(correctionTimer);
                }
            };
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
