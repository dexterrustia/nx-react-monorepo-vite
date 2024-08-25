import { renderWithDefaultProviders } from '@xpand/ui/_test';

import InfoBox from './info-box';

describe('InfoBox', () => {
  test('renders correctly with only required props', () => {
    const { getByText } = renderWithDefaultProviders(<InfoBox body="body" />);

    const Body = getByText('body');
    const Title = getByText('Info');

    expect(Body).toBeInTheDocument();
    expect(Title).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    const { getByText } = renderWithDefaultProviders(
      <InfoBox body="body" title="title" />
    );

    const Title = getByText('title');
    expect(Title).toBeInTheDocument();
  });

  test('renders without title', () => {
    const { queryByText } = renderWithDefaultProviders(
      <InfoBox body="body" disableTitle />
    );

    const Title = queryByText('Info');
    expect(Title).not.toBeInTheDocument();
  });

  test('renders with a given variant', () => {
    const { getByText } = renderWithDefaultProviders(
      <InfoBox body="body" variant="error" />
    );

    const Title = getByText('Error');
    expect(Title).toBeInTheDocument();
  });

  test('renders with a given variant and a given title', () => {
    const { getByText } = renderWithDefaultProviders(
      <InfoBox body="body" variant="warning" title="title" />
    );

    const Title = getByText('title');
    expect(Title).toBeInTheDocument();
  });

  test('renders with margin props', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <InfoBox body="body" marginTop={5} marginBottom={5} />
    );

    const Box = getByLabelText('info box');
    expect(Box).toBeInTheDocument();
  });

  test('renders with example fields', () => {
    const { getByText } = renderWithDefaultProviders(
      <InfoBox
        body="body"
        examples={[
          {
            component: <div>Example component</div>,
            left: 'Top text',
            right: 'Bottom text',
          },
        ]}
      />
    );

    const Component = getByText('Example component');
    const TopText = getByText('Top text');
    const BottomText = getByText('Bottom text');

    expect(Component).toBeInTheDocument();
    expect(TopText).toBeInTheDocument();
    expect(BottomText).toBeInTheDocument();
  });

  test('render with `rows` examples layout', () => {
    const { getByText } = renderWithDefaultProviders(
      <InfoBox
        body="body"
        examplesLayout="row"
        examples={[
          {
            component: <div>Example component</div>,
            left: 'Top text',
            right: 'Bottom text',
          },
        ]}
      />
    );

    const Component = getByText('Example component');
    const TopText = getByText('Top text');
    const BottomText = getByText('Bottom text');

    expect(Component).toBeInTheDocument();
    expect(TopText).toBeInTheDocument();
    expect(BottomText).toBeInTheDocument();
  });
});
