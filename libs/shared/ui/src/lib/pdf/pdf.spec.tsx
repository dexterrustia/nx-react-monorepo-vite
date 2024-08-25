import { describe, test, expect } from 'vitest';

import { renderWithDefaultProviders } from '@xpand/ui/_test';
import {
  PdfGeneralInfoSection,
  PdfDefaultHeaderWrapper,
  PdfHeaderMainTitle,
  PdfHeaderSubTitle,
  PdfPaddedContainer,
  PdfPageBreakWrapper,
  PdfParagraphMainTitle,
  PdfParagraphSubTitle,
  PdfEmployeesTableSection,
  PdfPrintWrapper,
  PdfResponsibleSection,
  PdfSimpleHeader,
} from '.';

describe('PdfGeneralInfoSection', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfGeneralInfoSection
        date={new Date('2022.01.01')}
        lastModified="2023.01.01"
        department="department"
        name="name"
        titlePrefix=""
        description="description"
      />
    );

    expect(getByText('name')).toBeInTheDocument();
    expect(getByText('department')).toBeInTheDocument();
    expect(getByText('01.01.2022')).toBeInTheDocument();
    expect(getByText('01.01.2023')).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
  });

  test('renders without name', () => {
    const { queryByText } = renderWithDefaultProviders(
      <PdfGeneralInfoSection
        date={new Date('2022.01.01')}
        department="department"
        titlePrefix=""
        description="description"
      />
    );

    expect(queryByText('name')).not.toBeInTheDocument();
  });

  test('render without department', () => {
    const { queryByText } = renderWithDefaultProviders(
      <PdfGeneralInfoSection
        date={new Date('2022.01.01')}
        name="name"
        titlePrefix=""
        description="description"
      />
    );

    expect(queryByText('department')).not.toBeInTheDocument();
  });

  test('renders without date', () => {
    const { queryByText } = renderWithDefaultProviders(
      <PdfGeneralInfoSection
        department="department"
        name="name"
        titlePrefix=""
        description="description"
      />
    );

    expect(queryByText('01.01.2022')).not.toBeInTheDocument();
  });

  test('renders without last modified', () => {
    const { queryByText } = renderWithDefaultProviders(
      <PdfGeneralInfoSection
        department="department"
        name="name"
        titlePrefix=""
        description="description"
      />
    );

    expect(queryByText('01.01.2023')).not.toBeInTheDocument();
  });

  test('renders with custom fields', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfGeneralInfoSection
        date={new Date('2022.01.01')}
        department="department"
        name="name"
        titlePrefix=""
        description="description"
        customFields={[
          {
            label: 'label',
            value: 'value',
          },
        ]}
      />
    );

    expect(getByText('label')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
  });
});

describe('PdfDefaultHeaderWrapper', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfDefaultHeaderWrapper>
        <div>children</div>
      </PdfDefaultHeaderWrapper>
    );
    expect(getByText('children')).toBeInTheDocument();
  });
});

describe('PdfTitle', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfHeaderMainTitle>text</PdfHeaderMainTitle>
    );
    expect(getByText('text')).toBeInTheDocument();
  });

  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfHeaderSubTitle>text</PdfHeaderSubTitle>
    );
    expect(getByText('text')).toBeInTheDocument();
  });

  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfParagraphMainTitle>text</PdfParagraphMainTitle>
    );
    expect(getByText('text')).toBeInTheDocument();
  });

  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfParagraphSubTitle>text</PdfParagraphSubTitle>
    );
    expect(getByText('text')).toBeInTheDocument();
  });
});

describe('PdfPaddedContainer', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfPaddedContainer>
        <div>children</div>
      </PdfPaddedContainer>
    );
    expect(getByText('children')).toBeInTheDocument();
  });
});

describe('PdfPageBreak', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfPrintWrapper>
        <div>children</div>
      </PdfPrintWrapper>
    );
    expect(getByText('children')).toBeInTheDocument();
  });

  test('should render correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfPageBreakWrapper>
        <div>children</div>
      </PdfPageBreakWrapper>
    );
    expect(getByText('children')).toBeInTheDocument();
  });
});

