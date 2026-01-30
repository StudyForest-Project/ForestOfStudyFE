import { useEffect } from 'react';

export const useClickOutside = (ref, isInputMode, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isInputMode && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isInputMode, callback]);
};

export const useEnterKey = (isInputMode, callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isInputMode && event.key === 'Enter') {
        callback();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInputMode, callback]);
};
