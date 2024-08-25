import styled from '@emotion/styled';
import HelpIcon from '@mui/icons-material/Help';
import { Tooltip } from '@mui/material';

export type FormToolTipProps = {
  /** Text displayed when hovering the tooltip icon */
  tooltip: string;
  /** Affects the styling dependent on which form field type the tooltip is rendered in */
  mode: 'input' | 'select';
};

const Container = styled.div<{ mode: FormToolTipProps['mode'] }>`
  display: flex;
  align-items: center;

  ${({ mode, theme }) => {
    switch (mode) {
      case 'input':
        return `
          padding-left: ${theme.spacing(1)};
        `;
      case 'select':
        return `
          padding-right: ${theme.spacing(3)};
        `;
    }
  }}
`;

export const FormToolTip = ({
  tooltip,
  mode,
}: FormToolTipProps): JSX.Element => {
  return (
    <Container mode={mode}>
      <Tooltip
        describeChild
        TransitionProps={{ timeout: 300 }}
        title={tooltip}
        placement="right"
      >
        <HelpIcon color="info" />
      </Tooltip>
    </Container>
  );
};

export default FormToolTip;
