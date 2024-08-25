import styled from '@emotion/styled';
import { TabList as MuiTabList, TabPanel as MuiTabPanel } from '@mui/lab';

export const TabList = styled(MuiTabList)`
  && {
    box-shadow: ${(props) =>
      `inset -1px -2px 0px -1px ${props.theme.palette.grey[400]}`};
    margin-bottom: ${(props) => props.theme.spacing(2)};
    font-family: 'Roboto';

    .MuiTab-root {
      text-transform: none;
    }

    .MuiButtonBase-root {
      font-weight: 400;

      &.Mui-selected {
        font-weight: 500;
      }
    }

    .MuiTab-textColorInherit.Mui-selected,
    .MuiTabs-indicator {
      opacity: 0.7;
    }

    .MuiTabs-indicator {
      background-color: ${({ theme }) => theme.palette.primary[700]};
      min-height: ${({ theme }) => theme.spacing(0.7)};
    }
  }
`;

export const TabButtonWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  .MuiTabs-root {
    width: 100%;
  }

  .MuiButtonGroup-root {
    position: absolute;
    right: 0;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

export const TabPanel = styled(MuiTabPanel)`
  padding: 0;
`;
