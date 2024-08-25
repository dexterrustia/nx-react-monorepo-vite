import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogContentProps as MuiDialogContentProps,
  DialogTitle as MuiDialogTitle,
  IconButton,
  DialogProps as MuiDialogProps,
} from '@mui/material';
import styled from '@emotion/styled';
import { MouseEvent, ReactNode } from 'react';
import { UseDialogReturn } from './use-dialog';
import { CancelRounded } from '@mui/icons-material';

type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

export type OmittedMuiDialogProps = 'open' | 'onClose' | 'maxWidth';

export type DialogProps<TValue> = UseDialogReturn<TValue> & {
  title?: string;
  body?: ReactNode;
  controls?: ReactNode[];
  /** @deprecated Use `fullScreen` and `maxWidth` to adjust the dialog size */
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  hideCloseButton?: boolean;
  muiDialogProps?: Omit<MuiDialogProps, OmittedMuiDialogProps>;
  closeable?: boolean;
  backgroundImagePath?: string;
  fullScreen?: boolean;
  disableContentPadding?: boolean;
  hideHeader?: boolean;
};

const StyledDialog = styled(
  ({
    minWidth,
    minHeight,
    maxWidth,
    backgroundImagePath,
    ...props
  }: Omit<MuiDialogProps, 'maxWidth'> & {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    backgroundImagePath?: string;
  }) => <MuiDialog {...props} />
)`
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiDialog-container {
    height: auto;
    width: 100%;
    max-height: 100vh;
  }

  .MuiDialog-paper {
    min-width: ${({ minWidth, theme: { spacing } }) =>
      minWidth && spacing(minWidth)};
    min-height: ${({ minHeight, theme: { spacing } }) =>
      minHeight && spacing(minHeight)};

    max-width: ${({ maxWidth, theme: { spacing } }) =>
      maxWidth && spacing(maxWidth)};

    max-height: 100vh;
    border-radius: ${({ theme }) => theme.spacing(1)};

    background-image: url(${({ backgroundImagePath }) => backgroundImagePath});
    background-size: cover;
    background-position: center;
    background-size: ${({ theme }) => theme.spacing(420)};
  }

  @media only screen and (max-width: 425px) {
    .MuiDialog-paper {
      min-width: 90%;
    }
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  padding: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};

  .MuiTypography-root {
    padding: 0;
    padding-left: ${({ theme }) => theme.spacing(1)};
  }

  div {
    margin-left: auto;
    padding-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const DialogTitle = styled(MuiDialogTitle)`
  max-width: ${({ theme }) => theme.spacing(140)};
`;

const DialogContent = styled(
  ({
    disablePadding,
    ...muiProps
  }: MuiDialogContentProps & { disablePadding?: boolean }) => (
    <MuiDialogContent {...muiProps} />
  )
)`
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(5)};

  ${({ disablePadding }) =>
    disablePadding &&
    `
    padding: 0;
  `}
`;

export const DialogV2 = <TValue,>({
  title,
  body,
  controls,
  muiDialogProps,
  minWidth = 100,
  minHeight = 0,
  maxWidth,
  hideCloseButton,
  closeable = true,
  backgroundImagePath,
  fullScreen,
  disableContentPadding,
  hideHeader,
  ...dialogProps
}: DialogProps<TValue>): JSX.Element => {
  const { isOpen, close } = dialogProps;

  const handleClose = (e: Event) => {
    if (!closeable) return;
    e.stopPropagation();
    close();
  };

  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const closeButtonHidden = !closeable || hideCloseButton;

  return (
    <StyledDialog
      onClose={(e) => {
        handleClose(e as Event);
      }}
      open={isOpen}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      backgroundImagePath={backgroundImagePath}
      fullScreen={fullScreen}
      scroll="paper"
      {...muiDialogProps}
    >
      {!hideHeader && (
        <HeaderWrapper onClick={handleStopPropagation}>
          {!!title && <DialogTitle>{title}</DialogTitle>}
          <div>
            {!closeButtonHidden && (
              <IconButton onClick={handleClose} aria-label="Modal close button">
                <CancelRounded />
              </IconButton>
            )}
          </div>
        </HeaderWrapper>
      )}
      {!!body && (
        <DialogContent
          onClick={handleStopPropagation}
          disablePadding={disableContentPadding}
        >
          {body}
        </DialogContent>
      )}
      {!!controls && (
        <DialogActions onClick={handleStopPropagation}>
          {controls.map((control, index) => (
            <div key={index}>{control}</div>
          ))}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default DialogV2;
