import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
} from '@mui/material';
import styled from '@emotion/styled';

type SimpleLoaderProps = CircularProgressProps & {
  /** Used to align the loader, defaults to `auto` */
  margin?: string;
  /** Used to center align the loader by wrapping it in a 100% width flex container, defaults to `false` */
  flexWrapper?: boolean;
};

const CircularProgress = styled(({ margin, ...props }: SimpleLoaderProps) => (
  <MuiCircularProgress aria-label="simple loader" {...props} />
))`
  margin: ${({ margin }) => (margin ? margin : 'auto')};
`;

const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SimpleLoader = ({
  flexWrapper,
  ...props
}: SimpleLoaderProps): JSX.Element => {
  if (flexWrapper)
    return (
      <FlexWrapper data-testid="flex-wrapper">
        <CircularProgress {...props} />
      </FlexWrapper>
    );

  return <CircularProgress {...props} />;
};

export default SimpleLoader;
