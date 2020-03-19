import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DetailIcon from './DetailIcon';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = { id: '1' };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DetailIcon {...mockProps} />
    </ThemeProvider>
  );

  const detailIcon = () => result.queryByLabelText('detail icon');

  return { ...result, detailIcon };
};

describe('DetailIcon', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.detailIcon()).toBeInTheDocument();
  });
});
