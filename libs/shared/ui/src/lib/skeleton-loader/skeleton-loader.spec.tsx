import { describe, test, expect } from 'vitest';

import { screen } from '@testing-library/dom';
import {
  DataGridSkeleton,
  DefaultSkeleton,
  CardViewSkeleton,
  WizardSkeleton,
  ChartSkeleton,
  ChecklistFormSkeleton,
  TableSkeleton,
  SquareSkeleton,
  AccordionListSkeleton,
  GridSkeleton,
  ContextMenuSkeletonLoader,
  SimpleTextListSkeleton,
} from './index';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

describe('DefaultSkeletonLoader', () => {
  test('renders with correct count', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <DefaultSkeleton
        rows={10}
        rowHeight={60}
        spacing={5}
        widthDifference={5}
      />
    );

    const Skeleton = getByLabelText('default skeleton loader');
    const LastRow = getByLabelText('skeleton row 10');
    expect(Skeleton).toBeInTheDocument();
    expect(LastRow).toBeInTheDocument();
  });
});

describe('DataGridSkeleton', () => {
  test('renders correctly', () => {
    const { getByLabelText } = renderWithDefaultProviders(<DataGridSkeleton />);

    const Skeleton = getByLabelText('data grid skeleton loader');
    expect(Skeleton).toBeInTheDocument();
  });
});

describe('CardViewSkeleton', () => {
  test('renders with correct card count', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <CardViewSkeleton cards={6} rows={2} columns={3} />
    );

    const Skeleton = getByLabelText('card view skeleton loader');
    const LastCard = getByLabelText('skeleton card 6');
    expect(Skeleton).toBeInTheDocument();
    expect(LastCard).toBeInTheDocument();
  });
});

describe('WizardSkeleton', () => {
  test('renders with correct steps and input count', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <WizardSkeleton steps={3} inputs={5} />
    );

    const Skeleton = getByLabelText('wizard skeleton');
    const LastStep = getByLabelText('form step 3');
    const LastInput = getByLabelText('form input 5');
    expect(Skeleton).toBeInTheDocument();
    expect(LastStep).toBeInTheDocument();
    expect(LastInput).toBeInTheDocument();
  });
});

describe('ChartSkeleton', () => {
  test('renders correctly with controls', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <ChartSkeleton height={500} paddingLeft={0} paddingRight={0} />
    );

    const Chart = getByLabelText('chart skeleton');
    const Controls = getByLabelText('chart skeleton controls');

    expect(Chart).toBeInTheDocument();
    expect(Controls).toBeInTheDocument();
  });

  test('renders correctly without controls', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <ChartSkeleton
        height={500}
        paddingLeft={0}
        paddingRight={0}
        disableControls
      />
    );

    const Chart = getByLabelText('chart skeleton');
    const Controls = queryByLabelText('chart skeleton controls');

    expect(Chart).toBeInTheDocument();
    expect(Controls).toBe(null);
  });
});

describe('ChecklistFormSkeleton', () => {
  test('renders correctly with all controls', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <ChecklistFormSkeleton formInputs={3} sections={2} enableDescription />
    );

    const Skeleton = getByLabelText('checklist skeleton loader');
    const Description = getByLabelText('form description input skeleton');
    const LastFormInput = getByLabelText('form input skeleton 3');
    const LastSection = getByLabelText('section skeleton 2');
    const SubmitButton = getByLabelText('submit button skeleton');

    expect(Skeleton).toBeInTheDocument();
    expect(Description).toBeInTheDocument();
    expect(LastFormInput).toBeInTheDocument();
    expect(LastSection).toBeInTheDocument();
    expect(SubmitButton).toBeInTheDocument();
  });

  test('renders without controls', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <ChecklistFormSkeleton formInputs={3} sections={2} hideSubmitCard />
    );

    const Description = queryByLabelText('form description input skeleton');
    const SubmitButton = queryByLabelText('submit button skeleton');

    expect(Description).toBe(null);
    expect(SubmitButton).toBe(null);
  });
});

