import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';
import FormSelectToggle from './form-select-toggle';

describe('Form select', () => {
  test('test', () => {
    // eslint-disable-next-line no-empty-pattern
    const {} = renderWithDefaultProviders(
      <FormSelectToggle
        name="hello"
        id="id"
        display="text"
        helperText="helpText"
        displayValue="Tee"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );
  });
});
