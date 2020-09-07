import { useEffect } from 'react';

const listeners = [];

const useUpdate = (cb, deps = []) => {
  useEffect(() => {
    if (typeof cb === 'function' && !listeners.includes(cb)) {
      listeners.push(cb);
    }

    return () => {
      if (listeners.includes(cb)) {
        listeners.splice(listeners.indexOf(cb), 1);
      }
    };
  }, [cb, ...deps]);
};

setInterval(() => listeners.forEach((listener) => listener()), 60000);

export default useUpdate;
