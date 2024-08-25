import { DataGridHeader } from './data-grid-header';
import DataGrid, { DataGridProps } from './data-grid';
import { GridFooter } from '@mui/x-data-grid/components';
import { DataGridRefetchProgress } from './data-grid-refetch-progress';
import useTranslation from 'next-translate/useTranslation';
import { UseDataGridSearchReturn } from './use-data-grid-search';
import styled from '@emotion/styled';
import { useScreenSizeCheck } from '../hooks/use-screen-size-check';
import { useDataGridLocale } from './use-data-grid-locale';
import { Box, BoxProps, LinearProgress } from '@mui/material';
import DataGridHeaderSearch from './data-grid-header-search';
import {
  getPersistedDataGridState,
  persistDataGridState,
} from './data-grid-utils';

export const DEFAULT_CLIENT_PAGE_SIZE = 10;

export type ClientPaginateDataGridProps = DataGridProps & {
  search?: UseDataGridSearchReturn;
  toolbarElement?: React.ReactNode;
  hidePageSizeOptions?: boolean;
  /**
   * The key to use when persisting the state of the data grid in local storage.
   * Recommended to use a unique key for each data grid to avoid conflicts.
   * Services like https://www.random.org/strings/?num=10&len=10&upperalpha=on&unique=on&format=html&rnd=new can be used to generate unique keys.
   * When not provided, the state of the data grid will not be persisted in local storage.
   */
  persistKey?: string;
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

/** A data grid component used to display data paginated on the client. Meaning all data should be fetched initially and the component visually paginates the data */
export const ClientPaginatedDataGrid = ({
  header,
  toolbarElement,
  refetching,
  search,
  hidePageSizeOptions,
  disableBorder,
  disableToolbar,
  persistKey,
  ...muiProps
}: ClientPaginateDataGridProps) => {
  const { t } = useTranslation();

  const dataGridlocale = useDataGridLocale();
  const { isPhoneUser } = useScreenSizeCheck();

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
        pageSizeOptions={!hidePageSizeOptions ? [10, 25, 50, 100] : [10]}
        slots={{
          loadingOverlay: LinearProgress,
          ...(header && {
            toolbar: () => (
              <>
                <DataGridHeader
                  title={header}
                  disableToolbar={disableToolbar}
                  disableTitlePadding={disableBorder}
                />
              </>
            ),
          }),
          footer: () => (
            <>
              <DataGridRefetchProgress
                visible={refetching}
                label={t('common:loading.refetching')}
              />
              <GridFooter />
            </>
          ),
        }}
        autoHeight
        paginationMode="client"
        sortingMode="client"
        localeText={dataGridlocale}
        disableColumnFilter={isPhoneUser}
        disableBorder={disableBorder}
        {...muiProps}
        onStateChange={(state, event, details) => {
          persistDataGridState(persistKey, state);
          muiProps.onStateChange?.(state, event, details);
        }}
        initialState={{
          ...(muiProps.initialState ?? {}),
          pagination: {
            ...(muiProps.initialState?.pagination ?? {}),
            paginationModel: {
              pageSize: DEFAULT_CLIENT_PAGE_SIZE,
              ...(muiProps.initialState?.pagination?.paginationModel ?? {}),
            },
          },
          ...getPersistedDataGridState(persistKey),
        }}
      />
    </Container>
  );
};

export default ClientPaginatedDataGrid;
