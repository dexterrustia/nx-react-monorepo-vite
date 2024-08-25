import { useState, useEffect } from 'react';

const DEFAULT_INTERVAL = 5000;

export type UseIntervalProps = {
  /** Function triggered every interval */
  callback: () => void | Promise<void>;
  /** Tells how often the `callback` should be triggered, defaults to 5 seconds */
  interval?: number;
};

export type UseIntervalReturn = Pick<UseIntervalProps, 'interval'> & {
  /** Resets the interval */
  resetInterval: () => void;
};

export const useInterval = ({
  callback,
  interval = DEFAULT_INTERVAL,
}: UseIntervalProps): UseIntervalReturn => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let windowInterval: number | undefined = undefined;
    if (isActive) {
      windowInterval = window.setInterval(async () => {
        await callback();
      }, interval);
    } else if (!isActive) {
      setIsActive(true);
      window.clearInterval(windowInterval);
    }
    return () => window.clearInterval(windowInterval);
  }, [isActive]);

  const resetInterval = () => {
    setIsActive(false);
  };

  return {
    resetInterval,
    interval,
  };
};

export default useInterval;
