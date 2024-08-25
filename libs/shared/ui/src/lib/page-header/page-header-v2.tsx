import styled from '@emotion/styled';
import { Divider as MuiDivider, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { Breadcrumbs, type Breadcrumb } from './breadcrumbs';
import { Link } from '../link';
import useTranslation from 'next-translate/useTranslation';
import { isWebView } from '@xpand/utils/user-agent';

type PageHeaderV2Props = {
  /**
   * Title of the page
   */
  title: string;
  /**
   * Labels and links for breadcrumbs. By default the first breadcrumb is the home page.
   * This can be overridden by setting `homeBreadcrumbOverride`.
   * @default [{ href: '/', label: t('common:breadcrumbs.home') }]
   */
  breadcrumbs?: Breadcrumb[];
  /**
   * Override the home breadcrumb. By default the first breadcrumb is the home page.
   * @default undefined
   */
  homeBreadcrumbOverride?: Breadcrumb;
  /**
   * Secondary title of page
   * @default undefined
   */
  secondaryTitle?: string;
  /**
   * Buttons with actions for current page
   * @default undefined
   */
  actions?: ReactNode;
  /**
   * Set if you want a back arrow in page header. Typically used instead of breadcrumbs.
   * @default false
   */
  backHref?: string;
  /**
   * When `true` the divider is not rendered
   * @default false
   */
  disableDivider?: boolean;
  /**
   * Set if you have a TabList just below the page header.
   * @default false
   */
  pageHasTabs?: boolean;
};

const Container = styled.div<{ pageHasTabs?: boolean; hidden?: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  flex-direction: column;

  padding-bottom: 0;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-bottom: ${(props) =>
      props.theme.spacing(props.pageHasTabs ? 4 : 0)};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .MuiTypography-h5 {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

const PageTitlePathWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(4)};

  & > div {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing(2)};
  }
`;

const BreadcrumbsWrapper = styled.div`
  & > nav {
    display: none;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      display: block;
    }
  }
`;

const SecondaryTitleActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(4)};

  .MuiTypography-h5 {
    display: none;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      display: block;
    }
    color: ${({ theme }) => theme.palette.link.main};
  }
`;

const Divider = styled(MuiDivider)`
  margin-top: ${(props) => props.theme.spacing(2)};
  margin-bottom: ${(props) => props.theme.spacing(8)};
`;

export const PageHeaderV2 = ({
  title,
  breadcrumbs = [],
  homeBreadcrumbOverride,
  secondaryTitle,
  actions,
  backHref,
  disableDivider = false,
  pageHasTabs = false,
}: PageHeaderV2Props) => {
  const { t } = useTranslation();

  const homeBreadcrumb: Breadcrumb = {
    href: '/',
    label: t('common:breadcrumbs.home'),
  };

  const breadcrumbsToRender = homeBreadcrumbOverride
    ? [homeBreadcrumbOverride, ...breadcrumbs]
    : [homeBreadcrumb, ...breadcrumbs];

  return (
    <Container pageHasTabs={pageHasTabs} hidden={isWebView()}>
      <ContentWrapper>
        <PageTitlePathWrapper>
          <div>
            {!!backHref && (
              <Link href={backHref} variant="node">
                <ArrowBackRounded aria-label="back arrow icon" />
              </Link>
            )}
            <Typography variant="h5">{title}</Typography>
          </div>
          {!!breadcrumbs.length && (
            <BreadcrumbsWrapper>
              <Breadcrumbs breadcrumbs={breadcrumbsToRender} />
            </BreadcrumbsWrapper>
          )}
        </PageTitlePathWrapper>
        {!!(secondaryTitle || actions) && (
          <SecondaryTitleActionsWrapper>
            {!!secondaryTitle && (
              <Typography variant="h5">{secondaryTitle}</Typography>
            )}
            {!!actions && <div>{actions}</div>}
          </SecondaryTitleActionsWrapper>
        )}
      </ContentWrapper>
      {!disableDivider && <Divider />}
    </Container>
  );
};
