import styled from '@emotion/styled';
import {
  Paper as MuiPaper,
  Divider as MuiDivider,
  Skeleton,
  Grid,
} from '@mui/material';

export type GridSkeletonProps = {
  /** The total count of cells */
  cellCount: number;
  /** The width of each cell, should be in a range of 1-12 */
  cellWidth: number;
  /** The height of each cell*/
  cellHeight: number;
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Divider = styled(MuiDivider)`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const Paper = styled(MuiPaper)`
  height: 100%;
  margin-right: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ParentGrid = styled(Grid)`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const ContentSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacing(Math.random() * (40 - 5) + 5)};
`;

export const GridSkeleton = ({
  cellCount,
  cellWidth,
  cellHeight,
}: GridSkeletonProps): JSX.Element => {
  return (
    <div aria-label="grid skeleton loader">
      <HeaderWrapper>
        <Skeleton height={80} width={300} animation="wave" />
        <Skeleton height={80} width={120} animation="wave" />
      </HeaderWrapper>
      <Divider />
      <ParentGrid container rowGap={4}>
        {Array.from(Array(cellCount), (num, cellIndex) => (
          <Grid item key={cellIndex} minHeight={cellHeight} xs={cellWidth}>
            <Paper aria-label={`cell skeleton ${cellIndex + 1}`}>
              {Array.from(Array(4), (num, contentIndex) => (
                <ContentSkeleton
                  aria-label={`content skeleton ${contentIndex + 1}`}
                  key={contentIndex}
                  height={36}
                />
              ))}
            </Paper>
          </Grid>
        ))}
      </ParentGrid>
    </div>
  );
};

export default GridSkeleton;
