import { describe, test, expect, vi } from 'vitest';

import { Button as MuiButton } from '@mui/material';
import { fireEvent } from '@testing-library/react';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

import RowControl from './row-control';

describe('RowControl', () => {
  test('renders correctly with contents and numbers', () => {
    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <RowControl
        contents={[
          { type: 'text', value: 'text value', header: 'header' },
          {
            type: 'component',
            value: <div>component content</div>,
            alignTop: true,
          },
        ]}
        number={1}
      />
    );

    const Component = getByLabelText('row control');
    const NumberColumn = getByText('1');
    expect(Component).toBeInTheDocument();
    expect(NumberColumn).toBeInTheDocument();

    const Value = getByText('text value');
    const Typography = getByLabelText('text content');
    const Header = getByText('header');
    expect(Value).toBeInTheDocument();
    expect(Typography).toBeInTheDocument();
    expect(Header).toBeInTheDocument();

    const ComponentValue = getByText('component content');
    expect(ComponentValue).toBeInTheDocument();
  });

  test('renders and calls end controls and onClick', () => {
    const mockHandleClick = vi.fn();
    const mockOnClick = vi.fn();

    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <RowControl
        contents={[{ type: 'text', value: 'text value', header: 'header' }]}
        endControls={<MuiButton onClick={mockHandleClick}>button</MuiButton>}
        onClick={mockOnClick}
      />
    );

    const Button = getByText('button');
    fireEvent.click(Button);
    expect(mockHandleClick).toHaveBeenCalled();

    const Row = getByLabelText('row control');
    fireEvent.click(Row);
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
