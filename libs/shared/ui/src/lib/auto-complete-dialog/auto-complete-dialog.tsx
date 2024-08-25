import { SetStateAction } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AddCircleRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { FormFieldLoader } from '../form-field-loader';
import { Dialog, UseDialogReturn } from '../dialog';

type Id = {
  id: string;
  label: string;
};

export type AutCompleteDialogProps<TOption extends Id, TDialogValue> = {
  dialog: UseDialogReturn<TDialogValue>;
  dialogTitle: string;
  handleConfirm: () => void;
  options: TOption[];
  selectedValues: TOption[];
  setSelectedIds: (value: SetStateAction<string[]>) => void;
  optionsLoading?: boolean;
  label: string;
};

export const AutoCompleteDialog = <TOption extends Id, TDialogValue>({
  dialog,
  dialogTitle,
  setSelectedIds,
  handleConfirm,
  options,
  selectedValues,
  optionsLoading,
  label,
}: AutCompleteDialogProps<TOption, TDialogValue>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Dialog
      {...dialog}
      title={dialogTitle}
      controls={[
        <Button
          key="add"
          variant="contained"
          onClick={handleConfirm}
          startIcon={<AddCircleRounded />}
        >
          {t('common:buttons.add')}
        </Button>,
      ]}
      body={
        <Autocomplete
          multiple
          options={options}
          disabled={optionsLoading}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              aria-label="auto complete text field"
              {...params}
              label={label}
              variant="outlined"
              disabled={optionsLoading}
              InputProps={{
                ...params.InputProps,
                endAdornment: <FormFieldLoader loading={optionsLoading} />,
              }}
            />
          )}
          onChange={(event, value) => {
            setSelectedIds((value as TOption[]).map((x) => x.id));
          }}
          value={selectedValues}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      }
    />
  );
};

export default AutoCompleteDialog;
