import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import { Paper as MuiPaper } from '@mui/material';

type ChecklistFormSkeletonProps = {
  /** Number of form inputs */
  formInputs: number;
  /** Number of checklist sections */
  sections: number;
  /** Hides submit button skeleton */
  hideSubmitCard?: boolean;
  /** Shows a large field at the buttom of the form */
  enableDescription?: boolean;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    grid-template-columns: 12fr 4fr;
  }
`;

const ContentWrapper = styled.div`
  .MuiPaper-root:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const FormFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.spacing(4)};
  row-gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Paper = styled(MuiPaper)`
  padding: ${({ theme }) => theme.spacing(6)};
  height: fit-content;

  :nth-of-type(2) {
    position: sticky;
    top: 0;
    padding-top: ${({ theme }) => theme.spacing(5)};
  }
`;

const FormInputSKeleton = styled(Skeleton)`
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

const TitleSkeleton = styled(Skeleton)`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const Section = styled(MuiPaper)`
  height: fit-content;
  padding: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const BottomButtonSkeleton = styled(Skeleton)`
  margin-left: auto;
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

export const ChecklistFormSkeleton = ({
  hideSubmitCard,
  sections,
  formInputs,
  enableDescription,
}: ChecklistFormSkeletonProps): JSX.Element => {
  return (
    <Container aria-label="checklist skeleton loader">
      <ContentWrapper>
        <Paper>
          <TitleSkeleton height={50} width={140} variant="rectangular" />
          <FormFieldsWrapper>
            {Array.from(Array(formInputs), (num, index) => (
              <FormInputSKeleton
                aria-label={`form input skeleton ${index + 1}`}
                key={index}
                height={60}
                animation="wave"
                variant="rectangular"
              />
            ))}
          </FormFieldsWrapper>
          {enableDescription && (
            <FormInputSKeleton
              aria-label="form description input skeleton"
              height={100}
              animation="wave"
              variant="rectangular"
            />
          )}
        </Paper>
        <Paper>
          <TitleSkeleton height={50} width={140} variant="rectangular" />
          {Array.from(Array(sections), (num, index) => (
            <Section key={index} aria-label={`section skeleton ${index + 1}`}>
              <Skeleton height={30} width={140} variant="rectangular" />
            </Section>
          ))}
          <BottomButtonSkeleton height={40} width={120} variant="rectangular" />
        </Paper>
      </ContentWrapper>
      {!hideSubmitCard && (
        <Paper aria-label="submit button skeleton">
          <Skeleton height={40} variant="rectangular" />
        </Paper>
      )}
    </Container>
  );
};

export default ChecklistFormSkeleton;
