import { describe, test, expect } from 'vitest';

import { renderWithDefaultProviders } from '@xpand/ui/_test';

import Link from './link';

describe('Link', () => {
  test('should render successfully with children', () => {
    const { getByText } = renderWithDefaultProviders(
      <Link href="/">Text</Link>
    );
    expect(getByText('Text')).toBeInTheDocument();
  });

  test('should render as typography when disabled', () => {
    const { getByText } = renderWithDefaultProviders(
      <Link href="/" disabled>
        Text
      </Link>
    );
    expect(getByText('Text')).toHaveClass('MuiTypography-root');
  });

  test('should render as an <a/> tag when not disabled', () => {
    const { container } = renderWithDefaultProviders(
      <Link href="/">Text</Link>
    );
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  test('should render as a <div/> tag when disabled and variant is node', () => {
    const { container } = renderWithDefaultProviders(
      <Link href="/" disabled variant="node">
        <div>Text</div>
      </Link>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
