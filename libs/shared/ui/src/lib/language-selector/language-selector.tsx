import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Box, IconButton } from '@mui/material';

import { Language } from '@xpand/utils/_types';

import { FlagNorwayIcon } from '../icons/flag-norway';
import { FlagGreatBritainIcon } from '../icons/flag-great-britain';

const ButtonWrapper = styled.div<{ isFocused: boolean }>`
  transform: ${({ isFocused }) => (isFocused ? 'scale(1)' : 'scale(0.8)')};

  img {
    box-shadow: ${({ isFocused, theme }) =>
      isFocused ? theme.shadows[5] : 'none'};
    border-radius: 50%;
  }
`;

export const LanguageSelector = () => {
  const router = useRouter();

  const handleSelectLanguage = (language: Language) => () => {
    if (language !== router.locale) {
      router.push(router.pathname, router.pathname, {
        locale: language,
      });
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <ButtonWrapper isFocused={router.locale === Language.Norwegian}>
        <IconButton onClick={handleSelectLanguage(Language.Norwegian)}>
          <Box height={32}>
            <FlagNorwayIcon size="small" />
          </Box>
        </IconButton>
      </ButtonWrapper>
      <ButtonWrapper isFocused={router.locale === Language.English}>
        <IconButton onClick={handleSelectLanguage(Language.English)}>
          <Box height={32}>
            <FlagGreatBritainIcon size="small" />
          </Box>
        </IconButton>
      </ButtonWrapper>
    </Box>
  );
};

export default LanguageSelector;
