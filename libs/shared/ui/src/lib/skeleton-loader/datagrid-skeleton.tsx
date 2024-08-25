import { Paper as MuiPaper } from '@mui/material';
import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

const Paper = styled(MuiPaper)`
  padding: ${({ theme }) => theme.spacing(5)};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSkeleton = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export const DataGridSkeleton = (): JSX.Element => {
  return (
    <div aria-label="data grid skeleton loader">
      <Wrapper>
        <Skeleton height={60} width={250} />
        <Skeleton height={60} width={120} />
      </Wrapper>

      <Paper elevation={0} variant="outlined">
        <Wrapper>
          <Skeleton height={50} width={200} />
          <Skeleton height={50} width={100} />
        </Wrapper>
        <StyledSkeleton variant="rectangular" height={50} />
        <StyledSkeleton variant="rectangular" height={50} />
        <StyledSkeleton variant="rectangular" height={50} />
      </Paper>
    </div>
  );
};

export default DataGridSkeleton;
