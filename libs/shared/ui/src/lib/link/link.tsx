import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

export type LinkProps = {
  /** The react element to be rendered inside the link */
  children: ReactNode;
  /**
   * The variant of the link styling. Choose this depending on your `children` prop. Defaults to `text`.
   * `node` - for any react element. This will render the provided element as is without any link styling.
   * `text` - for text. This will render a link with an underline.
   */
  variant?: 'node' | 'text';
  /** Disables the link */
  disabled?: boolean;
  /** Target of the link. Defaults to `_self`. */
  target?: '_blank' | '_self';
  /** How to display the link. Defaults to `flex`. */
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & NextLinkProps<any>;

const StyledNextLink = styled(
  ({ disabled, variant, display, ...props }: LinkProps) => (
    <NextLink {...props} />
  )
)`
  width: fit-content;
  align-items: center;

  display: ${({ display }) => display};

  color: ${({ theme }) => theme.palette.link.main};

  text-decoration: ${({ variant }) =>
    variant === 'text' ? 'underline' : 'none'};
`;

const StyledLink = styled.a<Pick<LinkProps, 'variant' | 'display'>>`
  width: fit-content;
  align-items: center;

  display: ${({ display }) => display};

  color: ${({ theme }) => theme.palette.link.main};

  text-decoration: ${({ variant }) =>
    variant === 'text' ? 'underline' : 'none'};

  cursor: pointer;
`;

const DisabledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]};
  text-decoration: underline;
`;

export const Link = ({
  children,
  variant = 'text',
  disabled = false,
  target = '_self',
  display = 'flex',
  ...props
}: LinkProps): JSX.Element => {
  return (
    <>
      {!disabled && target === '_self' && (
        <StyledNextLink {...props} variant={variant} display={display}>
          {children}
        </StyledNextLink>
      )}
      {!disabled && target === '_blank' && (
        <StyledLink
          target={target}
          variant={variant}
          display={display}
          href={props.href as string}
          className="link"
        >
          {children}
        </StyledLink>
      )}
      {disabled && variant === 'text' && (
        <DisabledTypography variant="body2">{children}</DisabledTypography>
      )}
      {disabled && variant === 'node' && <div>{children}</div>}
    </>
  );
};

export default Link;
