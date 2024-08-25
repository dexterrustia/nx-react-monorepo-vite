import { useCallback } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

export type UseFormFieldHelpersProps = {
  /** Boolean to toggle if field is disabled or not */
  disabled?: boolean;
  /** React-hook-form rules */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

export type UseFormFieldHelpersReturn = {
  /** Returns true if field is required */
  isRequired: () => boolean;
  /** Returns true if field is disabled */
  isDisabled: () => boolean;
};

/**
 * Hook containing common helper functions part of most react-hook-form fields in one way or another.
 *
 * @param props.disabled Boolean indicating that form field is disabled
 * @param props.rules React-hook-form rules used to validate form field
 */
export const useFormFieldHelpers = ({
  disabled,
  rules,
}: UseFormFieldHelpersProps): UseFormFieldHelpersReturn => {
  const { formState } = useFormContext();

  const isDisabled = useCallback(
    () => Boolean(disabled || formState?.isSubmitting),
    [disabled, formState.isSubmitting]
  );

  const isRequired = useCallback(() => Boolean(rules?.required), [rules]);

  return { isRequired, isDisabled };
};

export default useFormFieldHelpers;
