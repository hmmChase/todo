import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import SignOutBtn from './SignOutBtn';
import { MOCK_SIGN_OUT } from '../../__tests__/__mocks__/graphql/user';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_SIGN_OUT];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SignOutBtn {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const signOutBtn = () => utils.queryByLabelText('sign out button');
  const clickSignOutBtn = () => fireEvent.click(signOutBtn());

  return { ...utils, signOutBtn, clickSignOutBtn };
};

describe('SignOutBtn', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.signOutBtn()).toBeInTheDocument();
  });
});
