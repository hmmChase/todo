import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplaySuccess from './DisplaySuccess';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const successText = 'mock success message';
  const defaultProps = { message: successText };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DisplaySuccess {...mockProps} />
    </ThemeProvider>
  );

  const li = () => result.queryByText(successText);

  return { ...result, li };
};

describe('DisplaySuccess', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.li()).toBeInTheDocument();
  });
});
