import { describe, expect, test, vi } from 'vitest';
import { act, render, renderHook } from '@testing-library/react';

import { nextRouterProviderWrapper } from '@xpand/ui/_test';

import useWizard, {
  UseWizardProps,
  WizardContextReturnValue,
  WizardProvider,
} from './wizard-ctx';

describe('useWizard', () => {
  test('navigate steps, setting correct completed status', () => {
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [
            { label: 'step1' },
            { label: 'step2' },
            { label: 'step3' },
          ],
          onSubmit: () => {},
          onNext: mockOnNext,
          onBack: mockOnBack,
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    // arrays are zero indexed
    const STEP1 = 0;
    const STEP2 = 1;
    const STEP3 = 2;

    expect(result.current.getTotalSteps()).toBe(3);
    expect(result.current.activeStep).toBe(STEP1);

    act(() => result.current.handleNext());
    expect(result.current.activeStep).toBe(STEP2);
    expect(result.current.getActiveStepObj().label).toContain('step2');
    expect(result.current.isCompleted(STEP1)).toBeTruthy();
    expect(result.current.isCompleted(STEP2)).toBeFalsy();
    expect(result.current.isAllStepsCompleted()).toBeFalsy();

    act(() => result.current.handleBack());
    expect(result.current.activeStep).toBe(STEP1);

    act(() => result.current.handleNext());
    expect(result.current.activeStep).toBe(STEP2);
    expect(result.current.isCompleted(STEP1)).toBeTruthy();

    act(() => result.current.handleNext());
    expect(result.current.activeStep).toBe(STEP3);
    expect(result.current.isLastStep()).toBeTruthy();
    expect(result.current.isCompleted(STEP2)).toBeTruthy();

    act(() => result.current.handleNext());
    expect(result.current.activeStep).toBe(STEP3);
    expect(result.current.isAllStepsCompleted()).toBeTruthy();

    act(() => result.current.handleReset());
    expect(result.current.activeStep).toBe(STEP1);
    expect(result.current.isAllStepsCompleted()).toBeFalsy();

    act(() => result.current.handleStep(STEP3)());
    expect(result.current.activeStep).toBe(STEP1);

    act(() => result.current.handleNext());
    expect(result.current.activeStep).toBe(STEP2);
    act(() => result.current.handleStep(STEP1)());
    expect(result.current.activeStep).toBe(STEP1);

    act(() => result.current.disableStep(STEP2));
    expect(result.current.steps[STEP2].disabled).toBe(true);
    act(() => result.current.handleNext());
    expect(result.current.activeStep).toBe(STEP3);

    act(() => result.current.disableStep(STEP2));
    act(() => result.current.handleBack());
    expect(result.current.activeStep).toBe(STEP1);

    act(() => result.current.disableStep(STEP2));
    expect(result.current.steps[STEP2].disabled).toBe(true);
    act(() => result.current.enableStep(STEP2));
    expect(result.current.steps[STEP2].disabled).toBe(false);

    expect(mockOnNext).toHaveBeenCalledTimes(5);
    expect(mockOnBack).toHaveBeenCalledTimes(2);

    expect(result.current.isSubmitSuccess).toBe(false);
  });

  test('returns the provided options', () => {
    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'step1' }, { label: 'step2' }],
          onSubmit: () => {},
          options: {
            completeButtonText: 'Custom complete',
            displaySaveButton: {
              steps: 'all',
              onClick: () => {},
              placement: 'right',
            },
          },
        }),
      { wrapper: nextRouterProviderWrapper() }
    );
    expect(result.current.options?.completeButtonText).toEqual(
      'Custom complete'
    );
    expect(result.current.options?.displaySaveButton?.steps).toEqual('all');
    expect(result.current.options?.displaySaveButton?.placement).toEqual(
      'right'
    );
  });

  test('returns new last saved when saveIsSuccess prop changes', async () => {
    const { result, rerender } = renderHook<
      WizardContextReturnValue,
      UseWizardProps
    >((props) => useWizard(props), {
      initialProps: {
        initialSteps: [{ label: 'step1' }, { label: 'step2' }],
        onSubmit: () => {},
        saveIsSuccessDate: new Date(),
      },
      wrapper: nextRouterProviderWrapper(),
    });

    const first = result.current.lastSaved;

    await new Promise((r) => setTimeout(r, 10));

    const { steps, ...current } = result.current;
    rerender({
      ...current,
      initialSteps: steps,
      saveIsSuccessDate: new Date('3000-01-01'),
    });

    const second = result.current.lastSaved;
    expect(first).not.toEqual(second);
  });

  test('toggles `navIsDisabled`', () => {
    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'step1' }, { label: 'step2' }],
          onSubmit: () => {},
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    expect(result.current.navIsDisabled).toBe(false);
    act(() => result.current.handleDisableNavigation(true));
    expect(result.current.navIsDisabled).toBe(true);
    act(() => result.current.handleDisableNavigation(false));
    expect(result.current.navIsDisabled).toBe(false);
  });

  test('renders with initial step', () => {
    const { result } = renderHook<WizardContextReturnValue, UseWizardProps>(
      () =>
        useWizard({
          initialSteps: [{ label: 'step1' }, { label: 'step2' }],
          onSubmit: () => {},
          initialStep: 1,
        }),
      { wrapper: nextRouterProviderWrapper() }
    );

    expect(result.current.activeStep).toBe(1);
  });
});

describe('WizardProvier', () => {
  test('renders correctly with children', () => {
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

    const { getByText } = render(
      <WizardProvider {...result.current}>
        <p>children</p>
      </WizardProvider>
    );

    expect(getByText('children')).toBeInTheDocument();
  });
});
