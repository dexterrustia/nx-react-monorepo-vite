import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

type ContainerProps = {
  paddingLeft: number;
  paddingRight: number;
};

type ChartSkeletonProps = ContainerProps & {
  height: number;
  disableControls?: boolean;
};

const Wrapper = styled.div`
  position: relative;
  z-index: 1000;
`;

const Container = styled.div<ContainerProps>`
  position: absolute;
  width: 100%;
  padding-left: ${({ paddingLeft, theme }) => theme.spacing(paddingLeft)};
  padding-right: ${({ paddingRight, theme }) => theme.spacing(paddingRight)};
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const MainSkeleton = styled(Skeleton)`
  width: 100%;
`;

export const ChartSkeleton = ({
  paddingLeft,
  paddingRight,
  disableControls,
  height,
}: ChartSkeletonProps): JSX.Element => {
  return (
    <Wrapper aria-label="chart skeleton">
      <Container paddingLeft={paddingLeft} paddingRight={paddingRight}>
        {!disableControls && (
          <ControlsWrapper aria-label="chart skeleton controls">
            <Skeleton
              variant="rectangular"
              height={50}
              width={100}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              height={50}
              width={100}
              animation="wave"
            />
          </ControlsWrapper>
        )}
        <MainSkeleton variant="rectangular" animation="wave" height={height} />
      </Container>
    </Wrapper>
  );
};

export default ChartSkeleton;
