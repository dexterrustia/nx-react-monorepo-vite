import { useMemo } from 'react';
import { nbNO, enUS, plPL } from '@mui/x-data-grid/locales';
import useTranslation from 'next-translate/useTranslation';

export const useDataGridLocale = () => {
  const { lang: locale } = useTranslation();

  const language = useMemo(() => {
    let lang = nbNO;

    switch (locale) {
      case 'nb':
        lang = nbNO;
        break;
      case 'en':
        lang = enUS;
        break;
      case 'pl':
        lang = plPL;
        break;
      case 'lt':
        lang = enUS;

      //Add more languages here..
    }
    return lang?.components?.MuiDataGrid?.defaultProps?.localeText;
  }, [locale]);

  return language;
};
