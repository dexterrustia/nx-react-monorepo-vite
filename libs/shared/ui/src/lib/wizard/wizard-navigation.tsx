import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { useWizardContext } from './wizard-ctx';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import SaveAltRounded from '@mui/icons-material/SaveAltRounded';

const WizardNavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;

  & > button {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

export const WizardNavigation = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    activeStep,
    handleNext,
    handleBack,
    getTotalSteps,
    validate,
    onSubmit,
    isSaving,
    options,
    navIsDisabled,
    isSubmitSuccess,
  } = useWizardContext();
  const {
    formState: { errors: formErrors },
  } = useFormContext();

  const onClickNext = async () => {
    const stepIsValid = await validate(activeStep);

    if (stepIsValid) {
      handleNext();
    }
  };

  const deleteErrorsOnBack = () => {
    if (Object.keys(formErrors).length) {
      Object.keys(formErrors).map((property) => {
        delete formErrors[property];
        return property;
      });
    }
  };

  const onClickBack = () => {
    deleteErrorsOnBack();
    handleBack();
  };

  const onFinishClick = () => {
    onSubmit();
  };

  const totalSteps = getTotalSteps();

  const showNext = activeStep !== totalSteps - 1;
  const showFinish = !showNext;

  const disableBack = activeStep === 0 || isSubmitSuccess;
  const buttonsDisabled = isSubmitSuccess || navIsDisabled || isSaving;

  const renderButton = () => {
    const displaySaveButton =
      options?.displaySaveButton &&
      (options?.displaySaveButton?.steps === 'all' ||
        options?.displaySaveButton?.steps?.includes(activeStep));

    const saveButton = displaySaveButton ? (
      <Button
        color="secondary"
        onClick={options?.displaySaveButton?.onClick}
        disabled={buttonsDisabled}
        startIcon={<SaveAltRounded />}
      >
        {t('common:buttons.save')}
      </Button>
    ) : (
      <></>
    );

    const placementOption = options?.displaySaveButton?.placement;

    if (showNext) {
      return (
        <ButtonsContainer>
          {placementOption === 'left' && saveButton}
          <Button onClick={onClickNext} disabled={buttonsDisabled}>
            {t('common:buttons.next')}
            <ChevronRightIcon color="action" />
          </Button>
          {placementOption === 'right' && saveButton}
        </ButtonsContainer>
      );
    }

    if (showFinish) {
      return (
        <ButtonsContainer>
          {placementOption === 'left' && saveButton}
          <Button
            disabled={buttonsDisabled}
            color="primary"
            onClick={onFinishClick}
            variant="contained"
            startIcon={<CheckCircleRounded />}
          >
            {options?.completeButtonText
              ? options.completeButtonText
              : t('common:buttons.complete')}
          </Button>
          {placementOption === 'right' && saveButton}
        </ButtonsContainer>
      );
    }
  };

  return (
    <WizardNavigationBar>
      <Button disabled={disableBack} onClick={onClickBack}>
        <ChevronLeftIcon color="action" />
        {t('common:buttons.back')}
      </Button>
      <Typography variant="body2">
        {`${activeStep + 1} / ${totalSteps}`}
      </Typography>
      {renderButton()}
    </WizardNavigationBar>
  );
};

export default WizardNavigation;
