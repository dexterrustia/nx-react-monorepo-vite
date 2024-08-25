import { renderWithDefaultProviders } from '@xpand/ui/_test';
import ColoredIdentifier, {
  ColoredIdentifierColor,
} from './colored-identifier';
import { screen } from '@testing-library/react';

describe('ColorIdentifier', () => {
  test('should render correctly with required props', () => {
    renderWithDefaultProviders(
      <ColoredIdentifier color="red" identifier="test id" />
    );

    expect(screen.getByText('test id')).toBeInTheDocument();
  });

  test('should render with prefix', () => {
    renderWithDefaultProviders(
      <ColoredIdentifier
        color="red"
        identifier="test id"
        prefix="test prefix"
      />
    );

    expect(screen.getByText('test prefixtest id')).toBeInTheDocument();
  });

  test('should render with style props', () => {
    renderWithDefaultProviders(
      <ColoredIdentifier color="red" identifier="test id" height={10} />
    );

    expect(screen.getByText('test id')).toBeInTheDocument();
  });

  test('should render without identifier', () => {
    renderWithDefaultProviders(
      <ColoredIdentifier color="red" identifier={null} />
    );

    const Identifier = screen.queryByTestId('value');
    expect(Identifier).not.toBeInTheDocument();
  });

  test.each<[string, ColoredIdentifierColor]>([
    ['green', 'green'],
    ['yellow', 'yellow'],
    ['red', 'red'],
    ['gray', 'gray'],
  ])('renders with color style %s', (testCase, color) => {
    renderWithDefaultProviders(
      <ColoredIdentifier color={color} identifier="test id" />
    );

    expect(screen.getByText('test id')).toBeInTheDocument();
  });
});
