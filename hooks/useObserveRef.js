import { useRef, useCallback } from 'react';

const useObserveRef = (callback) => {
    const observer = useRef();

    const ref = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                callback();
            }
        });

        if (node) {
            observer.current.observe(node);
            console.log("create node");
        }
    });

    return ref
}

export default useObserveRef;