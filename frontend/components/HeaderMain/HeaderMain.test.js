import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HeaderMain from './HeaderMain';
import theme from '../../public/styles/theme.style';

jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

jest.mock('../IdeaCardForm/IdeaCardForm', () => () => <div>IdeaCardForm</div>);

const arrage = (props = {}) => {
  const defaultProps = { ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <HeaderMain {...defaultProps} />
    </ThemeProvider>
  );

  const titleText = 'Starter';
  const title = () => utils.queryByText(titleText);
  const signOutBtn = () => utils.queryByText('SignOutBtn');
  const ideaCardForm = () => utils.queryByText('IdeaCardForm');

  return { ...utils, title, signOutBtn, ideaCardForm };
};

describe('HeaderMain', () => {
  afterEach(cleanup);

  it('renders Title', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
  });

  it('renders SignOutBtn', () => {
    const com = arrage();

    expect(com.signOutBtn()).toBeInTheDocument();
  });

  it('renders IdeaCardForm', () => {
    const com = arrage();

    expect(com.ideaCardForm()).toBeInTheDocument();
  });
});
