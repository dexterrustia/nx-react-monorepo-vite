import { describe, test, expect, vi } from 'vitest';

import { act, render, renderHook } from '@testing-library/react';

import useEditDrawer, {
  useEditDrawerContext,
  EditDrawerProvider,
  UseEditDrawerProps,
  EditDrawerContextReturnValue,
} from './edit-drawer-ctx';

describe('useEditDrawer', () => {
  test('open, close, save and delete is toggled and called correctly', () => {
    const onClose = vi.fn();
    const onSave = vi.fn();
    const onDelete = vi.fn();
    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() =>
      useEditDrawer({
        onSave,
        onClose,
        onDelete,
      })
    );

    expect(result.current.isDrawerOpen).toBeFalsy();
    act(() => result.current.handleOpen());
    expect(result.current.isDrawerOpen).toBeTruthy();
    act(() => result.current.handleSave());
    expect(onSave).toHaveBeenCalledTimes(1);
    act(() => result.current.handleDelete());
    expect(onDelete).toHaveBeenCalledTimes(1);
    act(() => result.current.handleClose());
    expect(result.current.isDrawerOpen).toBeFalsy();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('returns saveIsDisabled correctly', () => {
    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() => useEditDrawer({}));

    expect(result.current.saveIsDisabled).toBeFalsy();

    act(() => result.current.handleSaveDisabled(true));

    expect(result.current.saveIsDisabled).toBeTruthy();
  });
});

describe('EditDrawerProvider', () => {
  test('renders correctly with children', () => {
    const onClose = vi.fn();
    const onSave = vi.fn();
    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() =>
      useEditDrawer({
        onSave,
        onClose,
      })
    );

    const { getByText } = render(
      <EditDrawerProvider {...result.current}>
        <p>children</p>
      </EditDrawerProvider>
    );

    expect(getByText('children')).toBeInTheDocument();
  });
});

describe('useEditDrawerContext', () => {
  test('handles default values when used outside Provider', () => {
    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() => useEditDrawerContext());

    expect(result.current.isDrawerOpen).toBeFalsy();
    act(() => result.current.handleOpen());
    expect(result.current.isDrawerOpen).toBeFalsy();
    act(() => result.current.handleSave());
    expect(result.current.isDrawerOpen).toBeFalsy();
    act(() => result.current.handleClose());
    expect(result.current.isDrawerOpen).toBeFalsy();
  });
});
