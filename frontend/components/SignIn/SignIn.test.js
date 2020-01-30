import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SignIn from './SignIn';
import theme from '../../public/styles/theme.style';

jest.mock('../SignInForm/SignInForm', () => () => <div>SignInForm</div>);

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <SignIn {...mockProps} />
    </ThemeProvider>
  );

  const signInForm = () => result.queryByText('SignInForm');
  const forgotPassDialog = () => result.queryByText('Forgot password?');

  return { ...result, signInForm, forgotPassDialog };
};

describe('SignIn', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.signInForm()).toBeInTheDocument();
    expect(com.forgotPassDialog()).toBeInTheDocument();
  });
});
