import {
  formProviderWrapper,
  renderHookWithDefaultProviders,
} from '@xpand/ui/_test';
import {
  useFormFieldHelpers,
  UseFormFieldHelpersProps,
  UseFormFieldHelpersReturn,
} from './useFormFieldHelpers';

describe('useFormFieldHelpers', () => {
  test('initialized correctly', () => {
    const { result } = renderHookWithDefaultProviders<
      UseFormFieldHelpersProps,
      UseFormFieldHelpersReturn
    >(
      () =>
        useFormFieldHelpers({
          disabled: true,
          rules: {
            required: true,
          },
        }),
      { innerWrappers: [formProviderWrapper()] }
    );

    expect(result.current.isDisabled()).toBeTruthy();
    expect(result.current.isRequired()).toBeTruthy();
  });
});
