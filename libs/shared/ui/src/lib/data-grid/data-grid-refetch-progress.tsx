import styled from '@emotion/styled';
import { LinearProgress, Typography } from '@mui/material';

export type DataGridRefetchProgressProps = {
  label?: string;
  visible?: boolean;
};

const Container = styled.div`
  opacity: 1;
  min-height: ${({ theme }) => theme.spacing(6)};
`;

export const DataGridRefetchProgress = ({
  label,
  visible,
}: DataGridRefetchProgressProps): JSX.Element => {
  return (
    <Container>
      {visible && (
        <>
          {!!label && <Typography variant="body2">{label}</Typography>}
          <LinearProgress />
        </>
      )}
    </Container>
  );
};
