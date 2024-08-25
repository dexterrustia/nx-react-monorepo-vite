import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

export type ContextMenuSkeletonLoaderProps = {
  topItems: number;
  centerItems: number;
  bottomItems: number;
};

const Container = styled.div`
  grid-row: 1 / span 3;

  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-top: 0;

  display: grid;
  grid-template-rows: auto auto auto;

  padding-right: ${({ theme }) => theme.spacing(5)};
`;

const TopItemsWrapper = styled.div``;

const CenterItemsWrapper = styled.div``;

const BottomItemsWrapper = styled.div`
  margin-top: auto;
`;

const IconLineWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .MuiSkeleton-root {
    :last-child {
      margin-left: ${({ theme }) => theme.spacing(7)};

      ${({ theme }) => theme.breakpoints.up('desktop')} {
        margin-left: ${({ theme }) => theme.spacing(5.5)};
      }
    }
  }

  margin-bottom: ${({ theme }) => theme.spacing(4)};

  & > div {
    // Circular icon skeleton
    & > span {
      height: ${({ theme }) => theme.spacing(7)};
      width: ${({ theme }) => theme.spacing(7)};

      ${({ theme }) => theme.breakpoints.up('desktop')} {
        height: ${({ theme }) => theme.spacing(10)};
        width: ${({ theme }) => theme.spacing(10)};
      }
    }
  }

  // Rectangular text skeleton
  & > span {
    width: 100%;

    height: ${({ theme }) => theme.spacing(4)};
    ${({ theme }) => theme.breakpoints.up('desktop')} {
      height: ${({ theme }) => theme.spacing(6)};
    }
  }
`;

export const ContextMenuSkeletonLoader = ({
  topItems,
  centerItems,
  bottomItems,
}: ContextMenuSkeletonLoaderProps): JSX.Element => {
  return (
    <Container aria-label="context menu skeleton loader">
      <TopItemsWrapper>
        {Array.from(Array(topItems), (num, index) => (
          <IconLineWrapper
            key={index}
            aria-label={`top item skeleton ${index + 1}`}
          >
            <div>
              <Skeleton variant="circular" />
            </div>
            <Skeleton variant="rectangular" animation="wave" />
          </IconLineWrapper>
        ))}
      </TopItemsWrapper>
      <CenterItemsWrapper>
        {Array.from(Array(centerItems), (num, index) => (
          <IconLineWrapper
            key={index}
            aria-label={`center item skeleton ${index + 1}`}
          >
            <div>
              <Skeleton variant="circular" />
            </div>
            <Skeleton variant="rectangular" animation="wave" />
          </IconLineWrapper>
        ))}
      </CenterItemsWrapper>
      <BottomItemsWrapper>
        {Array.from(Array(bottomItems), (num, index) => (
          <IconLineWrapper
            key={index}
            aria-label={`bottom item skeleton ${index + 1}`}
          >
            <div>
              <Skeleton variant="circular" />
            </div>
            <Skeleton variant="rectangular" animation="wave" />
          </IconLineWrapper>
        ))}
      </BottomItemsWrapper>
    </Container>
  );
};

export default ContextMenuSkeletonLoader;
