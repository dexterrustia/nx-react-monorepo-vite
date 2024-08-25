import { describe, test, expect, vi } from 'vitest';

import { fireEvent, renderHook } from '@testing-library/react';

import { ParticipantDisplay } from '@xpand/utils/_types';
import { renderWithDefaultProviders } from '@xpand/ui/_test';
import { useDialog, UseDialogReturn } from '../dialog';

import AutoCompleteDialog from './auto-complete-dialog';

describe('AutoCompleteDialog', () => {
  const options: ParticipantDisplay[] = [
    {
      id: 'id1',
      label: 'Label1',
      type: 'USER',
    },
  ];

  test('renders with provided options, clicks options and confirms', async () => {
    const mockHandleConfirm = vi.fn();
    const mockSetSelectedIds = vi.fn();

    const { result } = renderHook<UseDialogReturn<unknown>, unknown>(() =>
      useDialog({ defaultOpen: true })
    );

    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <AutoCompleteDialog
        dialog={result.current}
        dialogTitle="Dialog title"
        options={options}
        selectedValues={[]}
        handleConfirm={mockHandleConfirm}
        setSelectedIds={mockSetSelectedIds}
        label="Text field label"
      />
    );

    const AutoCompleteTextField = getByLabelText('auto complete text field');
    fireEvent.click(AutoCompleteTextField);
    fireEvent.keyDown(AutoCompleteTextField, { key: 'ArrowDown' });

    const Option = getByText('Label1');
    expect(Option).toBeInTheDocument();

    fireEvent.click(Option);
    expect(mockSetSelectedIds).toHaveBeenCalledTimes(1);

    const ConfirmButton = getByText('common:buttons.add');
    fireEvent.click(ConfirmButton);
    expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
  });

  test('renders loader', async () => {
    const { result } = renderHook<UseDialogReturn<unknown>, unknown>(() =>
      useDialog({ defaultOpen: true })
    );

    const { getByLabelText } = renderWithDefaultProviders(
      <AutoCompleteDialog
        dialog={result.current}
        dialogTitle="Dialog title"
        options={[]}
        selectedValues={[]}
        handleConfirm={() => {}}
        setSelectedIds={() => {}}
        label="Text field label"
        optionsLoading
      />
    );

    const Loader = getByLabelText('form field loader');
    expect(Loader).toBeInTheDocument();
  });
});
