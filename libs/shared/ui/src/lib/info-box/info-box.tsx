import styled from '@emotion/styled';
import { ReactNode } from 'react';
import {
  CheckCircleRounded,
  InfoRounded,
  WarningRounded,
} from '@mui/icons-material';
import {
  Alert as MuiAlert,
  AlertProps,
  AlertTitle,
  Typography,
} from '@mui/material';
import { capitalizeFirstLetter } from '@xpand/utils/string';

type ExampleType = {
  /** Component to be diplayed in the example component */
  component: ReactNode;
  /** Text to the left of the component */
  left?: string;
  /** Text placed to the right of the component */
  right?: string;
};

export type InfoBoxProps = Omit<AlertProps, 'icon' | 'color' | 'variant'> & {
  /** The main text displayed in the info box */
  body: string;
  /** Sets the variant of color and icon. Default is `info` */
  variant?: AlertProps['color'];
  /** Text displayed at the top of the info box. Default is the `variant` passed as prop */
  title?: string;
  /** Hides the title */
  disableTitle?: boolean;
  /** Sets the margin at the bottom of the info box. Default is `2` */
  marginBottom?: number;
  /** Sets the margin at the top of the info box. Default is `0` */
  marginTop?: number;
  /** Examples of texts and components to be shown in the info box */
  examples?: ExampleType[];
  /** Alignment of the example content, defaults to `columns` */
  examplesLayout?: 'column' | 'row';
};

type Variant = {
  icon: ReactNode;
  color: AlertProps['color'];
};

type Variants = {
  info: Variant;
  success: Variant;
  warning: Variant;
  error: Variant;
};

const Alert = styled(
  ({
    marginBottom,
    marginTop,
    ...props
  }: AlertProps & Pick<InfoBoxProps, 'marginBottom' | 'marginTop'>) => (
    <MuiAlert {...props} />
  )
)`
  margin-bottom: ${({ theme: { spacing }, marginBottom }) =>
    marginBottom ? spacing(marginBottom) : spacing(2)};

  margin-top: ${({ theme: { spacing }, marginTop }) =>
    marginTop ? spacing(marginTop) : spacing(2)};
  white-space: break-spaces;
`;

const ExamplesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme: { spacing } }) => spacing(2)};
`;

const Example = styled.div<Pick<InfoBoxProps, 'examplesLayout'>>`
  width: 100%;
  display: flex;
  flex-direction: ${({ examplesLayout }) => examplesLayout};
  align-items: ${({ examplesLayout }) => examplesLayout === 'row' && 'center'};

  margin-bottom: ${({ theme, examplesLayout }) =>
    theme.spacing(examplesLayout === 'column' ? 2 : 0)};

  & > div {
    margin-top: ${({ theme, examplesLayout }) =>
      theme.spacing(examplesLayout === 'column' ? 1 : 0)};
    margin-bottom: ${({ theme, examplesLayout }) =>
      theme.spacing(examplesLayout === 'column' ? 1 : 0)};

    margin-left: ${({ theme, examplesLayout }) =>
      theme.spacing(examplesLayout === 'row' ? 2 : 0)};
    margin-right: ${({ theme, examplesLayout }) =>
      theme.spacing(examplesLayout === 'row' ? 2 : 0)};
  }
`;

export const InfoBox = ({
  variant,
  title,
  body,
  disableTitle,
  marginBottom,
  marginTop,
  examples,
  examplesLayout,
  ...props
}: InfoBoxProps): JSX.Element => {
  const variantsMap: Variants = {
    info: {
      icon: <InfoRounded aria-label="info icon" color="info" />,
      color: 'info',
    },
    success: {
      icon: <CheckCircleRounded aria-label="success icon" color="success" />,
      color: 'success',
    },
    warning: {
      icon: <WarningRounded aria-label="warning icon" color="warning" />,
      color: 'warning',
    },
    error: {
      icon: <WarningRounded aria-label="error icon" color="error" />,
      color: 'error',
    },
  };

  const currentVariant = variantsMap[variant || 'info'];

  return (
    <Alert
      aria-label="info box"
      {...props}
      icon={currentVariant.icon}
      color={currentVariant.color}
      marginBottom={marginBottom}
      marginTop={marginTop}
    >
      {!disableTitle && (
        <AlertTitle>
          {title || capitalizeFirstLetter(variant || 'info')}
        </AlertTitle>
      )}
      <Typography>{body}</Typography>
      {examples && (
        <ExamplesWrapper>
          {examples.map((example, index) => (
            <Example key={index} examplesLayout={examplesLayout || 'column'}>
              <Typography>{example.left}</Typography>
              <div>{example.component}</div>
              <Typography>{example.right}</Typography>
            </Example>
          ))}
        </ExamplesWrapper>
      )}
    </Alert>
  );
};

export default InfoBox;
