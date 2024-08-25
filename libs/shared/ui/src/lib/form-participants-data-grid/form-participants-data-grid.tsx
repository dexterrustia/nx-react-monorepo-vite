import { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { DeleteForeverRounded, PersonAddRounded } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import { BasePhone, concatPhoneNumbers } from '@xpand/utils/phone';
import useTranslation from 'next-translate/useTranslation';
import { Participant, ParticipantListData } from '@xpand/utils/_types';
import { Box } from '@mui/system';

import { ClientPaginatedDataGrid, GridColDef } from '../data-grid';
import { useScreenSizeCheck } from '../hooks/use-screen-size-check';

const PAGE_SIZE = 10;

export type FormParticipantsDataGridProps<TPhone> = {
  /** The participants to display  */
  participants: Participant<TPhone>[] | ParticipantListData[];
  /** Callback triggered when user removes a participant */
  handleRemove?: (id: string) => void;
  /** Callback triggered when user adds a new particpant */
  handleAdd?: () => void;
  /** isView when component is used detail page or outside form*/
  isView?: boolean;
  /** Options to customize the data grid */
  options?: {
    /** Custom title to be displayed over the data grid, defaults to `Participants` */
    customTitle?: string;
    /** Options for customizing the columns */
    columns?: {
      disableName?: boolean;
      disableRole?: boolean;
      disableMail?: boolean;
      disablePhone?: boolean;
      disableType?: boolean;
      disableDelete?: boolean;
    };
  };
  /** Number of columns visible in the data grid, defaults to `6` */
  columnCount?: number;
  /** Displays a loader in the data grid */
  isLoading?: boolean;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .MuiIconButton-root {
    margin-left: auto;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FormParticipantsDataGrid = <TPhone extends BasePhone>({
  participants,
  handleRemove = () => {},
  handleAdd = () => {},
  isView,
  options = {},
  columnCount = 6,
  isLoading = false,
}: FormParticipantsDataGridProps<TPhone>): JSX.Element => {
  const { t } = useTranslation();
  const { isMobileUser } = useScreenSizeCheck();

  const remove = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleRemove(id);
  };

  const columns: GridColDef<Participant<TPhone>>[] = [
    {
      field: 'name',
      headerName: t('common:gridColumns.participants.name'),
      flex: isMobileUser ? 0 : 1,
      disableColumnMenu: true,
      ...(isMobileUser && {
        width: 150,
      }),
      renderCell: ({ row }) => {
        return (
          <>
            <Box mr={2}>
              <Avatar src={''} />
            </Box>
            <Typography variant="inherit">{row.name}</Typography>
          </>
        );
      },
    },
    {
      field: 'mail',
      headerName: t('common:gridColumns.participants.email'),
      flex: isMobileUser ? 0 : 1,
      disableColumnMenu: true,
      ...(isMobileUser && {
        width: 200,
      }),
    },
    {
      field: 'phoneNumber',
      headerName: t('common:gridColumns.participants.phoneNumbers'),
      valueGetter: ({ row }) => concatPhoneNumbers(row.phoneNumbers),
      flex: isMobileUser ? 0 : 1,
      disableColumnMenu: true,
      ...(isMobileUser && {
        width: 150,
      }),
    },
    {
      field: 'role',
      headerName: t('common:gridColumns.participants.roles'),
      valueGetter: ({ row }) =>
        !!row?.roles?.[0]
          ? row?.roles
              ?.map((role: string) => t(`common:standardRolesDropdown.${role}`))
              .join(', ')
          : '',
      flex: isMobileUser ? 0 : 1,
      disableColumnMenu: true,
      ...(isMobileUser && {
        width: 100,
      }),
    },
    {
      field: 'type',
      headerName: t('common:gridColumns.participants.type'),
      valueGetter: ({ row }) =>
        t(`common:gridColumns.participants.types.${row.type}`),
      flex: isMobileUser ? 0 : 1,
      disableColumnMenu: true,
      ...(isMobileUser && {
        width: 100,
      }),
    },
    {
      field: 'actions',
      headerName: t('common:buttons.actions'),
      flex: 0,
      sortable: false,
      filterable: false,
      editable: false,
      resizable: false,
      disableColumnMenu: true,
      ...(isMobileUser && {
        width: 100,
      }),
      renderCell: ({ row }) => {
        return (
          <IconButton
            aria-label="remove participant button"
            id="delete-icon"
            onClick={remove(row.id)}
          >
            <DeleteForeverRounded />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Container>
      {!isView && (
        <div aria-label="header-control">
          <Typography component="h4" variant="h6" color="secondary">
            {options?.customTitle
              ? options.customTitle
              : t('common:gridColumns.participants.title')}
          </Typography>
          <IconButton onClick={handleAdd} disabled={isLoading}>
            <PersonAddRounded fontSize="large" />
          </IconButton>
        </div>
      )}
      <section>
        <ClientPaginatedDataGrid
          header=""
          columns={columns}
          rows={participants}
          rowCount={participants.length}
          columnBuffer={columnCount}
          loading={isLoading}
          columnVisibilityModel={{
            name: !options?.columns?.disableName,
            mail: !options?.columns?.disableMail,
            phoneNumber: !options?.columns?.disablePhone,
            role: !options?.columns?.disableRole,
            type: !options?.columns?.disableType,
            actions: !isView && !options?.columns?.disableDelete,
          }}
          pageSizeOptions={[PAGE_SIZE]}
        />
      </section>
    </Container>
  );
};

export default FormParticipantsDataGrid;
