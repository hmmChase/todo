import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HeaderDetail from './HeaderDetail';
import theme from '../../public/styles/theme.style';

jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

const arrage = (newProps = {}) => {
  const titleText = '3jd9k4jkf8n4';
  const defaultProps = { ideaId: titleText };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <HeaderDetail {...mockProps} />
    </ThemeProvider>
  );

  const title = () => result.queryByText(titleText);
  const signOutBtn = () => result.queryByText('SignOutBtn');

  return { ...result, title, signOutBtn };
};

describe('HeaderDetail', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
    expect(com.signOutBtn()).toBeInTheDocument();
  });
});