describe('TableSkeleton', () => {
  test('renders with correct count', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <TableSkeleton tables={1} tablerows={3} tablecolumns={3} />
    );

    const Skeleton = getByLabelText('tables skeleton loader');
    const Table = getByLabelText('table skeleton 1');
    const LastRow = getByLabelText('row skeleton 3');
    const LastColumn = getByLabelText('cell skeleton 3 row 3');

    expect(Skeleton).toBeInTheDocument();
    expect(Table).toBeInTheDocument();
    expect(LastRow).toBeInTheDocument();
    expect(LastColumn).toBeInTheDocument();
  });

  test('renders without header', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <TableSkeleton tables={1} tablerows={3} tablecolumns={3} disableHeader />
    );

    const Skeleton = getByLabelText('tables skeleton loader');
    const Table = getByLabelText('table skeleton 1');
    const LastRow = getByLabelText('row skeleton 3');
    const LastColumn = getByLabelText('cell skeleton 3 row 3');

    const Header = queryByLabelText('title skeleton');

    expect(Skeleton).toBeInTheDocument();
    expect(Table).toBeInTheDocument();
    expect(LastRow).toBeInTheDocument();
    expect(LastColumn).toBeInTheDocument();
    expect(Header).toBe(null);
  });

  test('disables table headers', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <TableSkeleton
        tables={1}
        tablerows={3}
        tablecolumns={3}
        disableTableHeader
      />
    );

    const Skeleton = getByLabelText('tables skeleton loader');
    const LastRow = getByLabelText('row skeleton 3');
    const LastColumn = getByLabelText('cell skeleton 3 row 3');

    const FirstTableHeader = queryByLabelText('table skeleton 1');

    expect(Skeleton).toBeInTheDocument();
    expect(LastRow).toBeInTheDocument();
    expect(LastColumn).toBeInTheDocument();
    expect(FirstTableHeader).toBe(null);
  });
});

describe('SquareSkeleton', () => {
  test('renders correctly with required props', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <SquareSkeleton minHeight={100} />
    );

    const Skeleton = getByLabelText('square skeleton loader');
    const Title = getByLabelText('title skeleton');

    expect(Skeleton).toBeInTheDocument();
    expect(Title).toBeInTheDocument();
  });

  test('renders correctly with optional props', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <SquareSkeleton minHeight={100} disableTitle maxWidth={50} />
    );

    const Skeleton = getByLabelText('square skeleton loader');
    const Title = queryByLabelText('title skeleton');

    expect(Skeleton).toBeInTheDocument();
    expect(Title).not.toBeInTheDocument();
  });
});

describe('AccordionListSkeleton', () => {
  test('renders correctly with props and elevation', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <AccordionListSkeleton rows={2} />
    );

    const Skeleton = getByLabelText('accordion list skeleton loader');
    const FirstRow = getByLabelText('row skeleton 1');
    const SecondRow = getByLabelText('row skeleton 2');

    expect(Skeleton).toBeInTheDocument();
    expect(FirstRow).toBeInTheDocument();
    expect(SecondRow).toBeInTheDocument();
  });

  test('renders correctly with props and without elevation', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <AccordionListSkeleton rows={0} disableElevation />
    );

    const Skeleton = getByLabelText('accordion list skeleton loader');
    expect(Skeleton).toBeInTheDocument();
  });

  test('renders without header', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <AccordionListSkeleton rows={0} disableHeader />
    );

    const Skeleton = getByLabelText('accordion list skeleton loader');
    const Header = queryByLabelText('accordion list skeleton header');

    expect(Skeleton).toBeInTheDocument();
    expect(Header).toBe(null);
  });
});

describe('GridSkeleton', () => {
  test('renders correctly with props', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <GridSkeleton cellCount={1} cellHeight={40} cellWidth={6} />
    );

    const Skeleton = getByLabelText('grid skeleton loader');
    const LastCell = getByLabelText('cell skeleton 1');
    const LastContentSkeleton = getByLabelText('content skeleton 4');

    expect(Skeleton).toBeInTheDocument();
    expect(LastCell).toBeInTheDocument();
    expect(LastContentSkeleton).toBeInTheDocument();
  });
});

describe('ContextMenuSkeletonLoader', () => {
  test('render with correct amount of skeleton items', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <ContextMenuSkeletonLoader topItems={1} centerItems={2} bottomItems={3} />
    );

    const LastTopItems = getByLabelText('top item skeleton 1');
    const LastCenterItems = getByLabelText('center item skeleton 2');
    const LastBottomItems = getByLabelText('bottom item skeleton 3');

    expect(LastTopItems).toBeInTheDocument();
    expect(LastCenterItems).toBeInTheDocument();
    expect(LastBottomItems).toBeInTheDocument();
  });
});

describe(SimpleTextListSkeleton.name, () => {
  test('renders with correct row count', () => {
    renderWithDefaultProviders(<SimpleTextListSkeleton rowCount={2} />);

    const SkeletonContainer = screen.getByLabelText(
      'Simple text list skeleton'
    );
    const FirstRow = screen.getByTestId('skeleton-0');
    const SecondRow = screen.getByTestId('skeleton-1');

    expect(SkeletonContainer).toBeInTheDocument();
    expect(FirstRow).toBeInTheDocument();
    expect(SecondRow).toBeInTheDocument();
  });
});
