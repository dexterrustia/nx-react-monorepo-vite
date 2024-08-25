import { useState, useEffect } from 'react';

export type UseDebounceReturn<TValue> = {
  value: TValue;
  isWaiting: boolean;
};

//source: https://usehooks.com/useDebounce/
export const useDebounce = <T,>(
  value: T,
  delay: number
): UseDebounceReturn<T> => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(
    () => {
      setIsWaiting(true);
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        setIsWaiting(false);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return {
    value: debouncedValue,
    isWaiting,
  };
};

export default useDebounce;
