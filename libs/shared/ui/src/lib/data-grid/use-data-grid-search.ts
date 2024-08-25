import { useCallback, useState } from 'react';
import useDebounce from '../hooks/use-debounce';

type UseDataGridSearchProps = {
  defaultValue?: string;
};

export const DEFAULT_DATA_GRID_DEBOUNCE_TIME = 1000;
export const DEFAULT_VALID_SEARCH_LENGTH = 3;

export type UseDataGridSearchReturn = ReturnType<typeof useDataGridSearch>;

export const useDataGridSearch = ({
  defaultValue = '',
}: UseDataGridSearchProps = {}) => {
  const [value, setSearchValue] = useState(defaultValue);

  const { value: debouncedValue, isWaiting: debounceIsWaiting } = useDebounce(
    value,
    DEFAULT_DATA_GRID_DEBOUNCE_TIME
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const isValidSearch = debouncedValue.length >= DEFAULT_VALID_SEARCH_LENGTH;

  return {
    value,
    debouncedValue,
    debounceIsWaiting,
    isValidSearch,
    handleSearchChange,
  };
};
