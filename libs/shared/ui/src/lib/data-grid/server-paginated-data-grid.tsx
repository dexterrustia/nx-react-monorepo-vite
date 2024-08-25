import { DataGridHeader } from './data-grid-header';
import DataGrid, { DataGridProps } from './data-grid';
import { DataGridRefetchProgress } from './data-grid-refetch-progress';
import useTranslation from 'next-translate/useTranslation';
import { UseDataGridSearchReturn } from './use-data-grid-search';
import styled from '@emotion/styled';
import { useDataGridLocale } from './use-data-grid-locale';
import { GridFooter } from '@mui/x-data-grid/components';
import LinearProgress from '@mui/material/LinearProgress';
import DataGridHeaderSearch from './data-grid-header-search';
import { BoxProps, Box } from '@mui/system';
import { useLayoutEffect } from 'react';
import {
  getPersistedDataGridState,
  persistDataGridState,
} from './data-grid-utils';
import { useScreenSizeCheck } from '../hooks/use-screen-size-check';

export type ServerPaginatedDataGridProps = DataGridProps & {
  search?: UseDataGridSearchReturn;
  toolbarElement?: React.ReactNode;
  hidePageSizeOptions?: boolean;
  csvFilename?: string;
  /**
   * The key to use when persisting the state of the data grid in local storage.
   * Recommended to use a unique key for each data grid to avoid conflicts.
   * Services like https://www.random.org/strings/?num=10&len=10&upperalpha=on&unique=on&format=html&rnd=new can be used to generate unique keys.
   * When not provided, the state of the data grid will not be persisted in local storage.
   */
  persistKey?: string;
  continuationToken?: string | null | undefined;
};

const Container = styled.div`
  position: relative;
`;

const Actions = styled(
  ({ hasChildren, ...props }: BoxProps & { hasChildren?: boolean }) => (
    <Box {...props} />
  )
)`
  display: flex;
  margin-top: ${(props) => (props.hasChildren ? 'auto' : 'none')};
  margin-bottom: ${(props) =>
    props.hasChildren ? props.theme.spacing(1.25) : 'none'};

  @media only screen and (max-width: 768px) {
    margin-bottom: ${(props) => props.theme.spacing(3)};
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};

  position: absolute;
  right: ${({ theme }) => theme.spacing(34)};
  top: ${({ theme }) => theme.spacing(2)};
  z-index: ${({ theme }) => theme.zIndex.drawer - 1};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    right: ${({ theme }) => theme.spacing(10)};
    top: ${({ theme }) => theme.spacing(5)};
  }
`;

/** A data grid component used to display data paginated on a server. Meaning data is lazy loaded from the server for each page. */
export const ServerPaginatedDataGrid = ({
  header,
  refetching,
  search,
  toolbarElement,
  disableToolbar,
  hidePageSizeOptions,
  disableBorder,
  csvFilename,
  persistKey,
  continuationToken,
  ...muiProps
}: ServerPaginatedDataGridProps) => {
  const { t } = useTranslation();

  const dataGridlocale = useDataGridLocale();
  const { isPhoneUser } = useScreenSizeCheck();

  useLayoutEffect(() => {
    if (!persistKey) return;

    // Overriding som initial states
    // This is done manually as these states lives in use-data-grid-pagination.ts a level above passed in props
    // All other states are still handled internally by the data grid itself, therefore we can just pass the initial state below as props in the JSX.

    const persistedState = getPersistedDataGridState(persistKey);

    const persistedSortState = persistedState?.sorting?.sortModel;

    if (persistedSortState) {
      muiProps.onSortModelChange?.(persistedSortState, {});
    }

    const persistedPageState = persistedState?.pagination?.paginationModel;

    if (persistedPageState) {
      muiProps.onPaginationModelChange?.(persistedPageState, {});
    }
  }, [persistKey]);

  return (
    <Container>
      <ActionWrapper>
        {toolbarElement && (
          <Actions hasChildren={toolbarElement ? true : false}>
            {toolbarElement ? toolbarElement : null}
          </Actions>
        )}
        {search && <DataGridHeaderSearch {...search} />}
      </ActionWrapper>
      <DataGrid
        slots={{
          loadingOverlay: LinearProgress,
          ...(!!header && {
            toolbar: () => (
              <DataGridHeader
                title={header}
                disableToolbar={disableToolbar}
                disableTitlePadding={disableBorder}
                csvFilename={csvFilename}
              />
            ),
          }),
          footer: () => (
            <>
              <DataGridRefetchProgress
                label={t('common:loading.refetching')}
                visible={refetching}
              />
              <GridFooter />
            </>
          ),
        }}
        pageSizeOptions={!hidePageSizeOptions ? [10, 25, 50, 100] : [10]}
        autoHeight
        paginationMode="server"
        sortingMode="server"
        localeText={dataGridlocale}
        disableBorder={disableBorder}
        disableColumnFilter={isPhoneUser}
        {...muiProps}
        onStateChange={(state, event, details) => {
          const stateObject = continuationToken
            ? { ...state, continuationToken: continuationToken }
            : state;

          persistDataGridState(persistKey, stateObject);
          muiProps.onStateChange?.(state, event, details);
        }}
        initialState={{
          ...muiProps.initialState,
          ...getPersistedDataGridState(persistKey),
        }}
        rowCount={muiProps.rowCount ?? 0}
      />
    </Container>
  );
};

export default ServerPaginatedDataGrid;
