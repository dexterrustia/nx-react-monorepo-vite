import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useState } from 'react';
import useEffectSkipInitial from '../use-effect-skipInitial';

export type UseQueryRequiredOptions = {
  key: string;
  query: string;
  fetcher: <TQuery>(query: string) => () => Promise<TQuery>;
};

export type UseQueryOnClickVariables<TVariables> = TVariables;

export type UseQueryOnClickOptions<TQuery> = UseQueryOptions<
  TQuery,
  Error,
  TQuery
>;

export type UseQueryOnClickReturn<TQuery, TVariables, TValue> = {
  /**
   * Triggers react query refecth function, and makes a request with the provided variables.
   *
   * @param variables Variables to use in the query.
   * @param value Custom value to return from the hook. Is reset onSettle.
   *
   */
  fetchOnClick: (variables: TVariables, value?: TValue) => void;
  /**
   * Custom value to return from the hook. Is set when passed in `fetchOnClick`. Is reset onSettle.
   */
  value: TValue | null;
} & UseQueryResult<TQuery, Error>;

/**
 * Hook that returns a function to trigger a query on click and the possibility to pass variables to the query.
 *
 * @param requiredOptions Options required for the hook to work.
 * @param options React query options.
 * @param initialVariables Initial variables to use in the query. Overwritten if variables are provided to `fetchOnClick`.
 * @returns `fetchOnClick` function to trigger the query, and `value` to return from the hook. Also returns the result of `useQuery`.
 */
export const useQueryOnClick = <TQuery, TVariables, TValue = unknown>(
  requiredOptions: UseQueryRequiredOptions,
  options?: UseQueryOnClickOptions<TQuery>,
  initialVariables?: UseQueryOnClickVariables<TVariables>
): UseQueryOnClickReturn<TQuery, TVariables, TValue> => {
  const [value, setValue] = useState<TValue | null>(null);

  const [variables, setVariables] = useState<TVariables | undefined>(
    initialVariables
  );

  const query = useQuery<TQuery, Error, TQuery>(
    [requiredOptions.key, variables],
    // TODO: Investigate why bind throws TS error when passing two arguments
    // Docs stating it should be possible
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    requiredOptions.fetcher<TQuery>(requiredOptions.query).bind(null, {
      ...variables,
    }),
    {
      enabled: false,
      onSettled: (data, error) => {
        if (options?.onSettled) {
          options.onSettled(data, error);
        }
        setValue(null);
        setVariables(undefined);
      },
      ...options,
    }
  );

  useEffectSkipInitial(() => {
    if (!variables) return;

    query.refetch();
  }, [variables]);

  const fetchOnClick = (variables: TVariables, value?: TValue) => {
    if (value) {
      setValue(value);
    }

    setVariables(variables);
  };

  return { fetchOnClick, value, ...query };
};

export default useQueryOnClick;
