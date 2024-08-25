import {
  nextRouterProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';
import Breadcrumbs from './breadcrumbs';

describe('Breadcrumbs', () => {
  test('renders with Home breadcrumb', () => {
    const { getByText } = renderWithDefaultProviders(<Breadcrumbs />, {
      outerWrappers: [nextRouterProviderWrapper()],
    });

    const Home = getByText('common:breadcrumbs.home');
    expect(Home).toBeInTheDocument();
  });

  test('renders with multiple breadcrumbs', () => {
    const { getByText } = renderWithDefaultProviders(<Breadcrumbs />, {
      outerWrappers: [
        nextRouterProviderWrapper({
          options: {
            router: {
              pathname: '/companies/new',
            },
          },
        }),
      ],
    });

    const Home = getByText('common:breadcrumbs.home');
    const Companies = getByText('common:breadcrumbs.companies');
    const New = getByText('common:breadcrumbs.new');
    expect(Home).toBeInTheDocument();
    expect(Companies).toBeInTheDocument();
    expect(New).toBeInTheDocument();
  });

  test('renders with a need to camelize route', () => {
    const { getByText } = renderWithDefaultProviders(<Breadcrumbs />, {
      outerWrappers: [
        nextRouterProviderWrapper({
          options: {
            router: {
              pathname: 'with-dash-route/new',
            },
          },
        }),
      ],
    });

    const WithDashRoute = getByText('common:breadcrumbs.withDashRoute');
    const New = getByText('common:breadcrumbs.new');
    expect(New).toBeInTheDocument();
    expect(WithDashRoute).toBeInTheDocument();
  });
  test('render folder path base on url query string', () => {
    const { getByText } = renderWithDefaultProviders(<Breadcrumbs />, {
      outerWrappers: [
        nextRouterProviderWrapper({
          options: {
            router: {
              pathname: '/documents/[id]',
              query: {
                id: 'sampleSubFolder',
                arc: 'folder1/folder2/folder3',
              },
            },
          },
        }),
      ],
    });

    const documents = getByText('common:breadcrumbs.documents');
    const sampleSubFolder = getByText('SampleSubFolder');
    const folder1 = getByText('Folder1');
    const folder2 = getByText('Folder2');
    const folder3 = getByText('Folder3');
    expect(sampleSubFolder).toBeInTheDocument();
    expect(documents).toBeInTheDocument();
    expect(folder1).toBeInTheDocument();
    expect(folder2).toBeInTheDocument();
    expect(folder3).toBeInTheDocument();
  });

  test('render with pathToReplace need to hide', () => {
    const { queryByText } = renderWithDefaultProviders(
      <Breadcrumbs pathToReplace={[{ path: '/list', newValue: '' }]} />,
      {
        outerWrappers: [
          nextRouterProviderWrapper({
            options: {
              router: {
                pathname: '/documents/list',
                query: {
                  id: 'sampleSubFolder',
                  arc: 'folder1/folder2/folder3',
                },
              },
            },
          }),
        ],
      }
    );
    const list = queryByText('List');
    expect(list).toBeNull();
  });

  test('render with path to replace', () => {
    const { getByText } = renderWithDefaultProviders(
      <Breadcrumbs
        pathToReplace={[{ path: '/employees', newValue: 'employeesMy' }]}
      />,
      {
        outerWrappers: [
          nextRouterProviderWrapper({
            options: {
              router: {
                pathname: '/employees/new',
              },
            },
          }),
        ],
      }
    );
    const list = getByText('common:breadcrumbs.employeesMy');
    expect(list).toBeInTheDocument();
  });
});
