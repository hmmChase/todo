import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HeaderDetail from './HeaderDetail';
import theme from '../../public/styles/theme.style';

jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

const arrage = (newProps = {}) => {
  const titleText = '3jd9k4jkf8n4';
  const defaultProps = { ideaId: titleText };
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <ThemeProvider theme={theme}>
      <HeaderDetail {...mockProps} />
    </ThemeProvider>
  );

  const title = () => utils.queryByText(titleText);
  const signOutBtn = () => utils.queryByText('SignOutBtn');

  return { ...utils, title, signOutBtn };
};

describe('HeaderDetail', () => {
  afterEach(cleanup);

  it('renders Title', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
  });

  it('renders SignOutBtn', () => {
    const com = arrage();

    expect(com.signOutBtn()).toBeInTheDocument();
  });
});
