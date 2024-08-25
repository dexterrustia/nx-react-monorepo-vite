import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

type CustomOptions = {
  /** Changes the text in the complete button */
  completeButtonText?: string;
  /** Makes the wizard progress display the date of last save, defaults to `false` */
  displayLastSaved?: boolean;
  /** Displays a save button next to the next/complete button */
  displaySaveButton?: {
    /** If a list of steps are provided, only the provided steps will display this button */
    steps: 'all' | number[];
    /** Placing the save button to the left or the right of the next button*/
    placement?: 'left' | 'right';
    /** Callback triggered when save buttin is clicked */
    onClick?: () => void;
  };
  // Add more options here if needed..
};

export type Step = {
  /** Label text of step */
  label: string;
  /** Can be set to true to disable step completely (will be skipped) */
  disabled?: boolean;
};

export type Steps = Step[];

export type WizardContext = {
  /** Array of steps */
  steps: Steps;
  /** Current active step (index) */
  activeStep: number;
  /** Current active step (object) */
  getActiveStepObj: () => Step;
  /** Total number of steps */
  getTotalSteps: () => number;
  /** Total number of steps */
  getCompletedSteps: () => number;
  /** Total number of completed steps */
  isCompleted: (step: number) => boolean;
  /** Whether or not the current active step is the last step */
  isLastStep: () => boolean;
  /** Whether or not all steps are compeleted */
  isAllStepsCompleted: () => boolean;
  /** Disabled given step. The step will be skipped over when navigating */
  disableStep: (step: number) => void;
  /** Enables given step. */
  enableStep: (step: number) => void;
  /** Callback fired when clicking `next` */
  handleNext: () => void;
  /** Callback fired when clicking `back` */
  handleBack: () => void;
  /** Callback fired when clicking a specific step */
  handleStep: (step: number) => () => void;
  /** Callback that sets current active step to first step (index 0), and removes all steps from completed list */
  handleReset: () => void;
  /** Custom validate function to be called before navigating to next step. Should return `true` if validation was successful. */
  validate: (step?: number) => Promise<boolean>;
  /** Callback to be used when clicking `finish` in last step */
  onSubmit: () => void;
  /** Disables or enables the navigation */
  handleDisableNavigation: (disabled: boolean) => void;
  /** Used to tell when the content in the wizard was saved, initial value is current date */
  lastSaved: Date;
  /** Tells if the navigation is disabled */
  navIsDisabled: boolean;
  /** Disables navigation when set to `true` */
  isSubmitSuccess?: boolean;
  /** Should indicate if the wizard is saving by making a request during the sequence, shows loading indicator in the wizard progress */
  isSaving?: boolean;
  /** Should tell that the save was successfull, updates the last saved date displayed in the wizard header */
  saveIsSuccessDate?: Date;
  /** Tells if something went wrong while saving data in the wizard */
  saveIsError?: boolean;
  /** Options for customizing the wizard for independent scenarios */
  options?: CustomOptions;
};
export type WizardContextReturnValue = WizardContext;
export type WizardProviderProps = WizardContext & {
  /** Part of application that needs wizard */
  children: ReactNode;
};
export type UseWizardProps = Pick<
  WizardContext,
  | 'onSubmit'
  | 'isSubmitSuccess'
  | 'isSaving'
  | 'saveIsSuccessDate'
  | 'saveIsError'
  | 'options'
> & {
  initialSteps: Steps;
  /** Callback triggered when clicking `next`, not triggered on last step */
  onNext?: (prevStep?: number) => void;
  /** Callback triggered when clicking `back` */
  onBack?: (prevStep?: number) => void;
  /** Sets the initial starting step, defaults to `0` */
  initialStep?: number;
  /** Custom validate function to be called before navigating to next step. Should return `true` if validation was successful. */
  validate?: (step?: number) => Promise<boolean>;
};

