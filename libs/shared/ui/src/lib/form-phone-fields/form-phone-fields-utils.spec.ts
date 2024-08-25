import { vi } from 'vitest';

import useTranslation from 'next-translate/useTranslation';
import { phoneTypeOptions } from './form-phone-fields-utils';

vi.mock('next-translate/useTranslation');
const mockUseTranslation = vi.mocked(useTranslation);

describe('phoneTypeOptions', () => {
  test('should return mapped phone type options', () => {
    mockUseTranslation.mockImplementationOnce(() => ({
      lang: 'invalid',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      t: (languageKey: string | TemplateStringsArray) => languageKey as any,
    }));

    const { t } = mockUseTranslation();

    expect(phoneTypeOptions(t)).toEqual([
      {
        id: 'mobile',
        name: 'common:phone.type.mobile',
      },
      {
        id: 'office',
        name: 'common:phone.type.office',
      },
      {
        id: 'private',
        name: 'common:phone.type.private',
      },
    ]);
  });
});
