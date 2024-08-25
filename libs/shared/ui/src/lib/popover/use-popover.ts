import { useCallback, useState } from 'react';

type UsePopoverProps = {
  onClose?: () => void;
};

export type UsePopoverReturn = ReturnType<typeof usePopover>;

export const usePopover = <TElement extends HTMLElement>({
  onClose,
}: UsePopoverProps = {}) => {
  const [anchorEl, setAnchorEl] = useState<TElement | null>(null);

  const open = useCallback((event: React.MouseEvent<TElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const close = useCallback(() => {
    setAnchorEl(null);
    onClose?.();
  }, []);

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;

  return {
    isOpen,
    anchorEl,
    id,
    open,
    close,
  };
};
