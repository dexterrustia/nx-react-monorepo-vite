import { useMemo } from 'react';
import { useRouter } from 'next/router';

import nb from 'date-fns/locale/nb';
import enUs from 'date-fns/locale/en-US';
import pl from 'date-fns/locale/pl';
import lt from 'date-fns/locale/lt';

export const useDatePickerLocale = () => {
  const router = useRouter();

  const locale = useMemo(() => {
    let currentLocale = nb;

    switch (router.locale) {
      case 'nb':
        currentLocale = nb;
        break;
      case 'en':
        currentLocale = enUs;
        break;
      case 'pl':
        currentLocale = pl;
        break;
      case 'lt':
        currentLocale = lt;
        break;
    }

    return currentLocale;
  }, [router.locale]);

  return locale;
};
