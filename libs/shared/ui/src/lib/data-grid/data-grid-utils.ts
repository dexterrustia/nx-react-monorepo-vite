import type { GridValueGetterParams } from './data-grid-types';

/**
 * Date comparator used to compare date strings in data grid as real dates.
 *
 * @param aDateStr First date
 * @param bDateStr Second date
 * @returns Number used to compare dates
 */
export const dataGridDateComparator = (
  aDateStr: string,
  bDateStr: string
): number => {
  const aDate = new Date(aDateStr);
  const bDate = new Date(bDateStr);
  return aDate.getTime() - bDate.getTime();
};

/**
 * Helper function to be used with Material-ui DataGrid `valueGetter` to more easily get correct value for column.
 * Takes a string with the nested value to look for, and the Material-ui DataGrid params.
 *
 * @param nestedValue String with nested value to return from object (e.g. deeply.nested.value)
 * @param params Parameter from Material-ui DataGrid
 * @returns The nested value if any, if not an empty string
 */
export const getNestedTableValue =
  (nestedValue: string) =>
  (params: Omit<GridValueGetterParams, 'api'>): string | number => {
    const value = nestedValue.split('.').reduce(
      (prev, key: string) => prev && prev[key],
      // FIXME: look into better type handling of dynamic, nested objects
      // which might open possibility to add overloads for correct return types as well
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params.row as any
    );
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }
    return value;
  };

const buildCompleteKey = (keyParam: string) =>
  `data-grid-state=${keyParam}` as const;

/**
 * Persists the state of the data grid to local storage.
 * @param key The key to use for the persisted state. This key should be unique for each data grid
 * @param state
 * @returns
 */
export const persistDataGridState = <TState>(
  keyParam: string | null | undefined,
  state: TState
) => {
  try {
    if (!keyParam) return;

    const completeKey = buildCompleteKey(keyParam);

    localStorage.setItem(completeKey, JSON.stringify(state));
  } catch (error) {
    console.error('Error persisting data grid state', error);
  }
};

/**
 * Gets the persisted state of the data grid from local storage.
 * @param keyParam The key
 */
export const getPersistedDataGridState = (
  keyParam: string | null | undefined
) => {
  try {
    if (!keyParam) return undefined;

    const completeKey = buildCompleteKey(keyParam);

    const persistedState = localStorage.getItem(completeKey);
    if (!persistedState) return undefined;

    return JSON.parse(persistedState);
  } catch (error) {
    console.error('Error getting persisted data grid state', error);
    return undefined;
  }
};

/**
 * Persists the continuation key to local storage for cosmos paginated items.
 * @param keyParam
 * @param continuationKey
 * @returns
 */
export const persistContinuationKey = (
  keyParam: string,
  continuationKey: string
) => {
  try {
    if (!keyParam) return;

    const completeKey = buildCompleteKey(keyParam);

    localStorage.setItem(completeKey, continuationKey);
  } catch (error) {
    console.error('Error persisting continuation key', error);
  }
};

/**
 * Gets the continuation key from local storage for cosmos paginated items.
 * @param keyParam
 * @returns
 */
export const getContinuationKey = (keyParam: string) => {
  try {
    if (!keyParam) return undefined;

    const completeKey = buildCompleteKey(keyParam);

    const continuationKey = localStorage.getItem(completeKey);
    if (!continuationKey) return undefined;

    return continuationKey;
  } catch (error) {
    console.error('Error getting continuation key', error);
    return undefined;
  }
};
