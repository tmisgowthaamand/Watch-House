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
        // Disconnect previous observer on re-renders
        if (observerRef.current) observerRef.current.disconnect();

        const options = {
            root: null,
            rootMargin: '0px 0px -60px 0px', // trigger 60px before entering viewport
            threshold: 0.08, // 8% visible triggers animation
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || 0;

                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, Number(delay));

                    observerRef.current?.unobserve(el); // animate only once
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, options);

        // Observe all revealable elements
        const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger';
        const elements = document.querySelectorAll(selectors);
        elements.forEach((el) => observerRef.current.observe(el));

        // For stagger containers, tag children with incremental delays
        const staggerContainers = document.querySelectorAll('.reveal-stagger');
        staggerContainers.forEach((container) => {
            const children = container.children;
            Array.from(children).forEach((child, i) => {
                child.classList.add('reveal');
                child.dataset.delay = String(i * 100); // 100ms stagger per child
                observerRef.current.observe(child);
            });
        });

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    });
};

export default useScrollReveal;
