import styled from '@emotion/styled';
import WizardNavigation from './wizard-navigation';
import WizardProgress, { Layout } from './wizard-progress';
import { ReactNode } from 'react';
import { Paper as MuiPaper } from '@mui/material';
import { useScreenSizeCheck } from '../hooks/use-screen-size-check';

type WizardFormProps = {
  /** Children of the component */
  children: ReactNode;
  /** Sets the layout of the wizard steps/progress. Default is `vertical`. */
  progressLayout?: Layout;
};

const Paper = styled(MuiPaper)`
  height: 100%;
  padding: ${({ theme }) => theme.spacing(6)};
`;

const MainContainer = styled.div<Pick<WizardFormProps, 'progressLayout'>>`
  display: grid;

  ${({ progressLayout }) =>
    progressLayout === 'vertical' &&
    `
    grid-template:
    [row1-start] 'progress form' auto [row1-end]
    / auto 1fr;
  `}
  ${({ progressLayout }) =>
    progressLayout === 'horizontal' &&
    `
    grid-template:
    [row1-start] 'progress progress' auto [row1-end]
    [row1-start] 'form form' auto [row1-end]
    / auto 1fr;
  `}

  row-gap: ${({ theme }) => theme.spacing(3)};
  column-gap: ${({ theme }) => theme.spacing(3)};
`;

const Progress = styled.section<Pick<WizardFormProps, 'progressLayout'>>`
  grid-area: progress;

  top: 0;
  position: ${({ progressLayout }) =>
    progressLayout === 'horizontal' ? 'sticky' : 'static'};
  z-index: ${({ theme }) => theme.zIndex.drawer - 1};
`;

const Form = styled.section`
  grid-area: form;
`;

const Navigation = styled.section`
  padding-top: ${(props) => props.theme.spacing(6)};
`;

const PaperContainer = styled(Paper)`
  @media only screen and (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

export const WizardForm = ({
  children,
  progressLayout,
}: WizardFormProps): JSX.Element => {
  const { isMobileUser } = useScreenSizeCheck();

  /** Uses horizontal wizard on mobile view */
  const layout = !isMobileUser ? progressLayout || 'vertical' : 'horizontal';

  return (
    <MainContainer aria-label="wizard form" progressLayout={layout}>
      <Progress progressLayout={layout}>
        <PaperContainer elevation={6}>
          <WizardProgress layout={layout} />
        </PaperContainer>
      </Progress>
      <Form>
        <PaperContainer elevation={6}>
          <section>{children}</section>
          <Navigation>
            <WizardNavigation />
          </Navigation>
        </PaperContainer>
      </Form>
    </MainContainer>
  );
};

export default WizardForm;
