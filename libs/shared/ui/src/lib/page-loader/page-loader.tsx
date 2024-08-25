import { Backdrop as MuiBackdrop, LinearProgress } from '@mui/material';
import styled from '@emotion/styled';
import Image from 'next/image';

type PageLoaderProps = {
  disableLinearProgress?: boolean;
};

// Note: Cannot use theme here as the loader is used in the _app.tsx file and the theme is not yet loaded

const Backdrop = styled(MuiBackdrop)`
  && {
    z-index: 9999999;
    background-color: white;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  min-width: 94px;

  div {
    width: 100%;
  }

  .MuiLinearProgress-root {
    background-color: #acacac;

    span {
      border: solid;
    }
  }

  .MuiLinearProgress-bar1 {
    background-color: gray;
  }
`;

export const PageLoader = ({
  disableLinearProgress,
}: PageLoaderProps): JSX.Element => (
  <Backdrop aria-label="Waiting for page to load" open>
    <LoaderContainer>
      <Image
        src="/Logo.svg"
        alt="Grønn Jobb logo"
        id="logo"
        title="Logo"
        width={80}
        height={80}
        priority
      />
      <div>
        {!disableLinearProgress && (
          <LinearProgress color="secondary" aria-label="Linear loading bar" />
        )}
      </div>
    </LoaderContainer>
  </Backdrop>
);

export default PageLoader;
