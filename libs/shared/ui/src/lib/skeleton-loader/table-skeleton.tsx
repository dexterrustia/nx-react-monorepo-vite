import styled from '@emotion/styled';
import { Paper, Divider as MuiDivider, Skeleton } from '@mui/material';

type TableSkeletonProps = {
  /** Number of table skeletons */
  tables: number;
  /**Number of table rows */
  tablerows: number;
  /** Number of table columns */
  tablecolumns: number;
  /** Removes the header/title skeletons when `true` */
  disableHeader?: boolean;
  /** Removes the table header/title skeletons when `true` */
  disableTableHeader?: boolean;
};

const Container = styled.div`
  width: 100%;
`;

const Table = styled(Paper)`
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

const Row = styled.div`
  display: flex;
  height: ${({ theme }) => theme.spacing(25)};
  margin-top: ${({ theme }) => theme.spacing(1)};

  :first-of-type {
    margin-top: 0;
  }
`;

const Cell = styled.div`
  width: 100%;
  margin-left: ${({ theme }) => theme.spacing(1)};

  :first-of-type {
    margin-left: 0;
  }
`;

const TitleSkeleton = styled(Skeleton)``;

const TableTitleSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const CellSkeleton = styled(Skeleton)``;

const Divider = styled(MuiDivider)`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const TableSkeleton = ({
  tables,
  tablerows,
  tablecolumns,
  disableHeader,
  disableTableHeader,
}: TableSkeletonProps): JSX.Element => {
  return (
    <Container aria-label="tables skeleton loader">
      {!disableHeader && (
        <>
          <TitleSkeleton
            aria-label="title skeleton"
            height={80}
            width={300}
            animation="wave"
          />
          <Divider aria-label="title skeleton divider" />
        </>
      )}
      <div>
        {Array.from(Array(tables), (num, tableIndex) => (
          <div key={tableIndex}>
            {!disableTableHeader && (
              <TableTitleSkeleton
                aria-label={`table skeleton ${tableIndex + 1}`}
                height={40}
                variant="rectangular"
                width={240}
                animation="wave"
              />
            )}
            <Table>
              {Array.from(Array(tablerows), (num, rowIndex) => (
                <Row aria-label={`row skeleton ${rowIndex + 1}`} key={rowIndex}>
                  {Array.from(Array(tablecolumns), (num, cellIndex) => (
                    <Cell key={cellIndex}>
                      <CellSkeleton
                        aria-label={`cell skeleton ${cellIndex + 1} row ${
                          rowIndex + 1
                        }`}
                        height={100}
                        variant="rectangular"
                      />
                    </Cell>
                  ))}
                </Row>
              ))}
            </Table>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TableSkeleton;
