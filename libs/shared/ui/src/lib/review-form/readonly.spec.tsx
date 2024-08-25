import { vi } from 'vitest';

import useTranslation from 'next-translate/useTranslation';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

import { renderReadonlyReviewFormValues } from './readonly';

vi.mock('next-translate/useTranslation');
const mockUseTranslation = vi.mocked(useTranslation);

describe('Readonly form', () => {
  test('renders correct readonly form inputs based on input', async () => {
    mockUseTranslation.mockImplementationOnce(() => ({
      lang: 'nb',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      t: (languageKey: string | TemplateStringsArray) => languageKey as any,
    }));
    const inputs: Record<
      string,
      | string
      | number
      | boolean
      | Date
      | Array<Record<string, string | number | boolean>>
    > = {
      input1: '1value',
      input2: 2,
      input3: true,
      input4: false,
      input5: [
        { input5a: '5avalue' },
        { input5b: 5 },
        { input5c: true },
        { input5d: false },
      ],
      input6: '',
      input7: new Date(2000, 11, 31), // months are 0-indexed
    };
    const { t } = mockUseTranslation();
    const { queryByText, getByText } = renderWithDefaultProviders(
      <>
        {Object.entries(inputs).map(
          renderReadonlyReviewFormValues({
            namespace: 'namespace',
            step: 'step',
            t,
          })
        )}
      </>
    );
    expect(getByText('1value')).toBeInTheDocument();
    expect(getByText(2)).toBeInTheDocument();
    expect(getByText('5avalue')).toBeInTheDocument();
    expect(getByText(5)).toBeInTheDocument();
    expect(getByText('31.12.2000')).toBeInTheDocument();
    expect(getByText('namespace:step.input1.label')).toBeInTheDocument();
    expect(getByText('namespace:step.input2.label')).toBeInTheDocument();
    expect(getByText('namespace:step.input3.label')).toBeInTheDocument();
    expect(
      getByText('namespace:step.input5.input5a.label')
    ).toBeInTheDocument();
    expect(
      getByText('namespace:step.input5.input5b.label')
    ).toBeInTheDocument();
    expect(
      getByText('namespace:step.input5.input5c.label')
    ).toBeInTheDocument();
    expect(queryByText('namespace:step.input6.label')).not.toBeInTheDocument();
    expect(getByText('namespace:step.input7.label')).toBeInTheDocument();
  });
});
