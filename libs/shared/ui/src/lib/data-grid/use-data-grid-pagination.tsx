import { useState } from 'react';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import type { GridSortModel } from '@mui/x-data-grid/models/gridSortModel';

export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 10;

type UseQueryKeysProp = Parameters<typeof useQuery>[0];

export type UseDataGridPaginationProps<TQuery, TVariables> = {
  /** The fetcher used to execute the query */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetcher: <TData, TVariables>(query: string) => () => Promise<TData>;
  /** Unique query key used internally by react-query for caching etc.. */
  keys: UseQueryKeysProp;
  /** The graphql query document */
  query: string;
  /** Set to override the variables */
  variables: TVariables;
  /** Initial sort model */
  initialSortModel?: GridSortModel;
  /** Options forwared to the useQuery hook */
  options?: UseQueryOptions<TQuery, Error> & {
    /** By default the `variables` are merged as a part of the query key. Set to `true` to override the behavior. */
    excludeVariablesFromKeys?: boolean;
  };
};

export const useDataGridPagination = <TQuery, TVariables>({
  fetcher,
  keys,
  query,
  variables,
  initialSortModel,
  options,
}: UseDataGridPaginationProps<TQuery, TVariables>) => {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortModel, setSortModel] = useState(initialSortModel);

  const mappedVariables = {
    page: pageNumber,
    size: pageSize,
    sortBy: sortModel?.[0]?.field,
    direction: sortModel?.[0]?.sort ?? 'desc',
    ...variables,
  };

  const mappedKeys = !options?.excludeVariablesFromKeys
    ? [...keys, mappedVariables]
    : keys;

  const queryResult = useQuery<TQuery, Error>(
    mappedKeys,
    // TODO: Investigate why bind throws TS error when passing two arguments
    // Docs stating it should be possible
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    fetcher<TQuery, TVariables>(query).bind(null, { ...mappedVariables }),
    options
  );

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    if (model.pageSize !== pageSize) {
      setPageSize(model.pageSize);
    }

    if (model.page !== pageNumber) {
      setPageNumber(model.page);
    }
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (model !== sortModel) {
      setSortModel(model);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== pageNumber) {
      setPageNumber(page);
    }
  };

  const handleFilterModelChange = () => {
    //TODO: Implement
    // https://mui.com/x/react-data-grid/filtering/server-side/
    throw new Error('Not implemented');
  };

  return {
    query: queryResult,
    dataGridProps: {
      loading: queryResult.isInitialLoading,
      refetching: queryResult.isRefetching,
      paginationModel: {
        page: pageNumber,
        pageSize,
      },
      sortModel,
      onPaginationModelChange: handlePaginationModelChange,
      onSortModelChange: handleSortModelChange,
      onFilterModelChange: handleFilterModelChange,
    },
    handlePageChange,
  };
};

export type UseDataGridPaginationReturn = ReturnType<
  typeof useDataGridPagination
>;
