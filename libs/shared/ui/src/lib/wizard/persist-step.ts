type BuildStepKeyParams = {
  entity: {
    key: string;
    value: string;
  };
  user: {
    key: string;
    value: string;
  };
};

export const buildStepKey = ({ entity, user }: BuildStepKeyParams) =>
  `${entity.key}-${entity.value}-${user.key}-${user.value}` as const;

export type StepKey = ReturnType<typeof buildStepKey>;

export const getStep = (key: StepKey) => {
  const storageStep = sessionStorage.getItem(key);
  return storageStep ? parseInt(storageStep, 10) : 0;
};

export const setStep = (key: StepKey, step: number) => {
  sessionStorage.setItem(key, step.toString());
};
