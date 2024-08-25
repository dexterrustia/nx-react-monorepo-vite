import { Skeleton as MuiSkeleton } from '@mui/material';
import { SkeletonProps as MuiSkeletonProps } from '@mui/lab';
import styled from '@emotion/styled';

type DefaultSkeletonProps = {
  rows: number;
  rowHeight: number;
  widthDifference: number;
  spacing: number;
};

type SkeletonProps = MuiSkeletonProps & {
  widthPercent: number;
  spacing: number;
};

const Skeleton = styled(
  ({ widthPercent, spacing, ...props }: SkeletonProps) => (
    <MuiSkeleton {...props} />
  )
)`
  max-width: 100%;

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    max-width: ${({ widthPercent }) => `${widthPercent}%`};
  }

  border-radius: ${({ theme }) => theme.spacing(1)};

  margin-bottom: ${({ theme, spacing }) => theme.spacing(spacing)};
`;

export const DefaultSkeleton = ({
  rows,
  rowHeight,
  spacing,
  widthDifference,
}: DefaultSkeletonProps): JSX.Element => {
  let widthPercent = 100;

  return (
    <div aria-label="default skeleton loader">
      {Array.from(Array(rows), (num, index) => {
        if (index !== 0) {
          widthPercent = widthPercent - widthDifference;
        }
        return (
          <Skeleton
            key={index}
            aria-label={`skeleton row ${index + 1}`}
            height={rowHeight}
            variant="rectangular"
            widthPercent={widthPercent}
            animation="wave"
            spacing={spacing}
          />
        );
      }).reverse()}
    </div>
  );
};

export default DefaultSkeleton;
