import { vi } from 'vitest';

import mediaQuery from 'css-mediaquery';
import useTranslation from 'next-translate/useTranslation';
import { CakeOutlined } from '@mui/icons-material';

import {
  LabelledText,
  LabelledLink,
  LabelledPhone,
  LabelledIcon,
} from './index';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

vi.mock('next-translate/useTranslation');
const mockUseTranslation = vi.mocked(useTranslation);

function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: mediaQuery.match(query, { width }),
    media: '',
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  });
}

beforeEach(() => {
  mockUseTranslation.mockImplementation(() => ({
    lang: 'nb',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: (languageKey: string | TemplateStringsArray) => languageKey as any,
  }));
  window.matchMedia = createMatchMedia(1000);
});

describe('LabelledText', () => {
  test('renders with label and value', () => {
    const { getByText } = renderWithDefaultProviders(
      <LabelledText label="Label" value="Value" center />
    );

    expect(getByText('Label')).toBeInTheDocument();
    expect(getByText('Value')).toBeInTheDocument();
  });

  test('renders correctly with as compact', () => {
    const { getByText } = renderWithDefaultProviders(
      <LabelledText label="Label" value="Value" compact />
    );

    expect(getByText('Label')).toBeInTheDocument();
    expect(getByText('Value')).toBeInTheDocument();
  });

  test('renders correctly with with flex values', () => {
    const { getByText } = renderWithDefaultProviders(
      <LabelledText label="Label" value="Value" labelFlex={2} valueFlex={3} />
    );

    expect(getByText('Label')).toBeInTheDocument();
    expect(getByText('Value')).toBeInTheDocument();
  });

  test('renders label without value when no value is given', () => {
    const { getByText } = renderWithDefaultProviders(
      <LabelledText label="Label" value="" />
    );
    expect(getByText('Label')).toBeInTheDocument();
  });

  test('does not render when no value and hideEmptyValue', () => {
    const { queryByText } = renderWithDefaultProviders(
      <LabelledText label="Label" value="" hideEmptyValue />
    );

    expect(queryByText('Label')).not.toBeInTheDocument();
    expect(queryByText('Value')).not.toBeInTheDocument();
  });

  test('renders without colon', () => {
    const { getByText, queryByText } = renderWithDefaultProviders(
      <LabelledText label="Label" value="Value" disableColon />
    );

    expect(getByText('Label')).toBeInTheDocument();
    expect(queryByText('Label:')).not.toBeInTheDocument();
  });
});

describe('LabelledPhone', () => {
  test('renders with correct type and value', () => {
    const { getAllByText } = renderWithDefaultProviders(
      <LabelledPhone type="mobile" number="98989898" prefix="+47" />
    );

    expect(getAllByText('+47 98989898')[0]).toBeInTheDocument();
    expect(getAllByText('+47 98989898').length).toBe(2);
    expect(getAllByText('common:phone.type.mobile')[0]).toBeInTheDocument();
    expect(getAllByText('common:phone.type.mobile').length).toBe(2);
  });

  test('renders with default type', () => {
    const { getAllByText } = renderWithDefaultProviders(
      <LabelledPhone number="98989898" prefix="+47" />
    );

    expect(getAllByText('common:phone.default')[0]).toBeInTheDocument();
    expect(getAllByText('common:phone.default').length).toBe(2);
  });
});

describe('LabelledText', () => {
  test('renders with correct label and value', () => {
    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <LabelledLink label="test" href="www.google.no" value="value" />
    );

    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
    expect(getByLabelText('New tab icon')).toBeInTheDocument();
  });

  test('renders with default type', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <LabelledLink
        label="test"
        href="www.google.no"
        value="value"
        target="_blank"
      />
    );

    expect(queryByLabelText('New tab icon')).toBeInTheDocument();
  });
  test('renders with default type', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <LabelledLink
        label="test"
        href="www.google.no"
        value="value"
        target="_blank"
      />
    );

    expect(queryByLabelText('New tab icon')).toBeInTheDocument();
  });
});

describe('LabelledIcon', () => {
  test('should render correctly with props', () => {
    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <LabelledIcon icon={<CakeOutlined aria-label="icon" />} label="label" />
    );

    expect(getByLabelText('labelled icon')).toBeInTheDocument();
    expect(getByLabelText('icon')).toBeInTheDocument();
    expect(getByText('label')).toBeInTheDocument();
  });
});
