import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplaySuccess from './DisplaySuccess';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const successText = 'mock success message';
  const defaultProps = { message: successText, ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <DisplaySuccess {...defaultProps} />
    </ThemeProvider>
  );

  const li = () => utils.queryByText(successText);

  return { ...utils, successText, li };
};

describe('DisplaySuccess', () => {
  afterEach(cleanup);

  it('renders message', () => {
    const com = arrage();

    expect(com.li()).toHaveTextContent(com.successText);
  });
});
