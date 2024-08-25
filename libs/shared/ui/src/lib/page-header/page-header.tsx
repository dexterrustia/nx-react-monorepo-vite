import styled from '@emotion/styled';
import { ReactNode, useCallback } from 'react';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import MuiArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import Breadcrumbs from '../breadcrumbs';
import { Link } from '../link';

export type PathToReplaceProps = {
  /*path*/
  path: string;
  /* NewValue should be a key in translation */
  newValue: string;
  /* pathUrl to breadbrum item */
  pathUrl?: string;
};

export type PageHeaderProps = {
  /** Title of page */
  title: string;
  /** Show name of the wizard */
  wizardName?: string[];
  /** List of paths that needs to replace in breadcrumbs */
  pathToReplace?: PathToReplaceProps[];
  /** Buttons with actions for current page */
  actions?: ReactNode;
  /** Set if you don't want breadcrumbs in page header */
  disableBreadcrumbs?: boolean;
  /** Set if you want an arrow to navigate one step back in the site hierarchy (typically instead of breadcrumbs) */
  showBackArrow?: boolean;
  /** Set to `false` if you have a TabList just below the page header. Default is `true` */
  marginBottom?: boolean;
  /** Set if you want to specify where to redirect when back button is clicked*/
  backPath?: string;
  /** Children elements if any */
  children?: JSX.Element;
  /** When defined, replaces the link wrappen around the back icon and renders an icon with an onClick prop. The function passed is triggered before the user is pushed to the url */
  onBack?: () => void | Promise<void>;
};

const Header = styled(
  ({
    marginBottom,
    ...props
  }: Omit<BoxProps, 'marginBottom'> & { marginBottom?: boolean }) => (
    <Box {...props} />
  )
)`
  &&& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${(props) =>
      props.marginBottom &&
      `
      margin-bottom: ${props.theme.spacing(7)};
      border-bottom: ${props.theme.mixins.header.borderBottom};
    `}

    @media only screen and (max-width: 425px) {
      display: block;

      div {
        display: block;
      }
    }
  }
`;

const Heading = styled(Box)`
  display: flex;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing(4)};

  .MuiBox-root {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }

  @media only screen and (max-width: 425px) {
    .MuiBox-root {
      margin-left: 0;
    }
  }
`;

const WizardName = styled(Box)`
  color: ${({ theme }) => theme.palette.link.main};
  :last-child {
    margin-left: ${({ theme }) => theme.spacing(20)};
  }
`;

const ArrowBackIcon = styled(MuiArrowBackIcon)`
  && {
    align-self: center;
    margin-right: ${(props) => props.theme.spacing(3)};
    cursor: pointer;
  }
`;

const Title = styled(
  ({
    disableBreadcrumbs,
    ...props
  }: TypographyProps & { disableBreadcrumbs?: boolean }) => (
    <Typography {...props} />
  )
)`
  &&& {
    font-family: 'Roboto';
    display: flex;
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    margin-bottom: ${(props) =>
      props.disableBreadcrumbs
        ? props.theme.spacing(0)
        : props.theme.spacing(0)};

    @media only screen and (max-width: 425px) {
      margin-bottom: ${(props) => props.theme.spacing(3)};
    }
  }
`;

const Actions = styled(
  ({ hasChildren, ...props }: BoxProps & { hasChildren?: boolean }) => (
    <Box {...props} />
  )
)`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  margin-top: ${(props) => (props.hasChildren ? 'auto' : 'none')};
  margin-bottom: ${(props) => (props.hasChildren ? '5px' : 'none')};

  @media only screen and (max-width: 768px) {
    margin-bottom: ${(props) => props.theme.spacing(3)};
  }
`;

const Sub = styled(Box)``;

/**
 * @deprecated Use `PageHeaderV2` instead
 */
export const PageHeader = ({
  title,
  wizardName,
  pathToReplace,
  actions,
  disableBreadcrumbs,
  showBackArrow,
  backPath,
  marginBottom = true,
  children,
  onBack,
}: PageHeaderProps): JSX.Element => {
  const { pathname, query, push } = useRouter();

  const pathnames = useCallback(() => {
    let breadCrumbPath = '';
    breadCrumbPath = pathname;

    if (query) {
      Object.keys(query)?.forEach((queryItem) => {
        breadCrumbPath = breadCrumbPath.replace(
          `[${queryItem}]`,
          (query as Record<string, string>)[queryItem]
        );
      });
    }

    return breadCrumbPath.split('/').filter((x) => x);
  }, [pathname]);

  const backHref = `/${pathnames()
    .slice(0, pathnames.length - 1)
    .join('/')}`;

  const backUrl = backPath || backHref;

  const handleOnBack = async () => {
    await onBack?.();
    push(backUrl);
  };

  return (
    <>
      <Header marginBottom={marginBottom}>
        <Heading>
          {children ? (
            <Box width="auto">
              <Title
                variant="h5"
                aria-label="page-title"
                disableBreadcrumbs={disableBreadcrumbs}
              >
                {showBackArrow && (
                  <Link href={backUrl} variant="node">
                    <ArrowBackIcon aria-label="back arrow icon" />
                  </Link>
                )}
                {title}
              </Title>
              {children}
            </Box>
          ) : (
            <Title
              variant="h5"
              aria-label="page-title"
              disableBreadcrumbs={disableBreadcrumbs}
            >
              {showBackArrow && (
                <>
                  {onBack ? (
                    <ArrowBackIcon
                      aria-label="back arrow icon"
                      onClick={handleOnBack}
                    />
                  ) : (
                    <Link href={backUrl} variant="node">
                      <ArrowBackIcon aria-label="back arrow icon" />
                    </Link>
                  )}
                </>
              )}
              {title}
            </Title>
          )}

          {disableBreadcrumbs ? null : (
            <Sub>
              <Breadcrumbs pathToReplace={pathToReplace} />
            </Sub>
          )}
        </Heading>
        <Actions hasChildren={children ? true : false}>
          <WizardName width="auto">
            <Title variant="h5">
              {wizardName?.map((name) => {
                return name + ' ';
              })}
            </Title>
          </WizardName>
          {actions ? actions : null}
        </Actions>
      </Header>
    </>
  );
};

export default PageHeader;
