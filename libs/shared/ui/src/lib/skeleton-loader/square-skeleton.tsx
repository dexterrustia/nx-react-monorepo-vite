import styled from '@emotion/styled';
import { Skeleton, Divider as MuiDivider } from '@mui/material';

type SquareSkeletonProps = {
  /** The minimum height of the square */
  minHeight: number;
  /** The maximum width of the square */
  maxWidth?: number;
  /** Hides the title skeletons */
  disableTitle?: boolean;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled(MuiDivider)`
  margin-bottom: ${({ theme }) => theme.spacing(7)};
`;

const MainSkeleton = styled(Skeleton)`
  width: 100%;
  margin: auto;
`;

export const SquareSkeleton = ({
  minHeight,
  maxWidth,
  disableTitle,
}: SquareSkeletonProps): JSX.Element => {
  return (
    <Container aria-label="square skeleton loader">
      {!disableTitle && (
        <div aria-label="title skeleton">
          <Skeleton height={80} width={200} animation="wave" />
          <Divider />
        </div>
      )}
      <MainSkeleton
        height={minHeight}
        width={maxWidth || undefined}
        variant="rectangular"
      />
    </Container>
  );
};

export default SquareSkeleton;
