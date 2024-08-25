import { CircularProgress } from '@mui/material';

export type FormFieldLoaderProps = {
  /** Displays the loader */
  loading?: boolean;
  /** Custom size of the loader, defaults to `30` */
  size?: number;
};

/**
 * Component to display a loader inside a form field if some dynamic data is being loaded
 */
export const FormFieldLoader = ({
  loading,
  size,
}: FormFieldLoaderProps): JSX.Element => {
  return loading ? (
    <div aria-label="form field loader">
      <CircularProgress size={size ? size : 30} />
    </div>
  ) : (
    <></>
  );
};

export default FormFieldLoader;
