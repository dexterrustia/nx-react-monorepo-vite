import { describe, test, expect, vi } from 'vitest';

import { fireEvent, waitFor } from '@testing-library/react';
import {
  nextRouterProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import PageHeader from './page-header';

describe('PageHeader', () => {
  test('renders with title', () => {
    const { getByText } = renderWithDefaultProviders(
      <PageHeader title="Application page" />,
      { outerWrappers: [nextRouterProviderWrapper()] }
    );

    const Title = getByText('Application page');
    expect(Title).toBeInTheDocument();
  });

  test('renders with actions', () => {
    const { getByText } = renderWithDefaultProviders(
      <PageHeader title="Application page" actions={<p>Action</p>} />,
      { outerWrappers: [nextRouterProviderWrapper()] }
    );

    const Action = getByText('Action');
    expect(Action).toBeInTheDocument();
  });

  test('renders with disabled breadcrumbs', () => {
    const { getByText } = renderWithDefaultProviders(
      <PageHeader
        title="Application page"
        actions={<p>Action</p>}
        disableBreadcrumbs
      />,
      { outerWrappers: [nextRouterProviderWrapper()] }
    );

    const Action = getByText('Action');
    expect(Action).toBeInTheDocument();
  });

  test('renders with child elements', () => {
    const { getByText } = renderWithDefaultProviders(
      <PageHeader title="Application page">
        <h1>Action</h1>
      </PageHeader>,
      { outerWrappers: [nextRouterProviderWrapper()] }
    );

    const Action = getByText('Action');
    expect(Action).toBeInTheDocument();
  });

  test('render contains element', () => {
    const { getByText } = renderWithDefaultProviders(
      <PageHeader title="Application page" wizardName={['String']}>
        <h1>Action</h1>
      </PageHeader>,
      { outerWrappers: [nextRouterProviderWrapper()] }
    );

    const WizardName = getByText('String');
    expect(WizardName).toBeInTheDocument();
  });

  test('renders with `onBack` prop and calls router push after click', async () => {
    const mockOnBack = vi.fn();
    const mockNextRouterPush = vi.fn();

    const { getByLabelText } = renderWithDefaultProviders(
      <PageHeader title="Application page" showBackArrow onBack={mockOnBack} />,
      {
        outerWrappers: [
          nextRouterProviderWrapper({
            options: {
              router: {
                push: mockNextRouterPush,
              },
            },
          }),
        ],
      }
    );

    const BackIcon = getByLabelText('back arrow icon');
    fireEvent.click(BackIcon);

    expect(mockOnBack).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockNextRouterPush).toHaveBeenCalled();
    });
  });
});
