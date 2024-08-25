import { dateToStringTime } from '@xpand/utils/date';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

import SaveIndicator from './save-indicator';

describe('SaveIndicator', () => {
  test('renders with last saved text and icon', () => {
    const now = new Date();
    const { getByText } = renderWithDefaultProviders(
      <SaveIndicator isSaving={false} lastSaved={now} />
    );

    expect(
      getByText(`common:wizard.automaticallySaved${dateToStringTime(now)}`)
    ).toBeInTheDocument();
  });

  test('renders with saving text and loading indicator', () => {
    const now = new Date();
    const { getByText } = renderWithDefaultProviders(
      <SaveIndicator isSaving={true} lastSaved={now} />
    );

    expect(getByText(`common:wizard.saving`)).toBeInTheDocument();
  });

  test('renders without saved time when saving', () => {
    const now = new Date();
    const { getByText } = renderWithDefaultProviders(
      <SaveIndicator isSaving lastSaved={now} />
    );

    expect(getByText(`common:wizard.saving`)).toBeInTheDocument();
  });

  test('renders with correctly formated time string WITHOUT adding a zero to the hour and minutes', () => {
    const zeroAddedToTime = new Date('2020-01-01T00:00:00.000Z');
    const { getByText } = renderWithDefaultProviders(
      <SaveIndicator isSaving={false} lastSaved={zeroAddedToTime} />
    );

    expect(
      getByText(
        `common:wizard.automaticallySaved${dateToStringTime(zeroAddedToTime)}`
      )
    ).toBeInTheDocument();
  });

  test('renders with correctly formated time string WITH adding a zero to the hour and minutes', () => {
    const zeroAddedToTime = new Date('2020-12-12T00:00:00.000Z');
    const { getByText } = renderWithDefaultProviders(
      <SaveIndicator isSaving={false} lastSaved={zeroAddedToTime} />
    );

    expect(
      getByText(
        `common:wizard.automaticallySaved${dateToStringTime(zeroAddedToTime)}`
      )
    ).toBeInTheDocument();
  });

  test('renders with error message', () => {
    const now = new Date();

    const { getByText } = renderWithDefaultProviders(
      <SaveIndicator lastSaved={now} isError />
    );

    expect(getByText(`common:errors.generalSimple`)).toBeInTheDocument();
  });

  test('renders without error message while saving', () => {
    const now = new Date();

    const { getByText, queryByText } = renderWithDefaultProviders(
      <SaveIndicator lastSaved={now} isError isSaving />
    );

    expect(getByText(`common:wizard.saving`)).toBeInTheDocument();
    expect(queryByText(`common:errors.generalSimple`)).not.toBeInTheDocument();
  });
});
