import { createContext, ReactNode, useContext, useState } from 'react';

export type UseEditDrawerProps = {
  /** Callback fired when closing drawer */
  onClose?: () => void;
  /** Callback fired when clicking save */
  onSave?: () => void;
  /** Callback fired when clicking delete */
  onDelete?: () => void;
};

export type EditDrawerContext = {
  isDrawerOpen: boolean;
  saveIsDisabled: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleSaveDisabled: (isDisabled: boolean) => void;
};

export type EditDrawerContextReturnValue = EditDrawerContext;

export type EditDrawerProviderProps = EditDrawerContext & {
  /** Part of application that needs edit drawer */
  children: ReactNode;
};

const EditDrawerContext = createContext<EditDrawerContext>({
  isDrawerOpen: false,
  saveIsDisabled: false,
  handleOpen: () => {},
  handleClose: () => {},
  handleSave: () => {},
  handleDelete: () => {},
  handleSaveDisabled: () => {},
});

export const useEditDrawer = ({
  onClose,
  onSave,
  onDelete,
}: UseEditDrawerProps): EditDrawerContextReturnValue => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [saveIsDisabled, setSaveIsDisabled] = useState(false);

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    onClose?.();
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const handleSaveDisabled = (disabled: boolean) => {
    setSaveIsDisabled(disabled);
  };

  return {
    isDrawerOpen,
    saveIsDisabled,
    handleOpen,
    handleClose,
    handleSave,
    handleDelete,
    handleSaveDisabled,
  };
};

export const EditDrawerProvider = ({
  children,
  ...editDrawerProps
}: EditDrawerProviderProps): JSX.Element => {
  return (
    <EditDrawerContext.Provider value={editDrawerProps}>
      {children}
    </EditDrawerContext.Provider>
  );
};

export const useEditDrawerContext = (): EditDrawerContextReturnValue =>
  useContext(EditDrawerContext);

export default useEditDrawer;
