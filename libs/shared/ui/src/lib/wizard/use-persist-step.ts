import { useEffect } from 'react';

import { setStep, type StepKey } from './persist-step';

export type UsePersistStepProps = {
  key: StepKey;
  /**
   * When provided, the active step will be persisted in local storage when it changes.
   */
  activeStep?: number;
};

export const usePersistStep = ({ key, activeStep }: UsePersistStepProps) => {
  useEffect(() => {
    if (activeStep === undefined) return;
    setStep(key, activeStep);
  }, [activeStep]);

  return { key };
};