const WizardContext = createContext<WizardContext>({
  activeStep: 0,
  steps: [],
  getActiveStepObj: () => ({ label: '' }),
  getTotalSteps: () => 0,
  getCompletedSteps: () => 0,
  isCompleted: () => false,
  isLastStep: () => false,
  isAllStepsCompleted: () => false,
  disableStep: () => {},
  enableStep: () => {},
  handleNext: () => {},
  handleBack: () => {},
  handleStep: () => () => {},
  handleReset: () => {},
  validate: () => Promise.resolve(true),
  onSubmit: () => {},
  handleDisableNavigation: () => {},
  lastSaved: new Date(),
  navIsDisabled: false,
  isSubmitSuccess: false,
  isSaving: false,
  saveIsSuccessDate: new Date(),
  saveIsError: false,
});

export function useWizard({
  initialSteps,
  onSubmit,
  validate = () => Promise.resolve(true),
  onNext = () => {},
  onBack = () => {},
  isSubmitSuccess = false,
  isSaving = false,
  saveIsSuccessDate,
  saveIsError,
  options,
  initialStep = 0,
}: UseWizardProps): WizardContextReturnValue {
  const [steps, setsteps] = useState<Steps>(initialSteps);
  const [activeStep, setActiveStep] = useState(initialStep);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [navIsDisabled, setNavIsDisabled] = useState(false);

  const router = useRouter();
  const locale = router && router.locale;

  useEffect(() => {
    const newSteps = initialSteps.map((step, index) => {
      if (steps[index].disabled) {
        step.disabled = true;
      }
      return step;
    });
    setsteps(newSteps);
  }, [locale]);

  const getActiveStepObj = () => {
    return steps[activeStep];
  };

  const getTotalSteps = () => {
    return steps.length;
  };

  const getCompletedSteps = () => {
    return Object.keys(completed).length;
  };

  const isCompleted = (step: number) => {
    return completed[step];
  };

  const isLastStep = () => {
    return activeStep === getTotalSteps() - 1;
  };

  const isAllStepsCompleted = () => {
    return getCompletedSteps() === getTotalSteps();
  };

  const disableStep = (step: number) => {
    setsteps((prev) => {
      const newSteps = [...prev];
      newSteps[step].disabled = true;
      return newSteps;
    });
  };

  const enableStep = (step: number) => {
    setsteps((prev) => {
      const newSteps = [...prev];
      newSteps[step].disabled = false;
      return newSteps;
    });
  };

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if (isLastStep()) {
      // if last step AND all is completed simply set current step as active
      // if last step but still incomplete steps, set first incomplete step to active
      setActiveStep(
        isAllStepsCompleted()
          ? activeStep
          : steps.findIndex((step, i) => !(i in completed))
      );
    } else {
      // if not last step, set next set as active step
      let newActiveStep = activeStep + 1;

      while (newActiveStep < steps.length && steps[newActiveStep].disabled) {
        newActiveStep = newActiveStep + 1;
      }

      setActiveStep(
        newActiveStep === steps.length ? activeStep : newActiveStep
      );
      onNext(activeStep);
    }
  };

  const handleBack = () => {
    let prevActiveStep = activeStep - 1;
    while (prevActiveStep > -1 && steps[prevActiveStep].disabled) {
      prevActiveStep = prevActiveStep - 1;
    }
    setActiveStep(prevActiveStep === -1 ? activeStep : prevActiveStep);
    onBack(activeStep);
  };

  const handleStep = (step: number) => () => {
    if (step < activeStep) setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleDisableNavigation = (disabled: boolean) => {
    setNavIsDisabled(disabled);
  };

  return {
    steps,
    activeStep,
    getActiveStepObj,
    getTotalSteps,
    getCompletedSteps,
    isCompleted,
    isLastStep,
    isAllStepsCompleted,
    disableStep,
    enableStep,
    handleNext,
    handleBack,
    handleStep,
    handleReset,
    validate,
    onSubmit,
    handleDisableNavigation,
    isSubmitSuccess,
    isSaving,
    saveIsError,
    options,
    lastSaved: saveIsSuccessDate || new Date(),
    navIsDisabled,
  };
}

export const WizardProvider = ({
  children,
  ...wizardProps
}: WizardProviderProps): JSX.Element => {
  return (
    <WizardContext.Provider value={wizardProps}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = (): WizardContextReturnValue => {
  const context = useContext(WizardContext);
  return context;
};

export default useWizard;
