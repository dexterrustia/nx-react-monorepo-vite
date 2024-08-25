import styled from '@emotion/styled';
import NextLink from 'next/link';
import { Breadcrumbs as MuiBreadCrumbs } from '@mui/material';

export type Breadcrumb = {
  label: string;
  href: string;
};

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

const Link = styled(NextLink)`
  text-decoration: none;
  color: inherit;
`;

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <MuiBreadCrumbs>
      {breadcrumbs.map(({ href, label }, index) => (
        <div key={index}>
          {index === breadcrumbs.length - 1 ? (
            <span>{label}</span>
          ) : (
            <Link href={href}>{label}</Link>
          )}
        </div>
      ))}
    </MuiBreadCrumbs>
  );
};
