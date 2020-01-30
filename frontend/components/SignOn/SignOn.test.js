import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SignOn from './SignOn';
import theme from '../../public/styles/theme.style';

jest.mock('../SignIn/SignIn', () => () => <div>SignIn</div>);
jest.mock('../SignUp/SignUp', () => () => <div>SignUp</div>);

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <SignOn {...mockProps} />
    </ThemeProvider>
  );

  const ideaboxImg = () => result.queryByAltText('ideabox');
  const title = () => result.queryByText('Starter');
  const signIn = () => result.queryByText('SignIn');
  const signUp = () => result.queryByText('SignUp');

  return { ...result, ideaboxImg, title, signIn, signUp };
};

describe('SignOn', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.ideaboxImg()).toBeInTheDocument();
    expect(com.title()).toBeInTheDocument();
    expect(com.signIn()).toBeInTheDocument();
    expect(com.signUp()).toBeInTheDocument();
  });
});
