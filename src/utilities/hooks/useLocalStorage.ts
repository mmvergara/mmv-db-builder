import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  }, [key, state]);

  return { s: state, sS: setState };
};

export default useLocalStorage;
