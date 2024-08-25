import {
  Typography,
  Divider as MuiDivider,
  Paper,
  PaperProps,
} from '@mui/material';
import styled from '@emotion/styled';

type ContentType = 'component' | 'text';

type Content = {
  /** The type of content. Can be `component` or `text` */
  type: ContentType;
  /** The content value */
  value: JSX.Element | string;
  /** Text to be displayed on top of the column */
  header?: string;
  /** Maximum possible with for the content */
  maxWidth?: number;
  /** Removes the divider used to separate the columns */
  disableDivider?: boolean;
  /** Sets the right margin of the column */
  marginRight?: number;
  /** Sets the bottom margin to `auto` */
  alignTop?: boolean;
};

type RowControlProps = {
  /** Row will be numbered if this is provided */
  number?: number;
  /** Contents to display in each column of the row */
  contents: Content[];
  /** Component displayed at the end of the row */
  endControls?: JSX.Element;
  /** Disables all control dividers */
  disableDividers?: boolean;
  /** Function fired on click */
  onClick?: () => void;
};

export const Container = styled(({ ...props }: PaperProps) => (
  <Paper {...props} />
))`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing(1)};
  background-color: transparent;
`;

const Column = styled.div<
  Pick<Content, 'maxWidth' | 'disableDivider' | 'marginRight' | 'alignTop'>
>`
  width: 100%;
  max-width: ${({ theme, maxWidth }) => maxWidth && theme.spacing(maxWidth)};
  margin-right: ${({ theme, disableDivider }) =>
    disableDivider && theme.spacing(1)};
  margin-right: ${({ theme, marginRight }) =>
    marginRight && theme.spacing(marginRight)};

  :last-child {
    margin-right: 0;
  }

  display: flex;
  align-items: center;

  & > div {
    width: 100%;
    margin-bottom: ${({ alignTop }) => alignTop && 'auto'};
  }
`;

const ControlColumn = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing(1)};
`;

const ColumnHeader = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Divider = styled(MuiDivider)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

/**
 * @deprecated Overengineered component. Just use a custom flex box or grid layout according to the design instead.
 */
export const RowControl = ({
  number,
  contents,
  endControls,
  disableDividers,
  onClick = () => {},
}: RowControlProps): JSX.Element => {
  const getContent = (content: Content): JSX.Element => {
    switch (content.type) {
      case 'text':
        return (
          <Typography aria-label="text content">{content.value}</Typography>
        );
      case 'component':
        return <>{content.value}</>;
    }
  };

  return (
    <Container aria-label="row control" elevation={0} onClick={onClick}>
      {number && (
        <ControlColumn>
          <Typography>{number}</Typography>
          {!disableDividers && <Divider orientation="vertical" />}
        </ControlColumn>
      )}
      {contents.map((content, index) => (
        <Column
          key={index}
          maxWidth={content.maxWidth}
          disableDivider={content.disableDivider}
          marginRight={content.marginRight}
          alignTop={content.alignTop}
        >
          <div>
            {content?.header && <ColumnHeader>{content.header}</ColumnHeader>}
            {getContent(content)}
          </div>
          {index !== contents.length - 1 && !content.disableDivider && (
            <Divider orientation="vertical" />
          )}
        </Column>
      ))}
      {endControls && (
        <ControlColumn>
          {!disableDividers && <Divider orientation="vertical" />}
          {endControls}
        </ControlColumn>
      )}
    </Container>
  );
};

export default RowControl;
