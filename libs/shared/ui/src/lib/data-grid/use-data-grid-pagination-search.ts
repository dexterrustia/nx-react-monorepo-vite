import { useMemo } from 'react';
import {
  UseDataGridPaginationProps,
  useDataGridPagination,
} from './use-data-grid-pagination';
import { UseDataGridSearchReturn } from './use-data-grid-search';

type UseDataGridPaginationSearchProps<
  TPaginatedQuery,
  TPaginatedVariables,
  TSearchQuery,
  TSearchVariables,
  TSearchResultQuery,
  TSearchResultVariables,
  TFactoryResult,
> = {
  /**
   * The default query to be used when there is no search
   */
  paginatedQueryProps: UseDataGridPaginationProps<
    TPaginatedQuery,
    TPaginatedVariables
  >;
  /**
   * The search query used to perform a global search
   */
  searchQueryProps: UseDataGridPaginationProps<
    TSearchQuery,
    TSearchVariables
  > & {
    dataGridSearch: UseDataGridSearchReturn;
  };
  /**
   * The query to be used to fetch the search results based on the `searchQuery`
   */
  searchResultQueryProps: Omit<
    UseDataGridPaginationProps<TSearchResultQuery, TSearchResultVariables>,
    'variables'
  > & {
    /**
     * The function to be used to get the variables for the search result query
     */
    getVariables: (searchQuery?: TSearchQuery) => TSearchResultVariables;
  };
  /**
   * The factory to be used to create the final result.
   * This factory will receive the `dataGridSearch`, the `paginatedQuery` and the `searchResultQuery` data.
   * Should be used to map between the `paginatedQuery` and `searchResultQuery`
   */
  factory: (
    dataGridSearch: UseDataGridSearchReturn,
    paginatedQuery?: TPaginatedQuery,
    searchResultQuery?: TSearchResultQuery
  ) => TFactoryResult;
};

export const useDataGridPaginationSearch = <
  TPaginatedQuery,
  TPaginatedVariables,
  TSearchQuery,
  TSearchVariables,
  TSearchResultQuery,
  TSearchResultVariables,
  TFactoryResult,
>({
  paginatedQueryProps,
  searchQueryProps,
  searchResultQueryProps,
  factory,
}: UseDataGridPaginationSearchProps<
  TPaginatedQuery,
  TPaginatedVariables,
  TSearchQuery,
  TSearchVariables,
  TSearchResultQuery,
  TSearchResultVariables,
  TFactoryResult
>) => {
  const { dataGridSearch } = searchQueryProps;

  const paginatedQuery = useDataGridPagination<
    TPaginatedQuery,
    TPaginatedVariables
  >({
    ...paginatedQueryProps,
    options: {
      ...paginatedQueryProps.options,
      enabled: !dataGridSearch.isValidSearch,
    },
  });

  const searchQuery = useDataGridPagination<TSearchQuery, TSearchVariables>({
    ...searchQueryProps,
    variables: {
      ...searchQueryProps.variables,
    },
    options: {
      ...searchQueryProps.options,
      enabled: dataGridSearch.isValidSearch,
    },
  });

  const searchResultQuery = useDataGridPagination<
    TSearchResultQuery,
    TSearchResultVariables
  >({
    ...searchResultQueryProps,
    options: {
      ...searchResultQueryProps.options,
      enabled: dataGridSearch.isValidSearch && searchQuery.query.isSuccess,
    },
    variables: searchResultQueryProps.getVariables(searchQuery.query.data),
  });

  const data = useMemo(
    () =>
      factory(
        dataGridSearch,
        paginatedQuery.query.data,
        searchResultQuery.query.data
      ),
    [dataGridSearch, paginatedQuery.query, searchResultQuery.query]
  );

  const dataGridProps = dataGridSearch.isValidSearch
    ? searchResultQuery.dataGridProps
    : paginatedQuery.dataGridProps;

  const isLoading =
    paginatedQuery.query.isInitialLoading ||
    searchQuery.query.isInitialLoading ||
    searchResultQuery.query.isInitialLoading;

  return {
    data,
    dataGridProps: {
      ...dataGridProps,
      isLoading: isLoading,
    },
  };
};
