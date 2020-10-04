import { useState, useRef, useEffect } from 'react';

const cleanupObserver = (observer) => {
  if (observer && observer.current && typeof observer.current.disconnect === 'function') {
    observer.current.disconnect();
    observer.current = null;
  }
};

const useIntersect = ({ root = null, rootMargin = '0px', threshold = 0 }) => {
  const [entry, updateEntry] = useState({});
  const node = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer && observer.current && typeof observer.current.disconnect === 'function') {
      observer.current.disconnect();
      observer.current = null;
    }

    if (node.current) {
      observer.current = new IntersectionObserver(([entry]) => updateEntry(entry), {
        root,
        rootMargin,
        threshold,
      });
      observer.current.observe(node.current);
    }
    return () => cleanupObserver(observer);
  }, [node.current, root, rootMargin, threshold]);

  return [node, entry];
};

export default useIntersect;
