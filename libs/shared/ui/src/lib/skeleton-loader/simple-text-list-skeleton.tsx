import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

export type SimpleTextListSkeletonProps = {
  rowCount: number;
};

const Container = styled.div`
  width: 100%;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  width: 100%;

  .MuiSkeleton-root {
    width: 100%;
  }
`;

export const SimpleTextListSkeleton = ({
  rowCount,
}: SimpleTextListSkeletonProps) => {
  return (
    <Container aria-label="Simple text list skeleton">
      {Array.from(Array(rowCount), (num, elementIndex) => (
        <SkeletonWrapper
          key={elementIndex}
          data-testid={`skeleton-${elementIndex}`}
        >
          <Skeleton animation="wave" />
        </SkeletonWrapper>
      ))}
    </Container>
  );
};