describe('PdfEmployeesTableSection', () => {
  test('should render correctly with props', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfEmployeesTableSection
        titlePrefix="prefix"
        participants={[
          {
            id: 'id',
            name: 'name',
            mail: 'test@test.com',
            phoneNumbers: [{ prefix: '+49', number: '123456789' }],
            roles: ['role'],
            title: 'title',
            userType: 'XP_ADMIN',
          },
        ]}
      />
    );

    const Title = getByText('prefix common:participants.otherParticipants');
    expect(Title).toBeInTheDocument();

    const ParticipantName = getByText('name');
    const ParticipantMail = getByText('test@test.com');
    const ParticipantPhone = getByText('+49 123456789');
    const ParticipantRole = getByText('common:standardRolesDropdown.role');
    const ParticipantTitle = getByText('title');
    const ParticipantType = getByText(`common:userTypesDropdown.XP_ADMIN`);

    expect(ParticipantName).toBeInTheDocument();
    expect(ParticipantMail).toBeInTheDocument();
    expect(ParticipantPhone).toBeInTheDocument();
    expect(ParticipantRole).toBeInTheDocument();
    expect(ParticipantTitle).toBeInTheDocument();
    expect(ParticipantType).toBeInTheDocument();
  });

  test('should render with custom title', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfEmployeesTableSection
        titlePrefix="prefix"
        participants={[]}
        customTitle="Custom title"
      />
    );

    expect(getByText('Custom title')).toBeInTheDocument();
  });

  test('should render with no with no participants message', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfEmployeesTableSection
        titlePrefix="prefix"
        participants={[]}
        displayEmptyWhenNoParticipants
        emptyMessage="No participants"
      />
    );

    expect(getByText('No participants')).toBeInTheDocument();
  });

  test('should render without title, role and user type columns', () => {
    const { queryByText } = renderWithDefaultProviders(
      <PdfEmployeesTableSection
        titlePrefix="prefix"
        participants={[
          {
            id: 'id',
            name: 'name',
            mail: 'test@test.com',
            phoneNumbers: [{ prefix: '+49', number: '123456789' }],
            roles: ['role'],
            title: 'title',
            userType: 'XP_ADMIN',
          },
        ]}
        hideTitle
        hideRole
        hideUserType
      />
    );

    expect(queryByText('title')).not.toBeInTheDocument();
    expect(
      queryByText('common:standardRolesDropdown.role')
    ).not.toBeInTheDocument();
    expect(
      queryByText('common:userTypesDropdown.XP_ADMIN')
    ).not.toBeInTheDocument();
  });
});

describe('PdfResponsibleSection', () => {
  test('should render correctly with prop', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfResponsibleSection
        email="test@test.com"
        name="name"
        phoneNumbers="+49 123456789"
        titlePrefix="prefix"
      />
    );

    const Title = getByText('prefix common:participants.responsible.title');
    expect(Title).toBeInTheDocument();

    const Name = getByText('name');
    const Mail = getByText('test@test.com');
    const Phone = getByText('+49 123456789');

    expect(Name).toBeInTheDocument();
    expect(Mail).toBeInTheDocument();
    expect(Phone).toBeInTheDocument();
  });
});

describe('PdfSimpleHeader', () => {
  test('should render correctly with props', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfSimpleHeader mainTitle="main title" subTitle="sub title" />
    );

    const MainTitle = getByText('main title');
    const SubTitle = getByText('sub title');

    expect(MainTitle).toBeInTheDocument();
    expect(SubTitle).toBeInTheDocument();
  });

  test('should render with status chip', () => {
    const { getByText } = renderWithDefaultProviders(
      <PdfSimpleHeader
        mainTitle="main title"
        subTitle="sub title"
        statusChip={{
          label: 'status',
        }}
      />
    );

    const MainTitle = getByText('main title');
    const SubTitle = getByText('sub title');
    const Status = getByText('status');

    expect(MainTitle).toBeInTheDocument();
    expect(SubTitle).toBeInTheDocument();
    expect(Status).toBeInTheDocument();
  });
});
