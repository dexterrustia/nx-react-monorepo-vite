import styled from '@emotion/styled';
import {
  Backdrop as MuiBackdrop,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';

export type BackdropLoaderProps = {
  /** Shows backdrop and loading indicator */
  loading: boolean;
  /**
   * Optional message to display while loading.
   * Usually used to provide context to the user about what is being loaded if something takes a long time.
   */
  message?: string;
};

export const Backdrop = styled(MuiBackdrop)`
  &&& {
    z-index: ${(props) => props.theme.zIndex.modal + 1};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const MessageWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(8)};
  gap: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.spacing(2)};
  max-width: ${({ theme }) => theme.spacing(84)};
`;

export const BackdropLoader = ({ loading, message }: BackdropLoaderProps) => (
  <Backdrop open={loading} aria-label="Loading backdrop">
    {loading && (
      <Container>
        {!message && <CircularProgress color="inherit" />}
        {!!message && (
          <MessageWrapper>
            <CircularProgress color="primary" />
            <Typography textAlign="center" fontWeight="bold">
              {message}
            </Typography>
          </MessageWrapper>
        )}
      </Container>
    )}
  </Backdrop>
);

export default BackdropLoader;
