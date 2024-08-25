import styled from '@emotion/styled';
import {
  Typography,
  ButtonProps as MuiButtonProps,
  TypographyProps as MuiTypographyProps,
  IconButton,
} from '@mui/material';

type LabelledIconButtonProps = {
  icon: React.ReactNode;
  label: string;
  buttonProps?: Omit<MuiButtonProps, 'children'>;
  typographyProps?: Omit<MuiTypographyProps, 'children'>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};

  .MuiIconButton-root {
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: ${({ theme }) => theme.spacing(1)};
    padding: 0;
  }

  svg {
    color: ${({ theme }) => theme.palette.common.white};
    font-size: ${({ theme }) => theme.spacing(9)};
  }
`;

export const LabelledIconButton = ({
  icon,
  label,
  buttonProps,
  typographyProps,
}: LabelledIconButtonProps) => {
  return (
    <Container>
      <Typography variant="body1" {...typographyProps}>
        {label}
      </Typography>
      <IconButton {...buttonProps}>{icon}</IconButton>
    </Container>
  );
};

export default LabelledIconButton;
