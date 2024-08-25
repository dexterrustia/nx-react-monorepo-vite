import styled from '@emotion/styled';
import React, { RefObject } from 'react';
import { useDeviceCameraContext } from './device-camera-ctx';
import { IconButton, Button, Typography, Fade } from '@mui/material';
import {
  CameraRounded,
  CancelRounded,
  CheckCircleRounded,
  RefreshRounded,
} from '@mui/icons-material';
import { Backdrop } from '../loader';
import useTranslation from 'next-translate/useTranslation';

type DeviceCameraProps = {
  placeholder?: string;
};

const ContentWrapper = styled.div<{ hide: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;

  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

const HudWrapper = styled.div<{ hideCanvas: boolean }>`
  display: block;
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: auto;

  & > video {
    display: block;
    height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    margin: auto;
  }

  & > canvas {
    height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    margin: auto;

    display: ${({ hideCanvas }) => (hideCanvas ? 'none' : 'block')};
  }
`;

const CancelWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  .MuiButtonBase-root {
    color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.grey[900]};
    margin-right: ${({ theme }) => theme.spacing(2)};
    margin-top: ${({ theme }) => theme.spacing(2)};
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  }
`;

const CaptureWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};

  .MuiButtonBase-root {
    color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.grey[900]};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

const PreviewActionsWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;

  padding-right: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};

  & > button:last-child {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const Blitz = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.palette.common.white};
  z-index: ${({ theme }) => theme.zIndex.drawer + 2};
`;

export const DeviceCamera = React.forwardRef(
  ({ placeholder }: DeviceCameraProps, ref): JSX.Element => {
    const { t } = useTranslation();
    const {
      cameraIsOpen,
      closeCamera,
      captureImage,
      hasCurrentImage,
      isCapturing,
      acceptImage,
      declineImage,
      isLaunching,
      isBlitzing,
    } = useDeviceCameraContext();

    placeholder;

    return (
      <>
        <Backdrop open={cameraIsOpen}>
          <ContentWrapper hide={!cameraIsOpen}>
            <HudWrapper hideCanvas={!hasCurrentImage || !isCapturing}>
              <Fade in={isBlitzing}>
                <Blitz />
              </Fade>
              {!isLaunching && (
                <CancelWrapper>
                  <IconButton size="large" onClick={closeCamera}>
                    <CancelRounded fontSize="large" />
                  </IconButton>
                </CancelWrapper>
              )}

              {!hasCurrentImage && (
                <>
                  {!isLaunching && (
                    <CaptureWrapper>
                      <IconButton size="large" onClick={captureImage}>
                        <CameraRounded fontSize="large" />
                      </IconButton>
                    </CaptureWrapper>
                  )}
                  <video ref={ref as RefObject<HTMLVideoElement>} />
                </>
              )}
              {isCapturing && (
                <PreviewActionsWrapper>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={declineImage}
                    startIcon={<RefreshRounded />}
                  >
                    <Typography variant="button">
                      {t('common:buttons.tryAgain')}
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    onClick={acceptImage}
                    startIcon={<CheckCircleRounded />}
                  >
                    <Typography variant="button">
                      {t('common:buttons.accept')}
                    </Typography>
                  </Button>
                </PreviewActionsWrapper>
              )}
              <canvas ref={ref as RefObject<HTMLCanvasElement>}></canvas>
            </HudWrapper>
          </ContentWrapper>
        </Backdrop>
      </>
    );
  }
);

export default DeviceCamera;
