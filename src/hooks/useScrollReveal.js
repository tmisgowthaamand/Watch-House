import { useEffect, useRef } from 'react';

/**
 * Global scroll-reveal animation system using IntersectionObserver.
 * GPU-accelerated, no layout thrashing, performant at 60fps.
 * 
 * Supports:
 *  - .reveal        → fade up on scroll
 *  - .reveal-left   → slide in from left
 *  - .reveal-right  → slide in from right
 *  - .reveal-scale  → scale up from 0.92
 *  - .reveal-stagger → stagger children with incremental delays
 *  - data-delay="200" → custom delay in ms
 */
const useScrollReveal = () => {
    const observerRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.08,
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || 0;

                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, Number(delay));

                    observer.unobserve(el);
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, options);

        const observeElements = () => {
            const selectors = '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed), .reveal-stagger';
            const elements = document.querySelectorAll(selectors);
            elements.forEach((el) => {
                if (el.classList.contains('reveal-stagger')) {
                    const children = el.children;
                    Array.from(children).forEach((child, i) => {
                        if (!child.classList.contains('revealed')) {
                            child.classList.add('reveal');
                            child.dataset.delay = String(i * 100);
                            observerRef.current.observe(child);
                        }
                    });
                }
                observerRef.current.observe(el);
            });
        };

        observeElements();

        let debounceTimer;
        const mutationObserver = new MutationObserver((mutations) => {
            let shouldReObserve = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    shouldReObserve = true;
                    break;
                }
            }
            if (shouldReObserve) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(observeElements, 200);
            }
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
            mutationObserver.disconnect();
        };
    }, []);
};

export default useScrollReveal;
