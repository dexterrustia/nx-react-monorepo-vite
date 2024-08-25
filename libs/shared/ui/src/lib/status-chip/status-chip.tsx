import styled from '@emotion/styled';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';

export type Status = 'success' | 'danger' | 'warning' | 'neutral' | 'info';

export type StatusChipProps = MuiChipProps & {
  status?: Status;
  fullWidth?: boolean;
  /**
   * If true, the chip will be big
   */
  big?: boolean;
};

const Chip = styled(({ status, fullWidth, big, ...props }: StatusChipProps) => (
  <MuiChip {...props} />
))`
  background-color: ${({ theme, status }) =>
    status === 'success' && theme.palette.success[100]};

  background-color: ${({ theme, status }) =>
    status === 'info' && theme.palette.info[100]};

  background-color: ${({ theme, status }) =>
    status === 'danger' && theme.palette.error[100]};

  background-color: ${({ theme, status }) =>
    status === 'warning' && theme.palette.warning[100]};

  background-color: ${({ theme, status }) =>
    status === 'neutral' && theme.palette.grey[300]};

  .MuiChip-label {
    color: ${({ theme }) => theme.palette.grey[900]};
    font-weight: ${({ theme }) => theme.mixins.fontWeight.bold};
  }

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const StatusChip = ({ big, ...props }: StatusChipProps): JSX.Element => {
  if (big) {
    return (
      <Chip
        aria-label="status indicator"
        {...props}
        style={{
          borderRadius: 5,
          padding: '6px 16px',
          minHeight: 36.5,
          fontSize: 14,
          textTransform: 'uppercase',
        }}
      ></Chip>
    );
  }

  return <Chip aria-label="status indicator" {...props}></Chip>;
};

export default StatusChip;
