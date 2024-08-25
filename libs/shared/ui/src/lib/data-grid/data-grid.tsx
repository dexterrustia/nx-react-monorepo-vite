import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

// eslint-disable-next-line no-restricted-imports
import { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid';

// Decreasing bundle size by only importing the DataGrid component when needed
// This is a large and complex component, so it's worth the effort
const MuiDataGrid = dynamic(
  () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
  { ssr: false }
);

/** Imported in client-paginated-data-grid and server-paginated-data-grid */
export type DataGridProps = MuiDataGridProps & {
  header: string;
  refetching?: boolean;
  /** Removes the outer border and padding */
  disableBorder?: boolean;
  /** If `true`, the toolbar containing
   * `columnFilter`, `densitySelector`, and `export options` is disabled
   * @default false
   */
  disableToolbar?: boolean;
};

export const DataGrid = styled(
  ({
    disableBorder,
    ...muiProps
  }: MuiDataGridProps & { disableBorder?: boolean }) => (
    <MuiDataGrid {...muiProps} />
  )
)`
  &&& {
    background-color: ${({ theme }) => theme.palette.background.paper};
    padding: ${({ theme }) => `0 ${theme.spacing(2)}`};
    border: ${({ disableBorder }) => !!disableBorder && 'none'};
    padding: ${({ disableBorder }) => !!disableBorder && '0'};
  }
`;

export default DataGrid;
