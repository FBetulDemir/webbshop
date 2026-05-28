import { useCallback, useEffect, useRef, useState } from 'react';

const useReveal = ({ threshold = 0.12 } = {}) => {
    const [visible, setVisible] = useState(false);
    const observerRef = useRef(null);

    const ref = useCallback((el) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        if (!el) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observerRef.current?.disconnect();
                    observerRef.current = null;
                }
            },
            { threshold }
        );
        observerRef.current.observe(el);
    }, [threshold]);

    useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, []);

    return [ref, visible];
};

export default useReveal;
