import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HeaderMain from './HeaderMain';
import theme from '../../public/styles/theme.style';

jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);
jest.mock('../IdeaCardForm/IdeaCardForm', () => () => <div>IdeaCardForm</div>);

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <HeaderMain {...mockProps} />
    </ThemeProvider>
  );

  const title = () => result.queryByText('Starter');
  const signOutBtn = () => result.queryByText('SignOutBtn');
  const ideaCardForm = () => result.queryByText('IdeaCardForm');

  return { ...result, title, signOutBtn, ideaCardForm };
};

describe('HeaderMain', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
    expect(com.signOutBtn()).toBeInTheDocument();
    expect(com.ideaCardForm()).toBeInTheDocument();
  });
});
