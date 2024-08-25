import { useEffect } from 'react';
import { useRouter } from 'next/router';

type UseLeavePageProps = {
  callback: () => void;
};

/**
 * Triggers a callback on browser event `beforeunload`.
 */
export const useBeforeUnload = ({ callback }: UseLeavePageProps) => {
  const router = useRouter();

  useEffect(() => {
    const beforeLeave = async () => {
      await callback();
    };

    window.addEventListener('beforeunload', beforeLeave);

    return () => {
      window.removeEventListener('beforeunload', beforeLeave);
    };
  }, [router.pathname]);
};

export default useBeforeUnload;
