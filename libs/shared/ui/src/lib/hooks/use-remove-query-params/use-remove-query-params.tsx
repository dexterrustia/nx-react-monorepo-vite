import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

export type UseRemoveQueryParamsProps = {
  /**
   * Name of the first query key. Used to check if a query param removal is required. If not provided, the hook will always remove the query params.
   * Usage: `if (!router.query?.[queryKey]) return;]`
   */
  queryKey?: keyof ParsedUrlQuery;
  /** Shallow routing, defaults to `true` */
  shallow?: boolean;
};

/**
 * Removes query params from the URL by using the Next.js router replace method on mount.
 */
export const useRemoveQueryParams = ({
  queryKey,
  shallow = true,
}: UseRemoveQueryParamsProps = {}) => {
  const router = useRouter();

  useEffect(() => {
    if (queryKey && !router.query?.[queryKey]) return;

    const cleanUrl = router.asPath.split('?')[0];
    if (!cleanUrl) return;

    router.replace(cleanUrl, undefined, {
      shallow,
    });
  }, []);
};

export default useRemoveQueryParams;
