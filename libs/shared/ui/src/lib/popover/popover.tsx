import styled from '@emotion/styled';
import { UsePopoverReturn } from './use-popover';
import MuiPopover, {
  PopoverProps as MuiPopoverProps,
} from '@mui/material/Popover';

import { MouseEvent, ReactNode } from 'react';
import { DialogActions, DialogContent } from '@mui/material';

type Event = MouseEvent<HTMLButtonElement>;

type PopoverProps = UsePopoverReturn &
  Partial<Omit<MuiPopoverProps, 'open'>> & {
    body?: ReactNode;
    controls?: ReactNode[];
  };

const Container = styled.div``;

const Popover = ({
  body,
  anchorEl,
  id,
  isOpen,
  close,
  open,
  controls,
  ...muiProps
}: PopoverProps) => {
  const handleClose = (e: Event) => {
    e.stopPropagation();
    close();
  };
  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Container>
      <MuiPopover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...muiProps}
      >
        {!!controls && (
          <DialogActions onClick={handleStopPropagation}>
            {controls}
          </DialogActions>
        )}
        {!!body && (
          <DialogContent onClick={handleStopPropagation}>{body}</DialogContent>
        )}
      </MuiPopover>
    </Container>
  );
};

export default Popover;
