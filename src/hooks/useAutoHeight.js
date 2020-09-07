import { useEffect, useRef } from 'react';

const useAutoHeight = (deps = []) => {
  const textareaEl = useRef(null);

  // textarea 높이 자동 조절
  useEffect(() => {
    textareaEl.current.style.height = 'auto';
    textareaEl.current.style.height = textareaEl.current.scrollHeight + 'px';
  }, deps);

  return textareaEl;
};

export default useAutoHeight;
