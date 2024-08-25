import {
  Box,
  Button,
  ButtonGroup as MuiButtonGroup,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  IconButton,
  Typography,
} from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
import SaveAltRounded from '@mui/icons-material/SaveAltRounded';

import { useEditDrawerContext } from './edit-drawer-ctx';

export type EditDrawerProps = {
  /** Title displayed at top of drawer in the format `Edit <title>` */
  title: string;
  /** Content of drawer, usually som form fields */
  children: ReactNode;
  /** Shows a delete button */
  showDelete?: boolean;
  /** Disables the delete button if `showDelete` prop is `true` */
  disableDelete?: boolean;
  /** Overrides the default drawer width */
  width?: number;
};

const Drawer = styled(
  ({ width, ...props }: MuiDrawerProps & { width: number }) => (
    <MuiDrawer {...props} />
  )
)`
  && {
    width: ${({ theme, width }) => theme.spacing(width)};
    & .MuiDrawer-paper {
      overflow-x: hidden;
      width: ${({ theme, width }) => theme.spacing(width)};
    }

    @media only screen and (max-width: 425px) {
      & .MuiDrawer-paper {
        width: ${({ theme }) => theme.spacing(90)};
      }
    }
  }
`;

const DrawerHeader = styled(Box)`
  && {
    display: flex;
    align-items: center;
    padding: ${(props) => props.theme.spacing(2, 4)};
    justify-content: space-between;
    border-bottom: ${(props) => props.theme.mixins.header.borderBottom};
  }
`;

const DrawerContent = styled(Box)`
  && {
    flex: 1;
  }
`;

const DrawerActions = styled(Box)`
  && {
    padding: ${(props) => props.theme.spacing(4)};
  }
`;

const ButtonGroup = styled(MuiButtonGroup)`
  display: flex;
  justify-content: space-between;
  & > .MuiButton-root:last-child {
    margin-left: auto;
  }
`;

export const EditDrawer = ({
  title,
  children,
  showDelete,
  disableDelete,
  width = 157,
}: EditDrawerProps): JSX.Element => {
  const { t } = useTranslation();
  const editDrawer = useEditDrawerContext();

  return (
    <Drawer
      anchor="right"
      open={editDrawer.isDrawerOpen}
      onClose={editDrawer.handleClose}
      aria-label={`Edit ${title}`}
      width={width}
    >
      <DrawerHeader>
        <Typography variant="h6">
          {t('common:buttons.editX', { item: title })}
        </Typography>
        <IconButton onClick={editDrawer.handleClose} size="large">
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <DrawerContent>{children}</DrawerContent>
      <DrawerActions>
        <ButtonGroup>
          {showDelete && (
            <Button
              onClick={editDrawer.handleDelete}
              color="secondary"
              variant="contained"
              startIcon={<DeleteForeverRounded />}
              disabled={disableDelete}
            >
              <Typography variant="button">
                {t('common:buttons.delete')}
              </Typography>
            </Button>
          )}
          <Button
            onClick={editDrawer.handleSave}
            color="primary"
            variant="contained"
            startIcon={<SaveAltRounded />}
            disabled={editDrawer.saveIsDisabled}
          >
            <Typography variant="button">{t('common:buttons.save')}</Typography>
          </Button>
        </ButtonGroup>
      </DrawerActions>
    </Drawer>
  );
};

export default EditDrawer;
