import styled from '@emotion/styled';
import {
  Paper,
  Divider as MuiDivider,
  Skeleton,
  PaperProps as MuiPaperProps,
} from '@mui/material';
import { useRef } from 'react';

type AccordionListSkeletonProps = {
  rows: number;
  disableElevation?: boolean;
  disableHeader?: boolean;
  rowHeight?: number;
  labelHeight?: number;
};

const Container = styled.div``;

const Divider = styled(MuiDivider)`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Row = styled(
  ({
    height,
    widthPercent,
    ...muiProps
  }: MuiPaperProps & { height: number; widthPercent: number }) => (
    <Paper {...muiProps} />
  )
)`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0;
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};

  height: ${({ theme, height }) => theme.spacing(height)};

  & > div {
    width: ${({ widthPercent }) => widthPercent}%;
  }
`;

export const AccordionListSkeleton = ({
  rows,
  disableElevation,
  disableHeader,
  rowHeight = 16,
  labelHeight = 50,
}: AccordionListSkeletonProps): JSX.Element => {
  const labelWidthPercentages = useRef(
    Array.from({ length: rows }, () =>
      Math.floor(Math.random() * (30 - 15 + 1) + 15)
    )
  );

  return (
    <Container aria-label="accordion list skeleton loader">
      {!disableHeader && (
        <>
          <Skeleton
            height={80}
            width={300}
            animation="wave"
            aria-label="accordion list skeleton header"
          />
          <Divider />
        </>
      )}
      <ContentWrapper>
        {Array.from(Array(rows), (num, rowIndex) => (
          <Row
            aria-label={`row skeleton ${rowIndex + 1}`}
            key={rowIndex}
            elevation={disableElevation ? 0 : undefined}
            height={rowHeight}
            widthPercent={labelWidthPercentages.current[rowIndex]}
          >
            <div>
              <Skeleton height={labelHeight} animation="wave" />
            </div>
          </Row>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default AccordionListSkeleton;
