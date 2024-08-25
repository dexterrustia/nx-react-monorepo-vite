import { Divider as MuiDivider, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import styled from '@emotion/styled';

import { isWebView } from '@xpand/utils/user-agent';

import { Link } from '../link';

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .MuiTypography-h5 {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

const AdornmentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .MuiTypography-h5 {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

const ButtonsWrapper = styled.div<{ adornment?: boolean }>`
  display: flex;
  justify-content: ${({ adornment }) =>
    adornment ? 'space-between' : 'flex-end'};
  margin-top: ${({ theme }) => theme.spacing(8)};
  .MuiTypography-h5 {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

const Container = styled.div<{ pageHasTabs?: boolean; hidden?: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  flex-direction: column;
  padding-bottom: 0;

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-bottom: ${(props) =>
      props.theme.spacing(props.pageHasTabs ? 4 : 0)};
  }

  .MuiTypography-h5 {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;
const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(4)};

  & > div {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing(2)};
  }
`;

const DividerWithHr = styled(MuiDivider)`
  margin-top: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(8)};
`;

const DividerWithoutHr = styled.div`
  height: ${(props) => props.theme.spacing(0.25)};
  margin-top: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

type PageHeaderV3Props = {
  /**
   * Buttons with actions for current page
   * @default undefined
   */
  actions?: ReactNode;
  /**
   * Prefix a component before the action buttons
   */
  adornment?: ReactNode;
  /**
   * Set if you want a back arrow in page header. Typically used instead of breadcrumbs.
   * @default false
   */
  backHref?: string;
  /**
   * Set if you want a divider in page header.
   * @default false
   */
  enableDivider?: boolean;
  /**
   * Set if you have a TabList just below the page header.
   * @default false
   */
  pageHasTabs?: boolean;
  /**
   * Title of the page
   */
  title: string;
};

export const PageHeaderV3 = ({
  actions,
  adornment,
  backHref,
  enableDivider = false,
  pageHasTabs = false,
  title,
}: PageHeaderV3Props) => {
  const theme = useTheme();

  return (
    <Container pageHasTabs={pageHasTabs} hidden={isWebView()}>
      <PageTitleWrapper>
        <div>
          {!!backHref && (
            <Link href={backHref} variant="node">
              <ArrowBackRounded
                aria-label="back arrow icon"
                htmlColor={theme.palette.text.disabled}
              />
            </Link>
          )}
          <Typography variant="h5">{title}</Typography>
        </div>
      </PageTitleWrapper>
      {!!(actions || adornment) && (
        <ButtonsWrapper adornment={!!adornment}>
          {!!adornment && <AdornmentWrapper>{adornment}</AdornmentWrapper>}
          {!!actions && <ActionWrapper>{actions}</ActionWrapper>}
        </ButtonsWrapper>
      )}
      {enableDivider ? <DividerWithHr /> : <DividerWithoutHr />}
    </Container>
  );
};
