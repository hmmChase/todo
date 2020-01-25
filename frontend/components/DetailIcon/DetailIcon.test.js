import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DetailIcon from './DetailIcon';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = { id: '1' };
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <ThemeProvider theme={theme}>
      <DetailIcon {...mockProps} />
    </ThemeProvider>
  );

  const detailIcon = () => utils.queryByLabelText('detail icon');

  return { ...utils, detailIcon };
};

describe('DetailIcon', () => {
  afterEach(cleanup);

  it('renders DetailIcon', () => {
    const com = arrage();

    expect(com.detailIcon()).toBeInTheDocument();
  });
});
