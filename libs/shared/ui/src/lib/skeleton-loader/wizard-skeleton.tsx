import styled from '@emotion/styled';
import { Grid, Paper as MuiPaper, PaperProps } from '@mui/material';
import { Skeleton } from '@mui/material';

type Layout = 'vertical' | 'horizontal';

type WizardSkeletonProps = {
  /** Number of step skeletons to be shown */
  steps: number;
  /** Number of input skeletons to be shown */
  inputs: number;
  /** Sets the layout of the skeleton. Default is `vertical`. */
  progressLayout?: Layout;
};

const Paper = styled(MuiPaper)`
  padding: ${({ theme }) => theme.spacing(5)};
`;

const ContentWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(20)};
`;

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  :nth-of-type(3) {
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
  :last-child {
    margin: 0;
  }
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

const StepLabelWrapper = styled.div<{ layout: Layout }>`
  display: flex;
  align-items: center;
  margin-top: ${({ theme, layout }) =>
    layout === 'vertical' && theme.spacing(3)};
  padding-right: ${({ theme, layout }) =>
    layout === 'horizontal' && theme.spacing(3)};

  :first-of-type {
    margin-top: 0;
  }
  .MuiSkeleton-root:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(2)};
  }
`;

const TitleSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(5)};
`;

const ProgressPaper = styled(
  ({ ...props }: PaperProps & { layout: Layout }) => <Paper {...props} />
)`
  display: ${({ layout }) => layout === 'horizontal' && 'flex'};
  height: 100%;
`;

export const WizardSkeleton = ({
  steps,
  inputs,
  progressLayout,
}: WizardSkeletonProps): JSX.Element => {
  const layout = progressLayout || 'vertical';
  return (
    <div aria-label="wizard skeleton">
      <Skeleton height={60} width={210} />
      <Grid container spacing={3}>
        <Grid item md={layout === 'vertical' ? 2 : 12}>
          <ProgressPaper layout={layout}>
            {Array.from(Array(steps), (num, index) => (
              <StepLabelWrapper
                key={index}
                aria-label={`form step ${index + 1}`}
                layout={layout}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <StyledSkeleton width={100} variant="rectangular" height={15} />
              </StepLabelWrapper>
            ))}
          </ProgressPaper>
        </Grid>
        <Grid item md={layout === 'vertical' ? 10 : 12}>
          <Paper>
            <ContentWrapper>
              <TitleSkeleton variant="rectangular" height={30} width={100} />
              {Array.from(Array(inputs), (num, index) => (
                <StyledSkeleton
                  key={index}
                  aria-label={`form input ${index + 1}`}
                  width={300}
                  variant="rectangular"
                  height={50}
                />
              ))}
            </ContentWrapper>
            <ControlsWrapper>
              <Skeleton width={80} height={40} />
              <Skeleton width={80} height={40} />
            </ControlsWrapper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default WizardSkeleton;
