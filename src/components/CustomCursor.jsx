import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Check if device supports hover (ignores touch devices)
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let frameId = 0;

        // Fast tracking of raw mouse position
        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // If the cursor is display:none, show it
            if (cursorRef.current && cursorRef.current.style.opacity === '0') {
                cursorRef.current.style.opacity = '1';
            }
        };

        // RAF loop for smooth interpolation (spring physics feel)
        const animate = () => {
            // Lerp (smooth follow factor of 0.15 for better snap without lag)
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            }

            frameId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        frameId = requestAnimationFrame(animate);

        // Watch for hovers directly via DOM to avoid React re-renders which cause lag during route transitions
        const handleMouseOver = (e) => {
            const target = e.target;
            if (!cursorRef.current) return;

            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                cursorRef.current.classList.add('hover');
            } else {
                cursorRef.current.classList.remove('hover');
            }
        };

        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{ opacity: 0 }}
        />
    );
};

export default CustomCursor;
