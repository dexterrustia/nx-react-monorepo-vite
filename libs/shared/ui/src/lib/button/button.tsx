import {
  CircularProgress,
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from '@mui/material';

export type ButtonProps = MuiButtonProps & {
  /**
   * When true, the button will be disabled and show a loading spinner instead of the startIcon
   * @default false
   */
  isLoading?: boolean;
};

export const Button = ({
  isLoading = false,
  variant = 'contained',
  color = 'primary',
  children,
  ...muiProps
}: ButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      {...muiProps}
      disabled={isLoading || muiProps.disabled}
      startIcon={
        isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          muiProps.startIcon
        )
      }
    >
      {children}
    </MuiButton>
  );
};

export default Button;
