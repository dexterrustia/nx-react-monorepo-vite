import { ReactNode } from 'react';

import { act, fireEvent, renderHook, waitFor } from '@testing-library/react';
import {
  formProviderWrapper,
  nextRouterProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';
import { dateToStringTime } from '@xpand/utils/date';
import { useForm } from 'react-hook-form';
import Form from '../form';
import WizardForm from './wizard-form';
import WizardNavigation from './wizard-navigation';
import WizardProgress from './wizard-progress';
import {
  useWizard,
  UseWizardProps,
  WizardContextReturnValue,
  WizardProvider,
  WizardContext,
} from './wizard-ctx';

import { FormInput } from '../form-input';
import { vi } from 'vitest';

const wizardProviderWrapper =
  ({ props, wizard }: { props?: UseWizardProps; wizard?: WizardContext }) =>
  ({ children }: { children: ReactNode }): JSX.Element => {
    const actualWizard =
      wizard || useWizard({ initialSteps: [], onSubmit: () => {}, ...props });
    return <WizardProvider {...actualWizard}>{children}</WizardProvider>;
  };

describe('WizardProgress', () => {
  test('renders with steps visible', () => {
    const { getByText } = renderWithDefaultProviders(
      <WizardProgress layout="vertical" />,
      {
        innerWrappers: [
          wizardProviderWrapper({
            props: {
              initialSteps: [
                { label: 'step1' },
                { label: 'step2' },
                { label: 'step3' },
              ],
              onSubmit: () => {},
            },
          }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    const Step1 = getByText('step1');
    expect(Step1).toBeInTheDocument();
    const Step2 = getByText('step2');
    expect(Step2).toBeInTheDocument();
    const Step3 = getByText('step3');
    expect(Step3).toBeInTheDocument();
  });

  test('renders with save indicator', () => {
    Date.now = vi.fn(() => 1487076708000);

    const now = new Date();

    const { getByText } = renderWithDefaultProviders(
      <WizardProgress layout="vertical" />,
      {
        innerWrappers: [
          wizardProviderWrapper({
            props: {
              initialSteps: [
                { label: 'step1' },
                { label: 'step2' },
                { label: 'step3' },
              ],
              onSubmit: () => {},
              options: {
                displayLastSaved: true,
              },
            },
          }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    expect(
      getByText(`common:wizard.automaticallySaved${dateToStringTime(now)}`)
    ).toBeInTheDocument();
  });

  test('renders with save indicator error', () => {
    const { getByText } = renderWithDefaultProviders(
      <WizardProgress layout="vertical" />,
      {
        innerWrappers: [
          wizardProviderWrapper({
            props: {
              initialSteps: [{ label: 'step1' }],
              onSubmit: () => {},
              saveIsError: true,
              options: {
                displayLastSaved: true,
              },
            },
          }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    expect(getByText('common:errors.generalSimple')).toBeInTheDocument();
  });

  test('renders without save indicator error when saving', () => {
    const { getByText, queryByText } = renderWithDefaultProviders(
      <WizardProgress layout="vertical" />,
      {
        innerWrappers: [
          wizardProviderWrapper({
            props: {
              initialSteps: [{ label: 'step1' }],
              onSubmit: () => {},
              saveIsError: true,
              isSaving: true,
              options: {
                displayLastSaved: true,
              },
            },
          }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    expect(queryByText('common:errors.generalSimple')).not.toBeInTheDocument();
    expect(getByText('common:wizard.saving')).toBeInTheDocument();
  });
});

describe('WizardNavigation', () => {
  test('renders back and next buttons with multiple step', async () => {
    const { getByText, queryByText } = renderWithDefaultProviders(
      <WizardNavigation />,
      {
        innerWrappers: [
          formProviderWrapper(),
          wizardProviderWrapper({
            props: {
              initialSteps: [
                { label: 'step1' },
                { label: 'step2' },
                { label: 'step3' },
              ],
              onSubmit: () => {},
              options: {
                displayLastSaved: true,
              },
            },
          }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    const Back = getByText('common:buttons.back');
    expect(Back).toBeInTheDocument();
    const Next = getByText('common:buttons.next');
    expect(Next).toBeInTheDocument();
    const Progress1of3 = getByText('1 / 3');
    expect(Progress1of3).toBeInTheDocument();
    const Finish = queryByText('common:buttons.finish');
    expect(Finish).not.toBeInTheDocument();
  });

  test('renders back and complete buttons with last step, and handles onSubmit on clicking complete', async () => {
    const mockOnSubmit = vi.fn();

    const { getByText, queryByText } = renderWithDefaultProviders(
      <WizardNavigation />,
      {
        innerWrappers: [
          formProviderWrapper(),
          wizardProviderWrapper({
            props: {
              initialSteps: [{ label: 'last step' }],
              onSubmit: mockOnSubmit,
            },
          }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    const Back = getByText('common:buttons.back');
    expect(Back).toBeInTheDocument();
    const Finish = getByText('common:buttons.complete');
    expect(Finish).toBeInTheDocument();
    const Progress1of1 = getByText('1 / 1');
    expect(Progress1of1).toBeInTheDocument();
    const Next = queryByText('common:buttons.next');
    expect(Next).not.toBeInTheDocument();

    fireEvent.click(Finish);
    expect(mockOnSubmit).toBeCalledTimes(1);
  });

  test('handles custom validate function on click', async () => {
    const mockValidate = vi.fn();

    const { getByText } = renderWithDefaultProviders(<WizardNavigation />, {
      innerWrappers: [
        formProviderWrapper(),
        wizardProviderWrapper({
          props: {
            initialSteps: [
              { label: 'step1' },
              { label: 'step2' },
              { label: 'step3' },
            ],
            onSubmit: () => {},
            validate: mockValidate,
          },
        }),
      ],
      outerWrappers: [nextRouterProviderWrapper()],
    });

    const Next = getByText('common:buttons.next');
    expect(Next).toBeInTheDocument();

    fireEvent.click(Next);
    await waitFor(() => {
      expect(mockValidate).toBeCalledTimes(1);
    });
  });

  test('renders with custom button text when provided as options in context', () => {
    const { getByText } = renderWithDefaultProviders(<WizardNavigation />, {
      innerWrappers: [
        formProviderWrapper(),
        wizardProviderWrapper({
          props: {
            initialSteps: [{ label: 'last step' }],
            onSubmit: () => {},
            options: {
              completeButtonText: 'Custom button text',
            },
          },
        }),
      ],
      outerWrappers: [nextRouterProviderWrapper()],
    });

    const FinishButton = getByText('Custom button text');
    expect(FinishButton).toBeInTheDocument();
  });

  it('should fire validation when next button is click right away', async () => {
    const mockSubmit = vi.fn();

    const getWizardContent = (step: number) => {
      switch (step) {
        case 0:
          return (
            <Form>
              <FormInput
                id="name"
                name="name"
                label="test name"
                type="text"
                rules={{
                  required: 'Field is required',
                }}
              />
            </Form>
          );
        case 1:
          return <></>;
      }
      return <></>;
    };

    const validate = async (): Promise<boolean> => {
      let isValid = false;

      switch (wizard.current.activeStep) {
        case 0:
          isValid = await methods.current.trigger(['name']);
          break;
      }

      return isValid;
    };

    const { result: methods } = renderHook(() =>
      useForm<{ name: string }>({
        mode: 'all',
        defaultValues: {
          name: '',
        },
      })
    );

    const { result: wizard } = renderHook<
      WizardContextReturnValue,
      UseWizardProps
    >(
      () =>
        useWizard({
          initialSteps: [{ label: 'step 0' }, { label: 'step 1' }],
          validate: validate,
          onSubmit: mockSubmit,
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    const { getByText, findByText } = renderWithDefaultProviders(
      <WizardForm>{getWizardContent(wizard.current.activeStep)}</WizardForm>,
      {
        innerWrappers: [
          formProviderWrapper({ methods: methods.current }),
          wizardProviderWrapper({ wizard: wizard.current }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    const nextButton = getByText('common:buttons.next');
    fireEvent.click(nextButton);

    const InputFieldErrorMessage = await waitFor(() =>
      findByText('Field is required')
    );

    expect(InputFieldErrorMessage).toBeInTheDocument();
    expect(methods.current.getFieldState('name').invalid).toBeTruthy();
  });

  test('should not click next when disabled', () => {
    const mockOnSubmit = vi.fn();

    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'last step' }],
          onSubmit: mockOnSubmit,
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    act(() => {
      result.current.handleDisableNavigation(true);
    });

    const { getByText } = renderWithDefaultProviders(<WizardNavigation />, {
      innerWrappers: [
        formProviderWrapper(),
        wizardProviderWrapper({ wizard: result.current }),
      ],
      outerWrappers: [nextRouterProviderWrapper()],
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    const finishButton = getByText('common:buttons.complete');

    fireEvent.click(finishButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  });

  test('should render next button with save button to the left ', () => {
    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'last step' }],
          onSubmit: () => {},
          options: {
            displaySaveButton: {
              steps: 'all',
              onClick: () => {},
              placement: 'left',
            },
          },
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    const { getByText } = renderWithDefaultProviders(<WizardNavigation />, {
      innerWrappers: [
        formProviderWrapper(),
        wizardProviderWrapper({ wizard: result.current }),
      ],
      outerWrappers: [nextRouterProviderWrapper()],
    });

    const saveButton = getByText('common:buttons.save');

    expect(saveButton).toBeInTheDocument();
  });

  test('should render save button to the right of the complete button at the last step ', async () => {
    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'first step' }],
          onSubmit: () => {},
          options: {
            displaySaveButton: {
              steps: [0],
              onClick: () => {},
              placement: 'right',
            },
          },
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    const { getByText } = renderWithDefaultProviders(<WizardNavigation />, {
      innerWrappers: [
        formProviderWrapper(),
        wizardProviderWrapper({ wizard: result.current }),
      ],
      outerWrappers: [nextRouterProviderWrapper()],
    });

    const SaveButton = await waitFor(() => getByText('common:buttons.save'));

    expect(SaveButton).toBeInTheDocument();
  });
});

describe('WizardForm', () => {
  test('renders with first steps as active and visible', () => {
    const getContent = (step: number) => {
      switch (step) {
        case 0:
          return 'step1 content';
        case 1:
          return 'step2 content';
        case 2:
          return 'step3 content';
      }
      return 0;
    };

    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [
            { label: 'step1' },
            { label: 'step2' },
            { label: 'step3' },
          ],
          onSubmit: () => {},
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    const { getByText, queryByText } = renderWithDefaultProviders(
      <WizardForm>{getContent(result.current.activeStep)}</WizardForm>,
      {
        innerWrappers: [
          formProviderWrapper(),
          wizardProviderWrapper({ wizard: result.current }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    const Step1Content = getByText('step1 content');
    expect(Step1Content).toBeInTheDocument();
    const Step2 = queryByText('step2 content');
    expect(Step2).not.toBeInTheDocument();
  });

  test('renders with horizontal layout', () => {
    const getContent = (step: number) => {
      switch (step) {
        case 0:
          return 'step1 content';
      }
      return 0;
    };

    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'step1' }],
          onSubmit: () => {},
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    const { getByLabelText } = renderWithDefaultProviders(
      <WizardForm progressLayout="horizontal">
        {getContent(result.current.activeStep)}
      </WizardForm>,
      {
        innerWrappers: [
          formProviderWrapper(),
          wizardProviderWrapper({ wizard: result.current }),
        ],
        outerWrappers: [nextRouterProviderWrapper()],
      }
    );

    const Form = getByLabelText('wizard form');
    expect(Form).toBeInTheDocument();
  });
});
