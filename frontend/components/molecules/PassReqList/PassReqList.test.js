import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import PassReqList from './PassReqList';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <PassReqList {...mockProps} />
    </ThemeProvider>
  );

  const passReqList = result.queryByText('PassReqList');

  return { ...result, passReqList };
};

describe('PassReqList', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.passReqList).toBeInTheDocument();
  });
});
