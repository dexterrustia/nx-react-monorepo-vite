import styled from '@emotion/styled';
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepProps as MuiStepProps,
  StepLabel as MuiStepLabel,
  StepButton as MuiStepButton,
} from '@mui/material';
import { useWizardContext } from './wizard-ctx';
import { SaveIndicator } from '../save-indicator';

export type Layout = 'vertical' | 'horizontal';

type WizardProgressProps = {
  layout: Layout;
};

type StepProps = MuiStepProps & {
  layout: Layout;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Stepper = styled(MuiStepper)`
  &&& {
    padding: ${(props) => props.theme.spacing(0)};
    min-width: ${({ theme }) => theme.spacing(40)};
  }

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Step = styled(({ ...props }: StepProps) => <MuiStep {...props} />)`
  .MuiStepIcon-root.Mui-active {
    color: ${({ theme }) => theme.palette.info.main};
  }
`;

const StepLabel = styled(MuiStepLabel)`
  &&& {
    & .MuiStepIcon-root {
      width: ${(props) => props.theme.spacing(8)};
      height: ${(props) => props.theme.spacing(8)};
    }

    & .MuiStepIcon-text {
      fill: ${({ theme }) => theme.palette.common.white};
    }
  }
`;

const StepButton = styled(MuiStepButton)`
  & > span {
    :first-of-type {
      & > span {
        :first-of-type {
          display: none;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    width: ${(props) => props.theme.spacing(35)};
    margin-bottom: ${(props) => props.theme.spacing(1)};
    justify-content: left;
    text-align: left;
  }
`;

export const WizardProgress = ({
  layout,
}: WizardProgressProps): JSX.Element => {
  const {
    steps,
    activeStep,
    options,
    isCompleted,
    handleStep,
    lastSaved,
    saveIsError,
    isSaving,
  } = useWizardContext();

  return (
    <Container>
      <Stepper
        connector={<></>}
        nonLinear
        orientation={layout}
        activeStep={activeStep}
      >
        {steps.map((step, index) => (
          <Step key={step.label} layout={layout} completed={isCompleted(index)}>
            <StepButton
              onClick={handleStep(index)}
              disabled={index > activeStep || steps[index].disabled}
            >
              <StepLabel>{step.label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {options?.displayLastSaved && (
        <SaveIndicator
          isSaving={isSaving}
          lastSaved={lastSaved}
          isError={saveIsError}
        />
      )}
    </Container>
  );
};

export default WizardProgress;
