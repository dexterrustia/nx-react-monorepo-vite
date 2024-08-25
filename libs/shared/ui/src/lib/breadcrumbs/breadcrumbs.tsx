import NextLink from 'next/link';
import { useCallback } from 'react';
import styled from '@emotion/styled';
import { Typography as MuiTypography } from '@mui/material';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/dist/client/router';

const Typography = styled(MuiTypography)`
  cursor: pointer;
`;

const ActiveLastBreadCrumb = styled(Typography)`
  cursor: default;
`;

export type customURLs = { [key: string]: string };
const Link = styled(NextLink)`
  text-decoration: none;
  color: inherit;
`;

type BreadCrumbsParams = {
  /** path that needs to hide in breadcrumbs */
  pathToReplace?: { path: string; newValue: string; pathUrl?: string }[];
  customUrls?: customURLs;
};

export const Breadcrumbs = ({
  pathToReplace,
  customUrls,
}: BreadCrumbsParams): JSX.Element => {
  const { t } = useTranslation();
  const { pathname, query } = useRouter();

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

    if (query.arc) {
      breadCrumbPath = `${breadCrumbPath.split('/')[1]}/${query.arc}${
        query.id ? `/${query.id}` : ''
      }`;
    }

    if (customUrls && customUrls[pathname]) {
      breadCrumbPath = breadCrumbPath.replace(pathname, customUrls[pathname]);
    }

    /** Must be last -- final override for paths */
    if (pathToReplace) {
      pathToReplace.map((item) => {
        breadCrumbPath = breadCrumbPath.replace(item.path, item.newValue);
      });
    }

    return breadCrumbPath.split('/').filter((x) => x);
  }, [pathname, query]);

  const transformPathNameToDisplayText = (path: string) => {
    const paths = path
      .replace(/-/g, ' ')
      .split('/')
      .filter((x) => x);
    const lastPathName = paths[paths.length - 1];
    if (lastPathName === '[id]') {
      // dynamic paths in next will return the dynamic name, not the actual id
      return '';
    }
    return `${lastPathName[0].toUpperCase()}${lastPathName.slice(1)}`;
  };

  const hasTranslation = (path: string) => {
    let translate = true;
    const isDocumentNoneStandardFolder =
      pathnames()[0] === 'documents' &&
      path !== 'documents' &&
      path !== path.toUpperCase();
    const isID = !isNaN(Number(path));
    if (isDocumentNoneStandardFolder || isID) {
      translate = false;
    }
    return translate;
  };
  const camelize = (path: string) => {
    let camelize = '';
    path
      .split('-')
      .map(
        (str) =>
          (camelize = camelize + str.charAt(0).toUpperCase() + str.slice(1))
      );
    return camelize.charAt(0).toLowerCase() + camelize.slice(1);
  };

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <Typography>{t('common:breadcrumbs.home')}</Typography>
      </Link>
      {pathnames().map((value, index) => {
        const last = index === pathnames().length - 1;
        const label = value.includes('-') ? camelize(value) : value;

        let to = `/${pathnames()
          .slice(0, index + 1)
          .join('/')}`;

        if (query.arc && index > 0) {
          to = `/${pathname.split('/')[1]}/${value}?arc=${
            query.arc.toString().split(`${value}`)[0]
          }`;
        }

        if (pathToReplace) {
          const pathUrl = pathToReplace.find((item) => item.newValue === value)
            ?.pathUrl;

          if (pathUrl) {
            to = pathUrl;
          }
        }
        return last ? (
          <ActiveLastBreadCrumb key={to}>
            {hasTranslation(label)
              ? t(`common:breadcrumbs.${label}`)
              : transformPathNameToDisplayText(label)}
          </ActiveLastBreadCrumb>
        ) : (
          <Link href={to} key={to}>
            <Typography>
              {hasTranslation(label)
                ? t(`common:breadcrumbs.${label}`)
                : transformPathNameToDisplayText(label)}
            </Typography>
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
