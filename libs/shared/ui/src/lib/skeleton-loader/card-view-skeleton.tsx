import styled from '@emotion/styled';
import { Divider, Paper as MuiPaper } from '@mui/material';
import { Skeleton } from '@mui/material';

type CardViewSkeletonProps = {
  /** Number of rows */
  rows: number;
  /** Number of columns */
  columns: number;
  /** Number of cards */
  cards: number;
};

const Paper = styled(MuiPaper)`
  padding: ${({ theme }) => theme.spacing(5)};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaperWrapper = styled.div<Omit<CardViewSkeletonProps, 'cards'>>`
  display: grid;
  grid-template-rows: ${({ rows }) => `repeat(${rows},1fr)`};
  grid-template-columns: ${({ columns }) => `repeat(${columns},1fr)`};
  row-gap: ${({ theme }) => theme.spacing(4)};
  column-gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  :nth-of-type(3) {
    margin-top: ${({ theme }) => theme.spacing(4)};
  }

  :last-child {
    margin: 0;
  }
`;

export const CardViewSkeleton = ({
  rows,
  columns,
  cards,
}: CardViewSkeletonProps): JSX.Element => {
  return (
    <div aria-label="card view skeleton loader">
      <Wrapper>
        <Skeleton height={60} width={250} />
        <Skeleton height={60} width={120} />
      </Wrapper>
      <PaperWrapper rows={rows} columns={columns}>
        {Array.from(Array(cards), (num, index) => (
          <Paper key={index} aria-label={`skeleton card ${index + 1}`}>
            <StyledSkeleton width={100} variant="rectangular" height={30} />
            <Divider />
            <StyledSkeleton width={100} variant="rectangular" height={20} />
            <StyledSkeleton width={200} variant="rectangular" height={20} />
            <StyledSkeleton width={300} variant="rectangular" height={20} />
            <StyledSkeleton width={400} variant="rectangular" height={20} />
            <StyledSkeleton width={300} variant="rectangular" height={20} />
          </Paper>
        ))}
      </PaperWrapper>
    </div>
  );
};

export default CardViewSkeleton;
