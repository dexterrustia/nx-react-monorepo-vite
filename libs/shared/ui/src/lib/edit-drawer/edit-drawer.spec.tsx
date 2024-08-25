import { describe, test, expect, vi } from 'vitest';

import { ReactNode } from 'react';
import {
  EditDrawerContext,
  EditDrawerContextReturnValue,
  EditDrawerProvider,
  useEditDrawer,
  UseEditDrawerProps,
} from './edit-drawer-ctx';
import { fireEvent } from '@testing-library/react';
import { renderWithDefaultProviders } from '@xpand/ui/_test';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';

import EditDrawer from './edit-drawer';

const editDrawerProviderWrapper =
  ({
    props,
    editDrawer,
  }: {
    props?: UseEditDrawerProps;
    editDrawer?: EditDrawerContext;
  }) =>
  ({ children }: { children: ReactNode }): JSX.Element => {
    const acutalDialog = editDrawer || useEditDrawer({ ...props });
    return (
      <EditDrawerProvider {...acutalDialog}>{children}</EditDrawerProvider>
    );
  };

describe('EditDrawer', () => {
  test('is rendered as expanded', () => {
    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() => useEditDrawer({}));

    act(() => {
      result.current.handleOpen();
    });

    const { getByText, queryByText } = renderWithDefaultProviders(
      <EditDrawer title="Title">
        <p>Test</p>
      </EditDrawer>,
      {
        innerWrappers: [
          editDrawerProviderWrapper({ editDrawer: result.current }),
        ],
      }
    );

    expect(getByText('common:buttons.editX')).toBeInTheDocument();
    expect(getByText('Test')).toBeInTheDocument();
    expect(queryByText('common:buttons.delete')).not.toBeInTheDocument();
  });

  test('renders with delete button and triggers on click', () => {
    const mockDelete = vi.fn();

    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() => useEditDrawer({ onDelete: mockDelete }));

    act(() => {
      result.current.handleOpen();
    });

    const { getByText } = renderWithDefaultProviders(
      <EditDrawer title="Title" showDelete>
        <p>Test</p>
      </EditDrawer>,
      {
        innerWrappers: [
          editDrawerProviderWrapper({ editDrawer: result.current }),
        ],
      }
    );

    const Button = getByText('common:buttons.delete');
    expect(Button).toBeInTheDocument();

    fireEvent.click(Button);
    expect(mockDelete).toHaveBeenCalled();
  });

  test('renders with disabled delete button', () => {
    const mockDelete = vi.fn();

    const { result } = renderHook<
      EditDrawerContextReturnValue,
      UseEditDrawerProps
    >(() => useEditDrawer({ onDelete: mockDelete }));

    act(() => {
      result.current.handleOpen();
    });

    const { getByText } = renderWithDefaultProviders(
      <EditDrawer title="Title" showDelete disableDelete>
        <p>Test</p>
      </EditDrawer>,
      {
        innerWrappers: [
          editDrawerProviderWrapper({ editDrawer: result.current }),
        ],
      }
    );

    const Button = getByText('common:buttons.delete');
    fireEvent.click(Button);

    expect(mockDelete).not.toHaveBeenCalled();
  });
});
