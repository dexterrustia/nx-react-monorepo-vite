import styled from '@emotion/styled';

export type ColoredIdentifierColor =
  | 'red'
  | 'yellow'
  | 'green'
  | 'gray'
  | 'white';

export type ColoredIdentifierProps = {
  identifier: number | string | null | undefined;
  color: ColoredIdentifierColor;
  prefix?: string;
  height?: number;
};

type ContainerProps = Required<
  Pick<ColoredIdentifierProps, 'color' | 'height'>
>;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: ${({ theme }) => theme.spacing(9)};
  height: ${({ theme, height }) => theme.spacing(height)};

  padding: ${({ theme }) => theme.spacing(1)};

  background-color: ${({ color, theme }) => {
    switch (color) {
      case 'yellow':
        return theme.palette.warning['100'];
      case 'red':
        return theme.palette.error['100'];
      case 'green':
        return theme.palette.success['100'];
      case 'gray':
        return theme.palette.grey[100];
      case 'white':
        return theme.palette.background.default;
    }
  }};

  white-space: nowrap;
`;

export const ColoredIdentifier = ({
  identifier,
  color,
  prefix = '',
  height = 9,
}: ColoredIdentifierProps) => {
  const value = identifier ? `${prefix ? `${prefix}` : ''}${identifier}` : '';

  return (
    <Container color={color} height={height}>
      {!!identifier && <span data-testid="value">{value}</span>}
    </Container>
  );
};

export default ColoredIdentifier;
